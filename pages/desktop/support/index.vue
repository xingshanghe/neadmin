<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '云桌面支撑服务'
  },
  middleware: 'authenticated'
};
</script>