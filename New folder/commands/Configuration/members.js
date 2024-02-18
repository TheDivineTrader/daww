const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const emote = require("../../config/emotes.json");
const discord = require("discord.js");
const ms = require('parse-ms');
require('discord-reply');
const client = new discord.Client();

module.exports = {
    name: "members",
    category: "info",
    description: "Shows the number of online members and offline members",
    aliases: ["mem"],
    usage: "members",

    run: async (bot, message, args) => {
        try {
            const members = await message.guild.members.fetch();
            const onlineMembers = members.filter(member => member.presence.status === 'online').size;
            const offlineMembers = members.filter(member => member.presence.status === 'offline').size;

            const embed = new MessageEmbed()
                .setColor('WHITE')
                .setTitle('Members Information')
                .addFields(
                    { name: 'Online Members', value: onlineMembers, inline: true },
                    { name: 'Offline Members', value: offlineMembers, inline: true }
                )
            message.channel.send(embed);
        } catch (error) {
            console.error(error);
            message.reply('There was an error fetching the members. Please try again later.');
        }
    }
}