<script lang="ts">
    import type { Writable } from "svelte/store";
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";
    import Node from "./Node.svelte";
    import type { INode } from "$lib/interfaces/types";

    type $$Props = NodeProps;
    $$props;

    export let data: { node: Writable<INode> };
    export let isConnectable: $$Props["isConnectable"];

    const { node } = data;

    const DEFAULT_HANDLE_STYLE = "width: 7px; height: 7px; bottom: 0px;";
</script>

<div class="colorpicker">
    <!-- <Handle type="target" position={Position.Left} /> -->
    <Node node={$node} isInXyFlow={true}/>
    <!-- <Handle type="source" position={Position.Right} /> -->
    <!-- <Handle
        id="red"
        type="source"
        position={Position.Bottom}
        style="{DEFAULT_HANDLE_STYLE}; left: 15%; background: red;"
        {isConnectable}
    />
    <Handle
        id="blue"
        type="source"
        position={Position.Bottom}
        style="{DEFAULT_HANDLE_STYLE}; left: 50%; background: blue;"
        {isConnectable}
    />
    <Handle
        id="orange"
        type="source"
        position={Position.Bottom}
        style="{DEFAULT_HANDLE_STYLE}; left: 85%; background: orange;"
        {isConnectable}
    /> -->
</div>
