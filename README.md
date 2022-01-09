# savemyenv-cli

Save My ENV is a nodejs CLI application to backup yours environment variables in the cloud.

To use this application you need to install it globally in your machine.

Just follow the instructions below:

<br>
<br>

### Installation

```bash
npm i -g savemyenv-cli
```

---

### Registration

```bash
savemyenv signup <user> <pass> <email>
```

`NOTE`: If your password special caracteres (and we recomend you use) just add with inside double quotes.

---

### Getting your auth token

```bash
savemyenv signin <user> <pass>
```

`NOTE`: This token need to be updated every 30 days.

---

### Save your token

```bash
savemyenv token <token>
```

`NOTE`: Everytime you refresh your token, save it again.

When you save your auth token, your permanent token will be saved in your computer to combine with you local secret and encrypt your `.env` before it go to the cloud.

---

### Backup env

You can backup every `.env` locate in a project that has a `package.json` inside it.

Just go to the project directory and run:

```bash
savemyenv backup <local_secret>
```

`NOTE`: Local secret is need and improve your security, your env is encrypt with the permanent token saved in the cloud and your local token, only you can decripty your env files.

---

### Sync env

To Sync your `.env` just go to a project you already have created a backup before and run:

```bash
savemyenv sync <local_secret>
```

`NOTE`: Your .env will only decrypt if you enter the same local secret passed in you made the backup.

---

### Delete backup

To delete cloud backup of an project you just need to run:

```bash
savemyenv remove
```

---

## Run in your own server

If you want to run a personal server, clone and follow the `savemyenv-server` readme. Then just clone this project, edit SERVER_URI constant in `config/server.ts` and install it global running:

```bash
npm i -g .
```
