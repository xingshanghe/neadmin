<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '应用分析组管理'
  },
  middleware: 'authenticated'
};
</script>