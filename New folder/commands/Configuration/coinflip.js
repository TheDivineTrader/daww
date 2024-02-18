const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const emote = require("../../config/emotes.json");
const discord = require("discord.js");
const ms = require('parse-ms');
require('discord-reply');
const client = new discord.Client();


module.exports = {
  name: "coinflip",
  category: "economy",
  description: "Bet Credits on a Coinflip",
  aliases: ["cf"],
  usage: "coinflip [heads/tails] [amount]",

  run: async (bot, message, args) => {
    const roleID = '1195876348288315402';

    if (message.member.roles.cache.has(roleID)) {
      let errorEmbed = new MessageEmbed()
        .setTitle(`Error`)
        .setColor("WHITE")
        .setDescription(`> You are blacklisted from using this command.\n> If you believe this is a mistake, please open a ticket in <#1186176165266870272>`);
      return message.channel.send(errorEmbed);
    }

    const options = ['heads', 'tails'];
    let userSelection = args[0].toLowerCase();
    if (userSelection === 'h') {
     userSelection = 'heads';
    }
    if (userSelection === 't') {
     userSelection = 'tails';
    }

    if (!options.includes(userSelection)) {
      return message.channel.send(`Invalid Selection! Please choose \`heads\` or \`tails\`.`);
    }

    if (!args[1]) return message.channel.send("__Invalid Amount__")
    if (isNaN(args[1])) return message.channel.send(`__Invalid Amount__`);

    // Get the user's balance
    const bal = db.fetch(`money_${message.author.id}`);

    // Check if the bet is less than or equal to the user's balance
    if (args[1] > bal) {
      return message.channel.send(`__Insufficient Balance__`);
    }

    // Send the "Flipping coin!" embed and store the message object
    const coinFlipMessage = await message.channel.send(new MessageEmbed()
      .setTitle('Flipping Coin')
      .setColor('WHITE')
    );

    setTimeout(() => {
      const randomOption = options[Math.floor(Math.random() * options.length)];

      if (userSelection === randomOption) {
        db.add(`money_${message.author.id}`, args[1])
        const newBal = db.fetch(`money_${message.author.id}`)

        let moneyEmbed = new MessageEmbed()
          .setColor("WHITE")
          .addField('Result', `> __${randomOption}__`)
          .addField('Gained', `> __${args[1]}__`)
          .addField('Balance', `> __${newBal}__ Credits`);
        message.lineReplyNoMention(moneyEmbed)
      } else {
        db.subtract(`money_${message.author.id}`, args[1])
        const newBal = db.fetch(`money_${message.author.id}`)

        let moneyEmbed = new MessageEmbed()
        .setColor("WHITE")
        .addField('Result', `> __${randomOption}__`)
        .addField('Lost', `> __${args[1]}__`)
        .addField('Balance', `> __${newBal}__ Credits`);
        message.lineReplyNoMention(moneyEmbed)
      }

      // Delete the "Flipping coin!" embed after a delay
      coinFlipMessage.delete({ timeout: 0 });
    }, 2000);
  }
};