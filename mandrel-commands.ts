// @amp-plugin updated automatically from https://raw.githubusercontent.com/dmclark/mandrel-amp-plugin/main/mandrel-commands.ts

import type { PluginAPI, PluginCommandContext } from '@ampcode/plugin'

const CATEGORY = 'Mandrel'

type CommandSpec = {
	id: string
	title: string
	description: string
	buildMessage: (ctx: PluginCommandContext) => Promise<string | undefined>
}

async function appendToActiveThread(ctx: PluginCommandContext, content: string) {
	if (!ctx.thread) {
		await ctx.ui.notify('Open an Amp thread before running a Mandrel command.')
		return
	}

	await ctx.thread.appendUserMessage({ type: 'user-message', content }, { steer: true })
}

async function prompt(ctx: PluginCommandContext, title: string, helpText: string) {
	const value = await ctx.ui.input({ title, helpText, submitButtonText: 'Send' })
	const trimmed = value?.trim()
	return trimmed ? trimmed : undefined
}

const commands: CommandSpec[] = [
	{
		id: 'mandrel-project-current',
		title: 'Show current project',
		description: 'Ask Amp to show the active Mandrel project.',
		async buildMessage() {
			return 'Use the Mandrel project_current tool and summarize the active project.'
		},
	},
	{
		id: 'mandrel-recent-context',
		title: 'Show recent context',
		description: 'Ask Amp to fetch recent Mandrel context entries.',
		async buildMessage() {
			return 'Use the Mandrel context_get_recent tool with limit 10 and summarize the recent context entries.'
		},
	},
	{
		id: 'mandrel-search-context',
		title: 'Search context',
		description: 'Prompt for a query and ask Amp to search Mandrel contexts.',
		async buildMessage(ctx) {
			const query = await prompt(ctx, 'Search Mandrel context', 'What should Mandrel search for?')
			if (!query) return undefined
			return `Use the Mandrel context_search tool for this query and summarize the best matches: ${query}`
		},
	},
	{
		id: 'mandrel-store-context',
		title: 'Store context',
		description: 'Prompt for a note and ask Amp to store it in Mandrel.',
		async buildMessage(ctx) {
			const note = await prompt(ctx, 'Store Mandrel context', 'What context should Mandrel remember?')
			if (!note) return undefined
			return `Store this in Mandrel as discussion context with relevant tags if obvious: ${note}`
		},
	},
	{
		id: 'mandrel-store-handoff',
		title: 'Store handoff',
		description: 'Prompt for a handoff note and ask Amp to save it in Mandrel.',
		async buildMessage(ctx) {
			const note = await prompt(ctx, 'Store Mandrel handoff', 'What handoff should Mandrel remember?')
			if (!note) return undefined
			return `Store this in Mandrel as handoff context with relevant tags if obvious: ${note}`
		},
	},
	{
		id: 'mandrel-list-tasks',
		title: 'List open tasks',
		description: 'Ask Amp to list todo, in-progress, and blocked Mandrel tasks.',
		async buildMessage() {
			return 'Use the Mandrel task_list tool for todo, in_progress, and blocked tasks, then summarize the open work.'
		},
	},
	{
		id: 'mandrel-create-task',
		title: 'Create task',
		description: 'Prompt for a task and ask Amp to create it in Mandrel.',
		async buildMessage(ctx) {
			const task = await prompt(ctx, 'Create Mandrel task', 'What task should Mandrel create?')
			if (!task) return undefined
			return `Create a Mandrel task from this request, choosing a suitable type, priority, and tags: ${task}`
		},
	},
	{
		id: 'mandrel-connect',
		title: 'Connect',
		description: 'Ask Amp to reconnect to Mandrel and confirm it is reachable.',
		async buildMessage() {
			return 'Run the equivalent of /mandrel_connect: reconnect to Mandrel if needed, then use the Mandrel mandrel_ping and project_current tools to confirm Mandrel is reachable and report the active project.'
		},
	},
	{
		id: 'mandrel-health-check',
		title: 'Health check',
		description: 'Ask Amp to ping Mandrel and report project health.',
		async buildMessage() {
			return 'Use Mandrel mandrel_ping, project_current, context_stats, decision_stats, and task_progress_summary, then report whether Mandrel is reachable and what the project state looks like.'
		},
	},
]

export default function (amp: PluginAPI) {
	for (const command of commands) {
		amp.registerCommand(
			command.id,
			{
				title: command.title,
				category: CATEGORY,
				description: command.description,
			},
			async (ctx) => {
				const message = await command.buildMessage(ctx)
				if (!message) return

				await appendToActiveThread(ctx, message)
			},
		)
	}

	amp.logger.log('Mandrel command palette plugin initialized')
}
