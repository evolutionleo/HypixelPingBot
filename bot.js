const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('token.json').token;

const prefix = "#";

function handler() {
    console.log('ready! ass! dick!')
}

function message_handler(message) {
    if (message.content.starsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command == "hypixel_refresh") {
        // TODO сюда подключить скрип
    }
}

client.on('ready', handler);
client.on('message', message_handler);


client.login(token);