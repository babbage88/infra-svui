<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";
	import  ExamplesNav  from '$lib/components/ui/examples-nav/examples-nav.svelte';
	import DarkModeToggle from '$lib/components/ui/lightswitch/DarkModeToggle.svelte';
	let { children } = $props();
</script>

<ModeWatcher />
<div class="flex flex-col min-h-screen">
	<header class="flex justify-between items-center p-4">
		<ExamplesNav />
		<DarkModeToggle />
	</header>
	<main class="flex-1 p-4">
		{@render children()}
	</main>
</div>
