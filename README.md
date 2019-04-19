# PWA

## What are PWA?

- Be **reliable**: Load fast and provide offline functionality
- **Fast**: respond quickly to user actions
- **Engaging**: feel like a native app

## Mobile web vs Native Apps

### Statistics

- 87% Native apps
- 13% Mobile apps (web page in the browser)

### Why mobile

- Push Notifications bring Users back

- Home Screen icons make easy

- Access Native device features

- Possibly work offline

### Why not mobile

- Learn two different languages

### Do you really want to build a native app?

- The average user install 0 new apps per month
- The average app does not get that much time

### PWA

- You get the best from both worlds (the traditional web page and the mobile native app)

# Core Building blocks

## Service workers

Allow caching, push notifications and background sync.

## Application manifest

Makes the application 'installable'

## Geolocation API

Access User Location

## Media API

Access device camera.

## Service Worker support

Go to [is service worker ready](https://jakearchibald.github.io/isserviceworkerready/)


## Dynamic caching

In the `fetch` event of the Service Worker, data is stored in a `dynamic` cache if it was not found previously in the caches.