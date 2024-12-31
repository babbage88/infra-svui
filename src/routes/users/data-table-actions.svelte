<script lang="ts">
    import Ellipsis from "lucide-svelte/icons/ellipsis";
    import { PasswordResetModal } from "./index.js";
    import Label from "$lib/components/ui/label/label.svelte";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import Input from "$lib/components/ui/input/input.svelte";
    import { Toaster } from "$lib/components/ui/sonner";
    import { Button } from "$lib/components/ui/button";
    import { updateUserPassword, enableUser, disableUser, deleteUserById, updateUserRole } from "$lib/services/user"
	  import { get, writable } from "svelte/store";
	import { toast } from "svelte-sonner";

    export let id: number;
 
    const newPassword = writable("");
    const showResetModal = writable(false);
    let showPasswordModal = false;

    const handlePasswordReset = async (event: CustomEvent<{ newPassword: string }>) => {
      const { newPassword } = event.detail;
      await updateUserPassword(id, newPassword);
      showPasswordModal = false;
      const msg: string = 'Password updated successfully for user id ' + id.toString() + '.';
      toast(msg);
    };
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
      <DropdownMenu.Item on:click={() => (showPasswordModal = true)}>
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

   <PasswordResetModal
   show={showPasswordModal}
   id={id}
   on:reset={handlePasswordReset}
   on:close={() => (showPasswordModal = false)}
 />
<Toaster />

 