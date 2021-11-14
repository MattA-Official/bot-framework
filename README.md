# 🔩 Bot Framework

A simple Discord bot command/event framework. Supporting slash commands.

## Features

- Slash Commands
- Utility Classes
- Full API coverage (using [discord.js](https://discord.js.org))
- Runs on Node
- `es6` syntax

## Intallation

Install from [npm](https://www.npmjs.com/package/bot-framework)

```bash
npm i bot-framework
```

Install dependencies

```bash
npm i discord.js
```

Create the bot

```js
import { Bot } from 'bot-framework';

const client = new Bot({
	owner: 'YOUR_OWNER_ID',
	token: 'YOUR_BOT_TOKEN',
	command_dir: './commands',
	event_dir: './events',
	config: './config.yaml',
});

client.login();
```

## Contributing

Contributions are always welcome! More info on how to contribute coming soon™.

## Authors

- [@matta-official](https://www.github.com/matta-official)

# Reference

## Commands

Create a command by doing the following:

```js
import { Command } from 'bot-framework';

export default new Command({
	name: 'ping',
	description: 'Responds with pong!',

	callback: (client, interaction) => {
		interaction.reply('Pong!');
	},
});
```

## Components

Components are a framework for adding interactive elements to messages. Create a component by doing the following:

```js
import { Component } from 'bot-framework';

export default new Component({
	id: 'press_me',
	type: 'button', // can also be select_menu

	callback: (client, interaction) => {
		interaction.reply('Pong!');
	},
});
```

## Events

Events have a different number of arguments passed, check the discord.js documentation for information on each. Always pass the client before any additional arguments.

```js
import { Event } from 'bot-framework';

export default new Event({
	name: 'ready',
	once: true,

	callback: (client, ...args) => {
		console.log(`Logged in as ${client.user.tag}!`);
	},
});
```

## Datastore

Coming soon™ - Will be a simple key/value store accessible from the client object.
