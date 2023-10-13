import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'eu-central-1',
});

export const UserImageLists = async (bucketName, Prefix) => {
  const params = {
    Bucket: bucketName,
    Prefix: Prefix,
  };

  const response = await s3.send(new ListObjectsV2Command(params));
  const files = response.Contents.map((object) => object.Key);
  return files;
};

export const addUserImages = async (fileContent, fileName) => {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: `original-images/${fileName}`,
    Body: fileContent,
  });

  const response = await s3.send(command);

  return response;
};
