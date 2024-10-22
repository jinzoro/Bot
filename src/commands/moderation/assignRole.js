// src/commands/moderation/assignRole.js
module.exports = {
    name: 'assignRole',
    description: 'Assign a role to a user.',
    async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_ROLES')) {
        return message.reply('You do not have permission to manage roles.');
      }
  
      const user = message.mentions.users.first();
      const roleName = args.slice(1).join(' ');
      const role = message.guild.roles.cache.find(r => r.name === roleName);
  
      if (!user || !role) {
        return message.reply('You need to mention a user and specify a valid role.');
      }
  
      const member = message.guild.members.resolve(user);
      await member.roles.add(role);
      message.channel.send(`Role ${roleName} has been assigned to ${user.tag}.`);
    },
  };
  