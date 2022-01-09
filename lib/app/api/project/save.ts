import fetch from "cross-fetch";
import { SERVER_URI } from "../../../config";

export async function saveEnv(key: string, appName: string, env: string) {
  try {
    const response = await fetch(SERVER_URI + "/app/" + appName, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ envData: env }),
    }).then(async (response) => ({
      code: response.status,
    }));

    if (response.code !== 200) {
      if (response.code === 401) {
        throw new Error("Auth failed, maybe you entered wrong token");
      }
      throw new Error("BAD_REQUEST");
    }
  } catch (e) {
    throw e;
  }
}
