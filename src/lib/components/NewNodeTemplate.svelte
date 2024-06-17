<script lang="ts">
    import type { INode, INodeTag, INodeTemplate } from "$lib/interfaces/types";
    import { createEventDispatcher } from "svelte";
    import IconSelector from "./IconSelector.svelte";
    import Node from "./Node.svelte";

    import {
        Form,
        FormGroup,
        TextInput,
        NumberInput,
        // ColorPicker,
        MultiSelect,
        Button,
        Tag,
    } from "carbon-components-svelte";
    import { writable } from "svelte/store";
    import { Add } from "carbon-icons-svelte";

    let tagOptions: INodeTag[] = [
        { name: "Tag1", color: "#ff0000" },
        { name: "Tag2", color: "#00ff00" },
        { name: "Tag3", color: "#0000ff" },
    ];

    let nodeTemplate = writable<INodeTemplate>({
        name: "Default Template",
        iconKey: "",
        description: "Default description",
        styles: {
            width: "fit-content",
            height: "fit-content",
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "20px",
        },
        tags: [],
    });

    let node: INode = {
        // template: $nodeTemplate,
        id: 0,
        x: 0,
        y: 0,
        edges: [],
        ...$nodeTemplate,
        templateName: $nodeTemplate.name,
    };

    $: node = {
        // template: $nodeTemplate,
        id: 0,
        x: 0,
        y: 0,
        edges: [],
        ...$nodeTemplate,
        templateName: $nodeTemplate.name,
    };

    $: console.log("->", node);

    const dispatch = createEventDispatcher<{
        create: INodeTemplate;
        cancel: INodeTemplate;
    }>();

    function handleSubmit() {
        // event.preventDefault();
        // console.log(nodeTemplate);
        dispatch("create", $nodeTemplate);
    }

    function handleCancel() {
        dispatch("cancel", $nodeTemplate);
    }
</script>

<div class="node-preview">
    <Node {node}></Node>
</div>

<div style="max-width: 500px; margin: auto;">
    <Form on:submit={handleSubmit}>
        <FormGroup legendText="Node Template Details">
            <TextInput
                id="name"
                labelText="Name"
                bind:value={$nodeTemplate.name}
            />
            <TextInput
                id="description"
                labelText="Description"
                bind:value={$nodeTemplate.description}
            />

            <TextInput
                id="width"
                labelText="Width"
                bind:value={$nodeTemplate.styles.width}
                required
            />
            <TextInput
                id="height"
                labelText="Height"
                bind:value={$nodeTemplate.styles.height}
                required
            />
            <TextInput
                id="backgroundColor"
                labelText="Background Color"
                bind:value={$nodeTemplate.styles.backgroundColor}
                required
            />
            <TextInput
                id="textColor"
                labelText="Text Color"
                bind:value={$nodeTemplate.styles.color}
                required
            />
            <!-- <TextInput
                id="padding"
                labelText="Padding"
                bind:value={$nodeTemplate.styles.padding}
                required
            /> -->
           <IconSelector bind:icon={$nodeTemplate.iconKey} />
            <!-- <MultiSelect
                id="tags"
                label="Tags"
                items={tagOptions.map(tag => ({ id: tag.name, text: tag.name}))}
                bind:selectedIds={selectedTags}
                itemToString={(item) => item.id}
                selectionFeedback="top-after-reopen"
                title="Select tags"
            /> -->

            <h5> Inputs </h5>

            <div style="">
                {#each $nodeTemplate?.inputs || [] as input, index}
                    <TextInput
                        id="padding"
                        labelText="Input {index}"
                        bind:value={input.label}
                        required
                    />
                {/each}
            </div>

            <Button
                kind="tertiary"
                icon={Add}
                on:click={() =>
                    ($nodeTemplate.inputs = [
                        ...($nodeTemplate.inputs || []),
                        { label: "", color: "black", id: $nodeTemplate.inputs?.length || 0 },
                    ])}
            >
            </Button>

            <hr>

            <h5> Outputs </h5>

            <div style="">
                {#each $nodeTemplate?.outputs || [] as output, index}
                    <TextInput
                        id="padding"
                        labelText="Output {index}"
                        bind:value={output.label}
                    />
                {/each}
            </div>

            <Button
                kind="tertiary"
                icon={Add}
                on:click={() =>
                    ($nodeTemplate.outputs = [
                        ...($nodeTemplate.outputs || []),
                        { label: "", color: "black", id: $nodeTemplate.outputs?.length || 0},
                    ])}
            >
            </Button>

 
        </FormGroup>

        <Button type="submit">Create Template</Button>
        <Button type="cancel" kind="danger" on:click={handleCancel}
            >Cancel</Button
        >
    </Form>
</div>

<style lang="scss">
    .node-preview {
        padding: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
