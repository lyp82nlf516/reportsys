<template>
  <div id="tabpanelBox" style="background: #fff;">
    <div id="panelBox">
      <div class="homePanel">
        <ul>
          <li v-for="(item, index) in editableTabs2" :key="item.privilegeMenuId" :name="item.privilegeMenuId" :class="{'active': selected === item.privilegeMenuId}">
            <span id="mainHome" @click="handleClick(item, index)" v-if="item.privilegeMenuId === '383'">
              <img src="../../assets/img/home.png" alt="Home" title="Home" id="homeIcon">
            </span>
            <span v-if="item.privilegeMenuId !== '383'">
              <span class="item" @click="handleClick(item, index)">{{ item.privilegeMenuName }}</span>
              <i class="el-icon-close" @click="removeTab(item.privilegeMenuId, item)"></i>
            </span>
          </li>
        </ul>
      </div>
      <div class="hideMenu">
        <el-popover placement="bottom" width="180" trigger="hover">
          <ul>
            <li @click="closeAll">关闭全部</li>
            <li @click="closeOther">关闭其它标签</li>
          </ul>
          <el-button slot="reference">
            <img src="../../assets/img/menu2.png" alt="menu" title="menu">
          </el-button>
        </el-popover>
      </div>
    </div>
    <div class="tabCon">
      <div class="itemtabbox">
        <component :is="which_to_show"></component>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#tabpanelBox {
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  overflow: hidden;
  height: calc(100% - 2px);
  #panelBox {
    position: relative;
    width: 100%;
    height: 53px;
    overflow: auto;
    display: none;
    .hideMenu {
      position: absolute;
      width: 40px;
      right: 0px;
      top: 10px;
      cursor: pointer;
      // background-color: rgba(125, 151, 188, 0.8);
      .el-button--default {
        border: none;
        padding: 1px 10px;
        margin-left: 1px;
      }
      .el-button:hover,
      .el-button--default:hover,
      el-popover__reference:hover {
        background: none;
      }
      img {
        display: block;
        width: 18px;
        margin: 0 auto;
      }
    }
  }
  .tabCon {
    height: calc(100% - 53px);
    overflow: hidden;
  }
  #mainHome {
    display: inline-block;
    width: 100%;
    vertical-align: middle;
    margin-bottom: 7px;
  }
  #mainHome img {
    display: block;
    width: 60%;
    margin: 0 auto;
  }
  .homePanel {
    white-space: nowrap;
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    z-index: 2;
    overflow: hidden;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    border-bottom: none;
    margin: 0;
    width: calc(100% - 40px);
    border-right: 1px solid #dcdfe6;
    padding: 0;
  }
  .homePanel li {
    display: inline-block;
    position: relative;
    padding: 16px 1em 5px;
    z-index: 3;
    height: 19px;
    span {
      display: inline-block;
      overflow: auto;
      .item {
        width: 57px;
        white-space: nowrap;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        line-height: 19px;
        height: 19px;
        margin-bottom: -4px;
      }
    }
  }
  .homePanel ul {
    margin-left: 1em;
  }
  .homePanel li:first-child {
    padding-bottom: 3px;
    padding-left: 5px;
    padding-top: 18px;
  }
  .homePanel li::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: -10px;
    z-index: -1;
    background: #eee;
    background-image: linear-gradient(
      hsla(0, 0%, 100%, 0.6),
      hsla(0, 0%, 100%, 0)
    );
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-bottom: none;
    border-bottom: 1px solid #dfe6ec;
    border-radius: 0.5em 0.5em 0 0;
    transform: perspective(0.5em) rotateX(3deg);
    transform-origin: bottom;
  }
  .homePanel li.active {
    z-index: 8;
  }
  .homePanel li.active::before {
    // background-color: rgba(123, 126, 255, 0.9);
    background: #fff;
    border: 1px solid rgba(64, 158, 255, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-bottom: none;
  }
  .itemtabbox {
    overflow: hidden;
    height: 100%;
  }
}
.el-popover:hover,
.el-button:hover {
  background: none;
}
.el-popover {
  background: #fff;
  z-index: 3000;
  padding: 0;
}
.el-popover li {
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  background: #fff;
  padding: 0 12px;
}
.el-popover li:first-child {
  padding-top: 12px;
}
.el-popover li:first-child + li {
  padding-bottom: 12px;
}
.el-popover li:hover {
  color: rgba(123, 126, 255, 0.9);
}
</style>

<script>
import bus from '@/bus';
import tableship from './tableship';
import database from './database';
import confidchart from './confidchart';
import optionlist from './optionlist';
import concharttable from './concharttable';
import tablefield from './tablefield';
import rolemanagerz from './rolemanager';
import usersmanagerz from './usersmanager';
import chartvisual from '../chart/chartvisual';
import reportlist from '../customreports/reportlist';
import reportconfigure from '../customreports/reportconfigure';
import configurecomp from '../customreports/configurecomp';
import treepage from '../menu/treepage';
import creatpage from './creatpage';
import formpage from './formpage';
export default {
  data() {
    return {
      which_to_show: '',
      editableTabsValue2: '',
      dulStr: [],
      editableTabs2: [
        {
          'privilegeMenuCode': 'chartvisual',
          'privilegeMenuName': '首页',
          'privilegeMenuId': '383'
        }
      ],
      selected: '',
      marknum: 401
    }
  },
  created() {
    this.dulStr.push(this.editableTabs2[0].privilegeMenuId);
    this.editableTabsValue2 = '383';
    this.which_to_show = 'chartvisual';
    this.selected = 383;
  },
  computed: {},
  mounted() {
    bus.$on('userDefinedEvent', (msg) => {
      this.selected = msg.privilegeMenuId;
      if (this.dulStr.length > 0) {
        if (!this.dulStr.includes(msg.privilegeMenuId)) {
          this.editableTabs2.push(msg);
          this.dulStr.push(msg.privilegeMenuId);
          this.editableTabsValue2 = msg.privilegeMenuId;
        } else {
          this.editableTabsValue2 = msg.privilegeMenuId;
        }
      } else if (this.dulStr.length === 0) {
        this.editableTabs2.push(msg);
        this.dulStr.push(msg.privilegeMenuId);
        this.editableTabsValue2 = msg.privilegeMenuId;
      }
      if (msg.privilegeMenuCode.includes('_')) {
        let strArr = msg.privilegeMenuUrl.split('/');
        let param = strArr[strArr.length - 1].split('.')[0];
        this.which_to_show = param;
      } else {
        this.which_to_show = msg.privilegeMenuCode;
      }
    });
  },
  components: {
    tableship,
    tablefield,
    rolemanagerz,
    usersmanagerz,
    reportlist,
    reportconfigure,
    configurecomp,
    creatpage,
    formpage,
    database,
    confidchart,
    optionlist,
    concharttable,
    treepage,
    chartvisual
  },
  methods: {
    // 切换面板 actives
    handleClick(tab, index) {
      this.selected = tab.privilegeMenuId;
      if (this.editableTabs2.length > 0) {
        for (let i in this.editableTabs2) {
          if (tab.privilegeMenuId === this.editableTabs2[i].privilegeMenuId) {
            let msg = this.editableTabs2[i];
            if (msg.privilegeMenuCode.includes('_')) {
              let strArr = msg.privilegeMenuUrl.split('/');
              let param = strArr[strArr.length - 1].split('.')[0];
              this.which_to_show = param;
            } else {
              this.which_to_show = msg.privilegeMenuCode;
            }
            // this.which_to_show = this.editableTabs2[i].privilegeMenuCode;
          }
        }
      }
    },
    // 移除面板上的单项数据
    removeTab(targetName, item) {
      this.dulStr = this.dulStr.filter(tab => (tab !== targetName));
      let tabs = this.editableTabs2;
      let activeName = this.selected;
      if (targetName !== '1') {
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.privilegeMenuId === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.privilegeMenuId;
                this.which_to_show = nextTab.privilegeMenuCode;
                this.selected = nextTab.privilegeMenuId;
              }
            }
          });
        }
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.privilegeMenuId !== targetName);
        this.selected = activeName;
      }
      // this.selected = this.editableTabsValue2;
    },
    // 关闭主页面板全部标签
    closeAll() {
      let tabs = this.editableTabs2;
      this.editableTabs2 = tabs.filter(tab => tab.privilegeMenuId === tabs[0].privilegeMenuId);
      this.dulStr = this.dulStr.filter(tab => tab === tabs[0].privilegeMenuId);
      this.editableTabsValue2 = this.editableTabs2[0].privilegeMenuId;
      this.selected = this.editableTabs2[0].privilegeMenuId;
      let msg = this.editableTabs2[0];
      if (msg.privilegeMenuCode.includes('_')) {
        let strArr = msg.privilegeMenuUrl.split('/');
        let param = strArr[strArr.length - 1].split('.')[0];
        this.which_to_show = param;
      } else {
        this.which_to_show = msg.privilegeMenuCode;
      }
    },
    closeOther() {
      let tabs = this.editableTabs2;
      this.editableTabs2 = tabs.filter(tab => (tab.privilegeMenuId === tabs[0].privilegeMenuId || this.selected === tab.privilegeMenuId));
      this.dulStr = this.dulStr.filter(tab => (tab === tabs[0].privilegeMenuId || tab === this.selected));
      this.selected = this.editableTabs2[1].privilegeMenuId;
      let msg = this.editableTabs2[1];
      if (msg.privilegeMenuCode.includes('_')) {
        let strArr = msg.privilegeMenuUrl.split('/');
        let param = strArr[strArr.length - 1].split('.')[0];
        this.which_to_show = param;
      } else {
        this.which_to_show = msg.privilegeMenuCode;
      }
      // this.which_to_show = tabs[1].privilegeMenuCode;
    }
  }
}
</script>
