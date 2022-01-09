import fetch from "cross-fetch";
import { SERVER_URI } from "../../../config";
import { User } from "../../../types";

export async function register({ usr, pass, mail }: User) {
  try {
    const response = await fetch(SERVER_URI + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usr,
        pass,
        mail,
      }),
    }).then((response) => response.status);

    if (response !== 201) {
      throw new Error(
        "Registration failed, maybe someone already has this username"
      );
    }
  } catch (e) {
    throw e;
  }
}
