<template>
  <div class="concharttablebox" id="concharttablebox">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="查看/编辑报表" name="1">
        <div class="tableBox">
          <div class="inputbox">
            <el-input placeholder="请输入关键字查询" v-model="keyWord" @keyup.native.enter="querydata" @blur="querydata"></el-input>
            <el-button class="querybtn" @click="querydata" icon="el-icon-search">查询</el-button>
          </div>
          <div class="tableboxmsg">
            <el-table :data="tableData" style="width: 100%" border>
              <el-table-column prop="uniflag" label="uniflag" width="300" show-overflow-tooltip></el-table-column>
              <el-table-column prop="uniname" label="页面名称"></el-table-column>
              <el-table-column label="操作" width="220px">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="ctemplate(scope.row, scope.$index)">配置</el-button>
                  <el-button type="text" size="small" @click="look(scope.row, scope.$index)">查看</el-button>
                  <el-button type="text" size="small" @click="edit(scope.row, scope.$index)">修改</el-button>
                  <el-button type="text" size="small" @click="delect(scope.row, scope.$index)">删除</el-button>
                  <el-button type="text" size="small" @click="dialogVisibleBox(scope.row, scope.$index)">挂载</el-button>
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
    <el-dialog title="目录树" :visible.sync="dialogVisible" width="30%">
      <div class="treecontainerdiv">
        <el-tree id="menutree" ref="treefield1" :render-content="renderTreefield" class="eltree" :data="treedata" node-key="privilegeMenuId" default-expand-all :expand-on-click-node="false" :props="defaultProps">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeDialogVisible">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss">
#concharttablebox {
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
  .el-dialog__header {
    border-bottom: 1px solid #ccc;
  }
  .el-dialog__footer {
    border-top: 1px solid #ccc;
  }
  .paginationbox {
    margin-top: 10px;
    .el-pagination {
      text-align: right;
    }
  }
  .el-table td,
  .el-table th {
    padding: 6px 0;
  }
  .el-table__header-wrapper th {
    background: #f5f7fb;
    padding: 9px 0;
  }
  .el-dialog__body {
    .checkedicon .el-icon-circle-check {
      color: blue;
    }
  }
  .el-collapse-item__content {
    padding: 0 10px;
  }
  .queryBox {
    .inputbox {
      overflow: auto;
      padding: 5px 10px;
    }
    .el-input {
      width: 200px;
      float: left;
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
    width: calc(100% - 10px);
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    height: 30px;
    .titletext {
      height: 20px;
      display: inline-block;
      position: absolute;
      left: 0px;
      padding: 4px 10px;
      border-bottom: 3px solid blue;
      letter-spacing: 2px;
    }
  }
  .tableBox {
    margin-top: 10px;
    .tableboxmsg {
      margin-top: 10px;
      .el-table__body-wrapper {
        .el-button--text:hover {
          background: none;
        }
      }
    }
    .inputbox {
      .el-input {
        width: 240px;
      }
      .el-button {
        margin-left: 10px;
      }
      .el-button:focus,
      .el-button:hover,
      .el-button:active {
        background-color: rgba(123, 126, 255, 0.9);
        border: 1px solid rgba(123, 126, 255, 0.9);
        color: #fff;
      }
    }
  }
  .lookbox {
    width: 300px;
    height: 200px;
    position: absolute;
    bottom: 0;
    right: 0;
    border: 1px solid #ccc;
  }
}
</style>
<script>
// import Draggabilly from 'draggabilly';
import {
  dragComponentList,
  delDragComponent,
  createbytemplate,
  queryAllMenuzs,
  mountToMenus
} from '@/services/query';
export default {
  data() {
    return {
      activeNames: ['1'],
      keyWord: '',
      total: 0,
      offset: 1,
      pageSize: 10,
      params: 'imgrptmenu',
      tableData: [{
        activeflag: false,
        data: '',
        dragid: '3282',
        editshow: false,
        id: '',
        key: 'querys0',
        label: '',
        other: '',
        paramtype: 'query',
        position: '{"width":"","height":"","top":"1.5%","left":"1.5%"}',
        sql: '',
        style: '',
        type: 'select',
        uniname: '',
        value: ''
      }],
      dialogVisible: false,
      treedata: [],
      defaultProps: {
        children: 'subList',
        label: 'privilegeMenuName',
        id: 'privilegeMenuId'
      },
      checkNodes: '',
      uniflags: ''
    }
  },
  mounted() {
    this.getdragComponentList({
      keyWord: this.keyWord,
      offset: this.offset,
      pageSize: this.pageSize
    });
  },
  methods: {
    dialogVisibleBox(row, index) {
      this.dialogVisible = true;
      queryAllMenuzs(this.params).then((res) => {
        if (res.status === 200) {
          this.treedata = res.data;
          this.uniflags = row.uniflag;
        }
      })
    },
    closeDialogVisible() {
      let param = {
        'uniflag': this.uniflags,
        'menuid': this.checkNodes,
        'rpttype': 'img'
      }
      param = JSON.stringify(param);
      mountToMenus(param).then((res) => {
        if (res.status === 200) {
          this.dialogVisible = false;
        }
      })
    },
    // 选中源
    append(store, data, node, that) {
      that.$refs.treefield1.setCheckedKeys([]);
      node.checked = !node.checked;
      this.checkNodes = data.privilegeMenuId;
    },
    // 生成源树
    renderTreefield(h, { node, data, store }) {
      let that = this;
      if (this.flagupdate) {
        // console.log('update---tree1');
        //   node.checked = false;
        // this.$forceUpdate();
      }
      if (!data.subList || data.subList.length !== 0) {
        return (
          <span>
            <span class="titlenode">{node.label}</span>
          </span>
        );
      } else {
        if (node.checked) {
          return (
            <span on-click={() => this.append(store, data, node, that)} style="width: calc(100% - 16px); display: inline-block;">
              <span class="treelabel">{node.label}</span>
              <span style="float: right; margin-right: 20px" class="checkedicon">
                <i class="el-icon-circle-check" on-click={() => this.append(store, data, node, that)}></i>
              </span>
            </span>
          );
        } else {
          return (
            <span on-click={() => this.append(store, data, node, that)} style="width: calc(100% - 16px); display: inline-block;">
              <span class="treelabel">{node.label}</span>
              <span style="float: right; margin-right: 20px" class="uncheckicon">
                <i class="el-icon-circle-check" on-click={() => this.append(store, data, node, that)}></i>
              </span>
            </span>
          );
        }
      }
    },
    // 修改筛选条件后进行数据的重新请求
    querydata() {
      this.getdragComponentList({
        keyWord: this.keyWord,
        offset: this.offset,
        pageSize: this.pageSize
      });
    },
    // get列表数据
    getdragComponentList(val) {
      dragComponentList(val).then((res) => {
        // console.log('list:', res)
        if (res.status === 200) {
          this.tableData = res.data.rows;
          this.total = res.data.total;
        }
      })
    },
    // 修改当前页
    currentpagechange(val) {
      this.offset = val;
      this.getdragComponentList({
        keyWord: this.keyWord,
        offset: this.offset,
        pageSize: this.pageSize
      });
    },
    // 删除
    delect(row, index) {
      let that = this;
      delDragComponent(row.uniflag).then((res) => {
        if (res.status === 200) {
          that.getdragComponentList({
            keyWord: that.keyWord,
            offset: that.offset,
            pageSize: that.pageSize
          });
        }
      })
    },
    edit(item, index) {
      this.$router.push({
        // path: `/createdchart/${res.data}`
        path: `/editconfigchart/${item.uniflag}`
      });
    },
    // 设置查看项
    look(item, index) {
      this.$router.push({
        path: `/createdchart/${item.uniflag}`
      });
    },
    // 新增配置项
    ctemplate(item, index) {
      // 执行后台接口：新增一条相同模板数据、返回uniflag，根据新的编码跳转。
      createbytemplate(item.uniflag).then((res) => {
        // console.log('uniflag', res)
        if (res.status === 200) {
          this.$router.push({
            path: `/createbytemplate/${res.data}`
          });
        }
      })
    },
  },
  watch: {},
}
</script>
