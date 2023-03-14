# Contributing to Terraform Live Graph Extension for VSCode
We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with Github
We use github to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://docs.github.com/en/get-started/quickstart/github-flow), So All Code Changes Happen Through Pull Requests
Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://docs.github.com/en/get-started/quickstart/github-flow)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. Go through the initial setup below.
3. If seen as necessary, update the documentation.
4. Issue that pull request!

## Any contributions you make will be under the MIT Software License
In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact [@adamiBs](https://github.com/adamiBs) if that's a concern.

## Local development steps
### Prerequisites
- Install Node.js v14.X.X> from: https://nodejs.org/
- Install `terrafrom` from: https://developer.hashicorp.com/terraform/downloads?product_intent=terraform
- Install `graphviz` from: https://graphviz.org/download/

1. Fork the git repo.
2. Pull the git repo via `git pull`.
3. Enter directory: `cd vscode-terraform-live-graph`
4. Recommendation: Execute `git remote add upstream https://github.com/adamiBs/vscode-terraform-live-graph.git`. This will allow synchronizing the `main` branch with changes from the upstream project via: `git pull upstream main`.
5. Next, follow the official VS Code development guide from here: https://code.visualstudio.com/api/get-started/your-first-extension#developing-the-extension
6. Currently, most of the business logic is located at [./src/vscodeTerrafromGraph.ts](./src/vscodeTerrafromGraph.ts)

## References
This document was adapted from [here](https://gist.github.com/briandk/3d2e8b3ec8daf5a27a62)
