<template>
  <div>
    <div>{{$route.path}}</div>
  </div>
</template>
<template>
  <div>首页</div>
</template>
<script>
export default {
  head: {
    title: '首页'
  },
  middleware: 'authenticated'
};
</script>
