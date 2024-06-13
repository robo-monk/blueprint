<script lang='ts'>
    import { writable } from "svelte/store";
    import * as icons from "carbon-icons-svelte";
    import { TextInput } from "carbon-components-svelte";

    let hideSearch = true;
    const iconKeys = Object.keys(icons);
    const selectedIcon = writable<string | null>(null);
    export let icon: string | null = null;
    $: console.log({ icon });

    selectedIcon.subscribe(v => icon = v);
    // $: icon = $selectedIcon

    let searchQuery = "";

    function handleSelect(icon: string) {
        selectedIcon.set(icon);
        searchQuery = icon;
        hideSearch = true;
    }

    function filterIcons(query: string) {
        return iconKeys.filter(key => key.toLowerCase().includes(query.toLowerCase()));
    }
</script>

<div style="display: flex; align-items: center;">
    {#if $selectedIcon && hideSearch}
        <div class="icon-preview">
            <svelte:component this={icons[$selectedIcon]} />
        </div>
    {/if}

    <div style="flex-grow: 1;">
        <TextInput
            labelText="Icon"
            placeholder="Search icons"
            bind:value={searchQuery}
            spellcheck="false"
            on:input={() => hideSearch = false}
        />

        {#if searchQuery && !hideSearch}
            <div style="max-height: 300px; overflow-y: auto;">
                {#each filterIcons(searchQuery).slice(0, 20) as icon}
                    <div on:click={() => handleSelect(icon)} class="icon-item">
                        <svelte:component this={icons[icon]} />
                        {icon}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .icon-item {
        user-select: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px; 
        padding: 10px 5px;
        &:hover {
            background-color: #00008B; // beautiful dark blue
        }
    }
    .icon-preview {
        margin-right: 10px;
    }
</style>
