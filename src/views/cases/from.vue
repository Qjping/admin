
<template>
  <div >
    
    <el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">左对齐</el-radio-button>
  <el-radio-button label="right">右对齐</el-radio-button>
  <el-radio-button label="top">顶部对齐</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="form">
  <el-form-item label="名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="METHOD">
    <el-input v-model="form.method"></el-input>
  </el-form-item>
  <el-form-item label="URL">
    <el-input v-model="form.url"></el-input>
  </el-form-item>
  <el-form-item label="path">
    <el-input v-model="form.path"></el-input>
  </el-form-item>
  <el-form-item label="配置的值" prop="body">
        <el-input v-model="form.body" type="textarea" :rows="5" placeholder="请输入配置的值"></el-input>
        <code class="tips">例如：
          {
            "title":"好友助力，领商城优惠券",
           
          }</code>
      </el-form-item>
      <el-form-item label="配置的值" prop="assertions">
        <el-input v-model="form.assertions" type="textarea" :rows="1" placeholder="请输入配置的值"></el-input>
        <code class="tips">例如：
          {
            "key":"path",
           
          }</code>
      </el-form-item>
      <el-form-item label="配置的值" prop="extracts">
        <el-input v-model="form.extracts" type="textarea" :rows="1" placeholder="请输入配置的值"></el-input>
        <code class="tips">例如：
          {
            "title":"好友助力，领商城优惠券",
  
          }</code>
      </el-form-item>
     <el-button type="primary" :loading="loading" v-if="create" @click="handleCreateCase">创建</el-button>
    <el-button type="primary" :loading="loading" v-if="edit" @click.native.prevent="handleCreateCase">更新</el-button>
</el-form>

     
  </div>
</template>

<script>
import { getDetail, excuteGroup, save} from '@/api/case'
import { validateEmptyString } from '@/utils/validate'
  export default {
    data() {
      const validateValue = (rule, value, callback) => {
      try {
        JSON.parse(value)
        callback()
      } catch (e) {
        callback(new Error('请输入json格式的值'))
      }
    }
    return {
      form: {
        name: '',
        url: '',
        method: '',
        body: null,
        header:'',
        tag:'',
        desction:'',
        assertions: null,
        extracts: null,


      },
      rules: {
          body: [{ trigger: 'change', validator: validateValue }],
          assertions: [{ trigger: 'change', validator: validateValue }],
          extracts: [{ trigger: 'change', validator: validateValue }],
        }
      };
    },
   created() {
    const id = this.$route.params && this.$route.params.id
    console.log(id)
    // this.fetchData(id)
    if (id) {
      this.fetchData(id)
      this.edit = true
    } else {
      this.create = true
    }
  
  },
  methods: {
    fetchData(id){
      getDetail(id).then(response=>{
        this.form = response.data
      })
    },
    handleCreateCase(){
       this.loading = true
      save([this.form])
    }
  }
  }
</script>