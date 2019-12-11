const cacheName = 'v2';


// Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
});

//Call Activity Event
self.addEventListener('activate', e => {
    console.log('Service Worker: InsActivatestalled');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

// Call fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            //Make copy/clone pf response
            const resClone = res.clone();

            //open Cahce
            caches
                .open(cahcename)
                .then(cahce => {
                    // Add response to cache
                    cache.put(e.request, resClone);
                });
                return res;
        }).catch(err => caches.match(e.reques.then(res => res)))
    );
})