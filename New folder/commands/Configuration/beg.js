const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const emote = require("../../config/emotes.json");
const discord = require("discord.js");
const ms = require('parse-ms');
require('discord-reply');
const client = new discord.Client();

// Add this line to define the beg command
const begCommand = {
  name: "beg",
  category: "economy",
  description: "Lets the user beg to earn credits",
  aliases: ["b"],
  usage: "beg",
};

// Add the beg command to the exports object
module.exports = {
  ...begCommand,
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

    // Get the user's last beg time
    let lastBegTime = await db.get(`lastBegTime_${message.author.id}`);

    // If the user's last beg time is stored
    if (lastBegTime) {
      // Calculate the time elapsed since then
      let timeElapsed = Date.now() - lastBegTime;

      // If the time elapsed is less than the cooldown time
      if (timeElapsed < cooldown) {
        // Calculate the remaining time
        let remainingTime = cooldown - timeElapsed;
        let remainingTimeFormatted = ms(remainingTime);

        // Send a message to inform the user of the remaining time
        let cooldownEmbed = new MessageEmbed()
          .setTitle('Cooldown')
          .setColor("WHITE")
          .setDescription(`> You have recently begged! You can beg again  <t:${Math.floor((lastBegTime + cooldown) / 1000)}:R>`);
        return message.lineReplyNoMention(cooldownEmbed);
      }
    }

    // Generate a random amount of credits for the user to earn
    const begReward = Math.floor(Math.random() * 50) + 50;

    // Add the credits to the user's account
    db.add(`money_${message.author.id}`, begReward);

    // Update the user's last beg time
    db.set(`lastBegTime_${message.author.id}`, Date.now());

    // Send a message to the user letting them know how many credits they earned
    let randomMessages = [
      "Someone actually felt sorry for you and gave you",
      "A random dude caved in to your whining, here's",
      "A generous soul decided to give you",
      "I guess this is your job now, here's",
      "Looks like your talent for convincing people you're in need got you",
      "Surprisingly, your dramatic skills paid off, and now you've got",
      "A sympathetic soul fell for your act and sent you",
      "You've mastered the art of getting people to hand you",
      "Guess what? Your sob story worked again, and now you've got",
      "Someone must've thought you were running low on pity, so here's",
      "In the world of professional beggars, you just landed a promotion—enjoy",
      "Your whining game is on point; here's another token of sympathy for you",
      "Breaking news: Another victim succumbed to your plea, resulting in",
    ];
    let begEmbed = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`> ${randomMessages[Math.floor(Math.random() * randomMessages.length)]} __${begReward}__ credits!`);
    message.lineReplyNoMention(begEmbed);
  },
};