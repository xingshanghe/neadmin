<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '快捷操作'
  },
  middleware: 'authenticated'
};
</script>