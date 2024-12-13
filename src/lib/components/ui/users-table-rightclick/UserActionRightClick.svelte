<script lang="ts">
	import * as ContextMenu from '$lib/components/ui/context-menu';
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger>Right click</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Item>Reset Password</ContextMenu.Item>
		<ContextMenu.Item>Modify Roles</ContextMenu.Item>
		<ContextMenu.Item>Enable/Disable</ContextMenu.Item>
		<ContextMenu.Item>Delete User</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
