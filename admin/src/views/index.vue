<template>
  <div class="app-container home">
      首页
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.8.5"
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    }
  }
};
</script>

<style scoped lang="scss">
.home {

}
</style>

