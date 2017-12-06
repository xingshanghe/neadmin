<template>
  <div>{{$route.path}}</div>
</template>
<script>
import _ from 'lodash';
export default {
  head: {
    title: 'vpc详情'
  },
  middleware: 'authenticated',
  methods: {
    changeMenu() {
      let menudata = this.$store.getters.mapOfRoutes['/computed-network/vpc'];
      let menudataCopy = _.assign({}, menudata);

      menudataCopy.subBackItem = menudata;
      menudataCopy.subBackUrl = '/computed-network/vpc/list';
      menudataCopy.sub = [{
        'isgroup': true,
        'title': '专用网络VPC',
        'children': [
          {
            'icon': 'icon-googleplus5',
            'title': '详情',
            'link': this.$route.path
          },
          {
            'icon': 'icon-nat iconfont',
            'title': '路由器',
            'link': '/computed-network/ecs'
          },
          {
            'icon': 'icon-gateway iconfont',
            'title': '交换机',
            'link': '/desktop'
          }
        ]
      }];

      this.$eventHub.$emit('changeMenu', menudataCopy);
    }
  },
  mounted() {
    this.changeMenu();
  }
};
</script>