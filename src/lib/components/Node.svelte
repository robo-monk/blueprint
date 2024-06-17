<script lang="ts">
    import type { IHandle, INode } from "$lib/interfaces/types";
    import { project } from "$lib/writables/project.writable";
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";
    import * as icons from "carbon-icons-svelte";
    import { get, writable, type Writable } from "svelte/store";
    import HandleMock from "./HandleMock.svelte";
    // export let node: Writable<INode>;

    export let node: INode;
    export let isInXyFlow = false;

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

    const getNodesTemplate = (node: INode) =>
        get(project).templates.find((t) => t.name == node.templateName);

    const getNestedProperty = (obj: object, path: string) => {
        const keys = path.split(".");
        return keys.reduce((acc: any, key: string) => {
            if (acc === undefined) return undefined;
            return acc[key];
        }, obj);
    };

    function getNodeAttr<T>(node: INode, attr: string): T | null {
        const nodeProperty = getNestedProperty(node, attr);
        // console.log("node property is: ", nodeProperty);
        if (nodeProperty) return nodeProperty;
        const templ = getNodesTemplate(node);

        if (!templ) return null;
        const templDefault = getNestedProperty(templ, attr);
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

    let inputs: IHandle[] = []
    $: inputs = getNodeAttr(node, "inputs") || []

    let outputs: IHandle[] = []
    $: outputs = getNodeAttr(node, "outputs") || []
</script>

<div>
    <div class="node-container" style={getNodeCss(node)}>
        <!-- {JSON.stringify(node)} -->
        <div class="inputs-container">
            {#each inputs as input}
                <svelte:component
                    this={isInXyFlow ? Handle : HandleMock}
                    type="source"
                    position={Position.Top}
                    id={`${node.id}-i${input.id}`}
                    isConnectable={true}
                    style="width:8px;height:8px;"
                />
                <div class="input-item">
                    {#if input.label}
                        <small class="input-label">
                            {input.label || " "}
                        </small>
                    {/if}
                </div>
            {/each}
        </div>

        <div style="padding:20px;">
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

        <div class="outputs-container">
            {#each outputs as output}
                <svelte:component
                    this={isInXyFlow ? Handle : HandleMock}
                    type="source"
                    position={Position.Bottom}
                    id={`${node.id}-o${output.id}`}
                    isConnectable={true}
                    style="width:8px;height:8px;"
                />
                <div class="output-item">
                    {#if output.label}
                        <small class="output-label">
                            {output.label || " "}
                        </small>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .node-container {
        display: block;
        position: relative;
        border: 1px solid lightgray;
    }

    .inputs-container,
    .outputs-container {
        display: flex;
        position: absolute;
        left: 0;
        justify-content: center;
        width: 100%;
        gap: 10px;
    }

    .inputs-container {
        top: -4px;
    }

    .outputs-container {
        // top: auto;
        bottom: -4px;
    }

    :global(.input-item),
    :global(.output-item) {
        display: flex;
        flex-direction: column;
        align-items: center;

        .input-label,
        .output-label {
            font-size: 12px;
        }
    }
</style>
