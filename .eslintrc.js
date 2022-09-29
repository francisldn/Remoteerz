module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node":true,
        "react-native/react-native":true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-native/all",
        "plugin:@typescript-eslint/recommended",
        "airbnb",
        "prettier",
        "plugin:node/recommended"
    ],
    "overrides": [
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "react-native"
    ],
    "rules": {
        "react-native/no-unused-vars":"warn",
        "react-native/no-console":"off",
        "func-name":"off",
        "object-shorthand":"off",
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 2,
        "react-native/no-color-literals": 2,
        "react-native/no-raw-text": 2
    }
}
