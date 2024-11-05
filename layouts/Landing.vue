<!-- layouts/Landing.vue -->
<template>
	<div class="page-layout">
	  <div class="relative overflow-hidden">
		<LandingBanner badge-text="Release v0.14.9" text="A new version of kftray has been released."
		  link="https://github.com/hcavarsan/kftray/releases/tag/v0.14.9" link-text="Check it out →" />
		<Ellipsis right="0" width="85%" blur="150px"
		  class="ellipsis-container transition-opacity duration-500"
		  :class="{ 'opacity-100': isLoaded }" />
	  </div>

	  <Container :fluid="config?.main?.fluid" :padded="config?.main?.padded" class="relative overflow-hidden">
		<article class="landing-content">
		  <slot />
		</article>
		<Ellipsis left="0" width="60rem" top="60rem" blur="200px"
		  class="ellipsis-container transition-opacity duration-500"
		  :class="{ 'opacity-100': isLoaded }" />
	  </Container>
	</div>
  </template>


  <script setup>
  const { config } = useDocus()
  const isLoaded = ref(false)

  onMounted(() => {
	nextTick(() => {
	  setTimeout(() => {
		isLoaded.value = true
	  }, 100)
	})
  })
  </script>

  <style scoped>
  .page-layout {
	display: flex;
	flex-direction: column;
	position: relative;
	min-height: 100vh;
	overflow: hidden;
	background-color: var(--color-background);
	isolation: isolate;
  }

  .landing-content {
	position: relative;
	z-index: 1;
	padding: 2rem 0;
  }

  .ellipsis-container {
	opacity: 0;
	position: absolute;
	z-index: 0;
  }

  @-moz-document url-prefix() {
	.page-layout {
	  transform: translateZ(0);
	}

	.ellipsis-container {
	  opacity: 0;
	  will-change: opacity;
	}
  }
  </style>
