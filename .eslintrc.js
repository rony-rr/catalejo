module.exports = {
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	parser: 'babel-eslint',
	env: {
		es6: true,
		browser: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
		'prettier',
		'prettier/react'
	],
	plugins: [ 'react', 'import', 'jsx-a11y', 'react-hooks' ],
	rules: {
		'jsx-a11y/anchor-is-valid': 0,
		'no-prototype-builtins': 0,
		'react/display-name': 0,
		'react/prop-types': 0,
		'react-hooks/rules-of-hooks': 'error',
		'no-console': 'warn',
		'promise/catch-or-return': 0,
		'jsx-a11y/click-events-have-key-events': 0
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
