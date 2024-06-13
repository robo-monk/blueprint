<script lang="ts">
    import "carbon-components-svelte/css/g100.css";
    import { writable } from 'svelte/store';
    import {
      SvelteFlow,
      Controls,
      Background,
      BackgroundVariant,
      MiniMap
    } from '@xyflow/svelte';
   
    // 👇 this is important! You need to import the styles for Svelte Flow to work
    import '@xyflow/svelte/dist/style.css';

    import PlatformNode from '$lib/components/PlatformNode.svelte';
    import NewNode from '$lib/components/NewNode.svelte';
    const nodeTypes = {
        'platform': PlatformNode
    }
   
    // We are using writables for the nodes and edges to sync them easily. When a user drags a node for example, Svelte Flow updates its position.
    const nodes = writable([
      {
        id: '1',
        type: 'input',
        data: { label: 'Input Node' },
        position: { x: 0, y: 0 }
      },
      {
        id: '2',
        type: 'platform',
        data: {
            color: "#FF9839",
            platformName: "Cloudflare",
            sublabel: "/hasAccess/digest(User.email)"
        },
        position: { x: 0, y: 150 }
      },
      {
        id: '3',
        type: 'platform',
        data: {
            color: "#D9D9D9",
            platformName: "TheraPsy App",
            sublabel: ""
        },
        position: { x: 120, y: 150 }
      }
    ]);
   
    // same for edges
    const edges = writable([
      {
        id: '1-2',
        type: 'default',
        source: '1',
        target: '2',
        label: 'Edge Text'
      }
    ]);
   
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

  <NewNode></NewNode>