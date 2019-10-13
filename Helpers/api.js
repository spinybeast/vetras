const API_URL = 'https://partsapi.ru/api.php';

export function decodeVIN(VIN) {
    return fetch(API_URL + '?act=VINdecode&vin='+VIN+'&lang=en&key=test')
        .then(res => res.json())
        .then(res => res.vehicleDetails)
}
