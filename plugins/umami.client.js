// Umami Analytics plugin
export default defineNuxtPlugin(() => {
  const umamiScript = document.createElement('script')
  umamiScript.defer = true
  umamiScript.src = 'https://analytics.cavarsa.app/script.js'
  umamiScript.setAttribute('data-website-id', '14fdf04f-6284-42ce-a1fb-bee76923e10d')
  document.head.appendChild(umamiScript)
})