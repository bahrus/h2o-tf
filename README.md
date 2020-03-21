# h2o-tf

HTML to Object Transform

Service Worker:  h2o-sw.js

Watches for requests with hash: processor:processor-path.js

const {processor} = await import([processor-path].js);

processor(fetchedHTML){
    //stores object in indexedDB with id:  prefix + href 
    //sends message when done
}

<h2o-lilies fetch href="..."></h2o-lilies> 
