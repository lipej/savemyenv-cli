import fetch from "cross-fetch";
import { SERVER_URI } from "../config";

export async function auth(key: string) {
  try {
    const response = await fetch(SERVER_URI + "auth", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + key,
      },
    });
    return JSON.stringify(response.body);
  } catch (e) {
    throw e;
  }
}
