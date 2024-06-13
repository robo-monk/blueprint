<script lang="ts">
    import type { INode, INodeTag, INodeTemplate } from "$lib/interfaces/types";
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
        Tag
    } from "carbon-components-svelte";
    import { writable } from "svelte/store";

    let tagOptions: INodeTag[] = [
        { name: "Tag1", color: "#ff0000" },
        { name: "Tag2", color: "#00ff00" },
        { name: "Tag3", color: "#0000ff" },
    ];

    let node = writable<INode>({
        x: 0,
        y: 0,
        edges: [],
        template: undefined,
        iconKey: "",
        id: 0,
        name: "New Node",
        description: "Node description",
        styles: {
            width: "fit-content",
            height: "fit-content",
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "20px"
        },
        tags: []
    })

    function handleSubmit(event) {
        event.preventDefault();
        console.log(node);
    }

</script>

<div class="node-preview">
    <Node {node}></Node>
</div>

<div style="max-width: 500px; margin: auto;">
    <Form on:submit={handleSubmit}>
        <FormGroup legendText="Node Template Details">
        <TextInput id="name" labelText="Name" bind:value={$node.name} required />
        <TextInput id="description" labelText="Description" bind:value={$node.description} required />

        <TextInput id="width" labelText="Width" bind:value={$node.styles.width} required />
        <TextInput id="height" labelText="Height" bind:value={$node.styles.height} required />
        <TextInput id="backgroundColor" labelText="Background Color" bind:value={$node.styles.backgroundColor} required />
        <TextInput id="textColor" labelText="Text Color" bind:value={$node.styles.color} required />
        <TextInput id="padding" labelText="Padding" bind:value={$node.styles.padding} required />

        <IconSelector bind:icon={$node.iconKey} />
        <!-- <MultiSelect
            id="tags"
            label="Tags"
            items={tagOptions.map(tag => ({ id: tag.name, text: tag.name}))}
            bind:selectedIds={selectedTags}
            itemToString={(item) => item.id}
            selectionFeedback="top-after-reopen"
            title="Select tags"
        /> -->
        </FormGroup>
        <Button type="submit">Create Template</Button>
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