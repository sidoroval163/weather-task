module.exports = {
  extends: ['airbnb', 'plugin:react/recommended', 'prettier', 'prettier/react'],
  plugins: ['import', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'array-callback-return': 'warn',
    '@typescript-eslint/camelcase': 'off',
    camelcase: 'off',
    'class-methods-use-this': 'warn',
    'consistent-return': 'off',
    'global-require': 'warn',
    'import/extensions': [
      'error',
      {
        json: 'always',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/named': 'off',
    'import/newline-after-import': 'warn',
    'import/no-cycle': 'error',
    'import/no-duplicates': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'warn',
    'import/no-useless-path-segments': 'warn',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'unknown', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'unknown',
            pattern: '@vtb/**',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'import/prefer-default-export': 'off',
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-quotes': ['warn', 'prefer-double'],
    'max-classes-per-file': 'warn',
    'max-params': ['warn', 4],
    'new-cap': 'warn',
    'no-bitwise': 'warn',
    'no-case-declarations': 'warn',
    'no-continue': 'warn',
    'no-dupe-class-members': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-nested-ternary': 'off',
    'no-param-reassign': 0,
    'no-plusplus': 'warn',
    'no-prototype-builtins': 'warn',
    'no-restricted-globals': 'warn',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            message: 'Please import from styled-components/macro.',
            name: 'styled-components',
          },
          {
            message: 'Please import from reflexbox/styled-components.',
            name: 'reflexbox',
          },
          {
            message: 'Please import from lodash/some_module',
            name: 'lodash',
          },
        ],
        patterns: ['!styled-components/macro', '!reflexbox/styled-components', '!lodash/*'],
      },
    ],
    'react/function-component-definition': [
      0,
      {
        namedComponents: 'function-declaration',
      },
    ],
    'no-restricted-syntax': 'warn',
    'no-return-assign': 'warn',
    'no-shadow': 'off',
    'no-template-curly-in-string': 'warn',
    'no-underscore-dangle': 'warn',
    'no-unneeded-ternary': 'warn',
    'no-unused-expressions': 'warn',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'no-useless-escape': 'warn',
    'no-useless-return': 'warn',
    'operator-assignment': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-promise-reject-errors': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/destructuring-assignment': 'warn',
    'react/display-name': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'react/jsx-indent': 'warn',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/jsx-wrap-multilines': 'warn',
    'react/no-array-index-key': 'warn',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/self-closing-comp': 'warn',
    'react/sort-comp': 'warn',
    'react/static-property-placement': 'warn',
  },

  overrides: [
    {
      files: ['*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      extends: [
        'prettier/@typescript-eslint',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_$',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^React$',
          },
        ],
        '@typescript-eslint/no-use-before-define': [
          'warn',
          {
            functions: false,
          },
        ],
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/prefer-optional-chain': 'warn',
      },
    },
  ],
};
