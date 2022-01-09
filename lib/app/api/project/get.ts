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
    }).then(async (response) => ({
      body: await response.json(),
      code: response.status,
    }));

    if (response.code !== 200) {
      if (response.code === 404) {
        throw new Error("Env not found, for this app");
      }
      if (response.code === 401) {
        throw new Error("Auth failed, maybe you entered wrong token");
      }
      throw new Error("BAD_REQUEST");
    }

    return response.body as EnvResponse;
  } catch (e) {
    throw e;
  }
}
