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
    if (msg.channel.name === 'portrait-media' && !msg.author.bot) {
        urls = [];
        console.log(msg.embeds);
        const attachments = msg.attachments.array()
        if (attachments.length > 0) {
            attachments.forEach(x => {
                urls.push(x.url);
            });
        }
        if (Array.isArray(msg.embeds)) {
            msg.embeds.forEach(x => {
                if (x.image) {
                    urls.push(x.image.url)
                }
                if (x.thumbnail) {
                    urls.push(x.thumbnail.proxyURL);
                }
            });
        }
        if (urls.length > 0) {
            uploadFiles(urls);
        }
    }
    if (msg.content === '!baguette') {
        const attachment = new Discord.Attachment('https://purepng.com/public/uploads/medium/purepng.com-baguette-breadfood-bakery-fresh-tasty-organic-bread-health-breakfast-wheat-barley-941524622910nebfb.png');
        // Send the attachment in the message channel
        msg.channel.send(attachment);
    }
    if (msg.content === '!tall') {
        const attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/656037149254090763/676909895475265546/Screenshot_2020-01-24_at_14.30.43.png');
        // Send the attachment in the message channel
        msg.channel.send(attachment);
    }
});

client.on('messageUpdate', (oldMsg, newMsg) => {
    if (newMsg.channel.name === 'portrait-media' && !newMsg.author.bot) {
        if (Array.isArray(newMsg.embeds)) {
            newMsg.embeds.forEach(x => {
                if (x.image) {
                    urls.push(x.image.url)
                }
                if (x.thumbnail) {
                    urls.push(x.thumbnail.proxyURL);
                }
            });
        }
        if (urls.length > 0) {
            uploadFiles(urls);
        }
    }
});

function uploadFiles(urls) {
    urls.forEach(url => {
        if (url.endsWith('.mp4')) {
            axios.get(url, {
                    responseType: "stream"
                })
                .then(x => {
                    var video = new Readable({
                        read() {}
                    });
                    x.data.on('data', (chunk) => {
                        video.push(chunk);
                    });
                    x.data.on('end', () => {
                        video.push(null);
                        const form = new FormData();

                        form.append('video', video.read(), {
                            filename: 'video.mp4',
                            contentType: 'video/*'
                        });
                        form.append('album', 'MiuEd16');
                        axios.post('https://api.imgur.com/3/upload', form, {
                            headers: {
                                ...form.getHeaders(),
                                'Authorization': `Client-ID ${process.env.client_id}`,
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(data => {
                            const formVideo = new FormData();
                            formVideo.append('deletehashes[]', data.data.data.deletehash)
                            axios.post(`https://api.imgur.com/3/album/${process.env.delete_hash}/add`, formVideo, {
                                headers: {
                                    'Authorization': `Client-ID ${process.env.client_id}`,
                                    ...formVideo.getHeaders(),
                                }
                            }).then(x => {
                                console.log(x);
                                console.log('Video subido al album!')
                            }).catch(err => {
                                console.error(err);
                            })

                        }).catch(err => {
                            console.error(err);
                        });
                    })

                });
        } else {
            imgur.uploadUrl(url, process.env.delete_hash)
                .then(function (json) {
                    console.log('Subido!')
                    console.log(json.data.link);
                })
                .catch(function (err) {
                    console.error(err.message);
                });

        }
    })
}

client.login(process.env.token);
