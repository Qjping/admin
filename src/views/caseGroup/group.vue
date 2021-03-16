<template>
<div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
     <el-table
    :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="id"
      prop="id">
    </el-table-column>
    <el-table-column
      label="集合名称"
      prop="description">
    </el-table-column>
    <el-table-column
      label="创建时间"
      prop="create_time">
    </el-table-column>
    <el-table-column
      label="更新时间"
      prop="update_time">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
           <el-button
          size="mini"
          type="danger"
          @click="handleRun(scope.$index, scope.row)">run</el-button>
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
import { getGroup, excuteGroup} from '@/api/case'
  export default {
    data() {
       return {
         data:{
           group_id:''
    
         },
      page:'',
      total: '',
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 5,
        group_id:'',
        key_word: '',
        product_id: ''
      },
    }
    },  
    created()  {
      this.getGroup();
   
  },
    methods: {
      handleEdit(index, row) {

        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleRun(index, row) {
        this.data.group_id=row.id

        this.$router.push({
        path: '/case-group/excute',
        query:{
          group_id:this.data.group_id
        }
        
      })
        console.log(index, row);
          //  this.initWebSocket();
        // excuteGroup(this.data)

      },
      getGroup(){
        getGroup().then(response => {
        this.list = response.data.list
        console.log(list)
        this.listLoading = false
      })

      },
      //  initWebSocket(){//初始化weosocket(必须)
      //   const wsuri = "后台给你的请求地址";    //请根据实际项目需要进行修改
      //   this.websock = new WebSocket("ws://127.0.0.1:8080/webSocket");      //新建一个webstock对象
      //   this.websock.onmessage = this.websocketonmessage;  
      //   this.websock.onopen = this.websocketonopen;      
      //   this.websock.onerror = this.websocketonerror;
      //   this.websock.onclose = this.websocketclose;
      // },
      // websocketonopen(){//websocket连接后发送数据(send发送)
      //   let actions ="建立连接";     //请根据实际项目需要进行修改
      //   this.websocketsend(JSON.stringify(actions));
      // },
      // websocketonerror(){//连接建立失败重连
      //   this.initWebSocket();
      // },
      // websocketonmessage(e){ //数据接收
      //   this.redata = JSON.parse(e.data).data;
      //   console.log(this.redata);
      // },
      // websocketsend(Data){//数据发送
      //   this.websock.send(Data);
      // },
      // websocketclose(e){  //关闭
      //   console.log('断开连接',e);
      // }
    
 
    }
  }
 
</script>
