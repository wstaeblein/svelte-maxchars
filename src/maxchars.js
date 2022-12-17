
export function maxchars(node, options) { 

    let defaults = {
        bkg: 'ButtonFace',
        color: 'Highlight',
        height: 3,
        class: '',
        length: 0
    }
    let opts = {...defaults, ...(options || {})}; 
    let width = node.offsetWidth;
    let maxchars = Math.abs(+(opts.length || node.getAttribute('maxlength'))); 
    let eventList = 'focus blur input';
    let slider = document.createElement('div');         // The outer bar
    let bar = document.createElement('div');            // The inner bar
    let breaker = document.createElement("br");         // <br> to bring the progress bar into place

    if (maxchars) {
        const observer = new ResizeObserver(handleResize);

        // To eliminate the empty space a textarea leaves below it.
        if (node.tagName.toLowerCase() == 'textarea' && !node.style.verticalAlign) { node.style.verticalAlign = 'top'; }

        slider.style.cssText = `display: inline-block; vertical-align: top; width: ${width}px; height: ${opts.height}px; background-color: ${opts.bkg};`;
        bar.style.cssText = `float: left; width: 0; background-color: ${opts.color}; height: 100%; transition: all 0.3s ease`;
        if (opts.class) { slider.classList.add(opts.class); }
        slider.append(bar);

        // Add Listeners
        eventList.split(' ').forEach(evt => { node.addEventListener(evt, handleEvents); });

        insertAfter(node, breaker);
        insertAfter(breaker, slider);
        handleResize();
        window.addEventListener('resize', handleResize);
        observer.observe(node);
    }

    function handleEvents(event) {
        if (!maxchars) { return; }
        let size = node.value.length; 
        if (size > maxchars) { 
            node.value = node.value.substr(0, maxchars);
            size = maxchars;
        }
        let percent = Math.round((size * 100) / maxchars);
        bar.style.width = percent + '%';
    }

    function insertAfter(refNode, newNode) {
        refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
    }

    function handleResize() { 
        let nodeBounds = node.getBoundingClientRect();
        slider.style.width = nodeBounds.width + 'px';    
    }
   
    return {
		destroy() { 
            eventList.split(' ').forEach(evt => { node.removeEventListener(evt, handleEvents); }); 
            window.removeEventListener('resize', handleResize);
        }
	}
}