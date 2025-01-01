<script lang="ts">
    import { fetchUsers, type User } from "$lib/services/user";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";  // Import writable store
    import DataTable from "$lib/components/ui/UsersTable/data-table.svelte";

    let usersStore = writable<User[]>([]);

    // Fetch users when the page component is mounted
    onMount(async () => {
      try {
        const users = await fetchUsers();
        usersStore.set(users);
        console.log("Raw users data:", users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    });
  </script>


    <DataTable {usersStore} />

