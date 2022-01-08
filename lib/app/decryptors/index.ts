import CryptoJS from "crypto-js";
import { EnvResponse } from "../../types";

export function decryptEnv(env: string, secret: string) {
  const fileDecrypted = CryptoJS.AES.decrypt(env, secret);
  return fileDecrypted.toString(CryptoJS.enc.Utf8);
}
