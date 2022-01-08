import fs from "fs";
import path from "path";
import { APP_FOLDER, SECRET_FILE, USER_DIR } from "../../config/app";
import { AuthResponse, PartialPackageJSON } from "../../types";

export function getAppName(packageFile: string) {
  try {
    const packageParsed = <PartialPackageJSON>JSON.parse(packageFile);
    const appName = packageParsed.name;

    if (!appName) throw new Error("Verify if package.json has key 'name'");

    return appName;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function getKey() {
  return fs
    .readFileSync(path.join(USER_DIR, APP_FOLDER, SECRET_FILE))
    .toString();
}

export function getSecret(config: string) {
  const data = <AuthResponse>JSON.parse(config);

  return data.dbSecret;
}
