# Manta Network Documentation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Manta Network is a multi-modular ecosystem for zero-knowledge (ZK) applications. This documentation is available at [docs.manta.network](https://docs.manta.network).

## 📋 About

This repository contains the official Manta Network documentation. The website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- Yarn

### Installation

```console
yarn install
```

### Local Development

```console
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## 🌐 Localization

We use [Translate plugin data](https://docusaurus.io/docs/i18n/tutorial#translate-plugin-data) for managing translations.

### Available Languages:
- English (default)
- Italian (it)
- Chinese (cn)

### Running Localized Versions

Italian version:
```console
yarn run start --locale it
```

Chinese version:
```console
yarn run start --locale cn
```

Translations are located in the `i18n/{locale}` directory.

## 📦 Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

For GitHub Pages hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## 🤝 How to Contribute

1. Fork the repository
2. Create a branch for your changes
3. Make your changes and commit them
4. Submit a pull request

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.
