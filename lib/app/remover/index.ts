import fetch from "cross-fetch";
import { SERVER_URI } from "../../config";

export async function remove(key: string, appName: string) {
  try {
    await fetch(SERVER_URI + "/app/" + appName, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + key,
      },
    });
  } catch (e) {
    throw e;
  }
}
