import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig> {
  scrollBehavior(to, from, savedPosition) {
    // Handle URL with language parameter
    const toParams = new URLSearchParams(to.fullPath.split('?')[1] || '')
    const fromParams = new URLSearchParams(from.fullPath.split('?')[1] || '')
    
    // If we're changing language but staying on the same page, don't scroll
    if (to.path === from.path && toParams.get('lang') !== fromParams.get('lang')) {
      return false
    }
    
    // Use default scroll behavior otherwise
    if (savedPosition) {
      return savedPosition
    }
    
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 30
      }
    }
    
    return { top: 0 }
  }
}