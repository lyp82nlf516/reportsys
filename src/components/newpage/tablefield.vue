<template>
  <div class="tableSearchBox" id="tableSearchBox">
    <div class="tableshow" v-if="tableshow">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="查看/编辑报表" name="2">
          <div class="tableBox">
            <div class="pagetitle">
              <div class="inputbox">
                <el-input v-model="keyinput" placeholder="请输入关键字查询" @keyup.native.enter="querydata" @blur="querydata"></el-input>
                <el-button class="querybtn" icon="el-icon-search" @click="querydata">查询</el-button>
              </div>
              <div class="btngroup">
                <el-button @click="addopen" icon="el-icon-plus">新增</el-button>
                <el-button @click="delopen" icon="el-icon-delete">删除</el-button>
              </div>
            </div>
            <div class="tableboxmsg">
              <div class="content">
                <div class="eletable">
                  <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="id" type="text" size="small" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="tablename" label="表名" type="text" size="small" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="managername" label="报表名称" type="text" size="small" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="operate" label="操作权限"></el-table-column>
                    <!-- <el-table-column prop="dbid" label="dbid"> </el-table-column> -->
                    <el-table-column prop="confmsg" label="关联关系" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="columnkey" label="主键" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="操作" width="120">
                      <template slot-scope="scope">
                        <el-button type="text" size="small" @click="searchList(scope.row, scope.$index)">查询</el-button>
                        <el-button type="text" size="small" @click="edit(scope.row, scope.$index)">修改</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="paginationbox">
                    <el-pagination @current-change="currentpagechange" :total="total" :current-page="offset" :page-size="pageSize" layout="prev, pager, next, total, jumper">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <child v-if="tablefieldBox" v-bind:message="parentMsg1"></child>
  </div>
</template>

<style lang="scss">
#tableSearchBox {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  overflow: auto;
  padding: 10px;
  .el-collapse-item__header {
    padding-left: 15px;
    border-bottom: 1px solid #dfe6ec;
    .el-collapse-item__arrow {
      float: left;
    }
  }
  .el-pagination {
    text-align: right;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el-pagination__total {
    margin-left: 10px;
  }
  .btngroup {
    margin-top: 10px;
  }
  .el-collapse-item__content {
    padding: 0px 15px 10px;
  }
  .queryBox {
    background-color: #fff;
    .inputbox {
      overflow: auto;
      padding: 5px 10px;
      float: left;
      margin: 10px auto;
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
  .pagetitle {
    // width: calc(100% - 10px);
    // border-bottom: 1px solid #ccc;
    // font-weight: bold;
    // height: 30px;
    width: 100%;
    overflow: auto;
    .titletext {
      height: 20px;
      display: inline-block;
      position: absolute;
      left: 0px;
      padding: 4px 10px;
      border-bottom: 3px solid blue;
      border-bottom: 3px solid #6d71ef;
      letter-spacing: 2px;
    }
  }
  .tableBox {
    background-color: #fff;
    // margin-top: 10px;
    height: 100%;
    .inputbox {
      overflow: auto;
      padding: 0;
      float: left;
      margin: 10px auto;
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
    .eletable {
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
      .el-table-column--selection .cell {
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
  .el-table th {
    background-color: #eef1f6;
  }
  .el-table .cell {
    padding-left: 18px;
    padding-right: 18px;
  }
  .el-table__footer-wrapper thead div,
  .el-table__header-wrapper thead div {
    background-color: #eef1f6;
    color: #1f2d3d;
  }
  .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: 1px solid #dfe6ec;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid #dfe6ec;
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
      // border: 1px solid rgba(123, 126, 255, 0.9);
      box-shadow: 0px 0px 1px #888888 inset;
    }
    .el-button {
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
        border: 1px solid blue;
        border: 1px solid #6d71ef;
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
    .el-switch__core .el-switch__button {
      height: 12px;
      width: 12px;
    }
    .el-switch__core,
    .el-switch__label {
      height: 18px;
    }
    .el-switch,
    .el-switch__label,
    .el-switch__label * {
      font-size: 12px;
    }
    .el-switch__label * {
      top: 2px;
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
.el-tooltip__popper {
  text-align: justify;
}
</style>
<script>
import {
  getTableColumnsByKey,
  confmanagerList,
  delConfmanager
} from '@/services/query';
import child from './tableship.vue';
export default {
  data() {
    return {
      activeNames: ['2'],
      keyinput: '',
      tableData: [],
      offset: 1,
      pageSize: 10,
      selectdata: [],
      total: 0,
      requireData: '',
      tablefieldBox: false,
      tableshow: true,
      parentMsg1: {
        parentMsg2: [],
        tableshipArr: [],
        operate: [],
        managername: '',
        columnkey: '',
        checkRadios: '',
        checkkey: '',
        id: '',
        tablename: '',
        confmsg: '',
        dbid: '',
        operates: '',
        columnkeyobj: [],
        columnkeyobjtwo: {},
        fieldListone: [],
        fieldListonedel: [],
        fieldTwoList: [],
        oldfielddatd: [],
        datasourceValue: ''
      }
    }
  },
  created() { },
  mounted() {
    this.Getdata();
  },
  computed: {},
  components: { child },
  methods: {
    // 得到列表数据
    Getdata() {
      let val = {
        'keyWord': this.keyinput,
        'offset': this.offset,
        'pageSize': this.pageSize
      };
      confmanagerList(val).then((res) => {
        // console.log('res---list:', res, val);
        if (res.status === 200) {
          this.tableData = res.data.rows;
          this.total = res.data.total;
        }
      })
    },
    // 列表进行选择
    handleSelectionChange(select) {
      this.selectdata = JSON.parse(JSON.stringify(select));
    },
    // 单击查询列表
    searchList(row, index) {
      // console.log('searchList', row);
      // console.log('searchList-', index);
      // let param = row.id;
      // console.log('param-', param);
      this.$router.push({
        path: `/tablefilder/${row.id}`
      });
    },
    // 修改回显数据
    edit(row, index) {
      // console.log('row:', row, row.columnkey);
      // const objNum = Object.getOwnPropertyNames(row).length - 1;
      this.parentMsg1.managername = row.managername;
      this.parentMsg1.id = row.id;
      this.parentMsg1.tablename = row.tablename;
      this.parentMsg1.confmsg = row.confmsg;
      this.parentMsg1.dbid = row.dbid;
      this.parentMsg1.operates = row.operate;
      this.parentMsg1.datasourceValue = row.dbid;
      // console.log('row:', row, 'row-length:', objNum, 'columnkey:', row.columnkey);
      getTableColumnsByKey(row.id).then((res) => {
        // console.log('res:', res);
        if (res.status === 200) {
          this.tablefieldBox = true;
          this.tableshow = false;
          if (Object.getOwnPropertyNames(res.data).length > 1) {
            for (let i in res.data) {
              for (let j in res.data[i]) {
                res.data[i][j]['allkey'] = i + '.' + res.data[i][j].key;
              }
              this.parentMsg1.columnkeyobjtwo[i] = res.data[i];
            }
          }
          for (let j in res.data) {
            let maps = {
              value: j,
              key: j
            }
            this.parentMsg1.parentMsg2.push(JSON.stringify(maps));
            // 单表回显
            if (Object.getOwnPropertyNames(res.data).length === 1) {
              // 单表选择操作（add;edit;del）
              if (row.operate !== undefined && row.operate !== '') {
                for (let o in res.data[j]) {
                  let obj = {
                    'value': res.data[j][o].value,
                    'key': res.data[j][o].key,
                    'allkey': row.tablename + '' + res.data[j][o].key
                  }
                  this.parentMsg1.columnkeyobj.push(obj);
                }
                const operateArr = row.operate.split(';');
                for (let i in operateArr) {
                  if (operateArr[i] === 'add') {
                    this.parentMsg1.operate.push('新增');
                  } else if (operateArr[i] === 'del') {
                    this.parentMsg1.operate.push('删除');
                  } else if (operateArr[i] === 'edit') {
                    this.parentMsg1.operate.push('修改');
                  }
                }
              }
              // 单表不选择操作（add;edit;del）
              if (row.operate === undefined) {
                for (let o in res.data[j]) {
                  let obj = {
                    'value': res.data[j][o].value,
                    'key': res.data[j][o].key,
                    'allkey': row.tablename + '' + res.data[j][o].key
                  }
                  this.parentMsg1.columnkeyobj.push(obj);
                }
              }
              this.initfielddata = JSON.parse(JSON.stringify(res.data));
              for (let j in this.initfielddata) {
                for (let i in this.initfielddata[j]) {
                  this.initfielddata[j][i].allkey = `${j}.${this.initfielddata[j][i].key}`;
                }
              }
              let tempfielddata = JSON.parse(JSON.stringify(this.initfielddata));
              for (let k in this.createtreedata(tempfielddata)) {
                this.parentMsg1.fieldListone.push(this.createtreedata(tempfielddata)[k]);
              }
            } else {
            }
          }
          // 多表回显
          if (Object.getOwnPropertyNames(res.data).length > 1) {
            let itemsdata = [];
            let shipArr = row.tablename.split(',');
            for (let k in shipArr) {
              let item = {
                dis: false,
                index: k * 1,
                value: shipArr[k],
                key: shipArr[k],
              }
              itemsdata.push(JSON.parse(JSON.stringify(item)));
            }
            // 多表默认选中
            let shiptablefild2 = row.tablename.split(',');
            let shiptablefild1 = row.checkkey.split(',');
            let lastArr = [];
            for (let f in shiptablefild1) {
              for (let d in shiptablefild2) {
                if (shiptablefild1[f] === shiptablefild2[d]) {
                  lastArr.push(d);
                }
              }
            }
            // 得到整个数据，设置它的隐藏显示，以及记录选中的值
            for (let i in shipArr) {
              let shipitem = {};
              if (i === '0') {
                shipitem = {
                  show: true,
                  tableship: 'left join',
                  value: parseInt(lastArr[i]),
                  data: JSON.parse(JSON.stringify(itemsdata))
                };
              } else {
                shipitem = {
                  show: true,
                  tableship: 'left join',
                  value: parseInt(lastArr[i]),
                  data: JSON.parse(JSON.stringify(itemsdata))
                };
              }
              this.parentMsg1.tableshipArr.push(shipitem);
              for (let i = 1; i < this.parentMsg1.tableshipArr.length; i++) {
                for (let j = 0; j < i + 1; j++) {
                  if (this.parentMsg1.tableshipArr[j].value !== '') {
                    this.parentMsg1.tableshipArr[i].data[this.parentMsg1.tableshipArr[j].value].dis = true;
                  }
                }
              }
            }
            // 已选规则 fildshipobj oldfielddatd
            const confmsgArr = row.fildshipArr.split(';');
            const newconfms = confmsgArr[confmsgArr.length - 1].split(',')[2].split('.')[0];
            const shipArrall = row.fildshipArr.split(';');
            const fildshipobjs = [];
            for (let i in shipArrall) {
              fildshipobjs.push(shipArrall[i].split(','));
            }
            for (let k in fildshipobjs) {
              const rules = fildshipobjs[k][1];
              const leftOne = fildshipobjs[k][0].split('.')[0];
              const rightTwo = fildshipobjs[k][2].split('.')[0];
              const smallLeft = fildshipobjs[k][0].split('.')[1];
              const smallRight = fildshipobjs[k][2].split('.')[1];
              const allkeyfrom = leftOne + '.' + smallLeft;
              const allkeyto = rightTwo + '.' + smallRight;
              let fromToObj = {
                from: {
                  value: smallLeft,
                  key: smallLeft,
                  allkey: allkeyfrom
                },
                rule: {
                  value: rules,
                  key: rules
                },
                to: {
                  value: smallRight,
                  key: smallRight,
                  allkey: allkeyto
                },
                table: {
                  from: {
                    key: leftOne,
                    value: `${leftOne}的字段：`
                  },
                  to: {
                    key: rightTwo,
                    value: `${rightTwo}的字段：`
                  }
                }
              }
              this.parentMsg1.oldfielddatd.push(fromToObj);
            }
            // 表关系
            this.initfielddata = JSON.parse(JSON.stringify(res.data));
            for (let j in this.initfielddata) {
              for (let i in this.initfielddata[j]) {
                this.initfielddata[j][i].allkey = `${j}.${this.initfielddata[j][i].key}`;
              }
            }
            let tempfielddata = JSON.parse(JSON.stringify(this.initfielddata));
            for (let k in this.createtreedata(tempfielddata)) {
              this.parentMsg1.fieldListone.push(this.createtreedata(tempfielddata)[k]);
              this.parentMsg1.fieldListonedel.push(this.createtreedata(tempfielddata)[k]);
              this.parentMsg1.fieldTwoList.push(this.createtreedata(tempfielddata)[k]);
            }
            for (let d in this.parentMsg1.fieldListonedel) {
              if (newconfms === this.parentMsg1.fieldListonedel[d].key) {
                this.parentMsg1.fieldListonedel.splice(d, 1);
              }
            }
          }
        }
      })
      if (row.columnkey === null) {
        // console.log('null-111', typeof row.columnkey)
      } else {
        // console.log('null-1122', typeof row.columnkey)
        const columnkeyArr = row.columnkey.split('.');
        this.parentMsg1.checkRadios = columnkeyArr[1];
      }
    },
    // 把返回的字段数据生成tree数据
    createtreedata(array) {
      let cols = [];
      for (let i in array) {
        let coltree = {
          key: i,
          allkey: i,
          value: `${i}表的字段:`,
          type: 'table',
          children: array[i]
        };
        cols.push(coltree);
      }
      return cols;
    },
    // 点击查询
    querydata() {
      this.Getdata();
    },
    // 删除
    delopen() {
      let del = [];
      for (let i of this.selectdata) {
        del.push(i.id);
      }
      delConfmanager(del).then((res) => {
        if (res.status === 200) {
          this.Getdata();
        }
      })
    },
    // 新增
    addopen() {
      this.$router.push({
        path: `/tableship/`
      });
    },
    // 点击翻页
    currentpagechange(val) {
      this.offset = val;
      this.Getdata();
    },
  },
  watch: {}
}
</script>
