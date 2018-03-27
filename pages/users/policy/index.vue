<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '权限管理'
  },
  middleware: 'authenticated'
};
</script>