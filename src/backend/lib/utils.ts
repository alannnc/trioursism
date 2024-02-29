import { Principal, blob } from "azle";

export function padPrincipalWithZeros(blob: blob): blob {
  let newUin8Array = new Uint8Array(32);
  newUin8Array.set(blob);
  return newUin8Array;
}

export function generateId(): Principal {
  const randomBytes = new Array(29)
    .fill(0)
    .map((_) => Math.floor(Math.random() * 256));

  return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
