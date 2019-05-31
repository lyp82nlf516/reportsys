<template>
  <div class="tableshipBox" id="tableshipBox">
    <div class="tableShipBoxs" v-if="tableShipBoxs">
      <div class="topbox">
        <div class="selectdata">
          <span class="datalabel">数据源</span>
          <el-select v-model="datasourceValue" :placeholder="dataValDefault" clearable @change="changeDatasource" v-if="this.datasourceoptions.length>0">
            <el-option v-for="(item, index) in datasourceoptions" :key="index" :label="item.value" :value="item.key"></el-option>
          </el-select>
          <div class="selectinput">
            <el-input v-model="requireData" placeholder="请输入表单名称"></el-input>
          </div>
        </div>
        <div class="selecttable">
          <div class="topleft">
            <div class="selectinputHighlight">
              <el-input ref="searchInput" v-model="filterTableValue2" placeholder="请输入内容">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTable2"></i>
              </el-input>
            </div>
            <el-checkbox-group v-model="checkList" @change="checktable" id="selectkey" ref="changeColor">
              <el-checkbox
                v-for="(item, index) in tableList" :value="item.key" :key="item.key" :label="JSON.stringify(item)" ref="changeColor1" :id="'myModal'+(index+1)">
                <i v-html="item.value"></i>
                <!--{{item.value}}-->
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="topright">
            <span>已选表：</span>
            <div>
              <el-tag v-for="tag in checkList" :key="JSON.parse(tag).key" :closable="true" color="rgba(0, 0, 225, 0.4)" @close="handleClose(tag)">
                <span class="tagInfo">
                  <!--{{JSON.parse(tag).value}}-->
                  <i v-html="JSON.parse(tag).value"></i>
                </span>
              </el-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="tableshipbox" v-if="this.checkList.length > 1">
        <div v-for="(item, index) in tableship" :key="index" class="tableshipli" v-show='item.show'>
          <div class="tableradio">
            <el-radio-group v-model="item.value" @change="changetableship(item.value, index)">
              <el-radio v-for="(items, index) in item.data" :label="index" :disabled="items.dis" :key="index">
                <!--{{items.value}}-->
                <i v-html="items.value"></i>
              </el-radio>
            </el-radio-group>
          </div>
          <el-select v-model="item.tableship" placeholder="请选择" v-if="index !== tableship.length - 1">
            <el-option v-for="(items, index) in tableoptions" :key="index" :label="items.label" :value="items.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="contentbox" v-if="this.checkList.length > 1">
        <div class="dataBox">
          <div class="contentleft" v-if="checkList.length > 1">
            <!--<el-button type="text" class="savebtn" @click="saveship" :loading="loading">生成</el-button>-->
            <div class="tableone">
              <div class="filterinput">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText" @keyup.native.enter="filterFildone" >
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="filterFildone"></i>
                </el-input>
              </div>
              <div class="fieldtree">
                <el-tree class="filter-tree" accordion default-expand-all node-key="allkey" :data="fieldListone" :props="defaultProps" :filter-node-method="filterNode" ref="treefield1" :render-content="renderTreefield">
                </el-tree>
              </div>
            </div>
            <div class="shipselect">
              <!-- <span> 关联关系：</span> -->
              <el-select v-model="shipValue" :placeholder="this.createShip.rule.key" clearable @change="changeShip">
                <el-option v-for="(item, index) in shipOption" :key="index" :label="item.value" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="tabletwo">
              <div class="filterinput">
                <el-input placeholder="输入关键字进行过滤" v-model="filterTexttwo" @keyup.native.enter="filterFildtwo">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="filterFildtwo"></i>
                </el-input>
              </div>
              <div class="fieldtree">
                <el-tree class="filter-tree" accordion default-expand-all node-key="allkey" :data="fieldTwoList" :props="defaultProps" :filter-node-method="filterNode" ref="treefield2" :render-content="renderTreefieldtwo">
                </el-tree>
              </div>
            </div>
          </div>
          <div class="contentleft contentleftone" v-if="checkList.length < 2">
            <div class="onetable">单表请直接点击保存</div>
          </div>
          <div class="contentright">
            <span class="rulesHave">已选规则：</span>
            <div class="fieldlistbox">
              <el-table :data="fielddatd" style="width: 100%" :show-header='false'>
                <el-table-column prop="from.value" show-overflow-tooltip></el-table-column>
                <el-table-column prop="rule.value" width="30"> </el-table-column>
                <el-table-column prop="to.value" show-overflow-tooltip> </el-table-column>
                <el-table-column width="60">
                  <template slot-scope="scope">
                    <i class="el-icon-delete" @click="delectship(scope.$index)"></i>
                    <i class="el-icon-edit" @click="rowclick(scope.row, scope.$index)"></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="selectTable" v-if="this.checkList.length===1">
        <div class="toolBox">
          <div class="checkTool">
            <el-checkbox-group v-model="checkTool">
              <el-checkbox :label="item.value" :key="index" v-for="(item, index) in checkTools" @change="handleCheckedTools"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="tableItem">
          <el-radio-group v-model="checkRadio">
            <el-radio :label="item.value" value="index" :key="index" v-for="(item, index) in fieldListonekey">{{item.value}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="nextbtn">
        <el-button type="text" class="savebtn" @click="ships" :disabled="savedisabled">下一步</el-button>
      </div>
    </div>
    <childconfigfield v-if="configfieldBox" v-bind:parentmsg="tableshipMsg"></childconfigfield>
  </div>
</template>
<style lang="scss">
#tableshipBox {
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 7px;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(132, 146, 166, 0);
    background: rgba(132, 146, 166, 0.6);
  }
  ::-webkit-scrollbar-thumb:hover {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(132, 146, 166, 0.3);
    background: rgba(132, 146, 166, 0.4);
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(132, 146, 166, 0);
    border-radius: 0;
    background: rgba(132, 146, 166, 0);
  }
  background-color: #fff;
  width: 100%;
  height: 100%;
  height: calc(100% - 55px);
  overflow: hidden;
  overflow: auto;
  .tableShipBoxs {
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow: auto;
    .nextbtn {
      position: relative;
      width: 100%;
      height: 15%;
    }
  }
  input::-webkit-input-placeholder {
    /*WebKit browsers*/
    font-size: 12px;
  }
  input::-moz-input-placeholder {
    /*Mozilla Firefox*/
    font-size: 12px;
  }
  input::-ms-input-placeholder {
    /*Internet Explorer*/
    font-size: 12px;
  }
  .topbox {
    width: calc(100% - 20px);
    height: calc(30% - 60px);
    height: 60%;
    height: 65%;
    height: 347px;
    border: 1px solid #f0f0f0;
    margin: 10px;
    .el-checkbox__input.is-checked .el-checkbox__inner {
      //background-color: #300fe8;
      //border-color: #130ff9;
      border-color: #6d71ef;
      background: #6d71ef;
    }
    .selectdata {
      position: relative;
      height: 36px;
      width: 100%;
      border-bottom: 1px solid #f0f0f0;
      line-height: 36px;
      .datalabel {
        font-size: 14px;
        margin-left: 10px;
      }
      .el-input__inner {
        height: 28px;
        border-radius: 0;
      }
      .el-input__inner:focus {
        border: 1px solid #6d71ef;
      }
      .el-input__icon {
        line-height: 28px;
      }
      .el-input__icon:hover {
        cursor: pointer;
      }
      .selectinput {
        position: absolute;
        left: 50%;
        top: 0;
        width: 200px;
        margin-left: -100px;
      }
    }
    .selecttable {
      height: calc(100% - 48px);
      height: 300px;
      width: calc(100% - 10px);
      background-color: #fafbfd;
      padding: 5px 5px;
      overflow: auto;
    }
    .topleft {
      float: left;
      width: calc(75% - 12px);
      height: calc(100% - 10px);
      border-right: 1px solid #f0f0f0;
      padding: 5px 5px;
      overflow: auto;
      .el-checkbox {
        width: 25%;
        margin-left: 0px;
        //margin-right: 10px;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .el-checkbox__label {
        font-size: 12px;
      }
      .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #606266;
      }
      .highlight {
        color: red;
        background: yellow;
      }
      .selectinputHighlight {
        width: 100%;
        overflow: auto;
        margin-bottom: 10px;
        .el-input {
          float: right;
          width: 20%;
          margin-right: 10px;
          .el-input__inner:focus {
            border: 1px solid #6d71ef;
          }
          .el-input__icon {
            line-height: 28px;
          }
        }
        .el-input__inner {
          height: 28px;
          border-radius: none;
        }
      }
    }
    .topright {
      float: left;
      width: calc(25% - 10px);
      height: 100%;
      overflow: auto;
      padding: 0 5px;
      .el-tag {
        position: relative;
        margin: 3px;
        margin: 3px 0;
        padding: 0 3px;
        padding: 0px px 0 3px;
        height: 22px;
        line-height: 18px;
        display: inline-block;
        width: 50%;
        overflow: hidden;
        color: #fff;
        .tagInfo {
          float: left;
          display: inline-block;
          width: calc(100% - 15px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-right: 0;
        }
        .el-tag__close {
          float: right;
          width: 15px;
          top: 3px;
          right: 0px;
          color: #fff;
        }
        .el-tag__close:hover {
          background: #300fe8;
          color: #fff;
        }
      }
      span:nth-child(2n + 1) {
        margin-right: 2%;
        width: 48%;
      }
    }
  }
  .tableshipbox {
    width: calc(100% - 30px);
    height: 220px;
    border: 1px solid #f0f0f0;
    margin: 10px;
    overflow-x: auto;
    white-space: nowrap;
    overflow-y: auto;
    padding: 5px;
    .tableshipli {
      vertical-align: top;
      display: inline-block;
      height: 200px;
      //float: left;
      margin-top: 3px;
      .tableradio {
        overflow: auto;
        height: calc(100% - 12px);
        float: left;
        border: 1px solid #ccc;
        margin: 0 2px;
        padding: 5px 10px;
        background-color: #fafbfd;
      }
    }
    .el-radio {
      display: block;
      padding: 5px 0;
      .el-radio__label {
        font-size: 12px;
        padding-left: 5px;
      }
      .el-radio__input.is-checked + .el-radio__label {
        color: #606266;
      }
    }
    .el-radio + .el-radio {
      margin-left: 0;
    }
    .el-radio__inner {
      width: 12px;
      height: 12px;
    }
    .el-radio__input.is-checked .el-radio__inner {
      border-color: blue;
      background: blue;
      border-color: #6d71ef;
      background: #6d71ef;
    }
    .el-select {
      margin-top: 86px;
      .el-select-dropdown__item {
        padding: 0px 3px;
        height: 12px;
        font-size: 12px;
      }
      .el-input {
        .el-input__icon {
          line-height: 28px;
        }
      }
    }
    .el-select-dropdown__item {
      height: 28px !important;
    }
    .el-input__inner {
      height: 28px;
      border-radius: 0;
      width: 95px;
    }
    .el-input__icon {
      width: 20px;
    }
    .el-input__icon + .el-input__inner {
      padding-right: 18px;
    }
  }
  .contentbox {
    width: calc(100% - 20px);
    height: calc(60% - 60px);
    height: calc(63% - 425px);
    height: 60%;
    height: 300px;
    // border: 1px solid #f0f0f0;
    margin: 5px 10px;
    .dataBox {
      width: 100%;
      height: 100%;
      //overflow: auto;
      .contentleft {
        float: left;
        width: calc(75% - 6px);
        height: 100%;
        overflow: auto;
        position: relative;
        .el-tree-node__expand-icon {
          border: 0;
        }
        .el-input__inner {
          height: 28px;
          border-radius: 0;
        }
        .el-tree {
          border: 0;
          background: #fafbfd;
        }
        .el-tree-node__content {
          font-size: 12px;
          overflow: auto;
          .treelabel {
            float: left;
            width: calc(100% - 35px);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 16px;
          }
        }
        .checkedicon {
          .el-icon-circle-check {
            color: blue;
            color: #6d71ef;
          }
        }
        .uncheckicon {
          .el-icon-circle-check {
            color: #ccc;
          }
        }
        .tableone {
          width: calc(50% - 100px);
          float: left;
          height: 100%;
          .filterinput {
            height: 30px;
            width: 100%;
            .el-input__inner:focus {
              border: 1px solid #6d71ef;
            }
            .el-input__icon {
              line-height: 28px;
            }
          }
          .fieldtree {
            height: calc(100% - 32px);
            width: calc(100% - 2px);
            overflow: auto;
            border: 1px solid #f0f0f0;
            background: #fafbfd;
            border-top: 0;
          }
        }
        .shipselect {
          width: 150px;
          float: left;
          height: 100%;
          margin: 0 25px;
          .el-select {
            margin-top: 150px;
            .el-input__icon {
              line-height: 28px;
            }
            .el-select-dropdown__item {
              padding: 0px 10px;
              height: 20px;
            }
          }
        }
        .tabletwo {
          width: calc(50% - 100px);
          float: left;
          height: 100%;
          .filterinput {
            height: 30px;
            width: 100%;
            .el-input__inner:focus {
              border: 1px solid #6d71ef;
            }
            .el-input__suffix {
              .el-input__icon {
                line-height: 28px;
              }
            }
          }
          .fieldtree {
            height: calc(100% - 32px);
            width: calc(100% - 2px);
            overflow: auto;
            border: 1px solid #f0f0f0;
            background: #fafbfd;
            border-top: 0;
          }
        }
        .savebtn {
          position: absolute;
          bottom: 10px;
          right: 10px;
          padding: 5px 10px;
          font-size: 12px;
        }
        .el-button--text {
          color: #6d71ef;
        }
        // .el-button {
        //     box-shadow: 3px 3px 5px #8c8b8b;
        //     background-color: #4950ef;
        //     border-color: blue;
        // }
      }
      .contentleftone {
        background-color: #fafbfd;
        text-align: center;
        vertical-align: middle;
        .onetable {
          height: 20px;
          width: 150px;
          margin: auto;
          left: 0;
          right: 0;
          margin-top: 150px;
        }
      }
      .contentright {
        float: left;
        width: calc(25% - 10px);
        height: 100%;
        //overflow: auto;
        padding: 0 5px;
        margin-left: 5px;
        background: #fafbfd;
        position: relative;
        .rulesHave {
          height: 30px;
          display: inline-block;
          line-height: 30px;
        }
        .fieldlistbox {
          width: 100%;
          height: calc(100% - 30px);
          background: #fafbfd;
          overflow: auto;
          .el-table {
            margin-top: 5px;
            border: 1px solid #dfe6ec;
          }
          .el-table--fit {
            border-bottom: 0;
          }
          .el-table td {
            height: 26px;
            font-size: 12px;
            padding: 0;
          }
        }
        .el-table .cell,
        .el-table th > div {
          padding-left: 10px;
          padding-right: 10px;
        }
        .el-button--text {
          //color: blue;
        }
        // .el-button {
        //     box-shadow: 3px 3px 5px #8c8b8b;
        //     background-color: #4950ef;
        //     border-color: blue;
        // }
      }
    }
  }
  .selectTable {
    width: calc(100% - 30px);
    height: 220px;
    border: 1px solid #f0f0f0;
    margin: 10px;
    padding: 5px;
    .toolBox {
      float: left;
      width: calc(25% - 11px);
      height: 100%;
      overflow: auto;
      padding: 0 5px;
      border-right: 1px solid #f0f0f0;
      .el-checkbox {
        .el-checkbox__input.is-checked .el-checkbox__inner {
          background-color: #300fe8;
          border-color: #130ff9;
          border-color: #6d71ef;
          background-color: #6d71ef;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #606266;
        }
      }
    }
    .tableItem {
      float: left;
      width: calc(75% - 12px);
      height: calc(100% - 10px);
      padding: 5px 5px;
      overflow: auto;
      .el-radio-group {
        width: calc(100% - 20px);
        padding: 10px;
        .el-radio {
          width: 25%;
          margin-left: 0px;
          margin-bottom: 5px;
          white-space: nowrap;
          line-height: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          .el-radio__input.is-checked + .el-radio__label {
            color: #606266;
          }
        }
        .el-radio__input.is-checked .el-radio__inner {
          //border-color: blue;
          //background: blue;
          border-color: #6d71ef;
          background: #6d71ef;
        }
      }
    }
  }
  .savebtn {
    position: relative;
    display: block;
    //bottom: 10px;
    //right: 10px;
    padding: 10px 15px;
    font-size: 12px;
    background-color: rgba(0, 0, 225, 0.6);
    color: #fff;
    margin: 27px auto;
  }
}
html {
  i {
    font-style: normal;
  }
}
.el-popper {
  margin-top: 8px;
}
</style>
<script>
import {
  getDbs,
  getTables,
  getTableColumns,
  saveConfInfo, // 保存sql
} from '@/services/query';
import childconfigfield from './configfield.vue';
export default {
  data() {
    return {
      datasourceoptions: [], // 数据源选项数据
      datasourceSelect: '',
      datasourceValue: '', // 已选数据源
      dataValDefault: '',
      tableList: [], // table数据
      checkList: [], // 已选表数据
      requireData: '', // 筛选表输入框数据
      filterTableValue2: '', // 筛选表输入框数据
      tableTags: [], // 已选的表数据
      shipOption: [{
        value: '>'
      }, {
        value: '='
      }], // 关联关系选项数据
      shipValue: '', // 关联关系已选数据
      filterText: '', // 源表输入框文本
      filterTexttwo: '', // 目标表输入框文本
      fieldList: [], // 字段树数据
      fieldListone: [],
      fieldTwoList: [], // 字段树数据
      newfieldListone: [],
      defaultProps: {
        children: 'children',
        label: 'value'
      }, // 字段树展示时要展示的变量
      fielddatd: [], // 已选的关联关系的数据
      createShip: {
        from: {},
        rule: {
          'value': '=',
          'key': '='
        },
        to: {},
        table: {
          from: {},
          to: {}
        }
      }, // 正在创建的关联关系数据
      flagedit: {
        type: true,
        index: 0,
      },
      checked: [], // 设置已选关联的表
      tableship: [], // 模拟的数据
      tableoptions: [
        {
          value: 'left join',
          label: '左关联'
        },
      ], // 左关联选项数据
      flagupdate: false, // 性能优化，判断是否进行刷新
      shiptablefildst: ' from   ',
      shiptablefildst2: '',
      inittreedata: {},
      loading: false,
      savedisabled: false,
      tableshipflag: true,
      initfielddata: [],
      tablenameparam: '',
      selecttablename: '',
      checkTools: [
        {
          'key': '',
          'value': '新增',
          'type': 'add'
        }, {
          'key': '',
          'value': '删除',
          'type': 'del'
        }, {
          'key': '',
          'value': '修改',
          'type': 'edit'
        }
      ],
      checkTool: [],
      checkRadio: '',
      fieldListonekey: [],
      configfieldBox: false,
      tableShipBoxs: true,
      tableshipMsg: {
        fieldData: [],
        tableNewData: [],
        checkAllNodes: [],
        ids: '',
        operate: '',
      },
      num: []
    }
  },
  props: ['message'],
  mounted() {
    getDbs().then((res) => {
      // console.log('数据源', res.data)
      if (res.status === 200) {
        this.datasourceoptions = res.data;
        if (res.data.length >= 1) {
          if (this.message === undefined) {
            this.datasourceSelect = res.data[0].value;
            this.GetTables(this.datasourceoptions[0].key);
            this.dataValDefault = this.datasourceoptions[0].value;
            this.datasourceValue = this.datasourceoptions[0].key;
          } else {
            this.datasourceValue = this.message.dbid
            for (let i in this.datasourceoptions) {
              if (this.datasourceValue === this.datasourceoptions[i].key) {
                this.dataValDefault = this.datasourceoptions[i].value;
                this.GetTables(this.datasourceoptions[i].key);
              }
            }
          }
        }
      }
    });
    // 回显数据 返回值
    // console.log('message-tableship', this.message);
    if (this.message === undefined) {
      this.checkList = [];
    } else {
      this.checkList = this.message.parentMsg2;
      this.requireData = this.message.managername;
      this.checkTool = this.message.operate;
      this.fieldListonekey = this.message.columnkeyobj;
      this.checkRadio = this.message.checkRadios;
      this.tableship = this.message.tableshipArr;
      this.fieldTwoList = this.message.fieldTwoList;
      this.initfielddata = this.message.columnkeyobjtwo;
      this.inittreedata = this.message.fieldListone;
      this.fielddatd = this.message.oldfielddatd;
      if (this.message.tablename.split(',').length > 1) {
        this.fieldListone = this.message.fieldListonedel;
      } else if (this.message.fieldTwoList.length === 1) {
        this.fieldListone = this.message.fieldListone;
      }
    }
  },
  created() { },
  components: { childconfigfield },
  methods: {
    // 生成表关联数据
    creattabledata() {
      // 计算data便于选择，关键在于index的设置，用来后续记录是否选中
      let itemsdata = [];
      for (let j in this.checkList) {
        let item = {
          dis: false,
          index: j * 1,
          value: JSON.parse(this.checkList[j]).value,
          key: JSON.parse(this.checkList[j]).key,
        }
        itemsdata.push(JSON.parse(JSON.stringify(item)));
      }
      // 得到整个数据，设置它的隐藏显示，以及记录选中的值
      let tableshipdata = [];
      for (let i in this.checkList) {
        let shipitem = {};
        if (i === '0') {
          shipitem = {
            show: true,
            tableship: 'left join',
            value: '',
            data: JSON.parse(JSON.stringify(itemsdata))
          };
        } else {
          shipitem = {
            show: false,
            tableship: 'left join',
            value: '',
            data: JSON.parse(JSON.stringify(itemsdata))
          };
        }
        tableshipdata.push(shipitem);
      }
      this.tableship = tableshipdata;
    },
    // 选择表关联关系
    changetableship(paramvalue, index) {
      // value: index, index之后的部分不可见
      //  设置下一部分可见 之后的部分不可见，恢复初始状态，及可见不可见
      //  设置可选还是不可选
      //  设置数据// zhsmhjc zjl lbc(fsdp) jz roudoujiao  pgt
      // 先设置下面的每一级都为默认初始值得状态
      if (index < this.tableship.length - 1) {
        for (let i = index + 1; i < this.tableship.length; i++) {
          //  设置数据 默认为初始值‘’,设置index之后的数据的初始值为‘’
          this.tableship[i].value = '';
          //  设置下一部分可见 之后的部分不可见，恢复初始状态，及可见不可见
          this.tableship[i].show = false;
          // 设置是否为可选中状态
          //  先恢复之前的设置（都可以选择的状态） 之后再设置可选还是不可选
          for (let m in this.tableship[i].data) {
            this.tableship[i].data[m].dis = false;
          }
          // 开始设置不可选状态
          // 遍历找到之前的已经选择的值
          for (let j = 0; j < index + 1; j++) {
            if (this.tableship[j].value !== '') {
              this.tableship[i].data[this.tableship[j].value].dis = true;
            }
          }
        }
        //  设置下一部分可见 之后的部分不可见，恢复初始状态，及可见不可见
        if (paramvalue !== '') {
          this.tableship[index + 1].show = true;
        }
      }
    },
    // 切换数据源数据源调用的函数
    changeDatasource() {
      this.GetTables(this.datasourceValue);
      this.GetTableColumns();
      this.checkList = [];
      // console.log('数据源：', this.datasourceValue)
    },
    //  选中表后
    checktable() {
      this.GetTableColumns();
      this.creattabledata();
      this.flagupdate = false;
      this.fielddatd = [];
      this.GetTables(this.datasourceValue);
    },
    // 删除已选表
    handleClose(tag) {
      this.checkList.splice(this.checkList.indexOf(tag), 1);
      this.GetTableColumns();
      this.creattabledata();
      this.flagupdate = false;
      this.fielddatd = [];
    },
    // 得到字段数据
    GetTableColumns() {
      let tableName = '';
      this.checked = [];
      for (let i of this.checkList) {
        this.checked.push(JSON.parse(i));
        if (tableName === '') {
          tableName = `${JSON.parse(i).key}`
        } else {
          tableName = `${tableName},${JSON.parse(i).key}`
        }
      }
      this.tablenameparam = tableName;
      let param = {
        'id': this.datasourceValue,
        'tableName': tableName,
      }
      getTableColumns(param).then((res) => {
        if (res.status === 200) {
          // 因为不同的表下的字段的key 可能相同，所以需要手动定义一个唯一的key来作为是被标志，用来在回写数据的时候用到
          this.initfielddata = JSON.parse(JSON.stringify(res.data));
          for (let j in this.initfielddata) {
            for (let i in this.initfielddata[j]) {
              this.initfielddata[j][i].allkey = `${j}.${this.initfielddata[j][i].key}`;
            }
          }
          let tempfielddata = JSON.parse(JSON.stringify(this.initfielddata));
          this.fieldListone = this.createtreedata(tempfielddata);
          this.fieldTwoList = this.createtreedata(tempfielddata);
          this.inittreedata = JSON.parse(JSON.stringify(this.createtreedata(tempfielddata)));
          if (this.fieldListone.length > 0) {
            this.fieldListonekey = this.fieldListone[0].children;
          }
          this.checkTool = [];
          this.checkRadio = '';
          this.newfieldListone = this.createtreedata(tempfielddata);
        }
      })
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
    // 得到数据源数据
    GetDbs() {
      getDbs().then((res) => {
        if (res.status === 200) {
          this.datasourceoptions = res.data;
        }
      })
    },
    // 得到数据源下的表数据
    GetTables(val) {
      getTables(val).then((res) => {
        // console.log('表数据：', res.data);
        if (res.status === 200) {
          this.tableList = res.data;
        }
      })
    },
    // 筛选数据的封装函数 .toLowerCase()
    filtertext(text, data) {
      let textval = text;
      for (let o in data) {
        this.num.push(data[o].value);
      }
      $('#selectkey label i').css({ 'color': '#1f2d3d', 'background': '#fff' });
      if (text !== '') {
        let j = 0;
        for (var i = 0; i < data.length; i++) {
          if (!(data[j].value.toLowerCase().includes(textval.toLowerCase()))) {
            let temp = data[j];
            data.splice(j, 1);
            data.push(temp);
          } else {
            j++;
          }
        }
        for (let k in data) {
          let temp = $('#selectkey label').eq(k).find('i').html().toLowerCase();
          if (temp.includes(textval.toLowerCase())) {
            let urls = this.$route.path.split('/')[1];
            if (urls === 'panel') {
              let ids = '#' + this.$refs.changeColor1[k].id + ' ' + 'i';
              $(ids).css({ 'color': 'red', 'background': 'yellow' });
            }
            $('#selectkey').children('label').eq(k).find('i').css({ 'color': 'red', 'background': 'yellow' });
          }
        }
      }
    },
    filterTable2(ev) {
      this.filtertext(this.filterTableValue2, this.tableList);
    },
    // 筛选字段
    filterNode(value, data) {
      if (!value) return true;
      return data.value.indexOf(value) !== -1;
    },
    filterFildone() {
      // this.$refs.treefield1.filter(this.filterText.toLowerCase());
      let temp = this.$refs.treefield1.data;
      let c = this.filterText.toLowerCase();
      if (c !== '') {
        for (let j in temp) {
          let a = $('.el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__content').children('span:first-child+span').children('span').html().toLowerCase();
          if (!a.includes(c)) {
            $('.el-tree').children('.el-tree-node').eq(j).css('display', 'none');
            $('.el-tree').children('.el-tree-node').eq(j).siblings().children('.el-tree-node__children').children('.el-tree-node').css('display', 'none');
          }
        }
        for (let j in temp) {
          for (let i in temp[j].children) {
            let b = $('.el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').eq(i).find('.treelabel').html().toLowerCase();
            if (b.includes(c)) {
              $('.el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').parent('.el-tree-node__children').parent('.el-tree-node').css('display', 'block')
              $('.el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').eq(i).css('display', 'block');
            } else {
              $('.el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').eq(i).css('display', 'none');
            }
          }
        }
      } else {
        $('.el-tree').children('.el-tree-node').css('display', 'block');
        $('.el-tree').children('.el-tree-node').children('.el-tree-node__children').css('display', 'block');
        $('.el-tree').children('.el-tree-node').children('.el-tree-node__children').children('.el-tree-node').css('display', 'block');
      }
    },
    filterFildtwo() {
      this.$refs.treefield2.filter(this.filterTexttwo);
    },
    // 选择关联关系
    changeShip() {
      this.createShip.rule.value = this.shipValue;
      this.createShip.rule.key = this.shipValue;
    },
    // 选中源
    append(store, data, node, that) {
      let updataflag = true;
      if (data.allkey === this.createShip.from.allkey) {
        updataflag = false;
      } else {
        updataflag = true;
      }
      that.$refs.treefield1.setCheckedKeys([]);
      node.checked = !node.checked;
      this.createShip.from = data;
      this.createShip.table.from = {
        key: node.parent.data.key,
        value: node.parent.data.value,
      }
      // 修改源，判断目标表是否进行刷新
      if (updataflag) {
        this.fieldTwoList = this.createtreedata(this.getdatacreatetree(node.parent.data.key));
        this.$nextTick(() => {
          this.$refs.treefield2.setCheckedKeys([this.createShip.to.allkey]);
        });
      }
    },
    // 得到源活目标的选择筛选后的对象，用来生成tree数据
    getdatacreatetree(val) {
      // 先拷贝初始化的数据，一面进项删除操作时，修改了原始数据
      let tempinitdata = JSON.parse(JSON.stringify(this.initfielddata));
      // 删除已经选择的项，使其无法做tree 数据
      for (var key in tempinitdata) {
        if (key === val) {
          delete tempinitdata[key];
        }
      }
      // console.log('tempinitdata-删除之后数据右边数据:', tempinitdata);
      return tempinitdata;
    },
    // 选中目标
    appendtwo(store, data, node, that) {
      let updataflag = true;
      if (data.allkey === this.createShip.to.allkey) {
        updataflag = false;
      } else {
        updataflag = true;
      }
      that.$refs.treefield2.setCheckedKeys([]);
      node.checked = !node.checked;
      this.createShip.to = data;
      this.createShip.table.to = {
        key: node.parent.data.key,
        value: node.parent.data.value
      }
      this.saveship();
      if (updataflag) {
        this.fieldListone = this.createtreedata(this.getdatacreatetree(node.parent.data.key));
        this.$nextTick(() => {
          this.$refs.treefield1.setCheckedKeys([this.createShip.from.allkey]);
        });
      }
    },
    // 生成关系的函数
    saveship() {
      if (this.createShip.from.value === undefined || this.createShip.from.value === '' || this.createShip.to.value === '' || this.createShip.rule.value === '') {
        this.$message('请选择完整的关系链');
      } else {
        if (this.flagedit.type) {
          let oldarr = [];
          let newstr = `${this.createShip.from.allkey}${this.createShip.rule.key}${this.createShip.to.allkey}`;
          for (let i in this.fielddatd) {
            let oldstr = `${this.fielddatd[i].from.allkey}${this.fielddatd[i].rule.key}${this.fielddatd[i].to.allkey}`;
            oldarr.push(oldstr);
          }
          if (oldarr.includes(newstr)) {
            this.$message('请不要重复选择');
          } else {
            this.fielddatd.push(JSON.parse(JSON.stringify(this.createShip)));
          }
        } else {
          this.fielddatd.splice(this.flagedit.index, 1, JSON.parse(JSON.stringify(this.createShip)));
        }
        this.createShip = {
          from: {
            value: '',
            key: '',
            allkey: '',
          },
          rule: {
            value: '=',
            key: '='
          },
          to: {
            value: '',
            key: '',
            allkey: '',
          },
          table: {
            from: {},
            to: {}
          }
        }
        this.$refs.treefield1.setCheckedKeys([]);
        this.$refs.treefield2.setCheckedKeys([]);
        this.fieldListone = JSON.parse(JSON.stringify(this.inittreedata));
        this.fieldTwoList = JSON.parse(JSON.stringify(this.inittreedata));
        this.$forceUpdate();
        this.flagupdate = true;
        this.shipValue = '=';
        this.flagedit.type = true;
        this.flagupdate = false;
      }
    },
    // 保存关联关系
    ships() {
      this.tableshipflag = true;
      if (this.checkList.length === 1) {
        // 单表的时候直接保存，不管字段之间的规则
        this.shiptablefildst = ` from   ${JSON.parse(this.checkList[0]).key}`;
        // 把数据同步到数据库中
        let param = {};
        let columnkey = '';
        if (this.checkRadio === '') {
          columnkey = ''
        } else {
          columnkey = JSON.parse(this.checkList[0]).value + '.' + this.checkRadio;
        }
        let operate = '';
        let tablename = JSON.parse(this.checkList[0]).value;
        for (let i in this.checkTool) {
          for (let j in this.checkTools) {
            if (this.checkTool[i] === this.checkTools[j].value) {
              if (operate === '') {
                operate = `${this.checkTools[j].type}`
              } else {
                operate = `${operate};${this.checkTools[j].type}`
              }
            }
          }
        }
        if (this.message === undefined) {
          param = {
            dbid: this.datasourceValue,
            tablename: tablename,
            confmsg: this.shiptablefildst,
            operate: operate,
            columnkey: columnkey,
            managername: this.requireData,
            // dbsource: this.datasourceValue
          };
        } else {
          param = {
            dbid: this.datasourceValue,
            tablename: tablename,
            confmsg: this.shiptablefildst,
            operate: operate,
            columnkey: columnkey,
            managername: this.requireData,
            id: this.message.id,
            // dbsource: this.datasourceValue
          };
        }
        // 不选择操作
        if (this.requireData === '') {
          this.$message('请输入表单名称！')
        } else {
          if (param.operate !== '' && param.columnkey === '') { // 主键不为空
            this.$message('请选择一个主键！');
          } else if (param.operate === '' && param.columnkey !== '') { // 操作不为空
            this.$message('操作（增加、修改、删除）不为空！');
          } else if (param.operate === '' && param.columnkey === '') {
            this.saveconfInfo(param);
          } else {
            this.saveconfInfo(param);
          }
        }
      } else if (this.checkList.length === 0) {
        // 未选择的时候点击不做任何操作this.savedisabled = false;
        this.$message('请选择一张表！');
      } else {
        let shiptablefild = [];
        for (let j in this.tableship) {
          if (this.tableship[j].value !== '') {
            shiptablefild.push(this.tableship[j].data[this.tableship[j].value].key);
          } else {
            // 表关系没有选择完全
            this.tableshipflag = false;
          }
        }
        // 如果没有悬着表关系，是无法保存的
        if (!this.tableshipflag) {
          // 表关系没有选择完，提示选择表关系
          this.$message('请选择完成表关系');
        } else {
          let fildshipobj = {};
          let fildshipobj2 = {};
          let fildshipobj3 = [];
          let fildshiparrs = [];
          // 遍历规则数组 设置关系与表的对应关系
          for (let i in this.fielddatd) {
            // 找到在数组中的位置
            let indexfrom = shiptablefild.indexOf(this.fielddatd[i].table.from.key);
            let indexto = shiptablefild.indexOf(this.fielddatd[i].table.to.key);
            // 设置规则与表的关系
            if (indexfrom > indexto) {
              if (fildshipobj[this.fielddatd[i].table.from.key] === undefined) {
                fildshipobj[this.fielddatd[i].table.from.key] = [` on ${this.fielddatd[i].table.from.key}.${this.fielddatd[i].from.key} ${this.fielddatd[i].rule.key} ${this.fielddatd[i].table.to.key}.${this.fielddatd[i].to.key}`];
              } else {
                fildshipobj[this.fielddatd[i].table.from.key].push(` on ${this.fielddatd[i].table.from.key}.${this.fielddatd[i].from.key} ${this.fielddatd[i].rule.key} ${this.fielddatd[i].table.to.key}.${this.fielddatd[i].to.key}`);
              }
              if (fildshipobj2[this.fielddatd[i].table.from.key] === undefined) {
                fildshipobj2[this.fielddatd[i].table.from.key] = [`${this.fielddatd[i].table.from.key}.${this.fielddatd[i].from.key},${this.fielddatd[i].rule.key},${this.fielddatd[i].table.to.key}.${this.fielddatd[i].to.key}`];
                fildshiparrs.push(`${this.fielddatd[i].table.from.key}.${this.fielddatd[i].from.key},${this.fielddatd[i].rule.key},${this.fielddatd[i].table.to.key}.${this.fielddatd[i].to.key}`);
              } else {
                fildshipobj2[this.fielddatd[i].table.from.key].push(`${this.fielddatd[i].table.from.key}.${this.fielddatd[i].from.key},${this.fielddatd[i].rule.key},${this.fielddatd[i].table.to.key}.${this.fielddatd[i].to.key}`);
                fildshiparrs.push(`${this.fielddatd[i].table.from.key}.${this.fielddatd[i].from.key},${this.fielddatd[i].rule.key},${this.fielddatd[i].table.to.key}.${this.fielddatd[i].to.key}`);
              }
            } else {
              if (fildshipobj[this.fielddatd[i].table.to.key] === undefined) {
                fildshipobj[this.fielddatd[i].table.to.key] = [` on ${this.fielddatd[i].table.from.key}.${this.fielddatd[i].from.key} ${this.fielddatd[i].rule.key} ${this.fielddatd[i].table.to.key}.${this.fielddatd[i].to.key}`];
              } else {
                fildshipobj[this.fielddatd[i].table.to.key].push(` on ${this.fielddatd[i].table.from.key}.${this.fielddatd[i].from.key} ${this.fielddatd[i].rule.key} ${this.fielddatd[i].table.to.key}.${this.fielddatd[i].to.key}`);
              }
              if (fildshipobj2[this.fielddatd[i].table.to.key] === undefined) {
                fildshipobj2[this.fielddatd[i].table.to.key] = [`${this.fielddatd[i].table.from.key}.${this.fielddatd[i].from.key},${this.fielddatd[i].rule.key},${this.fielddatd[i].table.to.key}.${this.fielddatd[i].to.key}`];
                fildshiparrs.push(`${this.fielddatd[i].table.from.key}.${this.fielddatd[i].from.key},${this.fielddatd[i].rule.key},${this.fielddatd[i].table.to.key}.${this.fielddatd[i].to.key}`);
              } else {
                fildshipobj2[this.fielddatd[i].table.to.key].push(`${this.fielddatd[i].table.from.key}.${this.fielddatd[i].from.key},${this.fielddatd[i].rule.key},${this.fielddatd[i].table.to.key}.${this.fielddatd[i].to.key}`);
                fildshiparrs.push(`${this.fielddatd[i].table.from.key}.${this.fielddatd[i].from.key},${this.fielddatd[i].rule.key},${this.fielddatd[i].table.to.key}.${this.fielddatd[i].to.key}`);
              }
            }
          }
          // 连接字符串
          for (let m in shiptablefild) {
            if (m < shiptablefild.length - 1) {
              if (fildshipobj[shiptablefild[m]] !== undefined) {
                this.shiptablefildst = `${this.shiptablefildst} ${shiptablefild[m]} ${fildshipobj[shiptablefild[m]].join('  ')}  left join`;
              } else {
                this.shiptablefildst = `${this.shiptablefildst} ${shiptablefild[m]}  left join`;
              }
            } else {
              if (fildshipobj[shiptablefild[m]] !== undefined) {
                this.shiptablefildst = `${this.shiptablefildst} ${shiptablefild[m]} ${fildshipobj[shiptablefild[m]].join('  ')}`;
              } else {
                this.shiptablefildst = `${this.shiptablefildst} ${shiptablefild[m]}`;
              }
            }
          }
          for (let h in fildshipobj2) {
            for (let u in fildshipobj2[h]) {
              fildshipobj3.push(fildshipobj2[h][u]);
            }
          }
          for (let f in fildshiparrs) {
            if (this.shiptablefildst2 === '') {
              this.shiptablefildst2 = `${fildshipobj3[f]}`
            } else {
              this.shiptablefildst2 = `${this.shiptablefildst2};${fildshiparrs[f]}`
            }
          }
          // 把数据同步到数据库中
          let param = {};
          let tablename = '';
          for (let k in this.checkList) {
            if (tablename === '') {
              tablename = `${JSON.parse(this.checkList[k]).key}`
            } else {
              tablename = `${tablename},${JSON.parse(this.checkList[k]).key}`
            }
          }
          let shiptablefildstr = shiptablefild.toString();
          if (this.message === undefined) {
            param = {
              dbid: this.datasourceValue,
              tablename: tablename,
              confmsg: this.shiptablefildst,
              managername: this.requireData,
              checkkey: shiptablefildstr,
              fildshipArr: this.shiptablefildst2,
              // dbsource: this.datasourceValue
            };
          } else {
            param = {
              dbid: this.message.dbid,
              tablename: tablename,
              confmsg: this.shiptablefildst,
              id: this.message.id,
              managername: this.requireData,
              checkkey: shiptablefildstr,
              fildshipArr: this.shiptablefildst2,
              // dbsource: this.datasourceValue
            };
          }
          if (this.requireData === '') {
            this.$message('请输入表单名称！');
          } else {
            this.saveconfInfo(param);
          }
        }
      }
    },
    // 调用接口保存
    saveconfInfo(val) {
      saveConfInfo(val).then((res) => {
        // console.log('下一步返回结果：', 'res：', res);
        // console.log('下一步返回结果：', 'val：', val);
        if (res.status === 200) {
          // 连接数据库保存后要把字符串清空
          if (this.message !== undefined) {
            const nowName = val.tablename;
            const oldName = this.message.tablename;
            const nowNames = nowName.split(',').sort().toString();
            const oldNames = oldName.split(',').sort().toString();
            if (nowNames === oldNames) {
              let objCol;
              for (let j in res.data) {
                const colscode = res.data[j].columncode.split(';');
                const colsName = res.data[j].columnname.split(';');
                for (let a in colscode) {
                  this.tableshipMsg.checkAllNodes.push(colscode[a]);
                  for (let b in colsName) {
                    if (a === b) {
                      objCol = {
                        columncode: colscode[a],
                        columnname: colsName[b],
                        istitle: res.data[j].istitle,
                        queryrule: res.data[j].queryrule,
                        fixedvalue: res.data[j].fixedvalue,
                        isquery: res.data[j].isquery,
                        querygroup: res.data[j].querygroup,
                        confid: res.data[j].confid,
                        allkey: colscode[a],
                        queryvalue: res.data[j].queryvalue,
                        columntype: res.data[j].columntype
                      }
                    }
                  }
                  this.tableshipMsg.tableNewData.push(objCol);
                }
              }
              this.tableshipMsg.ids = val.id;
              this.tableshipMsg.operate = val.operate;
              this.configfieldBox = true;
              this.tableShipBoxs = false;
              this.tableshipMsg.fieldData = this.message.fieldListone;
            } else {
              if (this.checkList.length === 1) {
                this.shiptablefildst = ' from   ';
                this.$router.push({
                  path: `/configfiled/${val.id}`
                });
              } else if (this.checkList.length > 1) {
                let objCol;
                for (let j in res.data) {
                  const colscode = res.data[j].columncode.split(';');
                  const colsName = res.data[j].columnname.split(';');
                  for (let a in colscode) {
                    this.tableshipMsg.checkAllNodes.push(colscode[a]);
                    for (let b in colsName) {
                      if (a === b) {
                        objCol = {
                          columncode: colscode[a],
                          columnname: colsName[b],
                          istitle: res.data[j].istitle,
                          queryrule: res.data[j].queryrule,
                          fixedvalue: res.data[j].fixedvalue,
                          isquery: res.data[j].isquery,
                          querygroup: res.data[j].querygroup,
                          confid: res.data[j].confid,
                          allkey: colscode[a],
                          queryvalue: res.data[j].queryvalue,
                          columntype: res.data[j].columntype
                        }
                      }
                    }
                    this.tableshipMsg.tableNewData.push(objCol);
                  }
                }
                this.tableshipMsg.ids = val.id;
                this.tableshipMsg.operate = val.operate;
                this.configfieldBox = true;
                this.tableShipBoxs = false;
                this.tableshipMsg.fieldData = this.newfieldListone;
              }
            }
          } else {
            this.shiptablefildst = ' from   ';
            this.$router.push({
              path: `/configfiled/${res.data}`
            });
          }
        }
      })
    },
    // 删除关联关系
    delectship(index) {
      this.fielddatd.splice(index, 1);
    },
    // 点击行，回写
    rowclick(row, index) {
      // 修改的标志
      this.flagedit.type = false;
      this.flagedit.index = index;
      // 回写树
      //  this.$refs.treefield1.setCheckedKeys([row.from.key]);
      // this.$refs.treefield2.setCheckedKeys([row.to.key]);
      // 更新源和目标的数据，以免选到同一张表
      this.fieldListone = this.createtreedata(this.getdatacreatetree(row.table.to.key));
      this.fieldTwoList = this.createtreedata(this.getdatacreatetree(row.table.from.key));
      this.$nextTick(() => {
        this.$refs.treefield1.setCheckedKeys([row.from.allkey]);
        this.$refs.treefield2.setCheckedKeys([row.to.allkey]);
      });
      this.shipValue = row.rule.value;
      this.createShip = {
        from: row.from,
        to: row.to,
        rule: row.rule,
        table: row.table
      }
    },
    // 生成源树
    renderTreefield(h, { node, data, store }) {
      let that = this;
      if (this.flagupdate) {
        // console.log('update---tree1');
        //   node.checked = false;
        // this.$forceUpdate();
      }
      if (data.type === 'table') {
        return (
          <span>
            <span class="titlenode">{node.label}</span>
          </span>
        );
      } else {
        if (node.checked) {
          return (
            <span on-click={() => this.append(store, data, node, that)} style="width: calc(100% - 16px); display: inline-block;overflow: auto;">
              <span class="treelabel">{node.label}</span>
              <span style="float: right; margin-right: 20px" class="checkedicon">
                <i class="el-icon-circle-check" on-click={() => this.append(store, data, node, that)}></i>
              </span>
            </span>
          );
        } else {
          return (
            <span on-click={() => this.append(store, data, node, that)} style="width: calc(100% - 16px); display: inline-block;overflow: auto;">
              <span class="treelabel">{node.label}</span>
              <span style="float: right; margin-right: 20px" class="uncheckicon">
                <i class="el-icon-circle-check" on-click={() => this.append(store, data, node, that)}></i>
              </span>
            </span>
          );
        }
      }
    },
    // 生成目标树
    renderTreefieldtwo(h, { node, data, store }) {
      let that = this;
      if (this.flagupdate) {
        //  node.checked = false;
        //  this.$forceUpdate();
      }
      if (data.type === 'table') {
        return (
          <span>
            <span class="titlenode">{node.label}</span>
          </span>
        );
      } else {
        if (node.checked) {
          return (
            <span on-click={() => this.appendtwo(store, data, node, that)} style="width: calc(100% - 16px); display: inline-block;">
              <span class="treelabel">{node.label}</span>
              <span style="float: right; margin-right: 22px">
                <i class="el-icon-circle-check" on-click={() => this.appendtwo(store, data, node, that)}></i>
              </span>
            </span>
          );
        } else {
          return (
            <span on-click={() => this.appendtwo(store, data, node, that)} style="width: calc(100% - 16px); display: inline-block;">
              <span class="treelabel" style="width: calc(100% - 48px); display: inline-block;">{node.label}</span>
              <span style="float: right; margin-right: 20px" class="uncheckicon">
                <i class="el-icon-circle-check" on-click={() => this.appendtwo(store, data, node, that)}></i>
              </span>
            </span>
          );
        }
      }
    },
    // 单表选中
    handleCheckedTools(val) {
      // let checkedCount = val.length;
    }
  },
  watch: {
    filterText(val) {
      // this.$refs.treefield1.filter(val);
      let c = val.toLowerCase();
      if (this.message === undefined) {
        let temp = this.fieldListone;
        if (c !== '') {
          for (let j in temp) {
            let a = $('.tableone .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__content').children('span:first-child+span').children('span').html().toLowerCase();
            if (!a.includes(c)) {
              $('.tableone .el-tree').children('.el-tree-node').eq(j).css('display', 'none');
              $('.tableone .el-tree').children('.el-tree-node').eq(j).siblings().children('.el-tree-node__children').children('.el-tree-node').css('display', 'none');
            }
          }
          for (let j in temp) {
            for (let i in temp[j].children) {
              let b = $('.tableone .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').eq(i).find('.treelabel').html().toLowerCase();
              if (b.includes(c)) {
                $('.tableone .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').parent('.el-tree-node__children').parent('.el-tree-node').css('display', 'block')
                $('.tableone .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').eq(i).css('display', 'block');
              } else {
                $('.tableone .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').eq(i).css('display', 'none');
              }
            }
          }
        } else {
          $('.tableone .el-tree').children('.el-tree-node').css('display', 'block');
          $('.tableone .el-tree').children('.el-tree-node').children('.el-tree-node__children').css('display', 'block');
          $('.tableone .el-tree').children('.el-tree-node').children('.el-tree-node__children').children('.el-tree-node').css('display', 'block');
        }
      } else {
        let temp = this.message.fieldListonedel;
        if (c !== '') {
          for (let j in temp) {
            let a = $('.tableone .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__content').children('span:first-child+span').children('span').html().toLowerCase();
            if (!a.includes(c)) {
              $('.tableone .el-tree').children('.el-tree-node').eq(j).css('display', 'none');
              $('.tableone .el-tree').children('.el-tree-node').eq(j).siblings().children('.el-tree-node__children').children('.el-tree-node').css('display', 'none');
            }
          }
          for (let j in temp) {
            for (let i in temp[j].children) {
              let b = $('.tableone .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').eq(i).find('.treelabel').html().toLowerCase();
              if (b.includes(c)) {
                $('.tableone .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').parent('.el-tree-node__children').parent('.el-tree-node').css('display', 'block')
                $('.tableone .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').eq(i).css('display', 'block');
              } else {
                $('.tableone .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').eq(i).css('display', 'none');
              }
            }
          }
        } else {
          $('.tableone .el-tree').children('.el-tree-node').css('display', 'block');
          $('.tableone .el-tree').children('.el-tree-node').children('.el-tree-node__children').css('display', 'block');
          $('.tableone .el-tree').children('.el-tree-node').children('.el-tree-node__children').children('.el-tree-node').css('display', 'block');
        }
      }
    },
    filterTexttwo(val) {
      // this.$refs.treefield2.filter(val);
      let temp = this.fieldTwoList;
      let c = val.toLowerCase();
      if (c !== '') {
        for (let j in temp) {
          let a = $('.tabletwo .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__content').children('span:first-child+span').children('span').html().toLowerCase();
          if (!a.includes(c)) {
            $('.tabletwo .el-tree').children('.el-tree-node').eq(j).css('display', 'none');
            $('.tabletwo .el-tree').children('.el-tree-node').eq(j).siblings().children('.el-tree-node__children').children('.el-tree-node').css('display', 'none');
          }
        }
        for (let j in temp) {
          for (let i in temp[j].children) {
            let b = $('.tabletwo .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').eq(i).find('.treelabel').html().toLowerCase();
            if (b.includes(c)) {
              $('.tabletwo .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').parent('.el-tree-node__children').parent('.el-tree-node').css('display', 'block')
              $('.tabletwo .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').eq(i).css('display', 'block');
            } else {
              $('.tabletwo .el-tree').children('.el-tree-node').eq(j).children('.el-tree-node__children').children('.el-tree-node').eq(i).css('display', 'none');
            }
          }
        }
      } else {
        $('.tabletwo .el-tree').children('.el-tree-node').css('display', 'block');
        $('.tabletwo .el-tree').children('.el-tree-node').children('.el-tree-node__children').css('display', 'block');
        $('.tabletwo .el-tree').children('.el-tree-node').children('.el-tree-node__children').children('.el-tree-node').css('display', 'block');
      }
    },
    filterTableValue2(val) {
      this.filtertext(this.filterTableValue2, this.tableList);
    }
  },
}
</script>
