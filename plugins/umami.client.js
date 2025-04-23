// Umami Analytics plugin
export default defineNuxtPlugin(() => {
  const umamiScript = document.createElement('script')
  umamiScript.defer = true
  umamiScript.src = 'https://umami.cavarsa.app/script.js'
  umamiScript.setAttribute('data-website-id', '70662892-98e8-48ce-bde0-d360b7a0d0fc')
  document.head.appendChild(umamiScript)
})
