<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
	import type { UserTableItem } from "$lib/components/ui/UsersTable/schemas";
  import type { User } from "$lib/services/user";
  import { transformAndValidateUsers } from "$lib/components/ui/UsersTable/schemas"
	import { fetchUsers } from "$lib/services/user";
	import { onMount } from "svelte";
  import { Badge } from "$lib/components/ui/badge/index.js";

  export let data: UserTableItem[] = [];
  export let users: User[] = [];

  // Fetch users when the component is mounted
  onMount(async () => {
    try {
      users = await fetchUsers();
      console.log("Raw users data:", users); // Check if this is an array
      if (Array.isArray(users)) {
        data = await transformAndValidateUsers(users);
        console.log("Validated data:", data); // Ensure this is an array
      } else {
        console.error("Expected an array of users but got:", users);
        data = []; // Set data to an empty array if not valid
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  });

  console.log('Data type:', Array.isArray(data), data); // Verify data type here
</script>

<Table.Root>
  <Table.Caption>Active goinfra users.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Id</Table.Head>
      <Table.Head>Username</Table.Head>
      <Table.Head>Email</Table.Head>
      <Table.Head>Role</Table.Head>
      <Table.Head>CreatedAt</Table.Head>
      <Table.Head class="text-right">Options</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each users as user, i (i)}
      <Table.Row>
        <Table.Cell class="font-medium">{user.id}</Table.Cell>
        <Table.Cell>{user.username}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell><Badge>{user.role}</Badge></Table.Cell>
        <Table.Cell>{user.createdAt}</Table.Cell>
        <Table.Cell class="text-right font-bold">...</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
