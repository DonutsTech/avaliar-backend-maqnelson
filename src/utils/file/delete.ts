import fs from 'fs';

export async function deleteFile(path: string) {
  try {
    fs.unlinkSync(path);
    console.log(`Temporary file deleted: ${path}`);
  } catch (cleanupError) {
    console.warn(`Failed to delete temp file: ${path}`, cleanupError);
  }
}
