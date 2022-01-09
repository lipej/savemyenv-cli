import fetch from "cross-fetch";
import { SERVER_URI } from "../../../config";
import { TokenResponse, UserLogin } from "../../../types";

export async function login({ usr, pass }: UserLogin) {
  try {
    const response = await fetch(SERVER_URI + "/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usr,
        pass,
      }),
    }).then(async (response) => ({
      body: await response.json(),
      code: response.status,
    }));

    if (response.code !== 200) {
      throw new Error("Login failed, maybe you entered wrong credentials");
    }

    return response.body as TokenResponse;
  } catch (e) {
    throw e;
  }
}
