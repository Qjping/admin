<template>
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
</template>
<script>
import { getGroup, excuteGroup} from '@/api/case'
  export default {
    data() {
      return {
        list: null
      }
    },  
    created()  {
      this.getGroup()
  },
    methods: {
      handleEdit(index, row) {

        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleRun(index, row) {
        console.log(index, row);
        excuteGroup(row.id)

      },
      getGroup(){
        getGroup().then(response => {
        this.list = response.data.list
        console.log(list)
        this.listLoading = false
      })

      }
    
 
    }
  }
 
</script>
