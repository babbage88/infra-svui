<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { Button } from '$lib/components/ui/button';
    import { status, fetchHealthStatus } from '$lib/services/healthCheck';
    import MainNav from '$lib/components/ui/mainnav/MainNav.svelte';

    onMount(() => {
    fetchHealthStatus();
  });

  function redirectToLogin() {
    goto('/login');
  }
</script>

<h1>Health Check</h1>

{#if $status === null}
    <div>
        <p>No authentication token found. Please log in.</p>
        <Button on:click={redirectToLogin}>Go to Login</Button>
    </div>
{:else}
    <p>Status: {$status}</p>
{/if}
