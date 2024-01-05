import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'eu-central-1',
});

export const UserImageLists = async (bucketName, Prefix, userId) => {
  const params = {
    Bucket: bucketName,
    Prefix: Prefix,
  };

  const s3Objects = await s3.send(new ListObjectsV2Command(params));

  if (s3Objects.Contents.length > 0) {
    const files = s3Objects.Contents.map((obj) => ({
      key: obj.Key,
      lastModified: obj.LastModified,
    }));
    return files;
  } else {
    // Handle the case where no objects were found for the given userId.
    return {
      success: false,
      message: 'No images found for the specified userId.',
    };
  }
};
/* 
export const getMovieUserImages = async (objectKey) => {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: objectKey,
  });

  const response = await s3.send(command);

  return response;
}; */

export const addUserImages = async (fileContent, fileName) => {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: `original-images/${fileName}`,
    Body: fileContent,
  });

  const response = await s3.send(command);

  return response;
};
