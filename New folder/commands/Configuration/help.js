const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const emote = require("../../config/emotes.json");
const discord = require("discord.js");
const ms = require('parse-ms');
require('discord-reply');
const client = new discord.Client();

const adminCommands = `
   > \`a\` - add
   > \`r\` - remove
   > \`ra\` - removeall`;
const economyCommands = `
 > \`b\` - beg
   > \`w\` - work
   > \`bal\` - balance
   > \`l\` - leaderboard`;
const miscellaneousCommands = `
   > \`h\` - help
   > \`p\` - ping`; 

const commands = `
>  Type \`!help <category>\`for more information.
>  \`:\` \`economy\`
>  \`:\` \`gambling\`
>  \`:\` \`admin\`
>  \`:\` \`misc\`
`;

function displayAdminCommands() {
    return new MessageEmbed()
        .setColor("WHITE")
        .addField("Admin", `${adminCommands}`, true);
}

function displayEconomyCommands() {
    return new MessageEmbed()
        .setColor("WHITE")
        .addField("Economy", `${economyCommands}`, true);
}

function displayMiscellaneousCommands() {
    return new MessageEmbed()
        .setColor("WHITE")
        .addField("Miscellaneous", `${miscellaneousCommands}`, true);
}

module.exports = {
    name: "help",
    category: "economy",
    description: "Shows all Commands",
    aliases: ["h", "cmds", "commands"],
    usage: "help",

    run: async (bot, message, args) => {
        let helpEmbed;
        const category = args[0];

        if (!category) {
            helpEmbed = new MessageEmbed()
                .setTitle('Help Menu')
                .setColor("WHITE")
                .addField("Prefix", `\`!\``, true)
                .addField("Bugs", `<#1186176165266870272>`, true)
                .addField("Commands", `${commands}`, false);
        } else if (category.toLowerCase() === "economy") {
            helpEmbed = displayEconomyCommands();
        } else if (category.toLowerCase() === "admin") {
            helpEmbed = displayAdminCommands();
        } else if (category.toLowerCase() === "miscellaneous" || category.toLowerCase() === "misc") {
            helpEmbed = displayMiscellaneousCommands();
        } else {
            helpEmbed = new MessageEmbed()
                .setTitle('Error')
                .setColor("WHITE")
                .setDescription("Invalid category");
        }

        message.lineReplyNoMention(helpEmbed);
    }
}