<template>
  <div class="demo-image__placeholder">
    <div class="block">
      <el-image :src="src"></el-image>
    </div>
  </div>
</template>


<script>
  export default {
    name: "Index",
    data() {
      return {
        src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2019-03-15%2F5c8b6f91405e7.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653011623&t=18b8c24e522de0e0ecbb719382c58fd1'
      }
    }
  }
</script>

<style scoped>

</style>
