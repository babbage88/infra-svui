<script lang="ts">
    import { type Variant, badgeVariants } from "./index.js";
    import { cn } from "$lib/utils.js";

    let className: string | undefined | null = undefined;
    export let href: string | undefined = undefined;
    //export let variant: Variant = "default";
    export let value: string;  // Prop to accept value for the badge
    export { className as class };
      // Determine the variant based on the value
  let variant: Variant;
  $: {
    if (value === "Admin") {
      variant = "destructive";  // Example variant based on the value
    } else if (value === "None") {
      variant = "outline";  // Another variant for the "Hot" value
    } else {
      variant = "default";  // Default variant
    }
  }
  </script>

  <svelte:element
    this={href ? "a" : "span"}
    {href}
    class={cn(badgeVariants({ variant, className }))}
    {...$$restProps}
  >
    <slot>{value}</slot>  <!-- Default to the 'value' prop if no slot content is provided -->
  </svelte:element>
