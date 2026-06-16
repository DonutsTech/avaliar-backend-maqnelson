import { unlink, writeFile } from "fs/promises";

export async function uploadFile(file: Express.Multer.File, path: string) {
  await writeFile(path, file.buffer);
}

export async function deleteFile(path: string) {
  await unlink(path);
}
