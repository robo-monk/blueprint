<script lang="ts">
    import type { INode } from "$lib/interfaces/types";
    import type { NodeProps } from "@xyflow/svelte";
    import * as icons from "carbon-icons-svelte";
    import { get, writable, type Writable } from "svelte/store";
    // export let node: Writable<INode>;

    export let node: INode;

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

    const getNestedProperty = (obj: object, path: string) => {
        const keys = path.split(".");
        return keys.reduce((acc: any, key: string) => {
            if (acc === undefined) return undefined;
            return acc[key];
        }, obj);
    };

    function getNodeAttr<T>(node: INode, attr: string): T {
        const nodeProperty = getNestedProperty(node, attr);
        // console.log("node property is: ", nodeProperty);
        if (nodeProperty) return nodeProperty;
        const templDefault = getNestedProperty(node.template, attr);
        // console.log("templDef", templDefault);
        return templDefault;
    }

    const camelToKebab = (str: string): string => {
        return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    };

    const getNodeCss = (node: INode): string => {
        return ["width", "height", "backgroundColor", "color", "padding"]
            .map((attr) => {
                const value = getNodeAttr(node, `styles.${attr}`);
                if (!value) return null;
                return `${camelToKebab(attr)}:${value}`;
            })
            .filter((v) => !!v)
            .join("; ");
    };

    let iconComponent: any;
    $: {
        const iconKey = getNodeAttr<string>(node, "iconKey");
        if (iconKey && iconKey in icons) {
            if (iconKey in icons) {
                // @ts-ignore
                iconComponent = icons[iconKey] as any;
            } else {
                console.error("could not find icon", iconKey);
            }
        }
    }
</script>

<div style="display: block;{getNodeCss(node)}">
    <h4>
        {#if getNodeAttr(node, "iconKey")}
            <svelte:component
                this={iconComponent}
                color={getNodeAttr < String > (node, "styles.color")}
            ></svelte:component>
        {/if}
        {getNodeAttr(node, "name")}
    </h4>
    <p>{getNodeAttr(node, "description")}</p>
</div>
