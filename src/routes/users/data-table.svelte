<script lang="ts">
	import { writable, type Writable } from 'svelte/store'; // Import writable store
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import { addPagination, addSortBy } from 'svelte-headless-table/plugins';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import DataTableActions from './data-table-actions.svelte';
	import type { User } from '$lib/services/user';
	import { UserRolesBadge } from '$lib/components/ui/badge-with-props/index.js';
	import { Button } from '$lib/components/ui/button';

	export let usersStore: Writable<User[]>; // Accept the writable store as a prop

	// Create a derived store for reactivity (we subscribe to the passed store)
	const users = writable<User[]>([]);
	usersStore.subscribe(($usersStore) => {
		users.set($usersStore); // Update the local `users` store when `usersStore` changes
	});

	// Create the table based on the users data
	const table = createTable(users, {
		page: addPagination(),
		sort: addSortBy()
	});
	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID',
			plugins: {
				sort: {
					disable: false
				}
			}
		}),
		table.column({
			accessor: 'username',
			header: 'Username',
			plugins: {
				sort: {
					disable: false
				}
			}
		}),
		table.column({
			accessor: 'email',
			header: 'Email',
			plugins: {
				sort: {
					disable: false
				}
			}
		}),
		table.column({
			accessor: 'role',
			header: 'Role',
			cell: ({ value }) => {
				return createRender(UserRolesBadge, { value: value });
			},
			plugins: {
				sort: {
					disable: false
				}
			}
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, { id: value });
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
</script>

<div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                  <Table.Head {...attrs}>
                  {#if cell.id === "id"}
                  <Button variant="ghost" on:click={props.sort.toggle}>
                    <Render of={cell.render()} />
                    <ArrowUpDown class={"ml-2 h-4 w-4"} />
                  </Button>
                  {:else if cell.id === "username"}
                  <Button variant="ghost" on:click={props.sort.toggle}>
                    <Render of={cell.render()} />
                    <ArrowUpDown class={"ml-2 h-4 w-4"} />
                  </Button>
                  {:else if cell.id ==="email"}
                  <Button variant="ghost" on:click={props.sort.toggle}>
                    <Render of={cell.render()} />
                    <ArrowUpDown class={"ml-2 h-4 w-4"} />
                  </Button>
                  {:else if cell.id === "role"}
                  <Button variant="ghost" on:click={props.sort.toggle}>
                    <Render of={cell.render()} />
                    <ArrowUpDown class={"ml-2 h-4 w-4"} />
                  </Button>
                  {:else}
										<Render of={cell.render()} />
                  {/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-4 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
