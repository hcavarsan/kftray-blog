<template>
  <div>
    <h6>
      <span>Comments</span>
    </h6>
  </div>
</template>
<script>
export default {
  mounted() {
    const scriptTag = document.createElement('SCRIPT')
    scriptTag.setAttribute('src', 'https://utteranc.es/client.js')
    scriptTag.setAttribute('repo', 'hcavarsan/kftray-blog')
    scriptTag.setAttribute('issue-term', 'pathname')
    scriptTag.setAttribute('label', 'blog')
    scriptTag.setAttribute('theme', 'github-dark')
    scriptTag.setAttribute('crossorigin', 'anonymous')
    scriptTag.setAttribute('async', 'async')
    this.$el.append(scriptTag)
  },
}
</script>

<style>
.utterances {
  width: 100%;
  margin: 0 !important;
  max-width: 100%;
}
</style>
