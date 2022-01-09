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
    }).then(async (response) => ({
      body: await response.json(),
      code: response.status,
    }));

    if (response.code !== 200) {
      throw new Error("Auth failed, maybe you entered wrong token");
    }

    return response.body as AuthResponse;
  } catch (e) {
    throw e;
  }
}
