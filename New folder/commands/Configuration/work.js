const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const emote = require("../../config/emotes.json");
const discord = require("discord.js");
const ms = require('parse-ms');
require('discord-reply');
const client = new discord.Client();

// Add this line to define the work command
const dailyCommand = {
  name: "daily",
  category: "economy",
  description: "Lets the user work to earn credits",
  aliases: ["d"],
  usage: "daily",
};

// Add the work command to the exports object
module.exports = {
  ...dailyCommand,
  run: async (bot, message, args) => {
    const roleID = '1195876348288315402'; 
    const cooldown = 86400000; // 1 day cooldown

    if (message.member.roles.cache.has(roleID)) {
      let errorEmbed = new MessageEmbed()
        .setTitle(`Error`)
        .setColor("WHITE")
        .setDescription(`> You are blacklisted from using this command.\n> If you believe this is a mistake, please open a ticket in <#1186176165266870272>`);
      return message.channel.send(errorEmbed);
    }

    // Get the user's last work time
    let lastDailyTime = await db.get(`lastDailyTime_${message.author.id}`);

    // If the user's last work time is stored
    if (lastDailyTime) {
      // Calculate the time elapsed since then
      let timeElapsed = Date.now() - lastDailyTime;

      // If the time elapsed is less than the cooldown time
      if (timeElapsed < cooldown) {
        // Calculate the remaining time
        let remainingTime = cooldown - timeElapsed;
        let remainingTimeFormatted = ms(remainingTime);

        // Send a message to inform the user of the remaining time
        let cooldownEmbed = new MessageEmbed()
          .setTitle('Cooldown')
          .setColor("WHITE")
          .setDescription(`> You claimed your daily reward already! Come back  <t:${Math.floor((lastDailyTime + cooldown) / 1000)}:R>`);
        return message.lineReplyNoMention(cooldownEmbed);
      }
    }

    // Generate a random amount of credits for the user to earn
    const reward = 1000;

    // Add the credits to the user's account
    db.add(`money_${message.author.id}`, reward);

    // Update the user's last work time
    db.set(`lastDailyTime_${message.author.id}`, Date.now());

    // Send a message to the user letting them know how many credits they earned
    let randomMessages = [
      "You claimed your daily reward of",
    ];
    let dailyEmbed = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`> ${randomMessages[Math.floor(Math.random() * randomMessages.length)]} __${reward}__ credits!`);
    message.lineReplyNoMention(dailyEmbed);
  },
};