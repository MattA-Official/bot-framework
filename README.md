# 🔩 Bot Framework

A simple Discord bot command/event framework. Supporting slash commands.

## Features

- Slash Commands
- Utility Classes
- Full API coverage (using [discord.js](https://discord.js.org))
- Runs on Node
- `es6` syntax

## Intallation

Install from [npm](https://www.npmjs.com/package/@matta-official/bot-framework)

```bash
npm i @matta-official/bot-framework
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
	component_dir: './components',
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

## Bot

When creating a bot, you can provide the following options:

| Option          | Description                               | Default        | Required |
| --------------- | ----------------------------------------- | -------------- | :------: |
| `owner`         | The ID of the bot owner                   |                | ✔  |
| `token`         | The bot token                             |                | ✔  |
| `guild`         | The ID of the guild to deploy commands in |                | ✔  |
| `command_dir`   | The directory where commands are stored   | `./commands`   | ✔  |
| `component_dir` | The directory where components are stored | `./components` | ✔  |
| `event_dir`     | The directory where events are stored     | `./events`     | ✔  |
| `config`        | The path to the config file               | `{}`           | ✔  |
| `force`         | Force the bot to refresh the commands     | `false`        | ✔  |

## Commands

Create a command by doing the following:

```js
import { Command } from 'bot-framework';

export default new Command({
	name: 'ping',
	description: 'Responds with pong!',
	// Also supports 'options', 'permissions', 'type'

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
	once: true, // omit this to listen for multiple events

	callback: (client, ...args) => {
		console.log(`Logged in as ${client.user.tag}!`);
	},
});
```

## Datastore

Coming soon™ - Will be a simple key/value store accessible from the client object.
