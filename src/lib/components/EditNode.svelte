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
    import { writable, type Writable } from "svelte/store";

    export let node: Writable<INode>;
    $: console.log("->", node);

    const dispatch = createEventDispatcher<{
        done: INode;
        cancel: INode;
    }>();

    function handleSubmit() {
        // event.preventDefault();
        // console.log(nodeTemplate);
        dispatch("done", $node);
    }

    function handleCancel() {
        dispatch("cancel", $node);
    }
</script>

<div class="node-preview">
    <Node node={$node}></Node>
</div>

<div style="max-width: 500px; margin: auto;">
    <Form on:submit={handleSubmit}>
        <FormGroup legendText="Node Template Details">
            <TextInput id="name" labelText="Name" bind:value={$node.name} />
            <TextInput
                id="description"
                labelText="Description"
                bind:value={$node.description}
            />

            <TextInput
                id="width"
                labelText="Width"
                bind:value={$node.styles.width}
                required
            />
            <TextInput
                id="height"
                labelText="Height"
                bind:value={$node.styles.height}
                required
            />
            <TextInput
                id="backgroundColor"
                labelText="Background Color"
                bind:value={$node.styles.backgroundColor}
                required
            />
            <TextInput
                id="textColor"
                labelText="Text Color"
                bind:value={$node.styles.color}
                required
            />
            <TextInput
                id="padding"
                labelText="Padding"
                bind:value={$node.styles.padding}
                required
            />

            <IconSelector bind:icon={$node.styles.iconKey} />
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

        <Button type="submit">Done Editing</Button>
        <Button type="cancel" kind="danger" on:click={handleCancel}
            >Abort</Button
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
