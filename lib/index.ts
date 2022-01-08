import { Command } from "commander";
import { auth } from "./app";
import { decryptEnv } from "./app/decryptors";
import { encryptEnv } from "./app/encryptors";
import { getAppName, getKey, getEnv, getSecret } from "./app/getters";
import { readConfig, readEnv, readPackage } from "./app/readers";
import { remove } from "./app/remover";
import { saveEnv } from "./app/savers";
import { writeConfig, writeEnv, writeKey } from "./app/writters";
const VERSION = require("../package.json").version;

const program = new Command();

program.version(VERSION);

program
  .command("auth")
  .argument("<key>", "provide you auth key from Save My ENV")
  .action(async (key) => {
    try {
      const configuration = await auth(key);
      writeConfig(configuration);
      writeKey(key);
      console.info("successfully authenticated");
    } catch (err) {
      console.error(err);
    }
  });

program
  .command("getEnv", "get your env from Save My ENV server")
  .argument("<localPass>", "local pass provided when env was uploaded")
  .action(async (localPass) => {
    try {
      const key = getKey();
      const packageFile = readPackage();
      const secret = getSecret(readConfig());

      if (packageFile) {
        const appName = getAppName(packageFile);
        const envEncrypted = await getEnv(key, appName);

        const env = decryptEnv(envEncrypted, secret + localPass);

        writeEnv(env);
      }

      console.info(".env successfully written");
    } catch (e) {
      console.log(e);
    }
  });

program
  .command("saveEnv", "save your env to Save My ENV server")
  .argument("<localPass>", "local pass provided when env was uploaded")
  .action(async (localPass) => {
    try {
      const key = getKey();
      const secret = getSecret(readConfig());
      const packageFile = readPackage();

      if (packageFile) {
        const appName = getAppName(packageFile);
        const env = readEnv();

        if (env) {
          const envEncrypted = encryptEnv(env, secret + localPass);

          await saveEnv(key, appName, envEncrypted);
        }
      }

      console.info(".env successfully send to the cloud");
    } catch (e) {
      console.log(e);
    }
  });

program
  .command("remove", "remove your env from Save My ENV cloud server")
  .action(async () => {
    try {
      const key = getKey();
      const packageFile = readPackage();

      if (packageFile) {
        const appName = getAppName(packageFile);

        await remove(key, appName);
      }

      console.info(".env successfully deleted from cloud");
    } catch (e) {
      console.log(e);
    }
  });

program.parse();

export default program;
