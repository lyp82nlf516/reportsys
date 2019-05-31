<template>
  <div class="reportpagebox" id="reporttablefilder">
    <!-- 筛选条件 -->
    <el-collapse v-model="activeNames">
      <el-collapse-item title="查询条件" name="1">
        <div class="filterbox" v-show="pagedata.filters.length !== 0">
          <!-- <div class="pagetitle">
            <span class="titletext">查询条件</span>
          </div> -->
          <div v-for="item in pagedata.filters" :key="item.id" class="filteritem">
            <label class="inputlabel">{{item.label}}</label>
            <div class="inputdiv">
              <el-input v-if="item.type === 'input'" v-model="item.value" placeholder="请输入内容"></el-input>
            </div>
            <div class="inputdiv">
              <el-select v-if="item.type === 'select'" v-model="item.value" placeholder="请选择">
                <el-option v-for="items in item.option" :key="items.label" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
            </div>
            <div class="inputdiv">
              <el-select v-if="item.type === 'selectmultiple'" v-model="item.value" multiple placeholder="请选择">
                <el-option v-for="items in item.option" :key="items.value" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
            </div>
            <div class="inputdiv">
              <el-cascader class="inputdiv" v-if="item.type === 'cascader'" :options="item.option" v-model="item.value"></el-cascader>
            </div>
            <div class="inputdiv">
              <el-date-picker class="inputdiv" format="yyyyMMdd" v-if="item.type === 'datepicker'" v-model="item.value" :type="item.style" placeholder="选择日期范围"></el-date-picker>
            </div>
            <div class="inputdiv">
              <el-date-picker class="inputdiv" format="yyyyMMdd" v-if="item.type === 'datetimepicker'" v-model="item.value" :type="item.style" placeholder="选择日期范围"></el-date-picker>
            </div>
          </div>
          <div class="submitbtnbox">
            <el-button @click="onSubmit" class="submitbtn">查询</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 表格数据-->
    <el-collapse v-model="activeNames">
      <el-collapse-item title="查看/编辑" name="2">
        <div class="dragbox">
          <div class="pagetitle">
            <div class="btngroup">
              <el-button v-if="basicmsg.Operation.add  && basicmsg.maintype!== 'many'" @click="add" icon="el-icon-plus">新增</el-button>
              <el-button v-if="basicmsg.Operation.del  && basicmsg.maintype!== 'many'" @click="delall" icon="el-icon-delete"> 批量删除</el-button>
            </div>
          </div>
          <div class="dragdom tablebox">
            <el-table :data="pagedata.table.data" border @selection-change="handleSelectionChange">
              <!-- 对于类型为RULE的数据进行单独处理 -->
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column v-for="item in pagedata.table.colNames" :key="item.name" :prop="item.name" :label="item.label" show-overflow-tooltip v-if="item.type!=='hidden'">
              </el-table-column>
              <el-table-column label="操作" width="100" v-if="basicmsg.maintype!== 'many'">
                <template slot-scope="scope">
                  <div v-loading="scope.row.load === true">
                    <div v-if="scope.row.load === 'sucess'||scope.row.load === undefined">
                      <el-button type="text" size="small" @click="delectClick(scope.row)" v-if="basicmsg.Operation.del && basicmsg.maintype!== 'many'">删除</el-button>
                      <el-button type="text" size="small" @click="editClick(scope.row)" v-if="basicmsg.Operation.edit  && basicmsg.maintype!== 'many'">修改</el-button>
                    </div>
                    <div v-if="scope.row.load === 'fail'">
                      <!-- 新增的时候图标的变化 -->
                      <i class="el-icon-information failnew">
                        <span class="failtitle">新增失败</span>
                      </i>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="paginationbox">
              <el-pagination @current-change="currentpagechange" :current-page="param.offset" :page-size="param.pageSize" layout="prev, pager, next, total, jumper" :total="param.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 新增和修改的弹出框 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" v-if="form.length !== 0">
        <el-form-item v-for="item in form" :key="item.id" :label="item.label" :prop="item.name" v-if="item.type!=='hidden'">
          <el-input v-if="item.type === 'input'" v-model="ruleForm[item.name]"></el-input>
          <el-select v-if="item.type === 'select'" v-model="ruleForm[item.name]" placeholder="请选择">
            <el-option v-for="(items, index) in item.option" :label="items.label" :value="items.value" :key="index">
            </el-option>
          </el-select>
          <el-select v-if="item.type === 'selectmultiple'" v-model="ruleForm[item.name]" multiple placeholder="请选择">
            <el-option v-for="(items, index) in item.option" :label="items.label" :value="items.value" :key="index">
            </el-option>
          </el-select>
          <el-cascader v-if="item.type === 'cascader'" :options="item.option" v-model="ruleForm[item.name]"></el-cascader>
          <el-date-picker format="yyyyMMdd" v-if="item.type === 'datepicker'" v-model="ruleForm[item.name]" :type="item.style" placeholder="选择日期范围" @change="timechange"></el-date-picker>
          <el-date-picker format="yyyyMMdd" v-if="item.type === 'datetimepicker'" v-model="ruleForm[item.name]" :type="item.style" placeholder="选择日期范围"></el-date-picker>
          <el-input type="textarea" v-if="item.type === 'textarea'" v-model="ruleForm[item.name]"></el-input>
          <!-- 校验规则 -->
          <div class="rulebox" v-if="item.type === 'ruletype'">
            <div class="ruledom">
              <el-checkbox v-model="ruleForm[item.name].required">设为必填</el-checkbox>
            </div>
            <div class="ruledom  formatruledom">
              格式
              <el-select v-model="ruleForm[item.name].pattern" placeholder="请选择">
                <el-option v-for="items in rule.type.pattern" v-if="rule.type.pattern.length > 0" :key="items.value" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
            </div>
            <div class="ruledom lengthruledom">
              长度 min:
              <el-input v-model="ruleForm[item.name].min"></el-input> -- max:
              <el-input v-model="ruleForm[item.name].max"></el-input>
            </div>
          </div>
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
#reporttablefilder {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  /* Firefox */
  -webkit-box-sizing: border-box;
  /* Safari */
  // overflow-y: auto;
  // overflow-x: hidden;
  overflow: auto;
  padding: 10px;
  .el-collapse-item__header {
    padding-left: 15px;
    border-bottom: 1px solid #dfe6ec;
    .el-collapse-item__arrow {
      float: left;
    }
  }
  .filterbox {
    width: 100%;
    // max-height: 100px;
    overflow: auto;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    /* Firefox */
    -webkit-box-sizing: border-box;
    /* Safari */
    margin: 5px;
    .filteritem {
      //  height: 36px;
      float: left;
      margin: 15px 10px 0 10px;
      .inputlabel {
        float: left;
        line-height: 36px;
      }
      .inputdiv {
        float: left;
        margin-left: 5px;
      }
      .el-input__inner {
        height: 32px !important;
        border-radius: 0;
      }
    }
    .submitbtnbox {
      height: 36px;
      float: left;
      margin: 15px 10px 0 10px;
      .submitbtn {
        height: 30px;
        padding: 0 10px;
      }
    }
  }
  .pagetitle {
    width: calc(100% - 10px);
    font-weight: bold;
    position: relative;
    overflow: auto;
    padding-bottom: 10px;
    .titletext {
      height: 100%;
      display: inline-block;
      position: absolute;
      top: -1px;
      left: 0px;
      padding: 0 10px;
      border-bottom: 3px solid blue;
      letter-spacing: 2px;
    }
  }
  .btngroup {
    float: left;
    margin-right: 8px;
    .el-button {
      padding: 5px 10px;
      margin-top: 4px;
      font-size: 12px;
      //border: 1px solid blue;
      // border: 1px solid rgba(123, 126, 255, 0.9);
      box-shadow: 0px 0px 1px #888888 inset;
    }
    .el-button {
      background: rgba(123, 126, 255, 0.9);
      border: 1px solid rgba(123, 126, 255, 0.9);
      color: #fff;
      padding: 8px;
    }
  }
  .dragbox {
    width: 100%;
    margin: 10px 5px 0 5px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    /* Firefox */
    -webkit-box-sizing: border-box;
    /* Safari */
  }
  .tablebox {
    padding: 5px;
    width: calc(100% - 20px);
    .el-table {
      th.is-leaf {
        color: #1f2d3d;
      }
      // height: 100% !important;
      .el-loading-spinner {
        margin-top: -13px;
      }
      .el-checkbox__inner::after {
        top: 3px;
        left: 6px;
      }
      .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
        top: 7px;
      }
      .el-loading-spinner .circular {
        width: 22px;
        height: 22px;
      }
      .el-loading-spinner .path {
        stroke-width: 4;
        stroke: blue;
      }
      .failnew {
        .failtitle {
          font-size: 12px;
        }
        color: red;
      }
      th {
        background-color: #eef1f6;
      }
      .cell {
        color: #1f2d3d;
        padding-right: 15px;
        padding-left: 15px;
      }
      th.gutter {
        display: table-cell !important;
      }
    }
    .el-table--border td,
    .el-table--border th,
    .el-table__body-wrapper
      .el-table--border.is-scrolling-left
      ~ .el-table__fixed {
      border-right: 1px solid #dfe6ec;
    }
    .el-table th.is-leaf {
      border-right: 1px solid #dfe6ec;
    }
    .el-table td,
    .el-table th {
      padding: 0;
      height: 32px;
    }
    .paginationbox {
      width: 100%;
      height: 40px;
      overflow: hidden;
      margin-top: 10px;
    }
    // .el-pager li {
    //   font-weight: normal;
    //   border: 1px solid #d1dbe5;
    //   border-left: none;
    //   min-width: 28px;
    // }
    .el-pagination {
      text-align: right;
    }
    .el-pagination button {
      min-width: 28px;
    }
    // .el-pager li:first-child {
    //   border-left: 1px solid #d1dbe5;
    // }
    // .el-pager li:last-child {
    //   border-right: 1px solid #d1dbe5;
    // }
    // .el-pager li.active {
    //   border-color: #20a0ff;
    //   background-color: #20a0ff;
    //   color: #fff;
    //   cursor: default;
    // }
    // .el-pagination .btn-next,
    // .el-pagination .btn-prev {
    //   border: 1px solid #d1dbe5;
    // }
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
    .el-table-column--selection .cell {
      padding-right: 15px;
      padding-left: 15px;
    }
  }
  .el-dialog {
    .el-form-item {
      margin-bottom: 10px;
      .el-input__inner {
        height: 28px;
      }
      .el-form-item__label {
        font-size: 12px;
      }
    }
    .dialog-footer {
      .el-button {
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 0;
        border: 1px solid blue;
      }
    }
    .el-dialog__header {
      background-color: #6d71ef;
      padding: 10px 5px;
      .el-dialog__title {
        color: #fff;
      }
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
    .el-dialog__body {
      padding: 10px 10px;
      overflow: auto;
    }
    .el-form-item__error {
      padding-top: 0;
    }
    .rulebox {
      width: 100%;
      .ruledom {
        float: left;
        margin: 0 5px;
      }
      .formatruledom {
        .el-input {
          width: 120px;
        }
      }
      .lengthruledom {
        .el-input {
          width: 100px;
        }
      }
    }
  }
}
</style>
<script>
import {
  getBaseMsg,
  confList,
  filderadd,
  filderedit,
  filderdel
} from '@/services/query';
export default {
  data() {
    return {
      activeNames: ['1', '2'],
      basicmsg: {
        maintype: 'many',
        Operation: {
          del: false,
          edit: false,
          add: false,
        },
      },
      pagedata: {
        filters: [],
        table: {
          data: [],
          colNames: []
        }
      },
      param: {
        offset: 1, // 当前第几页
        pageSize: 10, // 每页显示多少条
        total: 0,
      },
      form: [], // 用来产生新增框内的东西
      ruleForm: {},
      rules: {},
      multipleSelection: [],
      tempruleForm: '', // 保存初始状态的新增数据
      editflag: true,
      rule: {
        length: {
          min: null,
          max: null,
          len: null,
        },
        required: true,
        type: {
          type: 'string',
          pattern: [{
            value: null,
            label: '不需要设置'
          }, {
            value: 'number',
            label: '数字'
          }, {
            value: 'email',
            label: '邮箱'
          }, {
            value: 'phone',
            label: '电话'
          }, {
            value: 'eline',
            label: '英文下划线'
          }, {
            value: 'elinen',
            label: '数字母下划线数字字'
          }, {
            value: 'eng',
            label: '字母'
          }, {
            value: 'engn',
            label: '字母数字'
          }],
        }
      },
      primaryKey: this.$route.params.id,
      dialogFormVisible: false,
    }
  },
  beforeUpdate() { },
  updated() { },
  created() { },
  mounted() {
    this.GetBaseMsg(this.primaryKey).then(() => {
      if (this.pagedata.table.colNames.length > 0) {
        this.Modellist();
      }
    });
  },
  computed: {},
  components: {},
  methods: {
    async GetBaseMsg(val) {
      let res = await getBaseMsg(val);
      if (res.status === 200) {
        if (res.data !== '') {
          this.pagedata.filters = res.data.querylist;
          this.basicmsg.maintype = res.data.maintype;
          if (res.data.operate !== undefined) {
            let operate = res.data.operate.split(';');
            for (let i of operate) {
              this.basicmsg.Operation[i] = true;
            }
          }
          if (this.basicmsg.maintype === 'single') {
            this.pagedata.table.colNames = res.data.tabletitle;
            let param = JSON.parse(JSON.stringify(this.pagedata.table.colNames));
            this.form = JSON.parse(JSON.stringify(this.pagedata.table.colNames));
            this.dealdata(param);
          } else if (this.basicmsg.maintype === 'many') {
            this.createtablehead(res.data.tablecode, res.data.tabletitle);
          }
        }
      }
    },
    // 获取列表数据
    Modellist() {
      let param = JSON.stringify(this.getparam());
      confList(param).then((res) => {
        if (res.status === 200) {
          this.pagedata.table.data = res.data.rows;
          this.param.total = res.data.total;
        }
      })
    },
    // 得到参数
    getparam() {
      let filters = {};
      filters.primaryKey = this.primaryKey;
      filters.offset = this.param.offset.toString(); // 当前第几页
      filters.pageSize = this.param.pageSize.toString(); // 每页显示多少条
      const day = new Date();
      day.setTime(day.getTime() - 3600 * 1000 * 24);
      let timestring = this.changedatatostring(day);
      for (let i in this.pagedata.filters) {
        if (this.pagedata.filters[i].style === 'daterange' || this.pagedata.filters[i].style === 'datetimerange') {
          if (this.pagedata.filters[i].value === '') {
            filters[this.pagedata.filters[i].name] = timestring + ',' + timestring;
          } else {
            filters[this.pagedata.filters[i].name] = this.changedatatostring(this.pagedata.filters[i].value[0]) + ',' + this.changedatatostring(this.pagedata.filters[i].value[1]);
          }
        } else if (this.pagedata.filters[i].style === 'date' || this.pagedata.filters[i].style === 'datetime') {
          if (this.pagedata.filters[i].value === '') {
            filters[this.pagedata.filters[i].name] = timestring;
          } else {
            filters[this.pagedata.filters[i].name] = this.changedatatostring(this.pagedata.filters[i].value);
          }
        } else if (this.pagedata.filters[i].type === 'selectmultiple') {
          filters[this.pagedata.filters[i].name] = this.pagedata.filters[i].value.join(',');
        } else if (this.pagedata.filters[i].type === 'cascader') {
          filters[this.pagedata.filters[i].name] = this.pagedata.filters[i].value.join(',');
        } else {
          filters[this.pagedata.filters[i].name] = this.pagedata.filters[i].value;
        }
      }
      return (filters);
    },
    // 时间转成字符串的函数
    changedatatostring(paramdata) {
      let Y = paramdata.getFullYear();
      let M = paramdata.getMonth() + 1;
      let D = paramdata.getDate();
      M = M < 10 ? ('0' + M) : M;
      D = D < 10 ? ('0' + D) : D;
      let timestring = String(Y) + String(M) + String(D);
      return timestring;
    },
    // many
    createtablehead(val, param) {
      let array = [];
      let tablecode = val.split(';');
      let tabletitle = param.split(';');
      for (let i in tablecode) {
        let item = {
          name: tablecode[i],
          label: tabletitle[i]
        }
        array.push(item);
      }
      this.pagedata.table.colNames = array;
    },
    onSubmit() {
      this.Modellist();
    },
    // 列表当前页改变
    currentpagechange(val) {
      this.param.offset = val;
      this.Modellist();
    },
    //  选择在要删除的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 删除全部的事件delall
    delall() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          primaryKey: this.primaryKey,
          DEFID: ''
        };
        for (let i in this.multipleSelection) {
          if (i < this.multipleSelection.length - 1) {
            param.DEFID = param.DEFID + this.multipleSelection[i].DEFID + ',';
          } else {
            param.DEFID = param.DEFID + this.multipleSelection[i].DEFID;
          }
        }
        filderdel(JSON.stringify(param)).then((res) => {
          if (res.status === 200) {
            // 删除成功后刷新列表
            this.Modellist();
          }
        })
      }).catch(() => { });
    },
    // 删除事件
    delectClick(val) {
      let param = JSON.stringify({
        primaryKey: this.primaryKey,
        DEFID: val.DEFID
      });
      param = encodeURI(encodeURI(param));
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        filderdel(param).then((res) => {
          if (res.status === 200) {
            // 删除成功，刷新数据列表
            this.Modellist();
          }
        })
      }).catch(() => { });
    },
    // 处理得到的数据,为生成新增页面做数据支持
    dealdata(obj) {
      // 先生成form表单
      // 再生成规则的rules，rules的属性名根据返回的数据得到， 属性的值根据类型来得到
      for (let j in obj) {
        if (obj[j].type === 'selectmultiple' || obj[j].type === 'cascader') {
          this.ruleForm[obj[j].name] = [];
        } else {
          this.ruleForm[obj[j].name] = obj[j].value;
        }
        this.rules[obj[j].name] = [];
      }
      // 初始化校验规则的值
      if (this.ruleForm.RULE !== undefined) {
        this.ruleForm.RULE = {
          required: false,
          pattern: null,
          min: null,
          max: null,
        }
      }
      this.tempruleForm = JSON.stringify(this.ruleForm);
    },
    // 新增出现弹窗
    add() {
      this.dialogFormVisible = true;
      this.ruleForm = JSON.parse(this.tempruleForm);
      this.editflag = true;
    },
    // 编辑修改事件
    editClick(row) {
      // 给输入框赋值 ，但是不能直接赋值row,因为对象这种数据结构存的是一个地址，会随这一边的改变而改变
      this.ruleForm = JSON.parse(this.tempruleForm);
      for (let i in row) {
        for (let j of this.form) {
          if (j.name === i) {
            if (j.type === 'selectmultiple' || j.type === 'cascader') {
              if (row[i]) {
                this.ruleForm[i] = row[i].split(',');
              }
              this.ruleForm[i] = row[i];
            } else if (j.type === 'daterange' || j.type === 'datetimerange') {
              // '20180908,20180908' 转成 [date, date]
              if (row[i] !== '') {
                let tempparme = row[i].split(',');
                let startyear = tempparme[0].slice(0, 3);
                let startmonth = tempparme[0].slice(3, 5);
                let startday = tempparme[0].slice(5, 7);
                let endyear = tempparme[1].slice(0, 3);
                let endmonth = tempparme[1].slice(3, 5);
                let endday = tempparme[1].slice(5, 7);
                var startday = new Date();
                var endday = new Date();
                startday.setFullYear(startyear, startmonth, startday);
                endday.setFullYear(endyear, endmonth, endday);
              }
              this.ruleForm[i] = [startday, endday];
            } else {
              this.ruleForm[i] = row[i];
            }
          }
        }
      }
      this.dialogFormVisible = true;
      this.editflag = false;
    },
    // 新增接口提交
    Modeladd() {
      let param = this.delparam();
      console.log('add', param)
      filderadd(JSON.stringify(param)).then((res) => {
        if (res.status === 200) {
          // 刷新列表
          this.Modellist();
        } else {
          this.$message('新增失败,唯一标示重复或者有字段不允许为空');
        }
      })
    },
    // 修改的接口提交
    Modeledit() {
      // 是否刷新数据，如果刷新就没问题，如果不刷新，就手动赋值
      let param = this.delparam();
      filderedit(JSON.stringify(param)).then((res) => {
        if (res.status === 200) {
          // 刷新列表
          this.Modellist();
        } else {
          this.$message('修改失败, 有字段不允许为空');
        }
      })
    },
    // 对提交的数据进行处理
    delparam() {
      let param = Object.assign({}, this.ruleForm);
      // 把下拉对选的转成字符串
      for (let i in param) {
        if (Object.prototype.toString.call(param[i]) === '[object Array]') {
          if (param[i][0] instanceof Date) {
            // 判断为日期类型就进行格式转化
            let startime = this.changedatatostring(param[i][0]);
            let endtime = this.changedatatostring(param[i][1]);
            param[i] = startime + ',' + endtime;
          } else {
            param[i] = param[i].join(',');
          }
        }
      }
      param.primaryKey = this.primaryKey;
      // console.log('param', param);
      return param;
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过开始提交数据
          this.dialogFormVisible = false;
          if (this.editflag) {
            this.Modeladd();
          } else {
            // 开始写修改的逻辑
            this.Modeledit();
          }
        } else {
          // 验证不通过，重新输入，给出验证提示
          return false;
        }
      });
    },
    // 取消重置表单
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
  }
}
</script>
