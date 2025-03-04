const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		'eslint:recommended',
		'prettier',
		require.resolve('@vercel/style-guide/eslint/next'),
		'eslint-config-turbo',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	globals: {
		React: true,
		JSX: true,
	},
	env: {
		node: true,
		browser: true,
	},
	plugins: ['only-warn', 'filename-rules'],
	rules: {
		'prettier/prettier': [
			'warn',
			{},
			{
				usePrettierrc: true, // Use .prettierrc.js
			},
		],
		quotes: ['warn', 'single'],
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	ignorePatterns: [
		// Ignore dotfiles
		'.*.js',
		'node_modules/',
		'tailwind.config.js',
		'postcss.config.js',
	],
	overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
};
