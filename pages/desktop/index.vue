<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '云桌面'
  },
  middleware: 'authenticated'
};
</script>