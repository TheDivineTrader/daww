const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const emote = require("../../config/emotes.json");
const discord = require("discord.js");
const ms = require('parse-ms');
require('discord-reply');
const client = new discord.Client();


module.exports = {
        name: "add",
        category: "economy",
        description: "Adds Credits",
        aliases: ["a"],
        usage: "add [mention | ID]",

    run: async (bot, message, args) => {

      const roleID = '1188281883004506242'; 

      if (!message.member.roles.cache.has(roleID)) {
        let errorEmbed = new MessageEmbed()
          .setTitle(`Error`)
            .setColor("WHITE")
            .setDescription(`> You require the <@&${roleID}> role to execute this command.`);
       return message.channel.send(errorEmbed);
      }
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("__Invalid User__")
        if (!args[1]) return message.channel.send("__Invalid Amount__")
        if (isNaN(args[1])) return message.channel.send(`__Invalid Amount__`);
        if (args[1] > 10000) return message.channel.send(`__Maximum Amount Exceeded__`);
        db.add(`money_${user.id}`, args[1])
        let bal = db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setTitle('Added Credits')
            .setColor("WHITE")
            .addField('Added', `> __${args[1]}__ Credits `, true)
            .addField('Balance', `> __${bal}__ Credits `, true)
            .addField('\u200B', '\u200B', true)
            .addField('Added To', `> ${user}`, true)
            .addField('Added By', `> ${message.author.toString()}`, true)
            .addField('\u200B', '\u200B', true);
        message.lineReplyNoMention(moneyEmbed)
      

    }
}