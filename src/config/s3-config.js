import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'eu-central-1',
});

export const getMovieUserImageLists = async ({ movieId, userId }) => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.BUCKET_NAME,
    Prefix: `assets/${userId}/${movieId}/`,
  });

  const response = await s3Client.send(command);

  return response;
};

export const getMovieUserImages = async (objectKey) => {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: `assets/${objectKey}`,
  });

  const response = await s3Client.send(command);

  return response;
};

export const addMovieUserImages = async (fileContent, fileName) => {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: `assets/${fileName}`,
    Body: fileContent,
  });

  const response = await s3Client.send(command);

  return response;
};
