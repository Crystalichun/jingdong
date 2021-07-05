<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker :currentIndex="0"/>
</template>

<script>
import Docker from '../../components/Docker'
import StaticPart from './StaticPart'
import Nearby from './Nearby'

export default {
  name: 'Home',
  components: { StaticPart, Nearby, Docker }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixins";
.wrapper {
  @include wrapper;
  background: transparent;
  padding: 0 .18rem .1rem .18rem;
}
</style>
