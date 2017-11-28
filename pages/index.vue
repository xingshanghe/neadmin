<template>
  <div>
    <button v-on:click="handleClick">Click</button>
    <v-chart :force-fit="true" :height="height" :data="data" :data-pre="dataPre" :data-mapping="dataMapping" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-stack-bar :v-style="stackBarStyle" />
    </v-chart>
    <!-- <v-lite-chart :stack-bar="true" :height="400" :data="data" :data-pre="dataPre" :dataMapping="dataMapping" :forceFit="true" /> -->
  </div>
</template>

<script>
import { data, dataMapping, dataPre, scale } from '~/static/data.js';
export default {
  head: {
    title: '管理控制台'
  },
  middleware: 'authenticated',
  asyncData() {
  },
  data() {
    return {
      data,
      dataMapping,
      dataPre,
      scale,
      height: 400,
      stackBarStyle: {
        stroke: '#fff',
        lineWidth: 1
      }
    };
  },
  methods: {
    handleClick: function() {
      this.height = 600;
      this.stackBarStyle.lineWidth = 10;
    }
  }
};
</script>
