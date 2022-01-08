import fs from "fs";
import path from "path";
import fetch from "cross-fetch";
import { SERVER_URI } from "../../config";
import { PartialDbData, PartialPackageJSON } from "../../types";

export async function getEnv(key: string, appName: string) {
  try {
    const response = await fetch(SERVER_URI + "/app/" + appName, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + key,
      },
    });
    return JSON.stringify(response.body);
  } catch (e) {
    throw e;
  }
}

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
  return fs.readFileSync(path.join(__dirname, "config", ".secret")).toString();
}

export function getSecret(config: string) {
  const data = <PartialDbData>JSON.parse(config);

  return data.dbSecret;
}
