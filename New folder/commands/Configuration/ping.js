const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const emote = require("../../config/emotes.json");
const discord = require("discord.js");
const ms = require('parse-ms');
require('discord-reply');
const client = new discord.Client();

module.exports = {
    name: "ping",
    category: "economy",
    description: "Replies with a message showing the reaction time.",
    aliases: ["p"],
    usage: "ping",

    run: async (bot, message, args) => {

        let ping = Date.now() - message.createdTimestamp;

        // Store the current reaction time in the database
        db.set(`currentReactionTime_${message.author.id}`, ping);

        // Retrieve the last stored reaction time
        let lastReactionTime = db.get(`lastReactionTime_${message.author.id}`);

        // Update the last reaction time with the current reaction time
        db.set(`lastReactionTime_${message.author.id}`, ping);

        // Calculate the average between the two reaction times
        let average = Math.round((ping + lastReactionTime) / 2);

        let helpEmbed = new MessageEmbed()
       .setTitle("Pong")
       .setColor("WHITE")
       .addField("Reaction", `__${ping}__ ms`, true)
       .addField("Last Reaction", `__${lastReactionTime}__ ms`, true)
       .addField("Average", `__${average}__ ms`, true);
        message.lineReplyNoMention(helpEmbed)

    }
}