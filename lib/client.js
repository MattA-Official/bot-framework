import { Client as DiscordClient, Collection } from 'discord.js';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import loadConfig from '../utils/config.js';
import deployCommands from '../utils/deploy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Client extends DiscordClient {
	constructor(options) {
		super({ intents: ['GUILDS', 'GUILD_MESSAGES'], ...options });

		this.token = options.token || this.error('No token provided');
		this.guild = options.guild;
		this.force = options.force || false;

		this.command_dir = options.command_dir || './commands';
		this.component_dir = options.components_dir || './components';
		this.event_dir = options.event_dir || './events';

		this.owner = options.owner || this.error('No owner provided');

		this.config = loadConfig(options.config) || {};

		this.commands = new Collection();
		this.components = new Collection();
		this.events = new Collection();

		this.on('ready', () => {
			if (this.force)
				deployCommands(
					this.commands.map((c) => c.data),
					this,
					this.guild || null
				);
		});

		this.on('interactionCreate', (interaction) => {
			if (this.guild && interaction.guild.id !== this.guild) return;

			if (interaction.isCommand()) {
				// if not in collection return
				if (!this.commands.has(interaction.commandName)) return;

				try {
					// execute command logic
					this.commands
						.get(interaction.commandName)
						.run(this, interaction);
				} catch (error) {
					// respond with error messsage
					console.log(error);
					interaction.reply({
						content: `There was an error while executing this command!\n\`\`\`${error}\`\`\``,
						ephemeral: true,
					});
				}
			}
		});
	}

	error(message) {
		throw new Error(message);
	}

	login() {
		this.loadCommands(this.command_dir);
		this.loadComponents(this.component_dir);
		this.loadEvents(this.event_dir);
		super.login(this.token);
	}

	async loadCommands(dir) {
		if (!fs.existsSync(dir)) return;
		const files = fs.readdirSync(dir);

		if (!files) return;

		for await (const file of files) {
			if (fs.statSync(`${dir}/${file}`).isDirectory()) {
				this.loadCommands(`${dir}/${file}`);
				continue;
			}

			const command = await import(
				path
					.join(path.relative(__dirname, path.resolve(dir)), file)
					.replace(/\\/g, '/')
			).then((e) => e.default || e);
			console.log(command);
			if (!command.getData()) continue;
			this.commands.set(command.getName(), command);
		}
	}

	loadComponents(dir) {
		if (!fs.existsSync(dir)) return;
		const files = fs.readdirSync(dir);

		if (!files) return;

		for (const file of files) {
			if (fs.statSync(`./${dir}/${file}`).isDirectory()) {
				this.loadComponents(`./${dir}/${file}`);
				continue;
			}

			const component = import(
				path
					.join(path.relative(__dirname, path.resolve(dir)), file)
					.replace(/\\/g, '/')
			).then((e) => e.default || e);
			if (!component.getId()) continue;
			this.components.set(component.getId(), component);
		}
	}

	loadEvents(dir) {
		if (!fs.existsSync(dir)) return;
		const files = fs.readdirSync(dir);

		if (!files) return;

		for (const file of files) {
			if (fs.statSync(`./${dir}/${file}`).isDirectory()) {
				this.loadEvents(`./${dir}/${file}`);
				continue;
			}

			const event = import(
				path
					.join(path.relative(__dirname, path.resolve(dir)), file)
					.replace(/\\/g, '/')
			).then((e) => e.default || e);

			if (event.once) {
				this.once(event.name, (...args) =>
					event.execute(this, ...args)
				);
			} else {
				this.on(event.name, (...args) => event.execute(this, ...args));
			}
		}
	}
}
