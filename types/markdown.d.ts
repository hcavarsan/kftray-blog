declare module '#app' {
  interface NuxtApp {
    $markdownParser: {
      processSync: (content: string) => { toString: () => string }
    }
  }
}

// Make sure this is present to make it a module
export {}
