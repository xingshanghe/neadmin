<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '磁盘'
  },
  middleware: 'authenticated'
};
</script>