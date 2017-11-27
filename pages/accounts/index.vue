<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '账号管理'
  },
  middleware: 'authenticated'
};
</script>