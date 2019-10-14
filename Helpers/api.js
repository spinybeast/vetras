const API_URL = 'https://partsapi.ru/api.php';
const ELASTIC_URL = 'http://vetra.checkmobile.com:9200';

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

export function saveInfo(carInfo, damages, services, photos) {

}
