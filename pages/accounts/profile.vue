<template>
  <div>{{$route.path}}</div>
</template>
<script>
export default {
  head: {
    title: '账号信息'
  },
  middleware: 'authenticated'
};
</script>
