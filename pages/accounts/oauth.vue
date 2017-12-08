<template>
  <section>
    {{message}}
  </section>
</template>
<script>
export default{
  head() {
    return {
      title: this.message
    };
  },
  layout: 'empty',
  data() {
    return {
      message: '跳转中，请稍后....'
    };
  },
  created() {
    window.location.href = 'http://10.10.28.141:9999/uaa/oauth/authorize?redirect_uri=http://neadmin.com/accounts/loginOauth&response_type=token&client_id=cmop';
  },
  methods: {
  }
};
</script>