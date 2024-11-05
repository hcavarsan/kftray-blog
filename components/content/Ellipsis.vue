<!-- components/content/Ellipsis.vue -->
<template>
	<div
	  class="ellipsis"
	  :style="{
		right: right || 'auto',
		left: left || 'auto',
		width: width || '100%',
		top: top || 'auto',
		filter: `blur(${blur})`
	  }"
	>
	  <div class="ellipsis-inner"></div>
	</div>
  </template>

  <script>
  export default {
	name: 'Ellipsis',
	props: {
	  right: String,
	  left: String,
	  width: String,
	  top: String,
	  blur: String
	}
  }
  </script>

  <style scoped>
  .ellipsis {
	position: absolute;
	z-index: 0;
	pointer-events: none;
	opacity: 0.5;
	transform: translateZ(0);
	will-change: filter;
  }

  .ellipsis-inner {
	width: 100%;
	height: 50vh;
	background: radial-gradient(
	  circle at center,
	  rgba(91, 243, 199, 0.15) 0%,
	  rgba(137, 180, 250, 0.15) 25%,
	  transparent 70%
	);
	transform: translateZ(0);
  }

  @-moz-document url-prefix() {
	.ellipsis {
	  opacity: 0.3;
	}

	.ellipsis-inner {
	  background: radial-gradient(
		circle at center,
		rgba(91, 243, 199, 0.2) 0%,
		rgba(137, 180, 250, 0.2) 25%,
		transparent 70%
	  );
	}
  }
  </style>
