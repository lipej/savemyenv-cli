import fetch from "cross-fetch";
import { SERVER_URI } from "../../../config";
import { AuthResponse } from "../../../types";

export async function auth(key: string) {
  try {
    const response = await fetch(SERVER_URI + "/verify", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

    return response as AuthResponse;
  } catch (e) {
    throw e;
  }
}
