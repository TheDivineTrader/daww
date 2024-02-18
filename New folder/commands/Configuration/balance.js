const { MessageEmbed } = require("discord.js");
const discord = require("discord.js");
require('discord-reply');
const client = new discord.Client();
const emote = require("../../config/emotes.json");
const db = require("quick.db");

module.exports = {
    name: "balance",
    aliases: ["bal"],
    category: "economy",
    description: "Shows Current Balance",
    aliases: ["bal"],
    usage: "balance [mention | ID]",
    
  run: async (bot, message, args) => {
    
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    let bal = db.fetch(`money_${user.id}`);

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${user.id}`);

    if (bank === null) bank = 0;
    let Total = bal + bank;
    
    if (user) {
      let moneyEmbed = new MessageEmbed()
      .setTitle(`@${user.user.username}'s balance`)
        .setColor("WHITE")
        .setDescription(
          `__${Total}__ Credits`
        );
      message.lineReplyNoMention(moneyEmbed);
    } else {
      return message.lineReply("__Invalid User__");
    }
  }
};