export default defineNuxtPlugin(() => {
  // WebSocket functionality will only be initialized on the client side
  const initWebSocket = () => {
    if (process.client) {
      // WebSocket initialization code here if needed
    }
  }

  return {
    provide: {
      initWebSocket
    }
  }
})
