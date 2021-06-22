const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const scrap = require('./scrapper.js');

const token = require('./token.json').token;
var cache = require('./hypixel.json');

function updateCache(changes) {
    // not immediately
    setTimeout(() => {
        cache = Object.assign(cache, changes);
        fs.writeFile('./hypixel.json', JSON.stringify(cache), () => {
            console.log('updated cache!');
        });
    }, 1);
}

async function notify(channel) {
    if (!cache.notified) {
        const message = await channel.send('HEYYY @everyone HYPIXEL IS UP!!! POGGERS :D',
        {
            files: [{
                attachment: './hypixel.png',
                name: 'hypixel.png'
            }]                
        });
        try {
            message.pin();
        } catch(e) { console.log('unable to pin :('); }
        updateCache({ notified: true });
    }
}

function notifyPercent(percent) {
    if (cache.last_percent < percent) {
        client.channels.cache.forEach(async function(channel) {
            if (channel_ids.indexOf(channel.id) >= 0) {
                const message = await channel.send('Hey @everyone! Hypixel percentage update: ' + percent + '%',
                {
                    files: [{
                        attachment: './hypixel.png',
                        name: 'hypixel.png'
                    }]                
                });
                try {
                    message.pin();
                } catch(e) { console.log('unable to pin :('); }
            }
        });
        updateCache({ last_percent: percent });
    }
}


// updating
async function refresh() {
    console.log('update initialized...');
    const data = await scrap();
    console.log('updated data: ' + JSON.stringify(data));

    if (data.done || data.percent == 100) {
        client.channels.cache.forEach(function(channel) {
            if (channel_ids.indexOf(channel.id) >= 0)
                notify(channel);
        })
    }
    else {
        notifyPercent(data.percent);
    }
}

client.setInterval(refresh, 20000);
client.setImmediate(refresh);


const channel_ids = ['856608175075491882', '856668756833861634'];


const prefix = "-";

function handler() {
    console.log('ready! ass! dick!');
}

async function message_handler(message) {
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    console.log('received command ' + command);

    if (command == "hypixel_status") {
        // я подключил скрипт))

        message.reply('hypixel.net scrapping initialized...');

        const data = await scrap();
        if (data.done || data.percent == 100) {
            notify(message.channel); // it checks
        }
        else {
            message.reply('hypixel progress percentage: ' + data.percent + '%');
            notifyPercent(data.percent);
        }
    }
}

client.on('ready', handler);
client.on('message', message_handler);


client.login(token);