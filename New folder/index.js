const db = require("quick.db");
const ms = require("ms");
const { default_prefix } = require("./config.json");
const discord = require('discord.js');
require('discord-reply');
const client = new discord.Client();
require('dotenv').config();


client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

//Sets Bot Status
client.on("ready", () => {
  setInterval(() => {
    client.user.setActivity(`.gg/avix`, { type: "WATCHING" });
  }, 1000000); // This will run the setActivity command every 5000 milliseconds (or 5 seconds)
});


client.login(process.env.TOKEN);