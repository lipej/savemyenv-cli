export const USER_DIR = <string>(
  process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
);
export const APP_FOLDER = ".savemyenv";
export const SECRET_FILE = ".secret";
export const CONFIG_FILE = ".config";
export const ENV_FILE = ".env";
export const PACKAGE_FILE = "package.json";
export const APP_VERSION = require("../../package.json").version;
