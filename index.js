const Discord = require('discord.js');
const imgur = require('imgur');
const axios = require('axios').default;
const client = new Discord.Client();
imgur.setClientId(process.env.client_id);
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', msg => {
    if (msg.channel.name === 'portrait-media') {
        const attachments = msg.attachments.array()
        if (attachments.length > 0) {
            const url = attachments[0].url;
            // [0].url;
            //    imgur.uploadUrl(link, 'MiuEd16')
            imgur.uploadUrl(url, process.env.delete_hash)
                .then(function (json) {
                    console.log('Subido!')
                    console.log(json.data.link);
                })
                .catch(function (err) {
                    console.error(err.message);
                });
        }
    } else if (msg.content === '!test') {
        axios.get('https://cdn.discordapp.com/attachments/674731136743899146/674885734133399552/animation.gif.mp4').then(x => console.log(x))
    }
    // console.log("Mensaje en canal", msg.channel)
});

client.login(process.env.token);