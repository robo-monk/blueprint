<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import type { Writable } from "svelte/store";

  // type $$Props = NodeProps;

  export let data: { color: string; platformName: string; sublabel: string };
  console.log("data", data);
  const { color, platformName, sublabel } = data;
</script>

<div class="node" style="background-color: {color};">
  <Handle type="target" position={Position.Top} />
  <h1>{platformName}</h1>
  {#if sublabel}
    <p>{sublabel}</p>
  {/if}
  <Handle type="source" position={Position.Bottom} />
</div>

<style lang="scss">
  .node {
    padding: 3px 10px;
    border-radius: 3px;
  }
</style>
