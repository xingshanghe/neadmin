<template>
  <div>{{$route.path}}</div>  
</template>
<script>
export default {
  name: 'index',
  head: {
    title: '管理控制台'
  },
  middleware: 'authenticated'
};
</script>

