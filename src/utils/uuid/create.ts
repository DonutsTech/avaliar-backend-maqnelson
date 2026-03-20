import { v4 as uuidv4 } from "uuid";

export async function uuid(): Promise<string> {
  const timestamp = Date.now();
  const uuid = uuidv4();

  return `${timestamp}-${uuid}`;
}
