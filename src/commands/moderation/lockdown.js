// src/commands/moderation/lockdown.js
module.exports = {
    name: 'lockdown',
    description: 'Lock down the channel to prevent users from sending messages.',
    async execute(message) {
      if (!message.member.permissions.has('MANAGE_CHANNELS')) {
        return message.reply('You do not have permission to manage channels.');
      }
  
      await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
      });
  
      message.channel.send('This channel has been locked down.');
    },
  };
  