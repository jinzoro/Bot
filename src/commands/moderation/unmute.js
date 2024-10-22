// src/commands/moderation/unmute.js
module.exports = {
    name: 'unmute',
    description: 'Unmute a user in the server.',
    async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_ROLES')) {
        return message.reply('You do not have permission to manage roles.');
      }
  
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply('You need to mention a user to unmute.');
      }
  
      const member = message.guild.members.resolve(user);
      if (member) {
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
          return message.reply('Muted role does not exist.');
        }
  
        member.roles.remove(muteRole).then(() => {
          message.reply(`${user.tag} has been unmuted.`);
        }).catch(err => {
          message.reply('I was unable to unmute the member.');
        });
      } else {
        message.reply('That user is not in this server.');
      }
    },
  };
  