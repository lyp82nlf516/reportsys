<template>
  <div class="usersmanagerbox" id="databasebox">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="查看/编辑数据库信息" name="1">
        <div class="tablebox">
          <div class="pagetitle">
            <div class="inputbox">
              <el-input v-model="keyinput" placeholder="请输入关键字查询" @keyup.native.enter="querydata" @blur="querydata"></el-input>
              <el-button class="querybtn" icon="el-icon-search" @click="querydata">查询</el-button>
            </div>
            <div class="btngroup">
              <el-button @click="addopen" icon="el-icon-plus">新增</el-button>
              <el-button @click="delopen" icon="el-icon-delete"> 删除</el-button>
            </div>
          </div>
          <div class="eletable">
            <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="vouchercode" label="凭证" show-overflow-tooltip></el-table-column>
              <el-table-column prop="uname" label="用户"> </el-table-column>
              <el-table-column prop="dbname" label="数据库名称" type="text" size="small" show-overflow-tooltip></el-table-column>
              <el-table-column prop="dbtype" label="数据库类型" type="text" size="small" show-overflow-tooltip> </el-table-column>
              <el-table-column prop="dburl" label="数据库连接url" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="paginationbox">
              <el-pagination @current-change="currentpagechange" :total="total" :current-page="offset" :page-size="pageSize" layout="prev, pager, next, total, jumper">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 新增和修改的弹窗 -->
    <el-dialog :title="poptitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="数据库类型">
          <el-select v-model="ruleForm.dbtype" placeholder="请选择数据库类型">
            <el-option label="oracle" value="oracle"></el-option>
            <el-option label="mysql" value="mysql"></el-option>
            <el-option label="文件系统" value="dbfile"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="ruleForm.dburl" placeholder="请输入url"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="ruleForm.uname" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upwd">
          <el-input v-model="ruleForm.upwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="数据库名称" prop="dbtype">
          <el-input v-model="ruleForm.dbname" placeholder="请输入数据库名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
#databasebox {
  width: calc(100% - 20px);
  height: 100%;
  overflow: auto;
  padding: 10px;
  .querybox {
    background-color: #fff;
    .inputbox {
      overflow: auto;
      padding: 5px 10px;
      .el-button:hover {
        background-color: rgba(123, 126, 255, 0.9);
        border: 1px solid rgba(123, 126, 255, 0.9);
        color: #fff;
      }
    }
    .el-input {
      width: 200px;
      float: left;
      .el-input__inner:hover {
        border-color: #6d71ef;
      }
      .el-input__inner:focus {
        border-color: #6d71ef;
      }
    }
    .el-input__inner {
      border-radius: 0;
      height: 27px;
      font-size: 12px;
    }
    .querybtn {
      padding: 6px 10px;
      border-radius: 0;
      font-size: 12px;
      display: block;
      float: left;
      margin-left: 10px;
    }
  }
  .el-collapse-item__header {
    padding-left: 15px;
    border-bottom: 1px solid #dfe6ec;
    .el-collapse-item__arrow {
      float: left;
    }
  }
  .el-collapse-item__content {
    padding: 0px 15px 10px;
  }
  .tablebox {
    background-color: #fff;
    height: 100%;
    .eletable {
      .el-table__header-wrapper {
        th {
          background: #f5f7fb;
        }
      }
      .el-button--text {
        color: rgba(123, 126, 255, 0.9);
      }
      .el-button--text:hover {
        background: none;
      }
      .el-checkbox__inner::after {
        top: 3px;
        left: 6px;
      }
      .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
        top: 7px;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner,
      .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #6d71ef;
        border-color: #6d71ef;
      }
      .el-checkbox__inner:hover {
        border-color: #6d71ef;
      }
      .el-pager li {
        font-weight: normal;
        border: 1px solid #d1dbe5;
        border-left: none;
        min-width: 28px;
      }
      .el-pagination button {
        min-width: 28px;
      }
      .el-pager li:first-child {
        border-left: 1px solid #d1dbe5;
      }
      .el-pager li:last-child {
        border-right: 1px solid #d1dbe5;
      }
      .el-pager li.active {
        border-color: #20a0ff;
        border-color: rgba(123, 126, 255, 0.9);
        background-color: #20a0ff;
        background-color: rgba(123, 126, 255, 0.9);
        color: #fff;
        cursor: default;
      }
      .el-pager li.active:hover {
        color: #fff;
      }
      .el-pager li:hover {
        color: rgba(123, 126, 255, 1);
      }
      .el-pagination {
        text-align: right;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .el-pagination__total {
        margin-left: 10px;
      }
      .el-pagination .btn-next,
      .el-pagination .btn-prev {
        border: 1px solid #d1dbe5;
      }
      .el-pagination .btn-next:hover .el-icon-arrow-right:before {
        color: rgba(123, 126, 255, 0.9);
      }
      .el-pagination .btn-prev:hover .el-icon-arrow-left:before {
        color: rgba(123, 126, 255, 0.9);
      }
      .el-pagination__editor.el-input .el-input__inner:focus {
        border-color: rgba(123, 126, 255, 1);
      }
      .el-pagination .btn-next {
        border-left: none;
        border-radius: 0 2px 2px 0;
        padding-left: 6px;
      }
      .el-pagination .btn-prev {
        border-right: none;
        border-radius: 2px 0 0 2px;
        padding-right: 6px;
      }
      .el-pagination__editor.el-input {
        width: 30px;
      }
      .el-checkbox__inner {
        width: 18px;
        height: 18px;
      }
      .el-table .cell {
        padding-right: 15px;
        padding-left: 15px;
      }
    }
  }
  .el-table td,
  .el-table th {
    height: 32px;
    font-size: 12px;
    padding: 0;
  }
  .pagetitle {
    width: 100%;
    overflow: auto;
    .titletext {
      height: 20px;
      display: inline-block;
      position: absolute;
      left: 0px;
      padding: 4px 10px;
      border-bottom: 3px solid blue;
      letter-spacing: 2px;
    }
    .inputbox {
      overflow: auto;
      float: left;
      margin: 10px auto;
      .el-button {
        margin-left: 10px;
        padding: 12px;
      }
      .el-button:hover {
        background-color: rgba(123, 126, 255, 0.9);
        border: 1px solid rgba(123, 126, 255, 0.9);
        color: #fff;
      }
      .el-input {
        width: 240px;
      }
      .querybtn {
        margin-left: 10px;
      }
      .el-button {
        padding: 12px;
      }
    }
    .el-input {
      // width: 200px;
      width: 240px;
      float: left;
      .el-input__inner:hover {
        border-color: #6d71ef;
      }
      .el-input__inner:focus {
        border-color: #6d71ef;
      }
    }
  }
  .el-table th.gutter {
    display: table-cell !important;
  }
  .btngroup {
    float: right;
    margin-top: 15px;
    .el-button {
      padding: 8px;
      font-size: 12px;
      //border: 1px solid blue;
      border: 1px solid rgba(123, 126, 255, 0.9);
      box-shadow: 0px 0px 1px #888888 inset;
      background: rgba(123, 126, 255, 0.9);
      border: 1px solid rgba(123, 126, 255, 0.9);
      color: #fff;
    }
    .el-button:hover {
      background-color: rgba(123, 126, 255, 0.9);
      border: 1px solid rgba(123, 126, 255, 0.9);
      color: #fff;
    }
  }
  .el-dialog {
    .el-form-item {
      margin-bottom: 10px;
      .el-input__inner {
        // height: 34px;
        // line-height: 34px;
      }
      .el-form-item__label {
        font-size: 12px;
      }
    }
    .el-input__inner:hover,
    .el-form-item.is-success .el-input__inner,
    .el-form-item.is-success .el-input__inner:focus,
    .el-form-item.is-success .el-textarea__inner,
    .el-form-item.is-success .el-textarea__inner:focus {
      border-color: #6d6fef;
    }
    .dialog-footer {
      text-align: center;
      // .el-button {
      //   padding: 5px 10px;
      //   font-size: 12px;
      //   border-radius: 0;
      //   border: 1px solid #6d6fef;
      //   color: #6d6fef;
      // }
      // .el-button:focus,
      // .el-button:hover {
      //   color: #fff;
      //   border: 1px solid #6d6fef;
      //   background: #6d6fef;
      // }
      .el-button:hover {
        background-color: #7b7eff;
        border-color: #7b7eff;
        color: #fff;
      }
    }
    .el-dialog__header {
      background-color: #6d71ef;
      padding: 15px 20px;
      .el-dialog__title {
        color: #fff;
        font-weight: bold;
      }
      .el-dialog__headerbtn {
        top: 13px;
        right: 20px;
        .el-icon-close:before {
          font-size: 25px;
          font-weight: bold;
        }
      }
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
    .el-dialog__body {
      padding: 30px 20px 8px;
      overflow: auto;
      .el-icon-close:before {
        font-size: 12px;
        font-weight: bold;
      }
    }
    .el-form-item__error {
      padding-top: 0;
    }
    .el-collapse-item__header {
      height: 30px;
      line-height: 30px;
    }
    .el-collapse-item__header__arrow {
      display: none;
    }
    .el-collapse-item__content {
      height: 200px;
      padding: 0px;
      overflow: auto;
    }
    .el-tree {
      border: 0px;
      background: none;
      .el-tree-node__content {
        height: 26px;
        line-height: 26px;
        .el-checkbox__inner {
          border-radius: 0px;
          width: 16px;
          height: 16px;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
          background-color: #6d6fef;
        }
        .el-tree-node__label {
          font-size: 12px;
        }
      }
    }
    .el-switch.is-checked .el-switch__core {
      border-color: #6d6fef !important;
      background-color: #6d6fef !important;
    }
    .el-switch__core {
      border-color: #ccc !important;
      background-color: #ccc !important;
    }
    .el-collapse-item__header {
      padding-left: 0px;
    }
  }
}
.el-message-box__btns {
  .el-button--primary:hover {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
}
</style>
<script>
import {
  listdb,
  adddb,
  editdb,
  deldb
} from '@/services/query';
export default {
  data() {
    return {
      poptitle: '新增',
      activeNames: '1',
      keyinput: '',
      tableData: [],
      ruleForm: {
        dbtype: '',
        dburl: '',
        uname: '',
        upwd: '',
        dbname: '',
        keyword: '',
        vouchercode: ''
      },
      showpwd: true,
      tempruleForm: {
        dbtype: '',
        dburl: '',
        uname: '',
        upwd: '',
        dbname: '',
        keyword: '',
        vouchercode: ''
      },
      dialogFormVisible: false,
      options: [],
      value: '',
      offset: 0,
      pageSize: 10,
      selectdata: [],
      total: 0,
      addoredit: true,
    }
  },
  mounted() {
    this.Getdata();
  },
  methods: {
    // 获取数据列表
    Getdata() {
      let val = {
        'keyword': this.keyinput,
        'offset': this.offset,
        'pageSize': this.pageSize
      };
      listdb(val).then((res) => {
        if (res.status === 200) {
          this.tableData = res.data.rows;
          this.total = res.data.total;
        }
      })
    },
    handleSelectionChange(select) {
      this.selectdata = JSON.parse(JSON.stringify(select));
    },
    // 删除
    delopen() {
      let del = [];
      for (let i of this.selectdata) {
        del.push(i.id);
      }
      deldb(del).then((res) => {
        if (res.status === 200) {
          this.Getdata();
        }
      })
    },
    // 点击翻页
    currentpagechange(val) {
      this.offset = val;
      this.Getdata();
    },
    // 新增数据
    Adddata() {
      let val = {
        dbtype: this.ruleForm.dbtype,
        dburl: this.ruleForm.dburl,
        uname: this.ruleForm.uname,
        upwd: this.ruleForm.upwd,
        dbname: this.ruleForm.dbname,
        keyword: this.ruleForm.keyword,
        vouchercode: this.ruleForm.vouchercode
      };
      if (val.dbname === '') {
        this.$message('请输入数据库名称！');
      } else if (val.dbtype === '') {
        this.$message('请选择数据库类型！');
      } else if (val.dburl === '') {
        this.$message('请输入url！');
      } else if (val.uname === '') {
        this.$message('请输入用户名！');
      } else if (val.upwd === '') {
        this.$message('请输入密码！');
      } else {
        adddb(val).then((res) => {
          if (res.status === 200) {
            this.Getdata();
          }
        })
      }
    },
    // 修改数据
    Editdata() {
      let val = JSON.parse(JSON.stringify(this.ruleForm));
      editdb(val).then((res) => {
        if (res.status === 200) {
          this.Getdata();
        }
      })
    },
    // 打开新增窗口
    addopen() {
      this.poptitle = '新增';
      this.dialogFormVisible = true;
      this.addoredit = true;
      this.showpwd = true;
      this.ruleForm = JSON.parse(JSON.stringify(this.tempruleForm));
    },
    // 打开修改窗口
    edit(row) {
      this.addoredit = false;
      this.dialogFormVisible = true;
      this.poptitle = '修改';
      this.showpwd = false;
      this.ruleForm = JSON.parse(JSON.stringify(this.tempruleForm));
      for (let i in row) {
        this.ruleForm[i] = row[i];
      }
    },
    // 请求数据
    querydata() {
      this.Getdata();
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          if (this.addoredit) {
            this.Adddata();
          } else {
            this.Editdata();
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    }
  }
}
</script>
