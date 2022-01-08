import { Command } from "commander";
import { auth } from "./app";
import { getAppName, getKey, getEnv } from "./app/getters";
import { readPackage } from "./app/readers";
import { writeConfig, writeEnv, writeKey } from "./app/writters";
const VERSION = require("../package.json").version;

const program = new Command();

program.version(VERSION);

program
  .command("auth")
  .argument("<key>", "provide you auth key")
  .action(async (key) => {
    try {
      const configuration = await auth(key);
      writeConfig(configuration);
      writeKey(key);
      console.info("Auth made sucessfully");
    } catch (err) {
      console.error(err);
    }
  });

program
  .command("getEnv")
  .argument("<localPass>", "local pass provided when env was uploaded")
  .action(async (localPass) => {
    try {
      const key = getKey();
      const packageFile = readPackage();

      if (packageFile) {
        const appName = getAppName(packageFile);
        const env = await getEnv(key, appName);

        writeEnv(env);
      }

      console.info("Env sucessfully write");
    } catch (e) {
      console.log(e);
    }
  });

program.parse();
