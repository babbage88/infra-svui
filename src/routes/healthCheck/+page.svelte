<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { Button } from '$lib/components/ui/button';

    // Correctly type the writable store
    let status = writable<string | null>('Loading...');

    onMount(async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                status.set(null); // Set to null for no token
                return;
            }

            const response = await fetch('http://10.0.0.32:8993/authhealthCheck', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                status.set(data.status);
            } else {
                const text = await response.text();
                status.set(`Error fetching health status: ${text}`);
            }
        } catch (error) {
            console.error('Health check error:', error);
            status.set('Failed to connect to the server.');
        }
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
