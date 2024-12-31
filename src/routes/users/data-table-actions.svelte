<script lang="ts">
    import Ellipsis from "lucide-svelte/icons/ellipsis";
    import Label from "$lib/components/ui/label/label.svelte";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import Input from "$lib/components/ui/input/input.svelte";
    import { Button } from "$lib/components/ui/button";
    import { updateUserPassword, enableUser, disableUser, deleteUserById, updateUserRole } from "$lib/services/user"
	import { get, writable } from "svelte/store";

    export let id: number;

    const newPassword = writable("");
  const showResetModal = writable(false);

  const handlePasswordReset = async () => {
    const password = get(newPassword);
    if (password) {
      try {
        await updateUserPassword(id, password);
        alert("Password reset successfully!");
      } catch (error) {
        console.error("Error resetting password:", error);
        alert("Failed to reset password.");
      }
    } else {
      alert("Password cannot be empty!");
    }
    showResetModal.set(false);
    newPassword.set("");
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
      <DropdownMenu.Item on:click={() => showResetModal.set(true)}>
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

   {#if $showResetModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-1/3 rounded-lg p-6 shadow-lg">
      <h3 class="text-lg font-semibold mb-4">Reset Password</h3>
      <div>
        <Label class="block mb-2 text-sm font-medium text-gray-700">New Password</Label>
        <Input
          type="password"
          class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={$newPassword}
        />
      </div>
      <div class="mt-4 flex justify-end space-x-2">
        <Button variant="secondary" on:click={() => showResetModal.set(false)}>
          Cancel
        </Button>
        <Button on:click={handlePasswordReset}>
          Reset
        </Button>
      </div>
    </div>
  </div>
{/if}