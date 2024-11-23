module.exports = {
	extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
	plugins: ['prettier', 'filename-rules'],
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
	overrides: [
		{
			files: ['src/app/components/**/*.{js,jsx,ts,tsx}'],
			plugins: ['filename-rules'],
			rules: {
				'filename-rules/match': [2, 'pascalcase'],
			},
		},
	],
};
