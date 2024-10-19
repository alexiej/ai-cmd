# AI Command-line tool

Version: 	1.2.1

[![asciicast](https://asciinema.org/a/680800.svg)](https://asciinema.org/a/680800)


The AI Command-line Tool enhances your Git workflow by using AI models to automatically generate high-quality commit messages.
Currently, it supports OpenAI, with plans to expand support to other models in future releases.
It helps streamline the commit process by providing tailored, insightful messages
based on the changes in your repository, saving you time and ensuring consistent
commit formats.

With the AI Command-line Tool, you can:
- Automatically generate conventional commit messages.
- Easily configure and switch between models.
- Show nice diff for changed files.

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

### Diff Command

Show a Git diff of staged and unstaged changes with custom highlighting.


```bash
ai-cmd diff -u src/**/*.ts
```

<img width="715" alt="image" src="https://github.com/user-attachments/assets/aae70dd5-7e56-4571-9a3e-266ddb7d2f29">


## Command Line Help

```bash
AI Command-line tool
-----------------------------
This software enhances Git with AI-powered commit message generation
using OpenAI, Claude, and Ollama. Automatically create tailored,
insightful commit messages to streamline your development process.

 Version: 	 1.2.0
 Model: 	 Ollama mistral
		 [Ollama is live - 3 models available]

 Examples: 	 ai-cmd diff -u src/**/*.ts
 	 	 ai-cmd commit

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  config                    Configure model
  diff [options] [args...]  Show a Git diff of staged and unstaged changes with custom
                            highlighting
  commit                    Generate a Git commit based on the current staged changes and
                            AI-suggested commit message
  help [command]            display help for command
```

## Future improvements:

- **Support for more AI models**: Expand support to other AI models beyond OpenAI, Claude, and Ollama.
- **`review` process for code**: Implement a feature that allows the AI to review code changes and suggest improvements.
- **`summary` process for code**: Implement a summary for the code
- **`feature` process for code**: Implement a feature implementaation, when you can ask AI what to do, and it will generate the code

- **Image generation**: Add functionality for generating images .


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
