import { Client, CommandInteraction } from 'discord.js';

// command class for discord bot

export default class Command {
	/**
	 * @param {Object} options - The command structure
	 * @param {import('discord.js').ApplicationCommandData.name} options.name - The command data
	 * @param {import('discord.js').ApplicationCommandData.description} options.description - The command description
	 * @param {import('discord.js').ApplicationCommandData.options} options.options - The command usage
	 * @param {import('discord.js').ApplicationCommandPermissions} options.permissions - The command permissions
	 * @param {(client: Client, interaction: CommandInteraction) => void} options.callback - The command callback function
	 */
	constructor(options) {
		/**
		 * The command name
		 * @type {string}
		 */
		this.name = options.name;

		/**
		 * The command permission data
		 * @type {import('discord.js').ApplicationCommandPermissions}
		 */
		this.permissions = options.permissions;

		/**
		 * The raw command data
		 * @type {import('discord.js').ApplicationCommandData}
		 */
		this.data = {
			name: this.name,
			description: options.description,
			options: options.options,
			defaultPermissions: this.permissions ? false : true,
			type: options.type,
		};

		/**
		 * The command callback function
		 * @type {(client: Client, interaction: CommandInteraction) => void}
		 * @param {Client} client - The discord client
		 * @param {Interaction} interaction - The interaction object
		 */
		this.callback = options.callback;
	}

	/**
	 * Run the command callback function
	 * @param {Client} client - The discord client
	 * @param {CommandInteraction} interaction - The interaction object
	 */
	run(client, interaction) {
		try {
			this.callback(client, interaction);
		} catch (error) {
			interaction.reply({
				content: `There was an error while executing this command!\n\`\`\`${error}\`\`\``,
				ephemeral: true,
			});
		}
	}

	getData() {
		return this.data;
	}

	getPermissions() {
		return this.permissions;
	}

	getName() {
		return this.data.name;
	}
}
