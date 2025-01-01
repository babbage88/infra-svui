<script lang="ts">
  import { UserRolesBadge } from '$lib/components/ui/badge-with-props/index.js';

  // Type definition for the function's argument
  function createRoleBadges(roles: string[]) {
    return roles.map(role => {
      return { role };  // Return an object that can be used in the #each block
    });
  }

  // Example roles array
  export let roles: string[];

  // Use the function to create badges
  let badges = createRoleBadges(roles);
</script>

<div>
  <!-- Render badges using the #each block -->
  {#each badges as { role }}
    <UserRolesBadge class="mx-0.5" value={role} />
  {/each}
</div>