<template>
  <div class="report-forms">
    <div class="main-body-leftbox" v-show="false">
      <span class="bbtitle">
        <img src="../assets/img/logo2.png" v-show="showlogo" alt="" srcset="">
        <img src="../assets/img/logo1.png" v-show="!showlogo" alt="" srcset="">
      </span>
      <div class="leftcontent">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :default-openeds="defaultopeneds" :unique-opened="false" :collapse="isCollapse">
          <el-submenu :index="item.privilegeMenuId" v-for="item in menuleftdata" :key="item.privilegeMenuId" v-if="item.subList.length!==0" class="mainsubmenu">
            <template slot="title"><i class="font_family" :class="item.classname"></i> <span slot="title">{{item.privilegeMenuName}}</span></template>
            <el-submenu v-for="items in item.subList" v-if="items.subList.length!==0" :index="items.privilegeMenuId" :key="items.privilegeMenuId" @click="topath(items)" :class="(items.privilegeMenuCode=== privilegeMenuCodeflag)?'is-active':'noactiveclass'">
              <template slot="title">{{items.privilegeMenuName}}</template>
              <el-submenu v-for="list in items.subList" v-if="list.subList.length!==0" :index="list.privilegeMenuId" :key="list.privilegeMenuId" @click="topath(list)" :class="(list.privilegeMenuCode=== privilegeMenuCodeflag)?'is-active':'noactiveclass'">
                <template slot="title">{{list.privilegeMenuName}}</template>
                <el-submenu v-for="listc in list.subList" v-if="listc.subList.length!==0" :index="listc.privilegeMenuId" :key="listc.privilegeMenuId" @click="topath(listc)" :class="(listc.privilegeMenuCode=== privilegeMenuCodeflag)?'is-active':'noactiveclass'">
                  <template slot="title">{{listc.privilegeMenuName}}</template>
                  <el-menu-item v-for="listd in listc.subList" :index="listd.privilegeMenuId" :key="listd.privilegeMenuId" @click="topath(listd)"
                  :class="(listd.privilegeMenuCode=== privilegeMenuCodeflag)?'is-active':'noactiveclass'">{{listd.privilegeMenuName}}</el-menu-item>
                </el-submenu>
                <el-menu-item :class="(listc.privilegeMenuCode == privilegeMenuCodeflag)?'is-active':'noactiveclass'" :index="listc.privilegeMenuId"
                @click="topath(listc)" v-else>{{listc.privilegeMenuName}}</el-menu-item>
              </el-submenu>
              <el-menu-item :class="(list.privilegeMenuCode == privilegeMenuCodeflag)?'is-active':'noactiveclass'" :index="list.privilegeMenuId"
                @click="topath(list)" v-else>{{list.privilegeMenuName}}</el-menu-item>
            </el-submenu>
            <el-menu-item :class="(items.privilegeMenuCode == privilegeMenuCodeflag)?'is-active':'noactiveclass'" :index="items.privilegeMenuId"
                @click="topath(items)" v-else>{{items.privilegeMenuName}}</el-menu-item>
          </el-submenu>
          <el-menu-item :class="(item.privilegeMenuCode == privilegeMenuCodeflag)?'is-active':'noactiveclass'" :index="item.privilegeMenuId"
            @click="topath(item)" v-else>{{item.privilegeMenuName}}</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="main-body-rightbox">
      <div class="main-head">
        <div class="header-left">
          <div class="sqbox" @click="Changemenushow">
            <img src="../assets/img/main/menu.png" alt="" srcset="">
          </div>
          <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;margin-left: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group> -->
        </div>
        <!-- 暂时隐藏退出按钮，因为现在没有接口，避免用户出现误操作 -->
        <div class="exitbox" @click="Userexit">
          <a :href="logout">
            <img src="../assets/img/iconhead/exit.png" alt="退出" title="退出" class="exitimg" @click="Userexit">
          </a>
        </div>
        <!-- 暂时隐藏退出按钮 -->
        <!-- 暂时隐藏退出按钮 -->
        <div class="userbox">
          <img src="../assets/img/main/user.svg" alt="" title="" class="userimg">
          <span>{{this.user.userName}}</span>
        </div>
        <!-- <i class="el-icon-menu  menuz" @click="Changemenushow"></i> -->
      </div>
      <router-view ref="testref" @testrefevent="testrefevent"></router-view>
    </div>
  </div>
</template>
<style lang="scss">
// @import '//at.alicdn.com/t/font_1182542_d6960w26uvw.css';
@import '../assets/font/font-awesome.css';
.report-forms {
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 600px;
  min-width: 768px;
  background: #f9fafe;
  background-image: url("../assets/img/main/ReportServer.jpg");
  background: #fff;
  .main-head {
    height: 55px;
    line-height: 55px;
    width: 100%;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 1px 0 rgba(166,166,166,.2);
    // background-color: rgba(123, 126, 255, 0.9);
    color: #fff;
    overflow: auto;
    z-index: 1996;
    .header-left {
      float: left;
      width: 20%;
      width: 240px;
      // background: #232323;
      // background-color: rgba(109, 113, 239, 1);
      .sqbox {
        // height: 60px;
        width: 20px;
        float: left;
        margin-left: 10px;
        cursor: pointer;
        img {
          width: 24px;
          height: 24px;
          margin-top: 16px;
        }
      }
      .img_house {
        margin-left: 10px;
        margin-top: 8px;
        width: 40px;
        height: 41px;
      }
      .bbtitle {
        float: left;
        margin-left: 5px;
        margin-left: 15px;
        letter-spacing: 3px;
        -webkit-font-size: 16px;
        font-size: 16px;
        font-weight: bolder;
        line-height: 32px;
        margin-top: 17px;
        display: block;
        img {
          display: block;
          width: 30%;
        }
      }
    }
    img {
      line-height: 55px;
      width: 24px;
      height: 24px;
      display: block;
      float: left;
      margin-top: 15px;
    }
    .userbox {
      span {
        display: inline-block;
        font-size: 14px;
        line-height: 55px;
        font-weight: bolder;
        margin-left: 10px;
        margin-right: 22px;
        color: #475669;
      }
    }
    .exitbox {
      height: 100%;
      float: right;
      .exitimg {
        width: 24px;
        height: 24px;
        margin: 16px 10px 0 15px;
        cursor: pointer;
      }
    }
    .userbox {
      // width: 500px;
      height: 100%;
      float: right;
    }
    .menuz {
      color: #ccc;
      line-height: 60px;
      margin-left: 20px;
      font-size: 20px; // float: left;
    }
  }
  #treepagemenu {
    height: calc(100% - 56px);
  }
  /* .arrowallbox {
      width: 20px;
      height: calc(100% - 60px);
      float: left;
      background-color: rgba(17, 28, 66, 0);
      position: absolute;
      top: 60px;
      z-index: 5;
      text-align: center;
      .arrowbox {
        width: 20px;
        height: 50px;
        background-color: rgba(17, 28, 66, 0.3);
        line-height: 50px;
        float: left;
        position: absolute;
        top: 300px;
        z-index: 5;
        text-align: center;
      }
    }
    .arrowallbox:hover {
      cursor: pointer;
    }
    .arrowboxleft {
     opacity: 0;
    }
    .arrowallbox:hover .arrowboxleft {
      opacity: 1;
    }
    .arrowboxright {
      opacity: 0;
    }
    .arrowallbox:hover .arrowboxright {
      opacity: 1;
    } */
  .main-body-leftbox {
    height: calc(100% - 60px);
    height: calc(100% - 0px);
    // width: 240px;
    position: absolute;
    top: 60px;
    top: 0px;
    left: 0; // background-color: #39afd5;
    // background-color: #fafcfe;
    background-color: rgba(255, 255, 255, 0.2);
    background: #232323;
    z-index: 1999;
    .bbtitle {
      display: inline-block;
      margin-left: 15px;
      letter-spacing: 3px;
      font-size: 16px;
      font-weight: bolder;
      line-height: 32px;
      margin-top: 17px;
      color: #8492A6;
      width: auto;
      img {
        display: block;
      }
    }
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 7px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 5px;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(132, 146, 166, 0);
      background: rgba(132, 146, 166, 0.4);
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
    .leftcontent {
      overflow: auto;
      height: calc(100% - 49px);
      width: 100%; // background-color: red;
      background: #232323;
      // background: rgba(123, 126, 255, 0.3);
      .el-menu--collapse {
        width: 240px;
        width: 64px;
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 240px;
      }
      .el-menu {
        border-right: none;
      }
      .el-menu.el-menu-vertical-demo {
        padding-bottom: 20px;
      }
      .el-dropdown-menu__item--divided:before,
      .el-menu,
      .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
      .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
      .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
        background-color: unset;
      }
      .el-submenu .el-menu {
        // background-color: #e4e8f1;
      }
      .el-menu-item.is-active {
        color: #8492A6;
      }
      .el-submenu__title,
      .el-menu-item {
        color: #8492A6;
      }
      .el-submenu__title:hover,
      .el-menu-item:hover {
        background-color: #2d3035;
        opacity: 1;
      }
      .el-menu-item,
      .el-submenu__title {
        height: 50px;
        line-height: 50px;
      }
      .el-menu-item.is-active {
        background-color: #2d3035;
      }
      .submenuzkf .el-menu {
        background: rgba(41, 90, 148, 1);
        background: #3a6bb3;
        .el-menu-item {
          color: #fff;
        }
        .activeclass {
          color: #20a0ff;
          font-size: 16px;
          background-color: #d1dbe5;
        }
      }
      .router {
        color: #fff;
      }
      .router:hover {
        color: #2d8cf0;
      }
      .is-opened {
        // background-color: #cdeaec; // .el-submenu__title {
        //   color: #000;
        // }
      }
      .mainsubmenu {
        // background-color: #fafcfe;
        .font_family {
          width: 24px;
          text-align: center;
          font-size: 18px;
          vertical-align: middle;
        }
        .el-icon-menu {
          color: #92ceee;
          color: #fff;
        }
        i {
          // color: #fff;
        }
      }
    }
  }
  .main-body-rightbox {
    width: calc(100% - 2px); // padding-left: 10px;
    width: calc(100% - 242px);
    left: 242px;
    width: calc(100% - 2px);
    left: 0px;
    height: calc(100% - 60px);
    height: calc(100% - 0px);
    position: absolute;
    top: 0px; // left: 210px;
    background-color: #f0f0f0;
    background-color: rgb(247, 248, 250);
    // border-left: 1px solid #99A9BF;
    overflow: auto;
  }
}

@media (max-width: 1070px) {
  .bbtitle {
    letter-spacing: 0px !important;
  }
}

@media (max-width: 930px) {
  .bbtitle {
    font-size: 14px !important;
  }
  .img_house {
    width: 30px !important;
    height: 30px !important;
    margin-top: 15px !important;
  }
}
</style>
<script>
import {
  // getleftmenuz,
  // logonMsg
} from '@/assets/js/queryData';
import bus from '@/bus';
import {
  getleftmenuz,
  logonMsg,
  //  jobTransfer
} from '@/services/query';
import {
  setSessionStore,
  getSessionStore
} from '@/utils/mUtils';
export default {
  data() {
    return {
      logout: `http://www.beidakeji.com:8081/page/login`,
      privilegeMenuCodeflag: 'rpt',
      isCollapse: false,
      showlogo: true,
      user: {
        userId: '',
        userName: ''
      },
      defaultopeneds: ['main', '61'],
      menuflag: true,
      menuleftdata: [{
        'privilegeMenuId': '',
        'privilegeMenuName': '',
        'privilegeMenuCode': '',
        'subList': [],
      }],
      items: [
        {
          message: 'Foo'
        },
        {
          message: 'Bar'
        }
      ],
      fontClass: ['icon-quanxianguanli', 'icon--peizhishujuyuan', 'icon-zidingyitixing', 'icon-tuxing_graphical', 'icon--peizhiSQL']
    }
  },
  computed: {},
  created() { },
  mounted() {
    getleftmenuz().then(res => {
      if (res.status === 200) {
        // console.log('res', res)
        if (res.data.length > 0) {
          this.menuleftdata = res.data[0].subList;
          let sublist1 = res.data[0].subList;
          for (let i in sublist1) {
            for (i in this.fontClass) {
              sublist1[i].classname = this.fontClass[i];
            }
          }
          bus.$on('treemenuedit', (msg) => {
            this.menuleftdata = msg[0].subList;
            let sublist1 = msg[0].subList;
            for (let i in sublist1) {
              for (i in this.fontClass) {
                sublist1[i].classname = this.fontClass[i];
              }
            }
          })
        }
      }
    })
    logonMsg().then(res => {
      if (res.status === 200) {
        this.user.userName = res.data.userName;
      }
    })
    // this.getuser();
  },
  methods: {
    // 用户退出
    Userexit() {
      //  window.location.href = 'http://sso.cbsrpt.com:8083/page/login';
      // 关闭窗口的函数，现在暂时不用调用
      // this.closeWindow();
    },
    // 关闭窗口的函数，现在暂时不用调用
    closeWindow() {
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        window.close();
      } else {
        var browserName = navigator.appName;
        if (browserName === 'Netscape') {
          window.open('', '_self', '');
          window.close();
        } else {
          if (browserName === 'Microsoft Internet Explorer') {
            window.open('', '_parent', '');
            window.close();
          }
        }
      }
    },
    setCookie() {
      // document.cookie = 'sid=myCookie4; domain=.cbs.bacic5i5j.com;';
    },
    topath(item) {
      let urls = this.$route.path.split('/')[1];
      if (urls !== 'panel') {
        this.$router.push({
          path: '/' + item.privilegeMenuCode,
          query: {
            'url': item.privilegeMenuUrl
          }
        });
      }
      bus.$emit('userDefinedEvent', item);
      this.privilegeMenuCodeflag = item.privilegeMenuCode;
      setSessionStore('mlitem', JSON.stringify(item));
      /* if (item.privilegeMenuCode === 'model') {
        this.$router.push({
          path: '/customallpage',
          query: {
            'url': item.privilegeMenuUrl,
          }
        });
        if (this.$refs.testref.initmodel !== undefined) {
          this.$refs.testref.initmodel();
        }
      } else {
        this.$router.push({
          path: '/' + item.privilegeMenuCode,
          query: {
            'url': item.privilegeMenuUrl
          }
        });
        if (this.$refs.testref.freash !== undefined) {
          this.$refs.testref.freash();
        }
      } */
    },
    /* getuser() {
      logonMsg().then(res => {
        console.log('login', res);
        if (res.code === '0') {
          console.log('login', res, typeof res.code);
          this.user.userName = res.data.userName;
        } else {
          this.$message('数据获取失败');
        }
      })
    }, */
    Changemenushow() {
      this.isCollapse = !this.isCollapse;
      this.menuflag = !this.menuflag;
      this.showlogo = !this.showlogo;
      this.defaultopeneds = ['main', '61'];
      let _width = $('.report-forms').width();
      if (this.menuflag) {
        let initwidth = _width - 242 + 'px';
        $('.main-body-rightbox').animate({
          'left': '242px',
          'width': initwidth
        })
        if (this.$refs.testref.testref !== undefined) {
          this.$refs.testref.testref();
        }
      } else {
        let initwidth = _width - 66 + 'px';
        $('.main-body-rightbox').animate({
          'left': '64px',
          'width': initwidth
        })
        if (this.$refs.testref.testref !== undefined) {
          this.$refs.testref.testref();
        }
      }
      this.resetposition();
    },
    handleOpen(key, keyPhandleOpenath) {
      this.defaultopeneds = []
      this.defaultopeneds.push(key);
      setSessionStore('ml', JSON.stringify(this.defaultopeneds));
    },
    // 目录刷新
    testrefevent() {
      let geiml = getSessionStore('ml');
      console.log(geiml);
    },
    handleClose(key, keyPath) { },
    resetposition() {
      //   chart.resize();
      let otherone = parseInt($('.otherboxone').width()) + 1;
      let othertwo = parseInt($('.otherboxtwo').width()) + 1;
      let fatherboxflag = parseInt($('#onebox').attr('fatherbox'));
      if (fatherboxflag === 1) {
        $('#onebox').css({
          'top': 0,
          'left': 0,
          'width': 'calc(25% - 2px)'
        })
      } else if (fatherboxflag === 2) {
        $('#onebox').css({
          'top': 0,
          'left': otherone,
          'width': 'calc(50% - 2px)'
        })
      } else if (fatherboxflag === 3) {
        $('#onebox').css({
          'top': 0,
          'left': otherone + othertwo,
          'width': 'calc(25% - 2px)'
        })
      }
    }
  }
}

</script>
