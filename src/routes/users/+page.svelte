<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import type { User } from "$lib/services/user";
    import { fetchUsers } from "$lib/services/user";
    import UserDropDownMenu from "$lib/components/ui/userTableDropdownMenu/UserDropDownMenu.svelte";
	import { onMount } from "svelte";
    let users: User[] = [];
    let error: string | null = null;

    // Fetch users when the component mounts
    onMount(async () => {
      try {
        users = await fetchUsers();
      } catch (err) {
        error = 'Failed to fetch users';
        console.error('Error fetching users:', err);
      }
    });
  </script>

<Table.Root>
    <Table.Caption>Active go-infra users</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[100px]">ID</Table.Head>
        <Table.Head>Username</Table.Head>
        <Table.Head>Email</Table.Head>
        <Table.Head>Role</Table.Head>
        <Table.Head>Enabled</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#if error}
        <Table.Row>
          <Table.Cell class="text-center">{error}</Table.Cell>
        </Table.Row>
      {:else if users.length === 0}
        <Table.Row>
          <Table.Cell class="text-center">No users found.</Table.Cell>
        </Table.Row>
      {:else}
        {#each users as user}
          <Table.Row>
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>{user.enabled ? 'Yes' : 'No'}</Table.Cell>
          </Table.Row>
        {/each}
      {/if}
    </Table.Body>
  </Table.Root>