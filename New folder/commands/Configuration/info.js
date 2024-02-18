const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const emote = require("../../config/emotes.json");
const discord = require("discord.js");
const ms = require('parse-ms');
require('discord-reply');
const client = new discord.Client();

module.exports = {
        name: "info",
        category: "economy",
        description: "Shows all Commands",
        aliases: ["i"],
        usage: "info",
        
    run: async (bot, message, args) => {
      const embed = new MessageEmbed()
       .setColor('WHITE')
       .setTitle('Server Information')
       .addFields(
          { name: 'Server Name', value: message.guild.name, inline: true },
          { name: 'Owner', value: message.guild.owner.user, inline: true },
          { name: 'Members', value: message.guild.memberCount, inline: true },
          { name: 'Boosts', value: message.guild.premiumSubscriptionCount, inline: true },
          { name: 'Roles', value: message.guild.roles.cache.size, inline: true },
          { name: 'Channels', value: message.guild.channels.cache.size, inline: true },
          { name: 'Emojis', value: message.guild.emojis.cache.size, inline: true }
       )
      message.channel.send(embed);

    }
}