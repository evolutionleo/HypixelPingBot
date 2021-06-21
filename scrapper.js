const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login('ODU2NTc3NjcyMDYxNTE3ODI0.YNDEHw.3RsVcDqpkNJ5WUq7UoKCzBrEO7g');