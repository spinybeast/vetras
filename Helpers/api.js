import { uploadImage } from './minio';
import Appbase from 'appbase-js';

export const API_URL = 'https://partsapi.ru/api.php';
export const ELASTIC_URL = 'http://vetra.checkmobile.com:9200';

export async function login({login, password}) {
    const [correctLogin, correctPassword] = ['1', '1'];
    return await new Promise((resolve, reject) => {
        if (login === correctLogin && password === correctPassword) {
            setTimeout(() => resolve(true), 500)
        } else {
            setTimeout(() => resolve(false), 500)
        }
    });
}

export function decodeVIN(VIN) {
    return fetch(API_URL + '?act=VINdecode&vin='+VIN+'&lang=en&key=test')
        .then(res => res.json())
        .then(res => res.vehicleDetails)
}
export function search() {
    const client = Appbase({
        url: ELASTIC_URL,
        app: 'labour_tracking'
    });
    client
        .search({
            body: {
                query: {
                    match_all: {},
                },
            },
        })
        .then(function(res) {
            console.log('query result: ', res);
        })
        .catch(function(err) {
            console.log('search error: ', err);
        });
}
async function saveVehicle(carInfo, damages, services, photos) {
    const client = Appbase({
        url: ELASTIC_URL,
        app: 'vehicles'
    });

    const body = {
        ...carInfo,
        damages: Object.keys(damages).map(key => ({
            type: damages[key].type,
            degree: damages[key].value,
            photos: damages[key].photo ? [damages[key].photo] : []
        })),
        servicesOrdered: services,
        photos: photos,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "new"
    };

    return client.index({type: "_doc", body})
        .then(res => res._id)
        .catch(err => {
            console.log(body, err);
        });
}

async function saveOrder(vehicleId) {
    const client = Appbase({
        url: ELASTIC_URL,
        app: 'orders'
    });

    const body = {
        vehicleRecord: vehicleId,
        serviceType: '',
        createdAt: new Date(),
        serviceSubtypesActual: [],
        completedAt: new Date()
    };

    return client.index({type: "_doc", body})
        .then(res => res._id)
        .catch(err => {
            console.log(body, err);
        });
}

async function saveLabour(orderId) {
    const client = Appbase({
        url: ELASTIC_URL,
        app: 'labour_tracking'
    });

    const body = {
        order: orderId,
        employee: '1',
        startedAt: new Date(),
        duration:  20
    };

    return client.index({type: "_doc", body})
        .then(res => res._id)
        .catch(err => {
            console.log(body, err);
        });
}

export async function saveReceiverInfo(carInfo, damages, services, photos) {
    const vehicleId = await saveVehicle(carInfo, damages, services, photos);
    const orderId = await saveOrder(vehicleId);
    return saveLabour(orderId);
}
