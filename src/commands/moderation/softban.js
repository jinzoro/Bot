// src/commands/moderation/softban.js
module.exports = {
    name: 'softban',
    description: 'Kick and immediately ban a user, removing their messages.',
    async execute(message) {
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply('You do not have permission to ban members.');
      }
  
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply('You need to mention a user to softban.');
      }
  
      const member = message.guild.members.resolve(user);
      if (member) {
        await member.kick();
        await message.guild.members.ban(user);
        message.channel.send(`${user.tag} has been softbanned.`);
  
        // Optionally, you could immediately unban the user if you want to allow them back
        setTimeout(async () => {
          await message.guild.members.unban(user.id);
          message.channel.send(`${user.tag} has been unbanned after softban.`);
        }, 5000); // Adjust the time as needed
      } else {
        message.reply('That user is not in this server.');
      }
    },
  };
  