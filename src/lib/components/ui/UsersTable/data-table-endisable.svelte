<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { enableUser, disableUser } from "$lib/services/user";
    import { goto } from '$app/navigation';
    import { updateUserPassword } from "$lib/services/user";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let show: boolean = false;
    export let id: number;

    interface ExecAction {
      EnableUser: boolean
      DisableUser: boolean
    }
    
    interface Choice {
      label: string,
      value: string
    }
    let choices: Choice[] = [{label: "Enable", value: "enable"}, {label: "Disable", value: "disable"}]
    let userChoice:  Choice  = {label: "Enable", value: "enable"}
    let execAction: ExecAction = { EnableUser: true, DisableUser: false}

    
    const resetEnableDisableEvent = async () => {
      if (execAction.EnableUser === true) {
        const user = await enableUser(id);
        const msg = user.data?.username + " has been enabled."
        console.log("User enabled:", user);
        show = false;
        dispatch("reset", msg)
      } else if (execAction.DisableUser === true) {
          const user = await disableUser(id);
          const msg = user.data?.username + " has been disabled."
          console.log("User enabled:", user);
          show = false;
          dispatch("reset", msg)
      }
  };

  const choiceValueSetter = (userChoiceVal: string) => {
    if (userChoiceVal === "enable") {
      console.log("setting execAction to enable")
      execAction.EnableUser = true;
      execAction.DisableUser = false;
    } else if (userChoiceVal === "disable") { 
      console.log("setting execAction to disable")
      execAction.DisableUser = true;
      execAction.EnableUser = false;
    }
  };
  

  const closeModal = () => {
    dispatch('close');
  };
   </script>
    
  {#if show}
  <div class="fixed inset-0 flex items-center justify-center">
   <Card.Root class="w-[350px]">
    <Card.Header>
     <Card.Title>Enable/Disable User</Card.Title>
     <Card.Description>Enable or disable the selected user id {id}.</Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="flex flex-col space-y-1.5">
        <Label for="enable">Enable/Disable</Label>
        <Select.Root  
          selected={userChoice}
          onSelectedChange={(v) => v && choiceValueSetter(v.value)}
          >
          <Select.Trigger id="e">
            <Select.Value placeholder="Select" />
          </Select.Trigger>
          <Select.Content>
            {#each choices as choice}
              <Select.Item value={choice.value} label={choice.label}
                >{choice.label}</Select.Item
              >
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
    </Card.Content>
    <Card.Footer class="flex justify-between">
     <Button variant="outline" on:click={closeModal}>Cancel</Button>
     <Button on:click={resetEnableDisableEvent}>Submit</Button>
    </Card.Footer>
   </Card.Root>
  </div>
   {/if}