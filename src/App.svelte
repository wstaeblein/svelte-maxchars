<script>
    import { maxchars } from './maxchars.js';
    let inp, tarea, inpVal, tareaVal;
    let optArea = {
        length: 300,
        class: 'countercls',
        height: 8,
        color: 'crimson'
    }


    function insertText() {
        inp.value = 'Lorem ipsum dolor sit amet';

        // Changing the value programmatically doesn't fire the 
        // textbox events, so we have to help out and trigger one
        inp.dispatchEvent(new Event('input'));
    }
</script>

<main>
    <h2>Maxchars Svelte Action</h2>
    <p>Try to enter text in the boxes below using different methods to see the action working</p>
    <ul>
        <li>Type text</li>
        <li>Paste text using CTRL+V</li>
        <li>Paste text using the context menu</li>
        <li>Drop text via drag and drop</li>
        <li>Insert text programmatically</li>
    </ul>
    <br><hr><br>
    <div>Simple use: Defaults only</div>
    <br>

    <div>
        <div>
            <input type="text" bind:this={inp} bind:value={inpVal} maxlength="50" use:maxchars />
        </div>
        
        <div>{inpVal?.length || 0}/{inp ? inp.getAttribute('maxLength') : 0}</div><br>
        <div>
            <button id="instxt" on:click={insertText}>Insert Text</button>
        </div>
    </div>
    <br>
    <div>With a few changes: Thicker line with a different color and a custom class</div>
    <br>    
    <div>
        <textarea rows="8" bind:this={tarea} bind:value={tareaVal} use:maxchars={optArea} maxlength="250"></textarea>
        <div>{tareaVal?.length || 0}/{tarea ? tarea.getAttribute('maxLength') : 0}</div><br>
    </div>
    
</main>

<style>
    p {
        text-align: left;
    }
    ul {
        text-align: left;
        margin: auto !important;
        width: fit-content;
        padding: 0;
        margin: 0;
    }
    h2 {
        text-align: center;
    }
    main {
        max-width: 600px;
        margin: 2em auto;
        text-align: center;
    }
    input, textarea {
        max-width: 500px;
        width: 100%;
        margin: 0;
        border: 1px solid #aaa;
    }


    :global(.countercls) {
        border: 1px solid #aaa;
        border-top: none;
    }
</style>