const Discord = require('discord.js');
const imgur = require('imgur');

const client = new Discord.Client();
imgur.setClientId('d4c0728985acdf7');
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
            imgur.uploadUrl(url, 'U5RY94tk3VmbKxY')
                .then(function (json) {
                    console.log('Subido!')
                    console.log(json.data.link);
                })
                .catch(function (err) {
                    console.error(err.message);
                });
        }
    }
    // console.log("Mensaje en canal", msg.channel)
});

client.login(process.env.token);