<template>
  <div class="title">
    {{titleContent}}
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: ['titleContent']
}
</script>

<style lang="scss" scoped>
@import "../style/viriables";
.title {
  height: .44rem;
  line-height: .46rem;
  width: 100%;
  background: $bgColor;
  font-size: .16rem;
  color: $content-fontcolor;
  text-align: center;
}
</style>
