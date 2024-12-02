<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { Input } from "$lib/components/ui/input"
    import { Button } from '$lib/components/ui/button/';

    let username = '';
    let password = '';
    let error = '';

    // @ts-ignore
    const handleSubmit = async (event) => {
      event.preventDefault();
      error = '';

      try {
        const response = await fetch('http://10.0.0.32:8993/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data = await response.json();
          // Store the token in localStorage or a cookie
          localStorage.setItem('authToken', data.token);
          // Redirect to another page
          goto('/healthCheck');
        } else {
          const text = await response.text();
          error = `Login failed: ${text}`;
        }
      } catch (err) {
        console.error('Error logging in:', err);
        error = 'An unexpected error occurred.';
      }
    };
  </script>

<main class="flex items-center justify-center min-h-screen">
    <div class="w-1/3 mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
      <form on:submit={handleSubmit}>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="username">Username:</label>
          <Input class="w-full border border-gray-300 rounded-lg p-2" id="username" type="username" bind:value={username} required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="password">Password:</label>
          <Input class="w-full border border-gray-300 rounded-lg p-2" id="password" type="password" bind:value={password} required />
        </div>
        {#if error}
          <p class="text-red-500 text-sm mb-4">{error}</p>
        {/if}
        <Button type="submit" class="w-full">Login</Button>
      </form>
    </div>
  </main>
