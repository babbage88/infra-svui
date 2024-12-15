<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { Input } from "$lib/components/ui/input";
    import { Button } from '$lib/components/ui/button/';
    import { Label } from "$lib/components/ui/label";
    import { login } from '$lib/services/auth';

    let username = '';
    let password = '';
    let error = '';

    const handleSubmit = async (event: Event) => {
    event.preventDefault();
    error = '';

    const result = await login(username, password);
    if (result) {
      error = result;
    } else {
      goto('/users');
    }
  };
  </script>
<div class="flex items-center justify-center min-h-screen">
    <div class="w-1/3 mx-auto p-8 shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
      <form on:submit={handleSubmit}>
        <div class="mb-4">
          <Label class="block mb-2" for="username">Username:</Label>
          <Input class="w-full border rounded-lg p-2" id="username" type="username" bind:value={username} required />
        </div>
        <div class="mb-4">
          <Label class="block mb-2" for="password">Password:</Label>
          <Input class="w-full borde rounded-lg p-2" id="password" type="password" bind:value={password} required />
        </div>
        {#if error}
          <p class="text-sm mb-4">{error}</p>
        {/if}
        <Button type="submit" class="w-full">Login</Button>
      </form>
    </div>
  </div>
