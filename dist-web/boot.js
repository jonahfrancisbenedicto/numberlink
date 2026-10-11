// Runs before anything else, so the first paint (and the loading screen) is in the saved look:
// dark for players who chose it, rather than a white flash. Mirrors savedDark() in src/lib/store.ts.
// (A theme with a screen of its own colours, in src/lib/themes.ts, would need its tone here, and
// its page colour in index.html: there are none at present.)
try {
  var saved = JSON.parse(localStorage.getItem('numberlink:v2') || '{}')
  var theme = saved.theme || 'light'
  var dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
  // ...and in the colours of the theme chosen in Customise (the app checks it's unlocked).
  if (typeof saved.look === 'string') document.documentElement.dataset.look = saved.look
  if (saved.look === 'mono') document.documentElement.dataset.paths = saved.look
} catch (e) {
  /* no save yet: light */
}

// In the phone apps, the phone's own launch screen has just shown the finished logo: the loading
// screen carries on from it (index.html), rather than drawing it again from two dots.
try {
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform())
    document.documentElement.classList.add('native')
} catch (e) {
  /* a browser */
}
