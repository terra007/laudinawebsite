// Die alte IONOS-Website hat unter dieser Adresse einen Service Worker installiert,
// der ihre Seiten aus dem Browser-Zwischenspeicher ausliefert. Diese Version ersetzt
// ihn, löscht seine Caches, meldet sich ab und lädt offene Tabs mit der neuen Seite neu.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: "window" });
      windows.forEach((client) => client.navigate(client.url));
    })(),
  );
});
