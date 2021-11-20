import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export default (config) => {
	if (!config) return;

	if (typeof config === 'object') return config;
	if (path.extname(config) === '.json')
		return JSON.parse(fs.readFileSync(config, 'utf8'));
	if (path.extname(config) === '.yaml')
		return yaml.safeLoad(fs.readFileSync(config, 'utf8'));
	if (path.extname(config) === '.js')
		return import(config).then((e) => e.default || e);
	throw new Error('Invalid config! File must be json, yaml, or js');
};
