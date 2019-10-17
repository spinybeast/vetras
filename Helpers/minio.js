import AWS from "aws-sdk";
import {MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_URL} from "../constants";

const minioClient = new AWS.S3({
    accessKeyId: MINIO_ACCESS_KEY,
    secretAccessKey: MINIO_SECRET_KEY,
    endpoint: MINIO_URL,
    s3ForcePathStyle: true,
    signatureVersion: "v4"
});

export async function uploadPhotos(photos, key) {
    const promises = photos.map((uri, index) => uploadPhoto(uri, key + '-' + index));
    return await Promise.all(promises);
}

export async function uploadPhoto(uri, key) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const signedUrl = await minioClient.getSignedUrl('putObject', {
        Bucket: "images",
        ContentType: "image/jpeg",
        Key: key + '.jpg',
    });

    return fetch(signedUrl, {
        method: 'PUT',
        body: blob
    })
        .then(res => key + '.jpg')
        .catch(e => console.log('e', e))
}
