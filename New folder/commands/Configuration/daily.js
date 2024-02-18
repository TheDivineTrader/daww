const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const emote = require("../../config/emotes.json");
const discord = require("discord.js");
const ms = require('parse-ms');
require('discord-reply');
const client = new discord.Client();

// Add this line to define the work command
const workCommand = {
  name: "work",
  category: "economy",
  description: "Lets the user work to earn credits",
  aliases: ["w"],
  usage: "work",
};

// Add the work command to the exports object
module.exports = {
  ...workCommand,
  run: async (bot, message, args) => {
    const roleID = '1195876348288315402'; 
    const cooldown = 60000; // 1 minute cooldown

    if (message.member.roles.cache.has(roleID)) {
      let errorEmbed = new MessageEmbed()
        .setTitle(`Error`)
        .setColor("WHITE")
        .setDescription(`> You are blacklisted from using this command.\n> If you believe this is a mistake, please open a ticket in <#1186176165266870272>`);
      return message.channel.send(errorEmbed);
    }

    // Get the user's last work time
    let lastWorkTime = await db.get(`lastWorkTime_${message.author.id}`);

    // If the user's last work time is stored
    if (lastWorkTime) {
      // Calculate the time elapsed since then
      let timeElapsed = Date.now() - lastWorkTime;

      // If the time elapsed is less than the cooldown time
      if (timeElapsed < cooldown) {
        // Calculate the remaining time
        let remainingTime = cooldown - timeElapsed;
        let remainingTimeFormatted = ms(remainingTime);

        // Send a message to inform the user of the remaining time
        let cooldownEmbed = new MessageEmbed()
          .setTitle('Cooldown')
          .setColor("WHITE")
          .setDescription(`> You have recently worked! You can work again  <t:${Math.floor((lastWorkTime + cooldown) / 1000)}:R>`);
        return message.lineReplyNoMention(cooldownEmbed);
      }
    }

    // Generate a random amount of credits for the user to earn
    const workReward = Math.floor(Math.random() * 50) + 50;

    // Add the credits to the user's account
    db.add(`money_${message.author.id}`, workReward);

    // Update the user's last work time
    db.set(`lastWorkTime_${message.author.id}`, Date.now());

    // Send a message to the user letting them know how many credits they earned
    let randomMessages = [
      "You spent the day flipping patties and earned",
      "The manager seemed extra joyful today, he gave you",
      "The customers at McDonald's were very pleased, they donated",
      "You got fired from your job, but still earned",
      "Oh, flipping patties all day? Well, here's your trophy of",
      "The manager felt generous – enjoy the final payment of",
      "The customers were (suprisingly) pleased, they gave you a tip of",
      "Fired, but consolation prize? A sum of",
      "Patty flipping pays off – here's your cut of",
      "McDonald's renamed a meal after you! You get a cut of",
      "Patty flipping Olympian? Here's your gold medal of"
    ];
    let workEmbed = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`> ${randomMessages[Math.floor(Math.random() * randomMessages.length)]} __${workReward}__ credits!`);
    message.lineReplyNoMention(workEmbed);
  },
};