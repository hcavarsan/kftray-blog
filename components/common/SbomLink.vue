<template>
  <a
    href="https://sbom.kftray.app"
    target="_blank"
    rel="noopener"
    class="sbom-button"
    title="Security SBOM Report"
  >
    <font-awesome-icon
      icon="fa-solid fa-shield-halved"
      class="sbom-icon"
    />
    <span class="sbom-text">SBOM</span>
  </a>
</template>

<style scoped>
.sbom-button {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 1.75rem;
  padding: 0 0.625rem;
  color: rgb(156, 163, 175);
  transition: all 0.2s ease;
  border: 1px solid rgb(209, 213, 219);
  border-radius: 0.3125rem;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1;
  user-select: none;
  text-decoration: none;
}

@media (min-width: 768px) {
  .sbom-button {
    height: 2rem;
    padding: 0 0.75rem;
    font-size: 0.8125rem;
    gap: 0.5rem;
  }
}

.sbom-button:hover {
  color: rgb(75, 85, 99);
  border-color: rgb(156, 163, 175);
  background: rgba(249, 250, 251, 0.8);
}

.sbom-button:active {
  transform: translateY(1px);
}

.sbom-icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .sbom-icon {
    width: 1rem;
    height: 1rem;
  }
}

.sbom-text {
  font-weight: 400;
  display: none;
  font-size: inherit;
}

@media (min-width: 640px) {
  .sbom-text {
    display: block;
  }
}
</style>

<style>
.dark .sbom-button {
  color: rgb(163, 163, 163);
  border-color: rgba(64, 64, 64, 0.4);
}

.dark .sbom-button:hover {
  color: rgb(209, 213, 219);
  border-color: rgba(75, 75, 75, 0.6);
  background: rgba(48, 48, 48, 0.4);
}
</style>
