import fs from "fs";
import path from "path";
import fetch from "cross-fetch";
import { SERVER_URI } from "../../config";

export async function getEnv(key: string, appName: string) {
  try {
    const response = await fetch(SERVER_URI + "/" + appName, {
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
    const appName = JSON.parse(packageFile).name;

    if (!appName) throw new Error("Verify if package.json has key 'name'");

    return appName;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function getKey() {
  return fs.readFileSync(path.join(__dirname, ".secret")).toString();
}
