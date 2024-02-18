const { MessageEmbed }= require("discord.js");
const db = require("quick.db");
const emote = require("../../config/emotes.json");

module.exports = {
        name: "remove",
        aliases: "removecoins",
        category: "economy",
        description: "Removes Credits",
        aliases: ["r"],
        usage: "remove [mention | ID]",
        
    run: async (bot, message, args) => {
        
      const roleID = '1188281883004506242'; 

      if (!message.member.roles.cache.has(roleID)) {
        let errorEmbed = new MessageEmbed()
          .setTitle(`Error`)
            .setColor("WHITE")
            .setDescription(`> You require the <@&${roleID}> role to execute this command.`);
       return message.channel.send(errorEmbed);
      }
        if (!args[0]) return message.channel.send("__Mention a User__")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("__Invalid User__")

        if (!args[1]) return message.channel.send("__Invalid Amount__")
        if (isNaN(args[1])) return message.channel.send("__Invalid Amount__");
        let bal = await db.fetch(`money_${user.id}`)

        if (args[0] > bal) return message.channel.send("__Amount exceeds user's balance")
        db.subtract(`money_${user.id}`, args[1])
        let bal2 = await db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
          .setTitle('Removed Credits')
            .setColor("WHITE")
      .addField('Removed', `> __${args[1]}__ Credits `, true)
      .addField('Balance', `> __${bal2}__ Credits `, true)
      .addField('\u200B', '\u200B', true)
      .addField('Removed To', `> ${user}`, true)
      .addField('Removed By', `> ${message.author.toString()}`, true)
      .addField('\u200B', '\u200B', true);
        message.channel.send(moneyEmbed)

    }
}