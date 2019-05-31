<template>
  <div class="formpagebox" id="formpagebox">
    <!-- <div>
        <h1>创建 </h1>
    </div>
    <nav class="shelf">
        <span class="book not-found"></span>
        <span class="door left"></span>
        <span class="door right"></span>
    </nav> -->
    <div class="modalFormbox">
      <div class="formbox">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          :rules="rules"
          label-width="50px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="凭证："
            prop="vouchercode"
          >
            <el-input v-model="ruleForm.vouchercode"></el-input>
          </el-form-item>
          <el-form-item
            label="用户："
            prop="adminname"
          >
            <el-input v-model="ruleForm.adminname"></el-input>
          </el-form-item>
          <el-form-item
            label="密码："
            prop="adminpwd"
          >
            <el-input
              type="password"
              v-model="ruleForm.adminpwd"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
#formpagebox {
  width: 100%;
  height: 100%;
  display: table;
  text-align: center;
  .modalFormbox {
    display: table-cell;
    vertical-align: middle;
    background: #f8fbf7;
    .formbox {
      width: 350px;
      height: 200px;
      margin: 0 auto;
      .el-form-item {
        margin-bottom: 10px;
        .el-input__inner {
          height: 28px;
        }
        .el-form-item__label {
          font-size: 12px;
          padding-right: 5px;
        }
        .el-button--primary {
          background-color: rgba(123, 126, 255, 0.9);
          border-color: rgba(123, 126, 255, 0.9);
        }
        .el-button--primary:hover {
          background-color: #6d71ef;
          border-color: #6d71ef;
        }
        .el-button--default:hover {
          border-color: #6d71ef;
          color: #6d71ef;
        }
        input {
          outline-color: rgba(123, 126, 255, 0.9);
        }
        input:focus {
          border-color: #6d71ef;
          outline-color: rgba(123, 126, 255, 0.9);
        }
      }
    }
  }
}
</style>
<style lang="scss">
</style>
<script>
import {
  addvoucher
} from '@/services/query';
export default {
  data() {
    return {
      ruleForm: {
        vouchercode: '',
        adminname: '',
        adminpwd: ''
      },
      rules: {
        vouchercode: [],
        adminname: [],
        adminpwd: []
      }
    }
  },
  mounted() {
    let urls = this.$route.path.split('/')[1];
    if (urls === 'panel') {
      $('.modalFormbox').css('padding', '100px 0');
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addvoucher(this.ruleForm).then((res) => {
            console.log('res', res);
            if (res.status === 200) {
              this.$message.success('新增凭证成功');
              this.$refs[formName].resetFields();
            } else {
              this.$message.success('新增凭证失败');
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
