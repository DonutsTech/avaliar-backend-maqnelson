import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

console.log('S3 Client initialized with region:', process.env.AWS_REGION);
console.log(
  'S3 Client initialized with accessKeyId:',
  process.env.AWS_ACCESS_KEY_ID ? '****' : 'Not Set',
);
console.log(
  'S3 Client initialized with secretAccessKey:',
  process.env.AWS_SECRET_ACCESS_KEY ? '****' : 'Not Set',
);

function extractKeyFromUrl(url: string): string {
  const urlObject = new URL(url);
  return urlObject.pathname.substring(1);
}

function getFolderByMimeType(mimetype: string) {
  if (mimetype.startsWith('image/')) {
    return 'photo';
  }

  if (mimetype.startsWith('video/')) {
    return 'video';
  }

  return 'document';
}

export async function deleteFileFromS3(url: string): Promise<void> {
  const fileKey = extractKeyFromUrl(url);

  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: fileKey,
  });

  await s3.send(command);
}

export async function uploadFileToS3(
  file: Express.Multer.File,
): Promise<string> {
  try {
    const comand = new Upload({
      client: s3,
      params: {
        Bucket: process.env.BUCKET_NAME!,
        Key: `${getFolderByMimeType(file.mimetype)}/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    const result = await comand.done();

    return result.Location || '';
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
}
