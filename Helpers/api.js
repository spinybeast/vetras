import {insert, search, searchAll} from "./elastic";

export const API_URL = 'https://partsapi.ru/api.php';

export async function login({login, password}) {
    const users = [
        {
            role: 'receiver',
            login: '1',
            password: '1'
        },
        {
            role: 'technician',
            login: '2',
            password: '2'
        }
    ];
    return await new Promise((resolve, reject) => {
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
    return fetch(API_URL + '?act=VINdecode&vin=' + VIN + '&lang=en&key=test')
        .then(res => res.json())
        .then(res => res.vehicleDetails)
}

export function getPrincipals() {
    return searchAll('principals', 'principal');
}

export function getServices() {
    return searchAll('services', 'service');
}

export function getOrders(selectedServices) {
    const query = {
        match_all: {}
    };
    return search('orders', null, query);
}

export function getVehicles(ids) {
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
        damages: Object.keys(damages).map(key => ({
            part: damages[key].area,
            type: damages[key].type,
            degree: damages[key].value,
            photos: damages[key].photo ? [damages[key].photo] : []
        })),
        photos: photos,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: carInfo.servicesOrdered.length > 0 ? 'In Service' : 'Ready'
    };

    return insert('vehicles', body);
}

async function saveOrder(vehicleId, carInfo, startTime) {
    const body = {
        vehicleRecord: vehicleId,
        serviceType: carInfo.servicesOrdered,
        createdAt: startTime,
        serviceSubtypesActual: [],
        completedAt: new Date()
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
    const orderId = await saveOrder(vehicleId, carInfo, startTime);
    return saveLabour(orderId, startTime);
}
