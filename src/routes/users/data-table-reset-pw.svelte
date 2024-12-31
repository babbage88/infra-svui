<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { goto } from '$app/navigation';
    import { updateUserPassword } from "$lib/services/user";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let show: boolean = false;
    export let id: number;

    let newPassword = '';

    
    const resetPassword = () => {
    dispatch('reset', { newPassword });
    newPassword = '';
  };

  const closeModal = () => {
    dispatch('close');
  };
   </script>
    
  {#if show}
  <div class="fixed inset-0 flex items-center justify-center">
   <Card.Root class="w-[350px]">
    <Card.Header>
     <Card.Title>Reset Password</Card.Title>
     <Card.Description>Enter new password for user id {id}.</Card.Description>
    </Card.Header>
    <Card.Content>
     <form>
      <div class="grid w-full items-center gap-4">
       <div class="flex flex-col space-y-1.5">
        <Label for="name">Password</Label>
        <Input id="name" placeholder="New Password" type="password" bind:value={newPassword}/>
       </div>
      </div>
     </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">
     <Button variant="outline" on:click={closeModal}>Cancel</Button>
     <Button on:click={resetPassword}>Reset Password</Button>
    </Card.Footer>
   </Card.Root>
  </div>
   {/if}