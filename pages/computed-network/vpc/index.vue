<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '概览'
  },
  middleware: 'authenticated'
};
</script>