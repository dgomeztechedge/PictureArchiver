const Discord = require('discord.js');
const imgur = require('imgur');
const qs = require('querystring')

const FormData = require('form-data');
const axios = require('axios').default;
const Readable = require('stream').Readable;
const client = new Discord.Client();
imgur.setClientId(process.env.client_id);


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Saving pictures");
    client.user.setPresence({
        game: {
            name: 'https://poalof-media.netlify.com/',
            type: 'PLAYING',
        }
    })

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
client.on('raw', packet => {
    // We don't want this to run on unrelated packets
    if (packet.t === 'MESSAGE_REACTION_ADD') {
        // Grab the channel to check the message from
        const channel = client.channels.get(packet.d.channel_id);
        // There's no need to emit if the message is cached, because the event will fire anyway for that
        if (channel.messages.has(packet.d.message_id)) return;
        // Since we have confirmed the message is not cached, let's fetch it
        channel.fetchMessage(packet.d.message_id).then(message => {
            // Emojis can have identifiers of name:id format, so we have to account for that case as well
            const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
            // This gives us the reaction we need to emit the event properly, in top of the message object
            const reaction = message.reactions.get(emoji);
            // Adds the currently reacting user to the reaction's users collection.
            if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
            // Check which type of event it is before emitting
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
        });

    } else return;
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

client.on('messageReactionAdd', (reaction, user) => {

    if (reaction.emoji.name === '⭐') {
        console.log('Usuario: ', user.id, user.username)
        const exampleEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle(`${reaction.message.content.slice(0,10)}...`)
            .setURL(reaction.message.url)
            .setAuthor(reaction.message.author.username, reaction.message.author.avatarURL)
            .setDescription(reaction.message.content)
            .setThumbnail(reaction.message.author.avatarURL)
            .setTimestamp()
            .setFooter('Made by Hachebe', client.user.avatarURL);
        if (reaction.message.attachments.array().length > 0) {
            exampleEmbed.setImage(reaction.message.attachments.array()[0].proxyURL)
        }
        if (reaction.message.embeds > 0 && reaction.message.embeds[0].image) {
            exampleEmbed.setImage(reaction.message.embeds[0].image.url)
        }
        user.send(exampleEmbed)
    } else if (reaction.message.channel.name === 'portrait-meta' && reaction.emoji.name === '🎵') {
        addTrack(reaction.message.content)
    } else return;
})

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

function addTrack(msg) {
    // Primero hacer login, conseguir access_token y despues iniciar proceso de busqueda y añadir
    // Serán tres llamadas a la API de forma sincrona
    axios.post('https://accounts.spotify.com/api/token', qs.stringify({
        "grant_type": "refresh_token",
        'refresh_token': process.env.spotify_refresh_token
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${process.env.clientsecret}`
        }
    }).then(x => {
        const headers_token = {
            Authorization: `Bearer ${x.data.access_token}`
        }
        axios.get('https://api.spotify.com/v1/search', {
            params: {
                'q': msg,
                'type': 'track',
                'limit': 1
            },
            headers: headers_token
        }).then(y => {
            const uri_obj = {
                uris: [y.data.tracks.items[0].uri]
            }
            axios.post(`https://api.spotify.com/v1/playlists/${process.env.playlist}/tracks`, JSON.stringify(uri_obj), {
                headers: headers_token
            });
            console.log('Añadida canción', y.data.tracks.items[0].name, ' a playlist')
        }).catch(err => {
            console.error(err);
        });

    }).catch(err => {
        console.error(err);
    });

}

client.login(process.env.token);