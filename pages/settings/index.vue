<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '设置'
  },
  middleware: 'authenticated'
};
</script>