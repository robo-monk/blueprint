<script lang='ts'>
    export let id: string;
    export let type: string;
    export let position;
</script>

<slot></slot>
<div class="dot"></div>

<style lang="scss">
    .dot {
        width: 8px;
        height: 8px;
        border-radius: 25px;
        background-color: black;
        border: 1px solid white;
    }
</style>