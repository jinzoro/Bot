// src/commands/moderation/clear.js
module.exports = {
    name: 'clear',
    description: 'Delete a specified number of messages from the channel.',
    async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_MESSAGES')) {
        return message.reply('You do not have permission to delete messages.');
      }
  
      const amount = parseInt(args[0]);
      if (isNaN(amount) || amount < 1 || amount > 100) {
        return message.reply('You need to specify a number of messages between 1 and 100.');
      }
  
      try {
        await message.channel.bulkDelete(amount, true);
        message.channel.send(`Successfully deleted ${amount} messages.`).then(msg => {
          setTimeout(() => msg.delete(), 5000);
        });
      } catch (err) {
        console.error(err);
        message.reply('There was an error trying to clear messages.');
      }
    },
  };
  