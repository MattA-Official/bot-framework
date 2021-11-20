export default class Component {
	constructor(options) {
		this.id = options.id;
		this.type = options.type;
		this.callback = options.callback;
	}

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
}
