<template>
  <a
    href="https://sbom.kftray.app"
    target="_blank"
    rel="noopener"
    class="sbom-button"
    title="Security SBOM Report"
  >
    <Icon
      name="heroicons:shield-check"
      class="sbom-icon"
    />
    <span class="sbom-text">SBOM</span>
  </a>
</template>

<style scoped>
.sbom-button {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  height: 24px;
  padding: 0 0.5rem;
  color: rgb(115, 115, 115);
  transition: all 0.2s ease;
  border-radius: 0.25rem;
  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 1;
  user-select: none;
  text-decoration: none;
}

.sbom-button:hover {
  color: rgb(64, 64, 64);
  background: rgba(0, 0, 0, 0.04);
}

.sbom-icon {
  width: 0.75rem;
  height: 0.75rem;
  flex-shrink: 0;
}

.sbom-text {
  font-weight: 400;
  display: none;
  font-size: inherit;
}

@media (min-width: 1024px) {
  .sbom-text {
    display: block;
  }
}
</style>

<style>
.dark .sbom-button {
  color: rgb(163, 163, 163);
}

.dark .sbom-button:hover {
  background: rgba(255, 255, 255, 0.06);
  color: rgb(229, 231, 235);
}
</style>
