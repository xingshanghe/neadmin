<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '日志'
  },
  middleware: 'authenticated'
};
</script>