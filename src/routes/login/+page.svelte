<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { Input } from "$lib/components/ui/input";
    import { Button } from '$lib/components/ui/button/';
    import { login } from '$lib/services/auth';

    let username = '';
    let password = '';
    let error = '';
    const apiLoginUrl = import.meta.env.VITE_API_URL + '/login'

    // @ts-ignore
    const handleSubmit = async (event) => {
    event.preventDefault();
    error = '';

    const result = await login(username, password);
    if (result) {
      error = result;
    } else {
      goto('/healthCheck');
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
