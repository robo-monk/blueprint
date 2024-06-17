<!-- <script lang="ts">
    import type { IProject } from "$lib/interfaces/types";
    import NewNode from "./NewNode.svelte";
    let sideBarOpen = true;
    let project: IProject
</script> -->
<!--

<div>
    <NewNode></NewNode>
</div>

<div></div> -->

<script lang="ts">
    import {
        Header,
        HeaderUtilities,
        HeaderAction,
        HeaderPanelLinks,
        HeaderPanelDivider,
        HeaderPanelLink,
        SideNav,
        SideNavItems,
        SideNavMenu,
        SideNavMenuItem,
        SideNavLink,
        SkipToContent,
        Content,
        Grid,
        Row,
        Column,
        Button,
    } from "carbon-components-svelte";
    import NewNodeTemplate from "./NewNodeTemplate.svelte";
    import {
        newNodeFromTemplate,
        type INode,
        type INodeEdge,
        type INodeTemplate,
        type IProject,
    } from "$lib/interfaces/types";

    import NodeTemplate from "./NodeTemplate.svelte";
    import { Add, Edit } from "carbon-icons-svelte";
    import EditNode from "./EditNode.svelte";
    import {
        Background,
        BackgroundVariant,
        Controls,
        SvelteFlow,
        type NodeTypes,
        type Node as XyFlowNode,
        type Edge as XyFlowEdge,
    } from "@xyflow/svelte";
    import { get, writable, type Writable } from "svelte/store";
    import FlowNode from "./FlowNode.svelte";

    const INodeToXyFlowNode = (node: INode): XyFlowNode => ({
        id: node.id.toString(),
        type: "node",
        position: {
            x: node.x,
            y: node.y,
        },
        data: { node: writable(node) },
    });

    const XyFlowNodeToINode = (node: XyFlowNode): INode => ({
        ...(get(node.data.node) as INode),
        id: parseInt(node.id),
        x: node.position.x,
        y: node.position.y,
    });

    const newXyFlowNodeFromTemplate = (
        id: number,
        node: INodeTemplate,
    ): XyFlowNode => ({
        ...INodeToXyFlowNode(newNodeFromTemplate(node)),
        id: id.toString(),
    });

    let isSideNavOpen = false;
    let isOpen = false;

    export let project: Writable<IProject>;

    let isNewNodeTemplateOpen = $project.templates.length == 0;

    const nodes = writable<XyFlowNode[]>($project.nodes.map(INodeToXyFlowNode));

    nodes.subscribe((flowNodes) => {
        $project.nodes = flowNodes.map(XyFlowNodeToINode);
    });

    const edges = writable<XyFlowEdge[]>($project.edges || []);
    edges.subscribe((edges) => ($project.edges = edges));

    const nodeTypes = {
        node: FlowNode,
    };

    // $: $project.templates.forEach(template => {
    //     nodeTypes[template.name] = template
    // })

    // let editingNode: INode | null = null;
    let editingNode: Writable<INode> | null = null;
    let isEditOpen = false;
</script>

<Header company="Blueprint" platformName={$project.name} bind:isSideNavOpen>
    <HeaderUtilities>
        <HeaderAction
            bind:isOpen={isEditOpen}
            preventCloseOnClickOutside
            icon={Edit}
        >
            {#if !editingNode}
                <p>Nothing selected to edit</p>
            {:else}
                <EditNode node={editingNode} />
            {/if}
        </HeaderAction>

        <HeaderAction bind:isOpen preventCloseOnClickOutside>
            <Column>
                {#if isNewNodeTemplateOpen}
                    <NewNodeTemplate
                        on:create={({ detail }) => {
                            project.update((p) => {
                                p.templates.push(detail);
                                return p;
                            });
                            isNewNodeTemplateOpen = false;
                        }}
                        on:cancel={() => (isNewNodeTemplateOpen = false)}
                    />
                {:else}
                    <div
                        style="margin-top: 20px; display: flex; gap: 5px; flex-wrap: wrap;"
                    >
                        {#each $project.templates as nodeTemplate}
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div
                                role="button"
                                tabindex="0"
                                on:click={() =>
                                    nodes.update((nodes) => {
                                        nodes.push(
                                            newXyFlowNodeFromTemplate(
                                                nodes.length,
                                                nodeTemplate,
                                            ),
                                        );
                                        return nodes;
                                    })}
                            >
                                <NodeTemplate {nodeTemplate} />
                            </div>
                        {/each}
                    </div>
                    <div style="margin-top: 20px;">
                        <Button
                            icon={Add}
                            on:click={() => (isNewNodeTemplateOpen = true)}
                            >New Template</Button
                        >
                    </div>
                {/if}
            </Column>
        </HeaderAction>
    </HeaderUtilities>
</Header>

<div style="height:100vh;">
    <SvelteFlow
        {nodes}
        {edges}
        {nodeTypes}
        snapGrid={[25, 25]}
        fitView
        on:nodeclick={(event) => {
            console.log("on node click", event.detail.node);
            editingNode = event.detail.node.data.node;
            // $editingNode = XyFlowNodeToINode(event.detail.node);
            isEditOpen = true;
            isOpen = false;
        }}
    >
        <Controls />
        <Background variant={BackgroundVariant.Dots} />
        <!-- <MiniMap /> -->
    </SvelteFlow>
</div>

<style lang="scss">
    :global(.bx--header-panel--expanded) {
        width: min(60vw, 32em);
        overflow-y: scroll;
    }
</style>
