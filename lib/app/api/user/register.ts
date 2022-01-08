import fetch from "cross-fetch";
import { SERVER_URI } from "../../../config";
import { User } from "../../../types";

export async function register({ usr, pass, mail }: User) {
  try {
    await fetch(SERVER_URI + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usr,
        pass,
        mail,
      }),
    }).catch((err) => {
      throw err;
    });
  } catch (e) {
    throw e;
  }
}
