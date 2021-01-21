<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="20" :md="10" :lg="10" :xl="10">
      <div class="profile-container">
        <el-card shadow="hover" class="userlist-card">
          <template #header>
            <div class="clearfix">
              <span>用户列表</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="openAddUserDialog"
                >添加用户</el-button
              >
              <addUser
                :visible="dialogVisible"
                v-if="dialogVisible"
                @dialog-close="closedialog"
                v-on:close="
                  (dialogVisible = false), (tableflash = Math.random())
                "
              ></addUser>
            </div>
          </template>
          <el-table
            :data="list"
            v-on:flash="tableflash = Math.random()"
            :highlight-current-row="true"
            :border="true"
            style="width: 100%"
            show-overflow-tooltip="true"
            max-height="500px"
            :default-sort="{ prop: 'user_id', order: 'descending' }"
            :header-cell-style="headerClass"
            :cell-style="rowClass"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form
                  label-position="left"
                  inline
                  class="userlist-table-expand"
                >
                  <el-form-item>
                    <el-avatar
                      shape="square"
                      :size="80"
                      :src="props.row.avatar"
                    ></el-avatar>
                  </el-form-item>
                  <el-form-item label="姓名">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="用户名">
                    <span>{{ props.row.username }}</span>
                  </el-form-item>
                  <el-form-item label="用户组">
                    <span>{{ props.row.roles }}</span>
                  </el-form-item>
                  <el-form-item label="邮件">
                    <span>{{ props.row.email }}</span>
                  </el-form-item>
                  <el-form-item label="状态">
                    <span>{{ props.row.status }}</span>
                  </el-form-item>
                  <el-form-item label="登陆次数">
                    <span>{{ props.row.logintimes }}</span>
                  </el-form-item>
                  <el-form-item label="登陆时间">
                    <span>{{ props.row.logintime }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="user_id"
              label="ID"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              min-width="100"
              highlight-current-row="true"
              sortable
            ></el-table-column>
            <el-table-column
              prop="username"
              label="登陆名"
              width="100"
              sortable
            ></el-table-column>
            <el-table-column
              prop="roles"
              label="用户组"
              width="100"
              sortable
            ></el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="status"
              label="账户状态"
              width="100"
              ><template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-value="启用"
                  inactive-value="停用"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeStatus(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="100">
              <template slot-scope="scope">
                <el-tooltip content="编辑当前记录" placement="top">
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    circle
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="删除记录" placement="top">
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click.native.prevent="delRowUser(scope.row.username)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6" :xs="24">
      <user-card :user="user" style="margin:30px" />
    </el-col>
  </el-row>
</template>

<script>
import { MessageBox } from 'element-ui';
import { userlist, deluser, updatestatus } from '@/api/user';
import addUser from './addUser';
import store from '@/store';

export default {
  inject: ['reload'],
  components: { addUser },
  name: 'UserList',
  data() {
    return {
      list: [],
      listloading: true,
      dialogVisible: false,
      formLabelWidth: '10%',
      tableflash: 'afjas;dfja',
    };
  },
  created() {
    this.getList();
  },

  watch: {
    tableflash() {
      this.reload();
    },
  },

  methods: {
    // 获取用户列表
    getList() {
      this.listloading = true;
      userlist().then(res => {
        this.list = res.data;
        this.listloading = false;
      });
    },

    // 设置表头式样
    headerClass() {
      return 'text-align: center';
    },
    // 设置行式样
    rowClass() {
      return 'text-align: center';
    },
    // 打开添加用户对话框
    openAddUserDialog() {
      this.dialogVisible = true;
    },
    // 删除当前用户
    delRowUser(rows) {
      console.log(store.getters);
      const roles = store.getters.roles[0];
      console.log(roles);
      if (roles === 'admin') {
        MessageBox.confirm('确认删除这个用户吗？', '确认提交', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'success',
        }).then(() => {
          const data = {};
          data.username = rows;
          deluser(data);
          this.reload();
        });
      } else {
        this.$message({
          message: '你没有这个权利删除用户',
          type: 'warning',
        });
      }
      return false;
    },
    // 启用停用账户
    changeStatus(row) {
      const { status } = row;
      MessageBox.confirm(status, '更改用户状态', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        updatestatus(row);
        this.reload();
      });
      this.reload();
    },
  },
};
</script>
<style lang="less" scoped>
.profile {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    text-align: center;
  }
}
.userlist-card {
}
.userlist-table-expand {
  font-size: 0;
}
.userlist-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.userlist-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
