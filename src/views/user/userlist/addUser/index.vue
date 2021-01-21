<template>
  <div class="adduser-container">
    <el-dialog
      title="新用户信息"
      :visible.sync="visible"
      :lock-scroll="false"
      :center="true"
      :modal="true"
      :modal-append-to-body="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="dialogClose"
      width="30vw"
    >
      <el-form
        :model="form"
        ref="rulesform"
        :rules="rules"
        label-position="right"
      >
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.username"
            autocomplete="off"
            placeholder="请输入登陆用名"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入姓名"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="roles" :label-width="formLabelWidth">
          <el-select
            v-model="form.roles"
            placeholder="请选择用户组"
            automatic-dropdown="true"
          >
            <el-option value="admin"></el-option>
            <el-option value="editor"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮件" prop="email" :label-width="formLabelWidth">
          <el-input
            v-model="form.email"
            autocomplete="on"
            autofocus="true"
            placeholder="请输入邮件地址"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="repassword"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.repassword"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('rulesform')">重 置</el-button>
        <el-button type="primary" @click="submitForm('rulesform')"
          >提 交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUser } from '@/api/user';
import { MessageBox } from 'element-ui';

export default {
  name: 'adduser',
  props: { visible: { type: Boolean, default: false } },
  data() {
    const validatePass = (rule, value, callback) => {
      const regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (regExp.test(value) === false) {
        callback(new Error('8-16字母和数字组成，不能是纯数字或纯英文'));
      } else {
        if (this.form.repassword !== '') {
          this.$refs.rulesform.validateField('repassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      localVisible: this.visible,
      rules: {
        username: [
          { required: true, message: '登陆名不能为空', trigger: 'blur' },
          {
            min: 2,
            max: 8,
            message: '长度必须在2到8个字符之间',
            trigger: 'blur',
          },
        ],
        name: [{ required: true, message: '姓名必填', trigger: 'blur' }],
        roles: [{ required: true, message: '用户组必选', trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        repassword: [{ validator: validatePass2, trigger: 'blur' }],
      },
      formLabelWidth: '30%',
      form: {
        username: '',
        name: '',
        roles: '',
        email: '',
        password: '',
        repassword: '',
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert(`提交成功`);
          MessageBox.confirm('确认新增这个用户吗？', '提交确认', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            const formData = this.form;
            addUser(formData);
            this.$emit('close');
          });
        } else {
          console.log('提交失败');
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    dialogClose() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
.el-input,
.el-select {
  width: 80%;
}
.el-form-item label {
  width: 10;
}
</style>
