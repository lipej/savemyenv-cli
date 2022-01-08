import path from "path";
import fs from "fs";

export function writeEnv(envFile: string) {
  return fs.writeFileSync(path.join(process.cwd(), ".env"), envFile);
}

export function writeConfig(configFile: string) {
  fs.writeFileSync(path.join(__dirname, "config", "config.json"), configFile);
}

export function writeKey(key: string) {
  return fs.writeFileSync(path.join(__dirname, "config", ".secret"), key);
}
