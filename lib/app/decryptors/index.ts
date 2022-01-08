export function decryptEnv(envEncrypted: string, secret: string) {
  const fileDecrypted = CryptoJS.AES.decrypt(envEncrypted, secret);
  return fileDecrypted.toString(CryptoJS.enc.Utf8);
}
