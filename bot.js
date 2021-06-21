const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('token.json').token;

function handler() {
    console.log('ready! ass! dick!')
}

function message_handler(message) {
    if (message.content === 'ping') {
        message.reply('pong');
    }
}

client.on('ready', handler);
client.on('message', message_handler);


client.login(token);