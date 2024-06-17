<script lang="ts">
    import "carbon-components-svelte/css/g100.css";
    import { writable, type Writable } from "svelte/store";

    // 👇 this is important! You need to import the styles for Svelte Flow to work
    import "@xyflow/svelte/dist/style.css";

    import PlatformNode from "$lib/components/PlatformNode.svelte";
    import type { IProject } from "$lib/interfaces/types";
    import { onMount } from "svelte";
    import Project from "$lib/components/Project.svelte";
    import { InlineLoading } from "carbon-components-svelte";
    import { project } from "$lib/writables/project.writable";
</script>

<!--
  👇 By default, the Svelte Flow container has a height of 100%.
  This means that the parent container needs a height to render the flow.
  -->
<!-- <div style:height="100vh">
    <SvelteFlow
      {nodes}
      {edges}
      snapGrid={[ 25, 25 ]}
      {nodeTypes}
      fitView
      on:nodeclick={(event) => console.log('on node click', event.detail.node)}
    >
      <Controls />
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />
    </SvelteFlow>
  </div> -->

<!-- <NewNode></NewNode> -->
{#if $project}
    <Project {project}></Project>
{:else}
    <InlineLoading description="Loading blueprints..." />
{/if}
