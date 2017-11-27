<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '快捷操作帮助'
  },
  middleware: 'authenticated'
};
</script>