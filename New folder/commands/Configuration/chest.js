const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const emote = require("../../config/emotes.json");
const discord = require("discord.js");
const ms = require('parse-ms');
require('discord-reply');
const client = new discord.Client();


module.exports = {
  name: "chestaa",
  category: "economy",
  description: "Open a chest and get a random amount of credits",
  aliases: ["c"],
  usage: "chest",

  run: async (bot, message, args) => {
    const roleID = '1195876348288315402';

    if (message.member.roles.cache.has(roleID)) {
      let errorEmbed = new MessageEmbed()
        .setTitle(`Error`)
        .setColor("WHITE")
        .setDescription(`> You are blacklisted from using this command.\n> If you believe this is a mistake, please open a ticket in <#1186176165266870272>`);
      return message.channel.send(errorEmbed);
    }

    // Get the user's balance
    const bal = db.fetch(`money_${message.author.id}`);

    // Send the "Opening chest!" embed and store the message object
    const chestMessage = await message.channel.send(new MessageEmbed()
      .setTitle('Opening Chest')
      .setColor('WHITE')
    );

    setTimeout(() => {
      // Generate a random amount of credits to add to the user's balance
      const randomCredits = Math.floor(Math.random() * 100) + 1;

      // Add the random amount of credits to the user's balance
      db.add(`money_${message.author.id}`, randomCredits)
      const newBal = db.fetch(`money_${message.author.id}`)

      let chestEmbed = new MessageEmbed()
        .setColor("WHITE")
        .addField('Result', `> __${randomCredits}__ Credits`)
        .addField('Balance', `> __${newBal}__ Credits`);
      message.lineReplyNoMention(chestEmbed)

      // Delete the "Opening chest!" embed after a delay
      chestMessage.delete({ timeout: 0 });
    }, 2000);
  }
};
