<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    let status = writable('Loading...');

    onMount(async () => {
        try {
            const response = await fetch('http://10.0.0.32:8993/healthCheck');
            if (response.ok) {
                const data = await response.json();
                status.set(data.status);
            } else {
                status.set('Error fetching health status');
            }
        } catch (error) {
            status.set('Failed to connect to the server');
        }
    });
</script>

<h1>Health Check</h1>
<p>Status: {$status}</p>
