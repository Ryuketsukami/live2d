<template>
  <div class="default-layout">
    <div class="live2d-container">
      <div v-if="!coreLoaded" class="loading">
        Loading Live2D Core...
      </div>
      <div v-else-if="!appInitialized" class="loading">
        Initializing Live2D App...
      </div>
      
      <div class="canvas-outer-container">
        <div id="live2d-canvas-container" ref="canvasContainer"></div>
      </div>
      <!-- Canvas container - canvases will be added here by LAppDelegate -->
    </div>
    <slot />
  </div>
</template>

<script>
import { Live2DCubismFramework } from "../../public/sdk/Framework/src/live2dcubismframework";
// Import your LAppDelegate - adjust the path as needed
import { LAppDelegate } from "../../public/sdk/helpers/lappdelegate";

export default {
  name: 'Live2DComponent',
  
  data() {
    return {
      coreLoaded: false,
      appInitialized: false,
      appDelegate: null
    }
  },
  
  async mounted() {
    window.addEventListener('resize', this.onResize)
    try {
      // // Wait for Live2DCubismCore to be available
      // Live2DCubismFramework.CubismFramework.startUp()
      await this.waitForCore()
      
      console.log('Live2DCubismCore is loaded:', window.Live2DCubismCore)
      this.coreLoaded = true
      
      // Initialize the Live2D application
      await this.initializeLive2DApp()
      
    } catch (error) {
      console.error('Failed to initialize Live2D:', error)
    }
  },
  
  methods: {
    waitForCore() {
      return new Promise((resolve, reject) => {
        let attempts = 0
        const maxAttempts = 100 // 10 seconds timeout
        
        const checkCore = () => {
          attempts++
          
          if (typeof window !== 'undefined' && window.Live2DCubismCore) {
            resolve(true)
          } else if (attempts >= maxAttempts) {
            reject(new Error('Live2DCubismCore failed to load'))
          } else {
            Live2DCubismFramework.CubismFramework.startUp()
            setTimeout(checkCore, 100)
          }
        }
        
        checkCore()
      })
    },
    
    async initializeLive2DApp() {
      try {
        // Get the LAppDelegate singleton
        this.appDelegate = LAppDelegate.getInstance()
        
        // Set the canvas container before initializing
        if (this.$refs.canvasContainer) {
          this.appDelegate.setCanvasContainer(this.$refs.canvasContainer)
        }
        
        // Initialize the delegate (this will create canvases and set up the Live2D framework)
        const success = this.appDelegate.initialize()
        
        if (success) {
          // Start the main loop
          this.appDelegate.run()
          
          this.appInitialized = true
          console.log('Live2D App initialized successfully!')
        } else {
          throw new Error('Failed to initialize LAppDelegate')
        }
        
      } catch (error) {
        console.error('Error initializing Live2D app:', error)
        throw error
      }
    },
    
    moveCanvasesToContainer() {
      // The LAppDelegate creates canvases and adds them to document.body
      // We can move them to our container for better control
      const canvases = document.querySelectorAll('canvas')
      const container = this.$refs.canvasContainer
      
      if (container && canvases.length > 0) {
        // Move existing canvases to our container
        canvases.forEach(canvas => {
          if (canvas.parentNode === document.body) {
            container.appendChild(canvas)
          }
        })
      }
    },
    
    // Handle window resize
    onResize() {
      if (this.appDelegate) {
        this.appDelegate.onResize()
      }
    }
  },
  
  beforeUnmount() {
    // Remove resize listener
    window.removeEventListener('resize', this.onResize)
    
    // Clean up Live2D
    if (this.appDelegate) {
      try {
        LAppDelegate.releaseInstance()
        console.log('LAppDelegate released')
      } catch (error) {
        console.error('Error releasing LAppDelegate:', error)
      }
    }
  }
}
</script>

<style scoped>

.default-layout {
  height: 100vh;
  background-color: aqua;
  padding: 40px;
}

.live2d-container {
  width: 100%;
  height: 70vh;
  position: relative;
  overflow: hidden;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 16px;
  color: #666;
}

.status {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(214, 3, 3, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 1000;
}

#live2d-canvas-container {
  width: 100%;
  height: 100%;
  position: relative;
}

/* Style for the Live2D canvases */
:deep(canvas) {
  display: block;
  background-color: red;
}
</style>