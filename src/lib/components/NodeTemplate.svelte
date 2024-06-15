<script lang="ts">
    import type { INode, INodeTemplate } from "$lib/interfaces/types";
    import * as icons from "carbon-icons-svelte";
    import { get, writable, type Writable } from "svelte/store";
    import Node from "./Node.svelte";
    // export let node: Writable<INode>;
    export let nodeTemplate: INodeTemplate;

    // const getNodeAttr = (node: INode, attr: string): any => {
    //     const properties = attr.split('.');
    //     const getValue = (obj: any, props: string[]): any => {
    //         if (props.length === 0) return obj;
    //         const [first, ...rest] = props;
    //         if (obj[first] !== undefined) {
    //             return getValue(obj[first], rest);
    //         } else if (obj.template && obj.template[first] !== undefined) {
    //             return getValue(obj.template[first], rest);
    //         }
    //         return undefined;
    //     };
    //     return getValue(node, properties);
    // };
</script>

<Node node={{
    id: 0,
    x: 0,
    y: 0,
    template: nodeTemplate,
    edges: []
}}/>