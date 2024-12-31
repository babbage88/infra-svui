<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { goto } from '$app/navigation';
    import { updateUserPassword } from "$lib/services/user";
    
    let id: number;
    let password = '';
    let error = '';

    const handleSubmit = async (event: Event) => {
    event.preventDefault();
    error = '';

    const result = await updateUserPassword(id, password);
    if (result) {
      error = result;
    } else {
      goto('/users');
    }
}
   </script>
    
   <Card.Root class="w-[350px]">
    <Card.Header>
     <Card.Title>Reset Password</Card.Title>
     <Card.Description>Enter new password for user.</Card.Description>
    </Card.Header>
    <Card.Content>
     <form>
      <div class="grid w-full items-center gap-4">
       <div class="flex flex-col space-y-1.5">
        <Label for="name">Password</Label>
        <Input id="name" placeholder="New Password" type="password" />
       </div>
       <div class="flex flex-col space-y-1.5">
        <Label for="framework">Framework</Label>
        <Select.Root>
         <Select.Trigger id="framework">
          <Select.Value placeholder="Select" />
         </Select.Trigger>
        </Select.Root>
       </div>
      </div>
     </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">
     <Button variant="outline">Cancel</Button>
     <Button>Deploy</Button>
    </Card.Footer>
   </Card.Root>