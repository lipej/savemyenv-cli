import fs from "fs";
import path from "path";
import {
  APP_FOLDER,
  CONFIG_FILE,
  ENV_FILE,
  PACKAGE_FILE,
  USER_DIR,
} from "../../config/app";

export function readPackage() {
  try {
    return fs.readFileSync(path.join(process.cwd(), PACKAGE_FILE), "utf8");
  } catch (error: any) {
    if (error.code === "ENOENT")
      throw new Error("Couldn't locate package.json");
  }
}

export function readEnv() {
  try {
    return fs.readFileSync(path.join(process.cwd(), ENV_FILE)).toString();
  } catch (error: any) {
    if (error.code === "ENOENT")
      throw new Error("Couldn't locate package.json");
  }
}

export function readConfig() {
  return fs
    .readFileSync(path.join(USER_DIR, APP_FOLDER, CONFIG_FILE))
    .toString();
}
