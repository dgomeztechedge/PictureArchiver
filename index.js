const Discord = require('discord.js');
const imgur = require('imgur');
const FormData = require('form-data');
const axios = require('axios').default;
const Readable = require('stream').Readable;
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
        console.log('Oido cocina');
        axios.get('https://cdn.discordapp.com/attachments/674731136743899146/674885734133399552/animation.gif.mp4', {
                responseType: "arraybuffer"
            })
            .then(x => {
                const form = new FormData();
                const buffer = new Buffer.from(x.data);
                const video = new Readable();
                video.push(buffer)
                video.push(null);
                form.append('video', video);
                form.append('album', process.env.delete_hash);
                console.log(form);
                axios.post('https://api.imgur.com/3/upload', form, {
                        headers: {
                            'Authorization': `Client-ID ${process.env.client_id}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(data => {
                        console.log(data);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            });
    }
});

client.login(process.env.token);