// src/commands/moderation/tempban.js
module.exports = {
    name: 'tempban',
    description: 'Temporarily ban a user for a specified duration.',
    async execute(message, args) {
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply('You do not have permission to ban members.');
      }
  
      const user = message.mentions.users.first();
      const duration = args[1]; // Expecting a time format, e.g., "10m"
      if (!user || !duration) {
        return message.reply('You need to mention a user and specify a duration (e.g., 10m for 10 minutes).');
      }
  
      const member = message.guild.members.resolve(user);
      if (member) {
        await member.ban();
        message.channel.send(`${user.tag} has been banned for ${duration}.`);
  
        // Unban after specified duration
        const timeUnits = {
          m: 60000, // minutes
          h: 3600000, // hours
          s: 1000, // seconds
        };
  
        const timeValue = parseInt(duration.slice(0, -1));
        const timeUnit = duration.slice(-1);
  
        if (timeUnits[timeUnit]) {
          setTimeout(async () => {
            await message.guild.members.unban(user.id);
            message.channel.send(`${user.tag} has been unbanned after ${duration}.`);
          }, timeValue * timeUnits[timeUnit]);
        } else {
          message.reply('Invalid time format. Use m (minutes), h (hours), or s (seconds).');
        }
      } else {
        message.reply('That user is not in this server.');
      }
    },
  };
  