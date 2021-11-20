import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

export default async (commands, client, guildId) => {
	console.log(commands);
	const rest = new REST({ version: '9' }).setToken(client.token);

	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			guildId
				? Routes.applicationGuildCommands(client.user.id, guildId)
				: Routes.applicationCommands(client.user.id),
			{ body: commands }
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
};
