import CryptoJS from "crypto-js";

export function encryptEnv(envFile: string, secret: string) {
  return CryptoJS.AES.encrypt(envFile, "secret key 123").toString();
}
