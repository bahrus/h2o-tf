# h2o-tf

HTML to Object Transform

Service Worker:  h2o-sw.js

Watches for requests with header:  h2o: {processor: processor-path.js, storage-id: "[prefix] + href"}

const {processor} = await import([processor-path].js);

processor(fetchedHTML){
    //stores object in indexedDB with id:  prefix + href + hashcode of body 
    //sends message when done
}

<h2o-lilies fetch href="..."></h2o-lilies> 
