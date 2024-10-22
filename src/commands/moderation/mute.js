// src/commands/moderation/mute.js
module.exports = {
    name: 'mute',
    description: 'Mute a user in the server for a specified duration.',
    async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_ROLES')) {
        return message.reply('You do not have permission to manage roles.');
      }
  
      const user = message.mentions.users.first();
      const duration = args[1]; // Expecting a time format, e.g., "10m" for 10 minutes
      if (!user || !duration) {
        return message.reply('You need to mention a user and specify a duration (e.g., 10m for 10 minutes).');
      }
  
      const member = message.guild.members.resolve(user);
      if (member) {
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
          try {
            muteRole = await message.guild.roles.create({
              name: 'Muted',
              color: '#818386',
              permissions: [],
            });
  
            // Update channels to deny the role permission to send messages
            message.guild.channels.cache.forEach(async (channel) => {
              await channel.permissionOverwrites.edit(muteRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SPEAK: false,
              });
            });
          } catch (err) {
            console.error(err);
            message.reply('There was an error creating the mute role.');
          }
        }
  
        member.roles.add(muteRole).then(() => {
          message.reply(`${user.tag} has been muted for ${duration}.`);
  
          // Unmute after specified duration
          const timeUnits = {
            m: 60000, // minutes
            h: 3600000, // hours
            s: 1000, // seconds
          };
  
          const timeValue = parseInt(duration.slice(0, -1));
          const timeUnit = duration.slice(-1);
  
          if (timeUnits[timeUnit]) {
            setTimeout(() => {
              member.roles.remove(muteRole).then(() => {
                message.channel.send(`${user.tag} has been unmuted after ${duration}.`);
              }).catch(err => {
                console.error(err);
              });
            }, timeValue * timeUnits[timeUnit]);
          } else {
            message.reply('Invalid time format. Use m (minutes), h (hours), or s (seconds).');
          }
        }).catch(err => {
          message.reply('I was unable to mute the member.');
        });
      } else {
        message.reply('That user is not in this server.');
      }
    },
  };
  