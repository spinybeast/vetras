import {insert, update, search, searchAll} from "./elastic";
import {uploadPhoto} from "./minio";
import {ROLE_RECEIVER, ROLE_TECHNICIAN, STATUS_IN_SERVICE, STATUS_READY, VIN_DECODE_URL} from '../constants';

export async function login({login, password}) {
    const users = [
        {
            role: ROLE_RECEIVER,
            login: '1',
            password: '1'
        },
        {
            role: ROLE_TECHNICIAN,
            login: '2',
            password: '2'
        }
    ];
    return await new Promise((resolve) => {
        let result = {success: false};
        users.map(user => {
            if (login === user.login && password === user.password) {
                result = {success: true, role: user.role};
            }
        });
        setTimeout(() => resolve(result), 500)
    });
}

export function decodeVIN(VIN) {
    return fetch(VIN_DECODE_URL + '?act=VINdecode&vin=' + VIN + '&lang=en&key=test')
        .then(res => res.json())
        .then(res => res.vehicleDetails)
}

export function fetchPrincipals() {
    return searchAll('principals', 'principal');
}

export function fetchServices() {
    return searchAll('services', 'service');
}

export function fetchOrdersByServices(selectedServices) {
    const body = {
        query: {
            bool: {
                must: {
                    bool: {
                        should: selectedServices.map(service => ({match: {"order.serviceType": service}}))
                    }
                },
                must_not: {
                    exists: {
                        field: "order.completedAt"
                    }
                }
            }
        },
        sort: [{"order.vehicleRecord": {"order": "desc"}}]
    };
    return search('orders', 'order', body);
}

export function fetchOrdersByVehicle(vehicleId) {
    const body = {
        query: {
            bool: {
                must: {
                    match: {
                        "order.vehicleRecord": vehicleId
                    }
                },
                must_not: {
                    exists: {
                        field: "order.completedAt"
                    }
                }
            }
        },
    };
    return search('orders', 'order', body);
}

export function fetchVehicles(ids) {
    const body = {
        query: {
            ids: {
                values: ids
            }
        }
    };
    return search('vehicles', 'vehicle', body);
}

async function saveVehicle(carInfo, damages, photos) {
    for (let damage of damages) {
        if (damage.photos && damage.photos.length) {
            const promises = damage.photos.map((uri, index) => uploadPhoto(uri, damage.id + '-' + index));
            damage.photos = await Promise.all(promises);
        }
        delete damage.id;
    }

    const promises = photos.map((uri, index) => uploadPhoto(uri, carInfo.VIN + '-' + index));
    const photosUploaded = await Promise.all(promises);

    const vehicle = {
        ...carInfo,
        damages,
        photos: photosUploaded,
        createdAt: getDate(),
        updatedAt: getDate(),
        status: carInfo.servicesOrdered && carInfo.servicesOrdered.length > 0 ? STATUS_IN_SERVICE : STATUS_READY
    };

    return insert('vehicles', {vehicle});
}

async function saveOrder(vehicleId, service, startTime) {
    const order = {
        vehicleRecord: vehicleId,
        serviceType: service,
        createdAt: startTime
    };

    return insert('orders', {order});
}

async function saveLabour(vehicleId, startTime) {
    const work = {
        itemType: 'vehicle',
        reference: vehicleId,
        employee: '1',
        startedAt: startTime,
        duration: (new Date() - startTime) / 1000
    };

    return insert('labour_tracking', {work});
}

export async function saveReceiverInfo(carInfo, damages, photos, startTime) {
    const vehicleId = await saveVehicle(carInfo, damages, photos);

    if (carInfo.servicesOrdered && carInfo.servicesOrdered.length > 0) {
        const orders = carInfo.servicesOrdered.map(service => saveOrder(vehicleId, service, startTime));
        await Promise.all(orders);
    }

    return saveLabour(vehicleId, startTime);
}

export function completeJob(order, servicesSubtypes, startTime) {
    let orderBody = {
        completedAt: getDate(),
    };
    if (servicesSubtypes.length) {
        orderBody.serviceSubtypesActual = servicesSubtypes
    }
    const work = {
        itemType: 'order',
        reference: order._id,
        employee: '2',
        startedAt: startTime,
        duration: (new Date() - startTime) / 1000
    };
    return update('orders', order._id, {order: orderBody}).then(() => {
        insert('labour_tracking', {work}).then(async () => {
            const orders = await fetchOrdersByVehicle(order.vehicleRecord);
            console.log(orders);
            if (orders && orders.length === 0) {
                setVehicleReady(order.vehicleRecord);
            }
        });
    });
}

function setVehicleReady(vehicleId) {
    const vehicle = {
        updatedAt: getDate(),
        status: STATUS_READY
    };
    return update('vehicles', vehicleId, {vehicle});
}

function getDate() {
    return (new Date()).toJSON();
}
