# Svelte MaxChars Action

This action creates a progress bar below your textboxes or textareas to indicate the remaining space. It has a few settings to customize the bar and its behaviour.

![Example](public/sample.png)

[CHECK OUT THE ONLINE DEMO](https://wstaeblein.github.io/svelte-maxchars)

```html
<script>
    import { maxchars } from './maxchars.js';

    let options = {
        length: 80,
        class: 'txtvisual',
        height: 4,
        color: 'crimson'
    }
</script>

<div>
    <input type="text" use:maxchars={options} />
</div>

<style>
    :global(.txtvisual) {
        border: 1px solid #eee;
    }
</style>
```

## Instalation

**Only tested on Svelte 3**

This is so simple that it doesn't need a NPM package. Just copy the file ``/src/maxchars.js`` to your project's appropriate folder and import it where needed. All other files are just there for the sake of the example.


## Configuration

The action can be passed an onject with configuration parameters. If it is not passed, defaults are assumed.

| Parameter | Description | Type | Default value |
|-----------|-------------|------|---------------|
| bkg | Background color of the bar's track | Color name or code | System color 'ButtonFace' |
| color | Bar color | Color name or code | System color 'Highlight' |
| height | Thickness of the bar in pixels | Integer | 3 |
| class | a class name to be applied to the bar element | string | [EMPTY] |
| length | The maximum characters allowed in the textbox | Integer | maxlength attribute or 0 |

### Observations

- If no maxlength attribute exists and the length parameter is falsy, there will be no progress bar and text entry wont have any restriction.
- If no maxlength attribute exists but a length parameter is set to a number, that number is the maximum characters allowed.
- If both maxlength and length exists, length takes precedence.
- If you programmatically add text to a textbox with this progressbar, you'll have to dispatch an input event straight after for it to be percieved. As far as I know there is no way around this. See App.svelte for a working example.


## Example

Download this code, extract it and run:

```
npm i
npm run dev
```
Or [click here](https://wstaeblein.github.io/svelte-maxchars) to play with it online 