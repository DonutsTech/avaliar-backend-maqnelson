import crypto from 'crypto';

export async function uuid(): Promise<string> {
  const timestamp = Date.now();
  const uuid = crypto.randomUUID();

  return `${timestamp}-${uuid}`;
}
