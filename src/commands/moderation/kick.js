// src/commands/moderation/kick.js
module.exports = {
    name: 'kick',
    description: 'Kick a user from the server.',
    execute(message, args) {
      if (!message.member.permissions.has('KICK_MEMBERS')) {
        return message.reply('You do not have permission to kick members.');
      }
  
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.members.resolve(user);
        if (member) {
          member.kick().then(() => {
            message.reply(`${user.tag} has been kicked from the server.`);
          }).catch(err => {
            message.reply('I was unable to kick the member.');
          });
        } else {
          message.reply('That user is not in this server.');
        }
      } else {
        message.reply('You need to mention a user to kick!');
      }
    },
  };
  