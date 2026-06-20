# Mandrel Commands for Amp

Mandrel Commands is a small [Amp](https://ampcode.com/) plugin that adds Mandrel-related commands to Amp's command palette. It is meant for people who use Mandrel from Amp and want a quick way to reconnect, inspect project state, save context, and manage tasks without remembering exact Mandrel tool names or slash commands.

## What it does

The plugin registers a **Mandrel** command category in Amp. Each command appends a short steering message to the active Amp thread, asking Amp to call the relevant Mandrel MCP tools.

Available commands:

- **Mandrel: Connect** — runs the equivalent of `/mandrel_connect`, then checks Mandrel reachability and the active project.
- **Mandrel: Show current project** — shows the active Mandrel project.
- **Mandrel: Show recent context** — fetches recent Mandrel context entries.
- **Mandrel: Search context** — prompts for a search query and searches Mandrel context.
- **Mandrel: Store context** — prompts for a note and stores it as Mandrel discussion context.
- **Mandrel: Store handoff** — prompts for a handoff note and stores it as Mandrel handoff context.
- **Mandrel: List open tasks** — lists todo, in-progress, and blocked Mandrel tasks.
- **Mandrel: Create task** — prompts for a task and asks Amp to create it in Mandrel.
- **Mandrel: Health check** — pings Mandrel and summarizes project/context/task health.

## Requirements

- Amp with plugin support enabled.
- Mandrel MCP tools configured in the Amp environment where you use the plugin.

This plugin does not provide Mandrel itself. It only adds convenient command-palette actions that ask Amp to use Mandrel. If Mandrel is not configured or reachable, the commands will still appear, but Amp will not be able to complete the Mandrel actions.

## Install globally from a URL

Install the plugin with `amp plugins add` using the raw URL for [`mandrel-commands.ts`](./mandrel-commands.ts):

```bash
amp plugins add https://raw.githubusercontent.com/dmclark/mandrel-amp-plugin/main/mandrel-commands.ts
```

To let Amp update the plugin automatically when plugins load, add `--auto-update`:

```bash
amp plugins add https://raw.githubusercontent.com/dmclark/mandrel-amp-plugin/main/mandrel-commands.ts --auto-update
```

After installing, reload plugins from Amp's command palette with:

```text
plugins: reload
```

Then search for **Mandrel** in the command palette.

## Install manually

You can also copy the plugin into Amp's system plugin directory:

```bash
mkdir -p ~/.config/amp/plugins
cp mandrel-commands.ts ~/.config/amp/plugins/mandrel-commands.ts
```

Then reload plugins in Amp:

```text
plugins: reload
```

## Project-local install

If you only want the plugin enabled for one workspace, copy it into that workspace's `.amp/plugins` directory:

```bash
mkdir -p .amp/plugins
cp mandrel-commands.ts .amp/plugins/mandrel-commands.ts
```

Then reload plugins in Amp.

## Verify installation

Run:

```bash
amp plugins list
```

You should see commands like:

```text
command: Mandrel: Connect
command: Mandrel: Show current project
command: Mandrel: Search context
```

## Development

The plugin is a single TypeScript file: [`mandrel-commands.ts`](./mandrel-commands.ts).

After editing it, reload plugins in Amp or run:

```bash
amp plugins list
```

For a basic load check, you can execute the plugin with a sample event:

```bash
amp plugins exec mandrel-commands.ts session.start --data '{"thread":{"id":"T-00000000-0000-0000-0000-000000000000"}}'
```

## Sharing and updates

For easiest sharing, send people this install command:

```bash
amp plugins add https://raw.githubusercontent.com/dmclark/mandrel-amp-plugin/main/mandrel-commands.ts --auto-update
```

The plugin includes an Amp plugin update directive as the first line of `mandrel-commands.ts`:

```ts
// @amp-plugin updated automatically from https://raw.githubusercontent.com/dmclark/mandrel-amp-plugin/main/mandrel-commands.ts
```
