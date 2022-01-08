import fs from "fs";
import path from "path";

export function readPackage() {
  try {
    return fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8");
  } catch (error: any) {
    if (error.code === "ENOENT")
      throw new Error("Couldn't locate package.json");
  }
}

export function readEnv() {
  try {
    return fs.readFileSync(path.join(process.cwd(), ".env")).toString();
  } catch (error: any) {
    if (error.code === "ENOENT")
      throw new Error("Couldn't locate package.json");
  }
}
