const { MessageEmbed } = require('discord.js');
const emote = require("../../config/emotes.json");
const db = require('quick.db');

module.exports = {
    name: "leaderboard",
    aliases: ['lb', 'l'],
    category: 'economy',
    description: 'Shows Server\'s Top 10 Users of Economy Leaderboard',
    usage: 'leaderboard',
    accessableby: "everyone"
    ,
    run: async (bot, message, args) => {

        let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);

        // Remove users with 0 credits from the array
        money = money.filter(user => user.data > 0);

        if (!money.length) {
            let noEmbed = new MessageEmbed()
                .setAuthor(message.member.displayName, message.author.displayAvatarURL())
                .setColor("YELLOW")
                .setFooter("Nothing To See Here Yet!")
                .setDescription("No one is on the leaderboard.");
            var finalLb = "No one is on the leaderboard.";
        } else {
            money.length = 10;
            var finalLb = "";
            for (var i in money) {
                if (money[i].data === null) money[i].data = 0
                let user = bot.users.cache.get(money[i].ID.split('_')[1]);
                if (user) {
                    finalLb += `${i}. ${user} - ${money[i].data}\n`;
                }
            }
        }

        const embed = new MessageEmbed()
            .setTitle(`Leaderboard`)
            .setColor("WHITE")
            .setDescription(finalLb)

        message.channel.send(embed);
    }
};