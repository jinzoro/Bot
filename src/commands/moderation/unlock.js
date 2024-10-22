// src/commands/moderation/unlock.js
module.exports = {
    name: 'unlock',
    description: 'Unlock the channel to allow users to send messages.',
    async execute(message) {
      if (!message.member.permissions.has('MANAGE_CHANNELS')) {
        return message.reply('You do not have permission to manage channels.');
      }
  
      await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SEND_MESSAGES: true,
      });
  
      message.channel.send('This channel has been unlocked.');
    },
  };
  