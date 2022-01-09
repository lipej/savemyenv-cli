import fs from "fs";
import path from "path";
import { Command } from "commander";
import { auth, getEnv, login, saveEnv } from "../app/api";
import { register } from "../app/api/user/register";
import { decryptEnv } from "../app/decryptors";
import { encryptEnv } from "../app/encryptors";
import { getAppName, getKey, getSecret } from "../app/getters";
import { readConfig, readEnv, readPackage } from "../app/readers";
import { remove } from "../app/remover";
import { writeConfig, writeEnv, writeKey } from "../app/writters";
import { APP_FOLDER, USER_DIR, APP_VERSION } from "../config/app";

const program = new Command();

program.version(APP_VERSION);

program
  .command("register")
  .description("register a new account")
  .argument("<usr>", "choose your username")
  .argument("<pass>", "choose your password")
  .argument("<mail>", "your email")
  .action(async (usr, pass, mail) => {
    try {
      await register({ usr, pass, mail });

      console.log(`Registered successfully, your username is ${usr}`);
    } catch (err) {
      console.error(err);
    }
  });

program
  .command("signin")
  .description("sign-in and get app token")
  .argument("<usr>", "your username")
  .argument("<pass>", "your password")
  .action(async (usr, pass) => {
    try {
      const data = await login({ usr, pass });
      console.info(`successfully login, your token => ${data.authToken}`);
    } catch (err) {
      console.error(err);
    }
  });

program
  .command("token")
  .argument("<token>", "set your auth token from Save My ENV")
  .action(async (token) => {
    try {
      const configuration = await auth(token);

      if (!fs.existsSync(path.join(USER_DIR, APP_FOLDER))) {
        fs.mkdirSync(path.join(USER_DIR, APP_FOLDER));
      }

      writeConfig(configuration);
      writeKey(token);
      console.info("token successfully authenticated");
    } catch (err) {
      console.error(err);
    }
  });

program
  .command("sync")
  .description("get your env from Save My ENV server")
  .argument("<localPass>", "local pass provided when env was uploaded")
  .action(async (localPass) => {
    try {
      const packageFile = readPackage();
      const key = getKey();
      const secret = getSecret(readConfig());

      if (packageFile) {
        const appName = getAppName(packageFile);
        const data = await getEnv(key, appName);
        console.log(data);
        const env = decryptEnv(data.envData, secret + localPass);

        writeEnv(env);
      }

      console.info(".env successfully written");
    } catch (e) {
      console.log(e);
    }
  });

program
  .command("backup")
  .description("save your env to Save My ENV server")
  .argument("<localPass>", "local pass provided when env was uploaded")
  .action(async (localPass) => {
    try {
      const packageFile = readPackage();
      const key = getKey();
      const secret = getSecret(readConfig());

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
  .command("remove")
  .description("remove your env from Save My ENV cloud server")
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
