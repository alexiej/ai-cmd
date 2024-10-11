# AI Command-line tool

Version: 	1.1.0

The AI Command-line Tool enhances your Git workflow by using AI models to automatically generate high-quality commit messages.
Currently, it supports OpenAI, with plans to expand support to other models in future releases.
It helps streamline the commit process by providing tailored, insightful messages
based on the changes in your repository, saving you time and ensuring consistent
commit formats.

With the AI Command-line Tool, you can:
- Automatically generate conventional commit messages.
- Easily configure and switch between models.


## Features

- **AI-powered commit messages**: Automatically generate detailed commit messages based on code changes.
- **Support for multiple AI models**: Easily switch between OpenAI models.
- **Integrated with Git**: Seamless interaction with Git for streamlined commit workflows.


## Installation

To install the CLI tool globally, ensure you have Node.js installed, then run the following command:

```bash
npm i @alexiej/ai-cmd
```

## Usage

### Config Command

To configure the AI model run:

```bash
ai-cmd config
```

This will prompt you to select the AI model you want

### Commit Command

To automatically generate a commit message and commit changes:

```bash
ai-cmd commit
```

This will analyze the changes in your Git repository, generate a commit message using the selected AI model, and commit the changes.

**Example** generated commit message:

```
feat: Add user authentication to the application

- Implemented OAuth2 login flow.
- Added user session management.
- Fixed bugs related to session expiration.

Closes #123
```

## Future improvements:

- **Support for more AI models**: Expand support to other AI models beyond OpenAI, Claude, and Ollama.
- **Review process for code**: Implement a feature that allows the AI to review code changes and suggest improvements.
- **Image generation**: Add functionality for generating images or diagrams based on the project or commit context.

## LICENCE

MIT License

Copyright (c) 2024 alexiej

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
