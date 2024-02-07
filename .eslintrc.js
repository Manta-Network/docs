module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["airbnb", "airbnb-typescript", "plugin:prettier/recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
        {
            files: ["**/*"],
            settings: {
                "disable/plugins": ["import", "jsx-a11y"],
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
    plugins: ["react", "disable"],
    processor: "disable/disable",
    rules: {
        "react/button-has-type": 0,
        "import/prefer-default-export": 0,
        "import/no-unresolved": 0,
        "prettier/prettier": "error",
        "object-curly-newline": 0,
        "no-restricted-globals": 0,
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 0,
        "react/no-children-prop": 0,
        "react-hooks/exhaustive-deps": 0,
        "@typescript-eslint/class-name-casing": 0,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/ban-ts-ignore": 0,
        "@typescript-eslint/ban-ts-comment": 0,
        "@typescript-eslint/no-unused-vars": 0,
        "comma-dangle": [
            "error",
            {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "always-multiline",
                exports: "always-multiline",
                functions: "always-multiline",
            },
        ],
        "no-unused-vars": 0,
        "no-empty": 0,
        "max-len": [
            "error",
            {
                code: 180,
                tabWidth: 2,
            },
        ],
        "max-lines": [
            "error",
            {
                max: 800,
                skipComments: true,
            },
        ],
        "lines-around-comment": [
            "error",
            {
                beforeBlockComment: true,
                beforeLineComment: false,
                allowBlockStart: true,
                allowObjectStart: true,
                allowArrayStart: true,
                allowClassStart: true,
            },
        ],
        "multiline-comment-style": 0,
        "spaced-comment": ["error", "always"],
        "key-spacing": ["error"],
        "comma-spacing": [
            "error",
            {
                before: false,
                after: true,
            },
        ],
        "keyword-spacing": [
            "error",
            {
                before: true,
                after: true,
            },
        ],
        "space-before-blocks": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "array-bracket-spacing": ["error", "never"],
        "space-infix-ops": ["error"],
        "semi-spacing": [
            "error",
            {
                before: false,
                after: true,
            },
        ],
        "switch-colon-spacing": [
            "error",
            {
                after: true,
                before: false,
            },
        ],
        "arrow-spacing": [
            "error",
            {
                before: true,
                after: true,
            },
        ],
        "arrow-body-style": ["error", "as-needed"],
        "no-console": [
            "error",
            {
                allow: ["log", "warn"],
            },
        ],
        "require-yield": 0,
        "no-trailing-spaces": "error",
        "no-shadow": "error",
        "no-multiple-empty-lines": [
            "error",
            {
                max: 3,
                maxEOF: 0,
                maxBOF: 0,
            },
        ],
        "no-empty-function": 0,
        "template-curly-spacing": 0,
        "import/no-extraneous-dependencies": 0,
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                mjs: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        ],
        "no-underscore-dangle": 0,
        "prefer-const": 0,
        "space-unary-ops": [
            2,
            {
                words: false,
                nonwords: false,
            },
        ],
    },
};
