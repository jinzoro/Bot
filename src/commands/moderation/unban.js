// src/commands/moderation/unban.js
module.exports = {
    name: 'unban',
    description: 'Unban a user by their ID.',
    async execute(message, args) {
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply('You do not have permission to unban members.');
      }
  
      const userId = args[0];
      if (!userId) {
        return message.reply('You need to specify the ID of the user to unban.');
      }
  
      try {
        await message.guild.members.unban(userId);
        message.reply(`User with ID ${userId} has been unbanned.`);
      } catch (err) {
        message.reply('I was unable to unban the user. Make sure the ID is correct.');
      }
    },
  };
  