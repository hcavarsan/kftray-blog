import { ref, onMounted } from 'vue'

export interface DetectedSystem {
  os: 'darwin' | 'linux' | 'windows' | 'unknown';
  arch: 'amd64' | 'arm64';
}

export function useSystemDetection() {
  const detectedSystem = ref<DetectedSystem | null>(null)
  
  const detectSystem = () => {
    if (process.server) {
      return
    }
    
    const userAgent = navigator.userAgent.toLowerCase()
    let os: DetectedSystem['os'] = 'unknown'
    let arch: DetectedSystem['arch'] = 'amd64' // Default to amd64
    
    // Detect OS
    if (userAgent.includes('win')) {
      os = 'windows'
    } else if (userAgent.includes('mac')) {
      os = 'darwin'
    } else if (userAgent.includes('linux')) {
      os = 'linux'
    }
    
    // Try to detect architecture
    if (userAgent.includes('arm') || userAgent.includes('aarch64')) {
      arch = 'arm64'
    }
    
    // Better M1/M2 Mac detection - if on macOS, default to arm64 for newer Macs
    // This will improve ARM64 detection significantly for macOS
    if (os === 'darwin') {
      // Check for Apple Silicon Macs
      // Modern way to detect Apple Silicon (most reliable)
      try {
        // @ts-ignore - this property exists in modern Safari but TypeScript doesn't know about it
        const isAppleSilicon = navigator.userAgentData?.platform === 'macOS' && 
                               navigator.userAgentData?.brands.some(b => b.brand.includes('Safari'));
        
        // Secondary checks for Apple Silicon
        const isMostLikelyAppleSilicon = 
          // Modern Macs with Apple Silicon often have touch capabilities via Touch Bar
          (navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 0) ||
          // Check for user agent clues
          userAgent.includes('mac') && (new Date().getFullYear() >= 2020);
        
        if (isAppleSilicon || isMostLikelyAppleSilicon) {
          arch = 'arm64'
        }
      } catch (e) {
        // Fallback to simpler detection if the above fails
        if (navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 0) {
          arch = 'arm64'
        }
      }
    }
    
    detectedSystem.value = { os, arch }
  }
  
  onMounted(() => {
    detectSystem()
  })
  
  return {
    detectedSystem,
    detectSystem
  }
}