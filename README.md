# Terraform Live Graph Extension for VSCode [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Live%20Terraform%20graph%20as%20you%20code!%20&url=https://github.com/adamiBs/vscode-terraform-live-graph&via=adambenshmuel&hashtags=terraform,aws,azure,gcp,vscode,visulization,extension)

[![Price](https://img.shields.io/badge/price-FREE-0098f7.svg)](./LICENSE.md)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/adamiBs.terraform-live-graph)](https://marketplace.visualstudio.com/items?itemName=adamiBs.terraform-live-graph)


The Terraform Graph Extension for Visual Studio Code is a plugin that allows you to generate a live Terraform graph as you code. This extension makes it easy to visualize your infrastructure and the relationships between resources, helping you to understand how your infrastructure is configured.

![GIF of a demo of the extension](./images/tf-graph-demo.gif)

## Installation

### Prerequisites

1. Install `terrafrom` from: https://developer.hashicorp.com/terraform/downloads?product_intent=terraform
2. Install `graphviz` from: https://graphviz.org/download/

### Extension Installation

1. Open Visual Studio Code.
2. Click on the Extensions icon on the left-hand side of the screen (Ctrl+Shift+X).
3. Search for "Terraform Live Graph" and click "Install".
4. Restart Visual Studio Code.

## Usage

1. Open a Terraform file in Visual Studio Code
2. Activate the extension by selecting "Terraform Graph View" from the Command Palette (`CMD+Shift+p`/`Ctrl+Shift+p` or `F1` opens the Command Palette).
3. A live graph of your Terraform code will appear on the right-hand side of the screen
4. As you write your Terraform code, the graph will update in real-time to reflect your changes

## Requirements

- Terraform must be installed on your system and accessible from the command line ([Download](https://www.terraform.io/downloads.html))
- The Terraform files must be in a valid format

## Issues and Contributions

If you encounter any issues or have any suggestions for improvements, please open an issue on the GitHub repository.

If you would like to contribute to the development of this extension, please fork the repository and submit a pull request.

## License

This extension is licensed under the MIT License. See the LICENSE file for more information.


