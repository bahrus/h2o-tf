# h2o-tf

HTML to Object Transform

For performance-oriented sites, where content is primarily, but not exclusively HTML-based, 
it's useful to be able to take incoming HTML, and, off the main thread, "reverse-engineer" the underlying
data, and store it outside of RAM.

<details>
    <summary>Use Case</summary>

We may want the server to render an initial list of items in format that is fast and SEO-friendly. I.e. just send HTML to the browser. If the content is particularly large, perhaps only a portion can be displayed, the rest hidden via styling. Assume the total DOM tree(displayed and hidden) has, embedded in it, all the needed data for a richer view. Once the necessary dependencies needed to generate this richer view are downloaded, containing some expensive renderer (tree, chart, or grid, etc), we can then pass the Plain Old JavaScript Object (POJO) to the fancy renderer.


</details>

Service Worker:  h2o-sw.js

Watches for requests with hash: processor:processor-path.js

const {processor} = await import([processor-path].js);

processor(fetchedHTML){
    //stores object in indexedDB with id:  prefix + href 
    //sends message when done
}

<h2o-lilies fetch href="..."></h2o-lilies> 
