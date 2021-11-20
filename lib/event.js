export default class Event {
	constructor(options) {
		this.name = options.name;
		this.once = options.once;
		this.callback = options.callback;
	}

	execute(client, ...args) {
		try {
			this.callback(client, ...args);
		} catch (error) {
			console.error(error);
		}
	}
}
