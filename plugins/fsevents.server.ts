export default defineNuxtPlugin(() => {
    if (process.server) {
      try {
        require('fsevents')
      } catch (e) {
        // fsevents is optional
      }
    }
  })
