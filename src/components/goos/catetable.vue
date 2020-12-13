<template>
    <div>
        <!-- <tree-table>
            wfwafwaf
        </tree-table> -->
    <tree>
        WFWEW
    </tree>
    </div>  
</template>

<script>
import { request } from "../../NetWork/request";
export default {
  data() {
    return {
        prop:0,
      //商品分类的数据列表，默认为空
      catelist: [],
      //分页的数据
      queryInfo:{
          type:3,
          pagenum:1,
          pagesize:5
      },
      //总数据条数
      total:0
    };
  },
  created() {
      this.getlist()
  },
  methods: {
      getlist(){
          request({
              url:'categories',
              method:'get',
              params:this.queryInfo
          }).then(value=>{
              console.log(value)
              this.catelist = value.data.result
              //为总数据条数
              this.total = value.data.total
              console.log(this.catelist)
          }).catch(reson=>{
              return this.$message.error("获取商品分类失败")
              console.log(reson)
          })
      }
  },
  components: {},
};
</script>

<style lang="less" scoped>
</style>