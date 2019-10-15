import AWS from "aws-sdk";

const minioClient = new AWS.S3({
    accessKeyId: "340JFURPWTAVEF1FEHIX",
    secretAccessKey: "cQ6KGzPE42nqu6dzpJpvULuWqykOn5xGzlo1AlYQ",
    endpoint: "vetra.logimove.com:9000",
    s3ForcePathStyle: true,
    signatureVersion: "v4"
});

export function uploadImage(url) {
    const fileName = url.replace(/^.*[\\\/]/, '');
    const albumPhotosKey = "images//";

    const photoKey = albumPhotosKey + fileName;

    // Use S3 ManagedUpload class as it supports multipart uploads
    const upload = new AWS.S3.ManagedUpload({
        credentials: {accessKeyId: "340JFURPWTAVEF1FEHIX",
            secretAccessKey: "cQ6KGzPE42nqu6dzpJpvULuWqykOn5xGzlo1AlYQ",
            endpoint: "vetra.logimove.com:9000",
            s3ForcePathStyle: true,
            signatureVersion: "v4",},
        params: {
            Bucket: 'images',
            Key: photoKey,
            Body: url,
            ACL: "public-read"
        }
    });

    const promise = upload.promise();

    promise.then(
        function(data) {
            console.log("Successfully uploaded photo.");
        },
        function(err) {
            console.log("There was an error uploading your photo: ", err.message);
        }
    );
}

export function getImage(id) {

}

