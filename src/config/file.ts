import { unlink, writeFile } from "fs/promises";

export async function uploadFile(file: Express.Multer.File, path: string) {
  console.log('uploading file to path:', path);
  console.log('file buffer length:', file);
  await writeFile(path, file.buffer);
}

export async function deleteFile(path: string) {
  await unlink(path);
}
