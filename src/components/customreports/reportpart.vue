<template>
  <div id="reportpart">
    <div class="tableList">
      <div class="reportRptName">
        <span class="title">{{this.reportmsg.basismsg.rptName}}</span>
        <div class="fixedTable">
          <div v-if="reportmsg.basismsg.downloadLevel !== '0'" @click="download" class="download">
            <img src="../../assets/img/iconhead/load.png" alt="" srcset="">
          </div>
          <el-popover placement="bottom" width="400" height="300" v-if="pagedata.table.colNames.length !== 0" trigger="click">
            <el-table :data="pagedata.table.colNames[0].cols" height="300" v-if="pagedata.table.colNames.length !== 0">
              <el-table-column width="150" property="label" label="列名"></el-table-column>
              <el-table-column width="100" label="设置表头">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.show" active-color="#aaacf2" inactive-color="#ccc">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column width="300" label="锁定列">
                <template slot-scope="scope">
                  <div @click="locklist(scope.row)" class="fixedimg">
                    <img v-if="scope.row.fixed" src="../../assets/img/iconhead/lock.png" alt="" srcset="">
                    <img v-else src="../../assets/img/iconhead/unlock.png" alt="" srcset="">
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-button slot="reference" icon="el-icon-setting"></el-button>
          </el-popover>
          <!-- <div class="loadbox" id="new_yan" v-if="reportmsg.basismsg.downloadLevel === '0'" @click="download">
            <img src="../../assets/img/iconhead/load.png" alt="" srcset="">
          </div> -->
          <el-button :disabled="isdisabledFn" type="primary" id="downloadicon" @click="download"></el-button>
        </div>
      </div>
      <div class="reportCon">
        <div class="reportSearch" v-show="pagedata.filters.length !== 0">
          <div class="filterBox" v-for="item in pagedata.filters" :key="item.id">
            <label class="inputlabel">{{item.label}}：</label>
            <div class="searchPart">
              <el-input v-if="item.type === 'input'" v-model="item.value" placeholder="请输入内容"></el-input>
            </div>
            <div class="searchPart">
              <el-date-picker v-if="item.type === 'datepicker'" v-model="item.value" :type="item.style" align="right" format="yyyyMMdd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="searchPart">
              <el-date-picker class="inputdiv" format="yyyyMMdd" v-if="item.type === 'datetimepicker'" v-model="item.value" :type="item.style" placeholder="选择日期范围"
              ></el-date-picker>
            </div>
            <div class="searchPart">
              <el-cascader class="inputdiv" v-if="item.type === 'cascader'" :options="item.option" v-model="item.value"
              ></el-cascader>
            </div>
            <div class="searchPart">
              <el-select v-if="item.type === 'select'" v-model="item.value" placeholder="请选择"
              >
                <el-option v-for="items in item.option" :key="items.value" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
            </div>
            <div class="searchPart">
              <el-select v-if="item.type === 'selectmultiple'" v-model="item.value" multiple placeholder="请选择">
                <el-option v-for="items in item.option" :key="items.value" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
            </div>
            <div class="searchPart"></div>
          </div>
          <div class="inputSearch">
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
          </div>
        </div>
        <div class="reportTable">
          <div class="tableBox" v-if="pagedata.table.colNames.length !== 0" v-for="(items, index) in pagedata.table.colNames" :key="items.tableID" :id="('table' + index)" :class="('table' + index)">
            <div class="tableContent" ref="tableContent">
              <el-table :data="pagedata.table.data[index].rows" border @sort-change="sortablechange" style="width: 100%" :height="height">
                <el-table-column type="index" width="50" label="序号" fixed>
                </el-table-column>
                <el-table-column v-if="item.show && items.cols.length > 0 && items.cols" :fixed="item.fixed" sortable="custom" v-for="item in items.cols" :key="item.id" :prop="item.field" :label="item.label" :render-header="labelHead" show-overflow-tooltip>
                  <el-table-column v-if="item1.show && item.children.length > 0 && item.children" :width="columnWidth" :label="item1.label" v-for="item1 in item.children" :key="item1.label" :render-header="labelHead" :fixed="item1.fixed" :prop="item1.field" :sortable="item1.sortable" show-overflow-tooltip >
                    <el-table-column v-if="item2.show && item1.children.length > 0 && item1.children" :width="columnWidth" :label="item2.label" v-for="item2 in item1.children" :key="item2.label" :render-header="labelHead" :fixed="item2.fixed" :prop="item2.field" :sortable="item2.sortable" show-overflow-tooltip>
                      <el-table-column v-if="item3.show && item2.children.length > 0 && item2.children" :width="columnWidth" :label="item3.label" v-for="item3 in item2.children" :key="item3.label" :render-header="labelHead" :fixed="item3.fixed" :prop="item3.field" :sortable="item3.sortable" show-overflow-tooltip>
                      </el-table-column>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div class="paginationBox">
              <el-pagination @current-change="currentpagechange" :current-page="items.pagination.offset" :page-size="items.pagination.pageSize" layout="total, prev, pager, next, jumper" :total="pagedata.table.data[index].total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
#reportpart {
  background: #f7f8fa;
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  .tableList {
    background: #fff;
  }
  .reportRptName {
    border-bottom: 1px solid #e7eaec;
    padding: 10px 0px 10px;
    .title {
      font-weight: bold;
      padding-left: 15px;
      display: inline-block;
    }
    .el-button {
      padding: 5px 8px;
    }
    .fixedTable {
      float: right;
      padding-right: 15px;
      .el-button:hover {
        background: none;
      }
      .el-button {
        border: none;
        padding: 0;
        padding-top: 2px;
        margin-left: 5px;
        vertical-align: top;
        .el-icon-setting {
          font-size: 16px;
          color: #aaacf2;
        }
      }
      .download {
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        height: 18px;
        img {
          display: inline-block;
        }
      }
      #downloadicon {
        width: 18px;
        height: 20px;
        background: url("../../assets/img/iconhead/load.png") no-repeat;
      }
      .loadbox {
        //   background-color: red;
        // height: 36px;
        // width: 36px;
        float: right;
        margin-left: 10px;
        img {
          height: 20px;
          width: 18px; // background-color: yellow;
          // margin: 8px 0 0 8px;
        }
      }
      .loadbox:hover {
        cursor: pointer;
      }
    }
  }
  .reportCon {
    padding: 10px;
    .reportTable {
      .tableBox {
        .tableContent {
          .el-table {
            .el-table__fixed,
            .el-table__fixed-right {
              // box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
            }
            .el-table__fixed-right {
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
            }
            td {
              height: 32px;
              padding: 5px 0;
            }
            th {
              padding-top: 0px;
              padding-bottom: 0px;
              .cell {
                line-height: 36px;
                height: 36px;
                padding-left: 10px;
                padding-right: 10px;
                .table-head {
                  display: inline-block;
                  font-size: 14px;
                }
                .caret-wrapper {
                  float: right;
                  margin-left: 0;
                  width: 16px;
                  display: none;
                  margin-top: 3px;
                }
              }
              .cell:hover {
                .caret-wrapper {
                  display: block;
                }
              }
            }
          }
        }
        .paginationBox {
          margin-top: 10px;
        }
      }
    }
    .reportSearch {
      padding: 15px 10px;
      .filterBox {
        display: inline-block;
        margin-right: 10px;
        .searchPart {
          display: inline-block;
          .demonstration {
            margin-right: 5px;
          }
        }
      }
      .inputSearch {
        display: inline-block;
        margin-left: 10px;
        .el-button--primary {
          background-color: #fff;
          color: #666;
          border-color: #ccc;
        }
        .el-button--primary:hover {
          background-color: #fff;
          color: #20a0ff;
          border-color: #20a0ff;
        }
      }
    }
  }
}
.el-checkbox-button__original,
.el-pagination--small .arrow.disabled,
.el-table .hidden-columns,
.el-table td.is-hidden > *,
.el-table th.is-hidden > *,
.el-table--hidden {
  visibility: visible;
}
.el-table th.gutter {
  display: table-cell !important;
}
.el-table__fixed {
  //width: 160px !important;
}
</style>
<script>
import {
  tableList,
  // download
} from '@/services/query';
import { baseurlzz } from '@/utils/mUtils.js';
export default {
  data() {
    return {
      isdisabledFn: false,
      reportmsg: {
        reportid: this.$route.params.id,
        basismsg: {
          downloadLevel: '0',
          rptName: ''
        }
      },
      colNames: [],
      pagedata: {
        filters: [],
        table: {
          colNames: [],
          data: []
        },
        charts: []
      },
      beginIndex: 0,
      param: {
        offset: 1, // 当前第几页
        pageSize: 10, // 每页显示多少条
        sortName: null,
        sortOrder: null,
        offset2: 1,
        pageSize2: 5000
      },
      'columnWidth': '',
      count: 60,
      timer: null,
    };
  },
  beforeUpdate() { },
  updated() { },
  created() { },
  props: {
    height: {
      type: String,
      default: '380'
    },
    message: {
      type: Object
    }
  },
  mounted() {
    if (this.message !== undefined) {
      let dataArr = [
        {
          colid: 'first',
          data: this.message.tableTitle
        }
      ]
      if (dataArr !== undefined) {
        for (let j in dataArr) {
          let tableitem = {
            cols: this.message.tableTitle,
            pagination: {
              pageSize: 10,
              offset: 1,
            },
            sortName: '',
            sortOrder: '',
            tableID: 'first',
          }
          if (this.pagedata.table.data[j + 1] === undefined) {
            this.pagedata.table.data.push({
              tableID: '001',
              rows: [],
              total: 0,
            });
          }
          this.pagedata.table.colNames.push(tableitem);
        }
      } else {
        this.pagedata.table.colNames = [];
      }
      for (let j in this.message.dateControl) {
        let typeVal = this.message.dateControl[j].componentType.split('-')[0];
        let styVal = this.message.dateControl[j].componentType.split('-')[1];
        let params = {
          id: this.message.optListId,
          name: this.message.dateControl[j].name,
          label: this.message.dateControl[j].label,
          option: this.message.dateControl[j].option,
          type: typeVal,
          style: styVal,
          value: this.message.dateControl[j].value
        }
        this.pagedata.filters.push(params);
        this.initfilters();
      }
      this.Getfilters();
      this.reportmsg.basismsg.rptName = this.message.reportTitle;
      this.reportmsg.reportid = this.message.reportId;
    }
  },
  computed: {},
  components: {},
  methods: {
    // 得到查询条件
    Getfilters() {
      let params = this.Getparams();
      tableList(params).then(res => {
        console.log('res', res)
        $('.el-table__body-wrapper').attr('id', 'el-table__body-wrapper');
        if (res.status === 200) {
          this.pagedata.table.data[0].rows = res.data.rows;
          this.pagedata.table.data[0].total = res.data.total;
          this.pagedata.table.data[0].tableID = '001';
          this.param.offset2 = res.data.total;
          $('.el-table__body-wrapper').attr('id', 'el-table__body-wrapper');
          // console.log('this.table:', this.pagedata.table)
        }
      });
    },
    // 初始化筛选条件的初始值
    initfilters() {
      // 时间为当前时间的前一天
      const day = new Date();
      day.setTime(day.getTime() - 3600 * 1000 * 24);
      for (let i in this.pagedata.filters) {
        switch (this.pagedata.filters[i].style) {
          case 'daterange':
            this.pagedata.filters[i].value = [day, day];
            break;
          case 'datepicker':
            this.pagedata.filters[i].defaultvalue = day;
            this.pagedata.filters[i].value = day;
            break;
          case 'datetimerange':
            this.pagedata.filters[i].value = [day, day];
            break;
          case 'datetime':
            this.pagedata.filters[i].defaultvalue = day;
            this.pagedata.filters[i].value = day;
            break;
          case 'date':
            this.pagedata.filters[i].value = day;
            break;
          default:
            break;
        }
      }
    },
    // 时间转换
    changedatatostring(paramdata) {
      let Y = paramdata.getFullYear();
      let M = paramdata.getMonth() + 1;
      let D = paramdata.getDate();
      M = M < 10 ? '0' + M : M;
      D = D < 10 ? '0' + D : D;
      let timestring = String(Y) + String(M) + String(D);
      return timestring;
    },
    Getparams() {
      let filters = {};
      const day = new Date();
      day.setTime(day.getTime() - 3600 * 1000 * 24);
      let timestring = this.changedatatostring(day);
      for (let i in this.pagedata.filters) {
        if (this.pagedata.filters[i].style === 'daterange' || this.pagedata.filters[i].style === 'datetimerange') {
          if (this.pagedata.filters[i].value === '') {
            filters.bdate = timestring;
            filters.edate = timestring;
          } else {
            filters.bdate = this.changedatatostring(this.pagedata.filters[i].value[0]);
            filters.edate = this.changedatatostring(this.pagedata.filters[i].value[1]);
          }
        } else if (this.pagedata.filters[i].style === 'date' || this.pagedata.filters[i].style === 'datetime') {
          if (this.pagedata.filters[i].value === '') {
            filters[this.pagedata.filters[i].name] = timestring;
          } else {
            filters[this.pagedata.filters[i].name] = this.changedatatostring(this.pagedata.filters[i].value);
          }
        } else {
          filters[this.pagedata.filters[i].name] = this.pagedata.filters[i].value;
        }
      }
      return ({
        str: JSON.stringify(filters), // 查询条件转成字符串
        ids: this.message.reportId,
        reportType: 'report',
        offset: this.param.offset, // 当前第几页
        pageSize: this.param.pageSize, // 每页显示多少条
        sortName: this.param.sortName,
        sortOrder: this.param.sortOrder
      })
    },
    // 排序
    sortablechange(column) {
      this.pagedata.table.colNames[0].sortName = column.prop;
      this.pagedata.table.colNames[0].sortOrder = column.order.replace(/ending/, '');
      this.param.sortName = column.prop;
      this.param.sortOrder = column.order.replace(/ending/, '');
      this.Getfilters();
    },
    // 下载传参
    downloadGetparams() {
      let filters = {};
      const day = new Date();
      day.setTime(day.getTime() - 3600 * 1000 * 24);
      let timestring = this.changedatatostring(day);
      for (let i in this.pagedata.filters) {
        if (this.pagedata.filters[i].style === 'daterange' || this.pagedata.filters[i].style === 'datetimerange') {
          if (this.pagedata.filters[i].value === '') {
            filters.bdate = timestring;
            filters.edate = timestring;
          } else {
            filters.bdate = this.changedatatostring(this.pagedata.filters[i].value[0]);
            filters.edate = this.changedatatostring(this.pagedata.filters[i].value[1]);
          }
        } else if (this.pagedata.filters[i].style === 'date' || this.pagedata.filters[i].style === 'datetime') {
          if (this.pagedata.filters[i].value === '') {
            filters[this.pagedata.filters[i].name] = timestring;
          } else {
            filters[this.pagedata.filters[i].name] = this.changedatatostring(this.pagedata.filters[i].value);
          }
        } else {
          filters[this.pagedata.filters[i].name] = this.pagedata.filters[i].value;
        }
      }
      let offsetNum = this.param.offset2 / this.param.pageSize2 + 1;
      return ({
        str: JSON.stringify(filters), // 查询条件转成字符串
        ids: this.message.reportId,
        reportType: 'report',
        offset: parseInt(offsetNum), // 5000/总条数
        pageSize: parseInt(this.param.pageSize2), // 默认5000
        // sortName: '',
        // sortOrder: '',
        // elementSql: ''
      })
    },
    // 直接下载，用户体验好
    download2(val) {
      //  http://bi.cbs.bacic5i5j.com:8081/cbs-report/template/download.htm
      var form = $(
        '<form method="post" enctype="application/x-www-form-urlencoded" id="form"><form>'
      ); // 定义form表单,通过表单发送请求
      form.attr('style', 'display:none'); // 设置为不显示
      form.attr('target', '');
      form.attr(
        'action',
        `${baseurlzz}/system/reportconfigure/download.htm`
      ); // 设置请求路径
      for (let i in val) {
        var input = $('<input>');
        input.attr('type', 'hidden');
        input.attr('name', i);
        input.attr('value', val[i]);
        form.append(input);
      }
      $('body').append(form); // 添加表单到页面(body)中
      form.submit(); // 表单提交
    },
    // 下载执行的事件
    download() {
      let params = this.downloadGetparams();
      // console.log('下载参数:', params);
      this.download2(params);
      this.isdisabledFn = true;
      // 先判断是否有权限下载
      if (this.reportmsg.basismsg.downloadLevel !== '0') {
      } else {
        // this.$message('暂无下载权限');
      }
    },
    // 分页
    currentpagechange(val) {
      this.param.offset = val;
      this.Getfilters();
    },
    // 提交
    onSubmit() {
      this.Getfilters();
      this.isdisabledFn = false;
    },
    locklist(param) {
      param.fixed = !param.fixed;
      this.Getfilters();
      document.getElementById('el-table__body-wrapper').scrollTop = 0;
    },
    // 表头自动填充
    labelHead(h, { column, index }) {
      let l = column.label.length;
      if (l <= 3) {
        l = 4;
      }
      let f = 18;
      column.minWidth = f * l + 32;
      var classDiv = '.' + column.id;
      $(classDiv).attr('id', column.label);
      $('.el-table__fixed').attr('id', 'el-table__fixed');
      return h(
        'div',
        { class: 'table-head', style: { width: 'calc(100% - 26px)' } },
        [column.label]
      );
    }
  }
};
</script>
