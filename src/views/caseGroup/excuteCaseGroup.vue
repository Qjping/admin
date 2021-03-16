<template>
  <div class="app-container">
        <el-button icon='el-icon-search' size="small" type="primary" @click="getList()">搜索</el-button>
        <el-button icon='el-icon-plus' size="small" type="primary" @click.prevent.stop="CaseNew" >新增</el-button>
         <el-button icon='el-icon-plus' size="small" type="primary" @click.prevent.stop="excuteCaseGroup" >执行用例组</el-button>
    <el-table
  
      :data="list"
    
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="URL" width="330" align="center">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column label="METHOD" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.method }}</span>
        </template>
      </el-table-column>
      <el-table-column label="DESCTION" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
              {{ scope.row.httpStatusCode }}
          <el-tag :type="scope.row.httpStatusCode | statusFilter">{{ scope.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
        <template slot-scope="scope">
            <router-link :to="'/case/edit/'+scope.id">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            </router-link>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>

          <el-button
          size="mini"
          type="danger"
          @click="handleRun(scope.$index, scope.row)">run</el-button>
          <router-link :to="'/case/edit/'+scope.id+'/edit'">
          <!-- v-if="$permissions.hasPermissions('SHOP_PRODUCT_UPDATE') || $permissions.hasPermissions('SHOP_PRODUCT_SPU_UPDATE')" -->
            <el-button type="primary" size="small" icon="el-icon-edit" >详情</el-button>
          </router-link>    
       </template>
      </el-table-column>
    </el-table>
    
 
 <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
        :page-sizes="[5,10,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
  
</template>

<script>
import { getList,deleteCase,excuteCase } from '@/api/case'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      page:'',
      total: 0,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 9999,
        group_id:'',
        key_word: '',
        product_id: ''
      },
    }
  },
  created() {
    const group_id = this.$route.params && this.$route.params.group_id
    // this.getList(group_id)
    this.excuteCaseGroup()
    this.initWebSocket()
  },
  methods: {
 
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.list
        console.log(this.list)
        
        this.total = response.data.count
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleEdit(index, row) {
      console.log(index, row);
      },
    handleDelete(index, row) {
        console.log(id);
        deleteCase(id);
      },
    excuteCaseGroup(index, row) {
        const group_id = this.$route.params && this.$route.params.group_id
        console.log(group_id);
        excuteCase(group_id)
      },
    destroyed() {
      this.websock.close();//离开路由之后断开websocket连接
    },
      
    CaseNew() {
      this.$router.push({
        path: 'create',
        query: {
          enterprise_id: 1
        }
      })
    },
    initWebSocket(){//初始化weosocket(必须)
        const wsuri = "后台给你的请求地址";    //请根据实际项目需要进行修改
        this.websock = new WebSocket("ws://127.0.0.1:8080/webSocket");      //新建一个webstock对象
        this.websock.onmessage = this.websocketonmessage;  
        this.websock.onopen = this.websocketonopen;      
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){//websocket连接后发送数据(send发送)
        let actions ="建立连接";     //请根据实际项目需要进行修改
        this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
        this.list = [...(this.list || []), ...(JSON.parse(e.data) || [])];
        console.log("websocket:"+this.list);
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      }
    
    
  },
  
}
</script>
