# h2o-tf

h20-tf stands for HTML to Object Transform

For performance-oriented sites, where content is primarily, but not exclusively, HTML-based, 
it's useful to be able to take incoming HTML, and, preferably off the main thread,  "hydrating" the UI.  

<details>
<summary>Prior Arts and Crafts</summary>

Various approaches have been adopted to "hydrate" the HTML sent to the browser:

<details>
<summary>Progressive Enhancement</summary>

JQuery popularized this [technique](https://jqueryui.com/about/#progressive-enhancement)

Many JQuery UI components add JS functionality on top of the primitive HTML sent to the browser by the server.

However, the further the functionality strays from what is natively supported in the browser, the less likely the library is to try to simply "enhance" the HTML.

<details>
<summary>SSR</summary>

The way [React apparently does this is described here.](https://github.com/whatwg/dom/issues/831#issuecomment-586565905).  Kind of requires node (or a node plugin working inside another web server framework.)

</details>

<details>
<summary>Progressive Enhancement with Web Components</summary>

When [progressive enhancement of web components](https://developers.google.com/web/fundamentals/web-components/customelements#upgrades) is combined with the PRPL pattern, the results seem to outperform SSR solutions, in a seemingly simpler and less confining way.  Such techniques are compatible with all web server technologies. (Stencil may follow a slightly different approach, with very good results.)

But an interesting use case is when the light children of the web component can't practically be slotted in to the Shadow DOM of the Web Component.  

The light children can still provide the initial, pertinent information to devices where JS is disabled, including some search engines.  As the light children streams in, the browser can render as the light children stream in.

But when we upgrade / enhance the unknown element to a known element, we want to extract out the data, and allow the upgraded element to access that data, in order to generate the rich UI experience.  

If this is done in the slotchange event, it will typically require using the main thread to convert the HTML into a JS Object -- call it the "state" or the "view model" -- whatever.

This library endeavors to provide the opportunity to do the conversion from HTML to JS Objects **outside the main thread**, in a (service) worker, and to store that state in IndexedDB rather than RAM memory.  And it strives to provide that support not only for the initial "index.html" load, where applicable, but also on subsequent loading of HTML fragments.

</details>



Service Worker:  h2o-sw.js

If you have a main service worker that takes care of traditional PWA functionality, you can import this service (and other) service worker(s) using:

```JavaScript
importScripts('./h2o-sw.js');
```

Listens for postMessages of the form:

```JSON
{
    "command": "h2o-intercept",
    "message":{
        "requestUrl": "https://mydomain.com/myResource/",
        "storageKey":"a.b.c",
        "rootType": "array",
        "transform":{
            "li": {
                "type": "object",
                "prop": "item",
                "div[data-type='whatever']":{
                    "type": "object",
                    "prop": "whatever"
                } 
            }
        } 
    } 
}
```


<h2o-lilies fetch href="..." storage-key=a.b.c ></h2o-lilies> 
