<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '系统设置'
  },
  middleware: 'authenticated'
};
</script>