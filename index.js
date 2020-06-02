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
        msg.channel.send(attachment);
    }
    if (msg.content === '!tall') {
        const attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/656037149254090763/676909895475265546/Screenshot_2020-01-24_at_14.30.43.png');
        msg.channel.send(attachment);
    }
    if (msg.content === '!looking') {
        const attachment = new Discord.Attachment('https://i.imgur.com/ZgLShiJ.jpg');
        msg.channel.send(attachment);
    }
     if (msg.content === '!notlooking') {
        const attachment = new Discord.Attachment('https://media.discordapp.net/attachments/647500826243497984/688664691509428227/IMG_20200315_092538.jpg');
        msg.channel.send(attachment);
    }
     if (msg.content === '!top') {
        const attachment = new Discord.Attachment('https://66.media.tumblr.com/52021eab102809cc0b844d34b73bb884/bdf366cfde6587e1-84/s540x810/9be02b3a5a8d4bd98e0f7c93e03ca4f01345478a.gif');
        msg.channel.send(attachment);
    }
     if (msg.content === '!buffering') {
        const attachment = new Discord.Attachment('https://i.imgur.com/UzXrgnl.gif');
        msg.channel.send(attachment);
    }
    if (msg.content === '!lipbite') {
        const attachment = new Discord.Attachment('https://media.discordapp.net/attachments/647500826243497984/688818471387398205/tumblr_5c7fc759ccd9894fa0330ea9800ea27d_8bcecfe7_540.jpg');
        msg.channel.send(attachment);

    }
    if (msg.content === '!butt') {
        const attachment = new Discord.Attachment('https://media.discordapp.net/attachments/647495036770189312/690711313873371136/my_butt.jpg');
        msg.channel.send(attachment);

    }
    if (msg.content === '!norights') {
        const attachment = new Discord.Attachment('https://media.discordapp.net/attachments/647495036770189312/690693127220101180/image0.jpg');
        msg.channel.send(attachment);
    }
    if (msg.content === '!norightsplus') {
        const attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/647500826243497984/692146050366177361/norights.gif');
        msg.channel.send(attachment);
    }
    if (msg.content === '!deadass') {
        const attachment = new Discord.Attachment('https://media.discordapp.net/attachments/690724839043891210/692589753433849916/AqvkIMu.png');
        msg.channel.send(attachment);
    }
    if (msg.content === '!danceadele') {
        const attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/647500826243497984/693933609102344192/adele-dancing.gif');
        msg.channel.send(attachment);
    }
    if (msg.content === '!dancenoemie') {
        const attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/690724839043891210/693946748535832626/noemie-dance.gif');
        msg.channel.send(attachment);
    }
    if (msg.content === '!danceceline') {
        const attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/690724839043891210/693946743754326076/celine-dancing.gif');
        msg.channel.send(attachment);
    }
    if (msg.content === '!salami') {
        const attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/647500826243497984/696087810876243968/158597756340089432.gif');
        msg.channel.send(attachment);
    }
    if (msg.content === '!fistme') {
        let attachment;
        if (msg.author.id === '428294204444114946') {
            attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/647500826243497984/696822170344751184/EU8a9HdUwAASgxN.png');

        } else {
            attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/690724839043891210/696948390214500363/celine-fist-me.gif');
        }
        msg.channel.send(attachment);
    }
     if (msg.content === '!baby') {
        const attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/690724839043891210/713065001786671164/15900248104026521-1.gif');
        msg.channel.send(attachment);
    }
    if (msg.content === '!kissceline') {
        const attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/647500826243497984/717005671429832791/ezgif.com-optimize-4.gif');
        msg.channel.send(attachment);
    }
    if (msg.content === '!spiraling') {
        const attachment = new Discord.Attachment('https://media.discordapp.net/attachments/690724839043891210/709509112874139668/image0.jpg');
        msg.channel.send(attachment);
    }
    if (msg.content === '!kissnov') {
        const attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/647500826243497984/717112354784935946/novkiss.gif');
        msg.channel.send(attachment);
    }
    if (msg.content === '!kisswife') {
        const attachment = new Discord.Attachment('https://cdn.discordapp.com/attachments/647500826243497984/717148964901748736/Screen_Shot_2020-06-01_at_3.53.16_PM.png');
        msg.channel.send(attachment);
    }
    if(msg.content === '!heloisse') {
        getImage('71WUFaO', msg);
    }
    if(msg.content === '!marianne') {
        getImage('v7zL3ep', msg);
    }
    if(msg.content === '!comtesse') {
        getImage('WGxm33x', msg);
    }
    if(msg.content === '!sophie') {
        getImage('DGJuM0i', msg);
    }
    
    if (msg.content === '!help2') {
        const exampleEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setAuthor(client.user.username, client.user.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setTitle('Help')
            .setDescription('Need help with the bot?')
            .addField('On #portrait-media', 'Pics and videos are archived on https://poalof-media.netlify.com/')
            .addField("On #portrait-meta", "Add songs to our [p.28 playlist](https://open.spotify.com/playlist/2iPnFRSUoMEdu3Jxcf9XQp?si=qnvsRpyyT1OHxDoLpnIqoQ) by reacting to a song title with 🎵.")
            .addField('ML Bot', 'Send !heloisse, !marianne, !sophie or !comtesse to get a random pic of your favourite character!')
            .addField('Anywhere on the server', 'Archive messages directly to your DMs by reacting to any message with ⭐')
            .addField('Fun Stuff', 'Give the !tall and !baguette commands a try')
            .setTimestamp()
            .setFooter('Made by Hachebe', client.user.avatarURL);
        msg.channel.send(exampleEmbed);
    }
    if (msg.content === '!baguette-lore') {
        const exampleEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setAuthor(client.user.username, client.user.avatarURL)
            .setThumbnail('https://purepng.com/public/uploads/medium/purepng.com-baguette-breadfood-bakery-fresh-tasty-organic-bread-health-breakfast-wheat-barley-941524622910nebfb.png')
            .setTitle('Help for newcomers- by Jenny')
            .setDescription(`anyways...I think now is the time for the breadtalk TED talk. You may have noticed we use a the baguette emoji and !baguette command often. These are symbols of approbation/agreement generally, but it's kind of evolving fluidly to mean other things. As noted, we have our own language in this Discord. We initially chose the baguette for approbation because some doofus started a hunger thread that involved a lot of pics of yummy breads, frilly jumped in saying she was not a bread fan, we teased her, and it stuck. Also baguettes, like Portrait, are French. it fits.
Sooooo, early on in our convos, the horny started coming out because this is a very sexy movie. the baguettes reappeared, recontextualized, because they're such a naughty shape. Rowan Atkinson (English comedian) has a song sketch about how he hates the French and how they bake their bread in such a naughty shape. That got linked here by me. We took the ball and ran with it. Redacted made it first appearance around then too.`)
            .setTimestamp()
            .setFooter('Made by Hachebe', client.user.avatarURL);
        msg.channel.send(exampleEmbed);
    }
    if (msg.content === '!introduction') {
        const exampleEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setAuthor(client.user.username, client.user.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setTitle('Help for newcomers')
            .setDescription('Need help?')
            .addField('How To Start', 'Write the !yes command to become a member')
            .addField('Pronouns', 'Use the !hehim, !sheher or !theythem command the get a tag with your preffered pronouns. You can also use the !askforpronouns if you prefer')
            .addField('Sexy Stuff', 'Want to check behind the curtain? Use the !18 and join the [redacted]')
            .setTimestamp()
            .setFooter('Made by Hachebe', client.user.avatarURL);
        msg.channel.send(exampleEmbed);
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

async function getImage(album, msg){
    axios.get(`https://api.imgur.com/3/album/${album}/images`, {
        headers: {
            Authorization: 'Client-ID d4c0728985acdf7'
        }
    }).then(x => {
        const img = new Discord.Attachment(x.data.data[Math.floor(Math.random() * x.data.data.length)].link)
        msg.channel.send(img);
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
