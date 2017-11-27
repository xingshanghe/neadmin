<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '访问列表管理'
  },
  middleware: 'authenticated'
};
</script>