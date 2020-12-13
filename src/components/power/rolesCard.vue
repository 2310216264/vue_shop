<template>
  <div>
    <el-card class="card">
      <!-- 添加角色按钮 -->
      <create :data="roleList" />

      <!-- 角色列表 -->
      <el-table :data="roleList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bottom', i1 === 0 ? 'botop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag @close="remove(scope.row, item1.id)" closable>{{
                  item1.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- for循环 嵌套二级权限 -->
                <el-row
                  :class="[t2 == 0 ? '' : 'botop', 'vcenter']"
                  v-for="(item2, t2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      @close="remove(scope.row, item2.id)"
                      closable
                      type="success"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>

                  <el-col :span="18">
                    <el-tag
                      @close="remove(scope.row, item3.id)"
                      closable
                      type="warning"
                      v-for="(item3, i3) in item2.children"
                      :key="i3"
                    >
                      {{ item2.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <!-- 索引列 -->
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="add"
              type="primary"
              icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="remove(scope.row.id)"
              size="mini"
              >删除</el-button
            >
            <el-button
              @click="show(scope.row)"
              size="mini"
              type="warning"
              icon="el-icon-setting"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="分配权限" :visible.sync="setMessage" width="50%">
      <el-tree
        show-checkbox
        :data="rightList"
        node-key="id"
        default-expand-all
        :props="treeProps"
        @close="setclosed"
        :default-checked-keys="defkeys"
        ref="treeref"
      ></el-tree>
      <span slot="footer" class="Message">
        <el-button @click="setMessage = false">取 消</el-button>
        <el-button type="primary" @click="allrights">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible">
      <el-form :data = "roleList">
        <el-form-item label="活动名称" >
          <el-input :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 确定取消 对话框 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import setMessage from "./dilog.vue";
import create from "./create.vue";
import { request } from "../../NetWork/request";
export default {
  data() {
    return {

      //对话框
      dialogFormVisible :false,
      //所有角色列表数据
      roleList: [],
      setMessage: false,

      //权限数据
      rightList: [],
      //树形对象绑定数据
      treeProps: {
        label: "authName",
        children: "children",
      },
      defkeys: [],
      //即将分配权限的角色id
      roleId: "",
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    //监听对话框关闭
    setclosed() {
      this.defkeys = [];
    },
    getRoleList() {
      request({
        url: "roles",
        method: "get",
      }).then((value) => {
        this.roleList = value.data;
      });
    },

    //对话框
    add(){
      this.dialogFormVisible = true
      console.log(this.roleList)
    },


    //根据id删除权限
    remove(role, rightid) {
      //弹框提示是否删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((value) => {
          console.log(role + "" + rightid);
          request({
            method: "delete",
            url: `roles/${role.id}/rights/${rightid}`,
          })
            .then((value) => {
              this.$message({
                message: "取消权限成功",
                type: "success",
              });

              role.children = value.data;
            })
            .catch((reson) => {
              console.log(reson);
            });
        })
        .catch((reson) => {
          console.log(reson);
        });
    },
    show(role) {
      this.roleId = role.id;
      //获取所有权限数据
      request({
        method: "get",
        url: "rights/tree",
      })
        .then((value) => {
          getLeafkeys(role, this.defkeys);

          function getLeafkeys(node, arr) {
            //如果当前节点不包含children属性，则是三级节点
            // console.log(node)
            if (!node.children) {
              return arr.push(node.id);
            }
            node.children.forEach((item) => {
              getLeafkeys(item, arr);
            });
          }

          this.rightList = value.data;
        })
        .catch((reson) => {
          console.log(reson);
        });

      // this.getLeafkeys(role,this.defkeys)
      this.setMessage = true;
    },
    //设置权限
    allrights() {
      const keys = [
        ...this.$refs.treeref.getCheckedKeys(),
        ...this.$refs.treeref.getHalfCheckedKeys(),
      ];

      const idstr = keys.join(",");

      request({
        url: `roles/${this.roleId}/rights`,
        method: "post",
        data: {
          rids: idstr,
        },
      })
        .then((value) => {
          this.setMessage = false;
          console.log(value);
        })
        .catch((reson) => {
          console.log(reson);
        });
    },

    //删除用户
    //删除用户
    remove(id) {
      console.log(id);
      //弹框询问是否删除
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((value) => {
          id = Number(id);
          request({
            method: "delete",
            url: `roles/${id}`,
          }).then((value) => {
            this.$message({
              message: "恭喜你，删除成功",
              type: "success",
            });
            this.getRoleList();
          });
        })
        .catch((reson) => {
          console.log(reson);
        });
    },
  },

  components: {
    create,
  },
};
</script>

<style lang="less" scoped>
.card {
  margin-top: 20px;
}
.el-tag {
  margin: 7px;
}
.botop {
  border-top: 1px solid #eee;
}
.bottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>