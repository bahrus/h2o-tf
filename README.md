# h2o-tf

HTML to Object Transform

Service Worker:  h2o-sw.js

Watches for requests with header:  h2o: {processor: processor-path.js, storage-id: "myId"}

const {processor} = await import([processor-path].js);

processor(fetchedHTML){
    //stores json object string in session storage with key myID
    //sends message when done
}

<h2o-lilies fetch href="..."></h2o-lilies> 
