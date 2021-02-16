<script lang="ts">
    import { onMount } from "svelte";
    import { createCanvas, Zoom } from "../store";

    let view;

    onMount(async () => {
        const baseWidth = 64;
        const baseHeight = 64;

        const zoom = new Zoom();

        const source = createCanvas(baseWidth, baseHeight);
        const target = createCanvas(baseWidth, baseHeight);
        target.className = "layer";

        const sourceCtx = source.getContext("2d");
        sourceCtx.imageSmoothingEnabled = false;

        const targetCtx = target.getContext("2d");
        targetCtx.imageSmoothingEnabled = false;

        function draw() {
            targetCtx.imageSmoothingEnabled = false;
            targetCtx.clearRect(0, 0, target.width, target.height);
            targetCtx.drawImage(source, 0, 0, target.width, target.height);
        }
        function applyZoom(scale: number) {
            target.width = baseWidth * scale;
            target.height = baseHeight * scale;
            draw();
            if (scale > 2) {
                targetCtx.fillRect(256, 256, 1, 1);
                targetCtx.lineTo(0, 256);
                targetCtx.lineTo(256, 0);
            }
        }
        applyZoom(zoom.scale());

        view.appendChild(target);
        view.addEventListener("mousewheel", (e: WheelEvent) => {
            zoom.update(e);
            applyZoom(zoom.scale());
        });
        view.addEventListener("mousedown", (e: MouseEvent) => {
            if (e.button != 0) return;
            if ((e.target as any).tagName != "CANVAS") return;
            const r = (e.target as HTMLCanvasElement).getBoundingClientRect();
            const scale = zoom.scale();
            const x = Math.floor((e.clientX - r.left) / scale);
            const y = Math.floor((e.clientY - r.top) / scale);
            sourceCtx.fillRect(x, y, 1, 1);
            draw();
        });
    });
</script>

<div id="view" bind:this={view} />

<style>
    #view {
        align-items: center;
        display: grid;
        overflow: auto;
    }

    /* #bg {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACAQMAAABIeJ9nAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRF7u7uzMzMRUX1dQAAAAxJREFUeJxjcGBoAAABRADBOnocVgAAAABJRU5ErkJggg==");
        background-repeat: repeat;
        background-size: 16px 16px;
    } */
</style>
