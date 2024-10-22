// src/commands/moderation/ban.js
module.exports = {
    name: 'ban',
    description: 'Ban a user from the server.',
    execute(message, args) {
      // Check if the user has permission to ban
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply('You do not have permission to ban members.');
      }
  
      const user = message.mentions.users.first(); // Mentioned user
      if (user) {
        const member = message.guild.members.resolve(user); // Find the member
        if (member) {
          member.ban().then(() => {
            message.reply(`${user.tag} has been banned successfully.`);
          }).catch(err => {
            message.reply('I was unable to ban the member.');
          });
        } else {
          message.reply('That user is not in this server.');
        }
      } else {
        message.reply('You need to mention a user to ban!');
      }
    },
  };
  