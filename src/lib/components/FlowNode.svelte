<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { Handle, Position, type NodeProps } from '@xyflow/svelte';
    import Node from './Node.svelte';
    import type { INode } from '$lib/interfaces/types';
  
    type $$Props = NodeProps;
    $$props;
  
    export let data: { node: INode };
  
    const { node } = data;

  </script>
  
  <div class="colorpicker">
    <Handle type="target" position={Position.Left} />
    <Node {node} />
    <Handle type="source" position={Position.Right} />
  </div>