<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
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
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
        <template slot-scope="scope">
            <router-link :to="'from'+scope.row.id+'/edit'">
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
          <router-link :to="'/case/from/'+scope.row.id+'/edit'">
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
import { getList } from '@/api/case'

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
      total: 0,
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
  created() {
    this.getList()
  },
  methods: {
 
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.list
        console.log(this.list)
        this.total = response.data.list.total
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
        console.log(index, row);
      },
      handleRun(index, row) {
        console.log(index, row);
        excuteGroup(row.id)

      }
    
  },
  
}
</script>
