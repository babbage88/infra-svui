<script lang="ts">
    import Ellipsis from "lucide-svelte/icons/ellipsis";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    import { updateUserPassword, enableUser, disableUser, deleteUserById, updateUserRole } from "$lib/services/user"

    export let id: number;
   </script>

   <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
     <Button
      variant="ghost"
      builders={[builder]}
      size="icon"
      class="relative h-8 w-8 p-0"
     >
      <span class="sr-only">Open menu</span>
      <Ellipsis class="h-4 w-4" />
     </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
     <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
        <DropdownMenu.Item on:click={() => updateUserPassword(id, "newPassword")}>
         Reset Password
        </DropdownMenu.Item>
        <DropdownMenu.Item on:click={() => deleteUserById(id)}>
          Delete User
         </DropdownMenu.Item>
     </DropdownMenu.Group>
     <DropdownMenu.Separator />
        <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id.toString())} >
        Enable/Disable
        </DropdownMenu.Item>
        <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id.toString())}>
        Modify Roles
        </DropdownMenu.Item>
    </DropdownMenu.Content>
   </DropdownMenu.Root>