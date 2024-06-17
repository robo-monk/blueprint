<script lang="ts">
    import type { INode, INodeTemplate } from "$lib/interfaces/types";
    import * as icons from "carbon-icons-svelte";
    import { get, writable, type Writable } from "svelte/store";
    import Node from "./Node.svelte";
    export let nodeTemplate: INodeTemplate;
</script>

<Node
    node={{
        id: 0,
        x: 0,
        y: 0,
        // template: nodeTemplate,
        templateName: nodeTemplate.name,
        edges: [],
    }}
/>
