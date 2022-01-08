import fetch from "cross-fetch";
import { SERVER_URI } from "../../../config";
import { EnvResponse } from "../../../types";

export async function getEnv(key: string, appName: string) {
  try {
    const response = await fetch(SERVER_URI + "/app/" + appName, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + key,
      },
    }).then((response) => response.json());

    return response as EnvResponse;
  } catch (e) {
    throw e;
  }
}
