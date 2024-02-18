const { MessageEmbed }= require("discord.js");
const db = require("quick.db");
const emote = require("../../config/emotes.json");

module.exports = {
        name: "removeall",
        aliases: "removeallcoins",
        category: "economy",
        description: "Removes all users' credits",
        aliases: ["ra"],
        usage: "removeall",

    run: async (bot, message, args) => {

      const roleID = '1188281883004506242'; 

      if (!message.member.roles.cache.has(roleID)) {
        let errorEmbed = new MessageEmbed()
          .setTitle(`Error`)
            .setColor("WHITE")
            .setDescription(`> You require the <@&${roleID}> role to execute this command.`);
       return message.channel.send(errorEmbed);
      }

      // Get all the guild members
      const members = message.guild.members.cache.array();

      // Initialize a variable to track the total coins removed
      let totalCoinsRemoved = 0;

      // Iterate through all the members
      for (const member of members) {
        // Fetch the user's current balance
        const bal = await db.fetch(`money_${member.id}`);

        // If the user has a positive balance, remove their coins
        if (bal > 0) {
          db.subtract(`money_${member.id}`, bal);
          totalCoinsRemoved += bal;
        }
      }

      // Create an embed to display the result
      const moneyEmbed = new MessageEmbed()
        .setColor("WHITE")
        .setDescription(`> Removed all users' credits\n> Total credits removed: __${totalCoinsRemoved}__`);

      // Send the embed
      message.channel.send(moneyEmbed);
    }
};