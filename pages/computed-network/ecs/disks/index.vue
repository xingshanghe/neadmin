<template>
  <section>
    <el-row>
      <el-col :span="16">
        <listTitlePills  />
      </el-col>
      <el-col class="top-buttons-list" :span="8">
        <el-button size="small"><i class="el-icon-refresh "></i>刷新</el-button>
        <el-button type="primary"  size="small"><i class="el-icon-plus "></i>新增</el-button>
      </el-col>
    </el-row>
    <el-row  style="margin-top:5px;">
      <el-col>
        <el-table :data="tableData?tableData.content:[]"  border class="console-table-list">
          <el-table-column label="名称/code">
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="scope.row.diskName" placement="right">
                <nuxt-link class="el-button el-button--text" :to="'/computed-network/disk/' + scope.row.diskId"  >{{scope.row.diskName}}/{{scope.row.diskId,10|subString}}</nuxt-link>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="diskCategory" label="类型" ></el-table-column>
          <el-table-column label="状态" >
            <template slot-scope="scope"> 
              <span :class="'status-' + scope.row.status">{{scope.row.status|toStatusText}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="zoneUUID" label="可用区" ></el-table-column>
          <el-table-column prop="diskType" label="属性" ></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" >快照</el-button>
              <el-button type="text" >挂载</el-button>
              <el-button type="text" ><i class="icon-cross2" title="删除"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;" class="pager" v-if="tableData">
      <el-col>
        <el-pagination layout="total, prev, pager, next" :total="tableData.totalElements" :current-page.sync="query.page" :page-size="tableData.size" @current-change="getDiskList"></el-pagination>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import listTitlePills from '~/components/console/list-title-pills.vue';
import neMainTitle from '~/components/ne-main-title.vue';
import consts from '~/utils/consts.js';
export default {
  name: 'get-disk-from-ecs-code',
  head: {
    title: '磁盘'
  },
  components: {
    neMainTitle,
    listTitlePills
  },
  middleware: 'authenticated',
  data() {
    return {
      code: this.$route.params.code,
      query: this.$route.query,
      tableData: null,
      ecsData: null
    };
  },
  methods: {
    getDiskList() {
      return this.$api({metadata: {name: 'console.disk.ecs.getlist'}, spec: {
        'DiskList.Get': {
          'UrlParams': {
            'access_token': consts.TOKEN,
            'page': this.query.page ? this.query.page - 1 : 1 - 1
          }
        }
      }}).then(res=>{
        this.tableData = res.data['DiskList.Get'].data;
      });
    }
  },
  created() {
    this.getDiskList();
  },
  mounted() {
  }
};
</script>
