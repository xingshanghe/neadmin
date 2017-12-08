<template>
  <section>
    {{message}}
  </section>
</template>
<script>
import URL from 'url';
export default{
  head() {
    return {
      title: this.message
    };
  },
  layout: 'empty',
  data() {
    return {
      message: '登录中，请稍后....'
    };
  },
  created() {
    this.login();
  },
  methods: {
    login() {
      const data = URL.parse(location.hash.replace('#', '?'), true).query;
      this.$store.dispatch('loginOauth', data);
      // TODO 处理成jwt格式 ,获取用户名等等
      // let token = jwt.sign({data: data, exp: Math.floor(Date.now() / 1000 + parseInt(data.expires_in, 10))}, 'shhhhh');
      // this.$store.dispatch('login', token);
      this.$router.push('/');
    }
  }
};
</script>