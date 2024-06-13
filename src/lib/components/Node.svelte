<script lang="ts">
    import type { INode } from "$lib/interfaces/types";
    import { get, writable, type Writable } from "svelte/store";
    export let node: Writable<INode>;

    const getNodeAttr = (node: INode, attr: string): any => {
        const properties = attr.split('.');
        const getValue = (obj: any, props: string[]): any => {
            if (props.length === 0) return obj;
            const [first, ...rest] = props;
            if (obj[first] !== undefined) {
                return getValue(obj[first], rest);
            } else if (obj.template && obj.template[first] !== undefined) {
                return getValue(obj.template[first], rest);
            }
            return undefined;
        };
        return getValue(node, properties);
    };

    const camelToKebab = (str: string): string => {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    };

    const getNodeCss = (node: INode): string => {
        return ["width", "height", "backgroundColor", "color", "padding"]
            .map(attr => {
                const value = getNodeAttr(node, `styles.${attr}`)
                if (!value) return null
                return `${camelToKebab(attr)}:${value}`
            })
            .filter(v => !!v)
            .join('; ');
    }


</script>


<div style="display: block;{getNodeCss($node)}">
    <h4> { $node.name } </h4>
    <p> { $node.description} </p>
</div>