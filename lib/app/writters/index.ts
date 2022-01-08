import path from "path";
import fs from "fs";
import { AuthResponse } from "../../types";
import {
  APP_FOLDER,
  CONFIG_FILE,
  SECRET_FILE,
  USER_DIR,
} from "../../config/app";

export function writeEnv(envFile: string) {
  return fs.writeFileSync(path.join(process.cwd(), ".env"), envFile);
}

export function writeConfig(configFile: AuthResponse) {
  fs.writeFileSync(
    path.join(USER_DIR, APP_FOLDER, CONFIG_FILE),
    JSON.stringify(configFile)
  );
}

export function writeKey(key: string) {
  fs.writeFileSync(path.join(USER_DIR, APP_FOLDER, SECRET_FILE), key);
}
