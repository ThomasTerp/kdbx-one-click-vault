import { defineConfig, globalIgnores } from "eslint/config";
import tsEslintBase from "typescript-eslint";
import tsEslint from "@electron-toolkit/eslint-config-ts";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";

export default defineConfig(
	globalIgnores(["**/node_modules", "**/dist", "**/out"]),
	tsEslint.configs.recommendedTypeChecked,
	eslintPluginReact.configs.flat.recommended,
	eslintPluginReact.configs.flat["jsx-runtime"],
	{
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ["eslint.config.mjs"]
				},
				tsconfigRootDir: import.meta.dirname
			}
		},
		settings: {
			react: {
				version: "detect"
			}
		}
	},
	{
		files: ["**/*.{ts,tsx}"],
		rules: {
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/require-await": "off"
		}
	},
	{
		files: ["**/*.{js,mjs,cjs}"],
		...tsEslintBase.configs.disableTypeChecked
	},
	{
		files: ["**/*.{ts,tsx}"],
		plugins: {
			"react-hooks": eslintPluginReactHooks,
			"react-refresh": eslintPluginReactRefresh
		},
		rules: {
			...eslintPluginReactHooks.configs.recommended.rules,
			...eslintPluginReactRefresh.configs.vite.rules
		}
	},
	{
		files: ["**/*.tsx"],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off"
		}
	},
	{
		files: ["src/renderer/src/components/ui/**/*.tsx"],
		rules: {
			"react-refresh/only-export-components": "off"
		}
	},
	eslintConfigPrettier
);
