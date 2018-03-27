<template>
  <section>{{msg}}</section>
</template>
<script>
export default {
  name: 'logout',
  head() {
    return {
      title: this.msg
    };
  },
  // middleware: 'anonymous',
  layout: 'empty',
  data() {
    return {
      msg: '退出中,请稍后...'
    };
  },
  created() {
    this.logout();
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
};
</script>

