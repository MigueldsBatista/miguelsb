import stylistic from '@stylistic/eslint-plugin';
import pluginVitest from '@vitest/eslint-plugin';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginOxlint from 'eslint-plugin-oxlint';
import pluginVue from 'eslint-plugin-vue';
import { globalIgnores } from 'eslint/config';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      // Core ESLint rules
      // 'camelcase': ['warn', { allow: [] }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./*', '../*'],
              message: 'Please use absolute imports with "@"'
            }
          ]
        }
      ],
      'no-self-compare': 'error',
      'no-unmodified-loop-condition': 'warn',
      'no-unreachable-loop': 'error',
      'prefer-const': 'error',
      'quotes': ['error', 'single', { avoidEscape: true }],
      'key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true
        }
      ],
      'no-console': 'off',

      // Stylistic / formatting
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/semi': 'error',
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/type-annotation-spacing': [
        'error',
        {
          before: false,
          after: true,
          overrides: { arrow: { before: true, after: true } }
        }
      ],

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_'
        }
      ],

      // Vue rules
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: []
        }
      ],
      'vue/html-quotes': ['error', 'double'],
      'vue/object-curly-spacing': ['error', 'always'],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/space-infix-ops': 'error',
      'vue/html-indent': ['error', 2],
    }
  },
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*']
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json')
);
