import {insert, update, search, searchAll} from "./elastic";
import { ROLE_RECEIVER, ROLE_TECHNICIAN, STATUS_IN_SERVICE, STATUS_READY, VIN_DECODE_URL } from '../constants';

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

export function fetchOrders(selectedServices) {
    const query = {
        bool: {
            must: {
                bool: {
                    should: selectedServices.map(service => ({match: {serviceType: service}}))
                }
            },
            must_not: {
                exists: {
                    field: "completedAt"
                }
            }
        }
    };
    console.log(query);
    return search('orders', null, query);
}

export function fetchVehicles(ids) {
    const query = {
       ids : {
           values: ids
       }
    };
    return search('vehicles', null, query);
}

async function saveVehicle(carInfo, damages, services, photos) {
    const body = {
        ...carInfo,
        damages: Object.keys(damages).map(key => damages[key]),
        photos: photos,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: carInfo.servicesOrdered.length > 0 ? STATUS_IN_SERVICE : STATUS_READY
    };

    return insert('vehicles', body);
}

async function saveOrder(vehicleId, service, startTime) {
    const body = {
        vehicleRecord: vehicleId,
        serviceType: service,
        createdAt: startTime
    };

    return insert('orders', body);
}

async function saveLabour(orderId, startTime) {
    const body = {
        order: orderId,
        employee: '1',
        startedAt: startTime,
        duration: (new Date() - startTime) / 1000
    };

    return insert('labour_tracking', body);
}

export async function saveReceiverInfo(carInfo, damages, photos, startTime) {
    const vehicleId = await saveVehicle(carInfo, damages, photos);

    const orders = carInfo.servicesOrdered.map(service => saveOrder(vehicleId, service, startTime));
    const orderIds = await Promise.all(orders);

    const labours = orderIds.map(id => saveLabour(id, startTime));
    return await Promise.all(labours);

}

export function completeJob(orderId, servicesSubtypes, startTime) {
    let order = {
        completedAt: new Date(),
    };
    if (servicesSubtypes.length) {
        order.serviceSubtypesActual = servicesSubtypes
    }
    const labour = {
        order: orderId,
        employee: '2',
        startedAt: startTime,
        duration: (new Date() - startTime) / 1000
    };
    return update('orders', orderId, order).then(() => {
        insert('labour_tracking', labour);
    });
}
