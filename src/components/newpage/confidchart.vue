<template>
  <div class="configchartbox" id="configchartbox">
    <div class="toolbox">
      <div
        v-for="(item, index) in optionlist"
        :key="index"
      >
        <p
          v-if="item.type === 'bar' || item.type === 'pie' || item.type === 'line' || item.type === 'barline'"
          @click="select(item.param)"
        >
          <img
            :src="item.url"
            width='20'
            :alt="item.label"
            srcset=""
            :title="item.label"
          >
        </p>
        <p
          v-if="item.type === 'select' || item.type === 'val' || item.type === 'input' || item.type === 'date'"
          @click="selectquery(item.param)"
        >
          <img
            :src="item.url"
            width='20'
            :alt="item.label"
            srcset=""
            :title="item.label"
          >
        </p>
        <p
          v-if="item.type === 'text'"
          @click="selecttext(item.param)"
        >
          <img
            :src="item.url"
            width='20'
            :alt="item.label"
            srcset=""
            :title="item.label"
          >
        </p>
        <p
          v-if="item.type === 'formname'"
          @click="selecttextname(item.param)"
        >
          <span class="formname">★</span><img
            :src="item.url"
            width='20'
            :alt="item.label"
            srcset=""
            :title="item.label"
          >
        </p>
        <p
          v-if="item.type === 'list'"
          @click="selecttable(item.param)"
        >
          <img
            :src="item.url"
            width='20'
            :alt="item.label"
            srcset=""
            :title="item.label"
          >
        </p>
      </div>
    </div>
    <div class="templatebox">
      <div id="datasource">
        <span class="datalabel">数据源：</span>
        <el-select
          v-model="datasourceValue"
          :placeholder="dataValDefault"
          clearable
          @change="changeDatasource"
          v-if="this.datasourceoptions.length>0"
        >
          <el-option
            v-for="(item, index) in datasourceoptions"
            :key="index"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </div>
      <div
        class="allcon dragbox"
        id="dragbox"
        :style="{ height: divHeight  + 'px' }"
      >
        <div
          class="dragdom querybox"
          v-for="(item, index) in querys"
          :key="item.key"
          :class="('querys' + index)"
          :id="item.key"
          :index="item.other"
          :dragindex="index"
          type="querys"
        >
          <div
            class="content"
            @dblclick="item.editshow = true"
          >
            <span class="inputlabel">{{item.label}}</span>
            <div
              class="inputdiv"
              v-if="item.type === 'input' || item.type === 'val'"
            >
              <!-- <el-input v-model="item.value"></el-input> -->
              <div
                class="changewidthdiv"
                :id="('queryzoombox' + item.other)"
                :dragindex="index"
                type="querys"
              >
                <el-input v-model="item.value"></el-input>
                <div
                  class="dragall"
                  :id="('queryzoom' + item.other)"
                ></div>
              </div>

            </div>
            <div
              class="inputdiv"
              v-if="item.type === 'select'"
            >
              <div
                class="changewidthdiv"
                :id="('queryzoombox' + item.other)"
                :dragindex="index"
                type="querys"
              >
                <div
                  class="dragall"
                  :id="('queryzoom' + item.other)"
                ></div>
                <el-input v-model="item.value">
                  <i
                    slot="suffix"
                    class="el-input__icon el-icon-caret-bottom"
                  ></i>
                </el-input>
              </div>
            </div>
            <div
              class="inputdiv"
              v-if="item.type === 'date'"
              :id="item.key"
            >
              <div
                class="changewidthdiv"
                :id="('queryzoombox' + item.other)"
                :dragindex="index"
                type="querys"
              >
                <div
                  class="dragall"
                  :id="('queryzoom' + item.other)"
                ></div>
                <el-input v-model="item.value">
                  <i
                    slot="suffix"
                    class="el-input__icon el-icon-date"
                  ></i>
                </el-input>
              </div>
              <!-- <el-input v-model="item.value" icon="date"></el-input> -->
            </div>
            <i
              class="el-icon-delete qicon"
              @click='delquery(index, item.key)'
            ></i>
          </div>
          <div class="handle handlequery"></div>
          <span class="numbershowbox">{{`left:${nowposition.left}, top:${nowposition.top}`}}</span>
          <el-popover
            placement="top"
            v-model="item.editshow"
          >
            <el-form
              :rules="rules"
              :ref="('querysform' + index)"
              label-width="60px"
              class="demo-ruleForm"
            >
              <el-form-item
                label="label"
                prop="xz"
              >
                <el-input
                  type="textarea"
                  v-model="item.label"
                  :rows='1'
                ></el-input>
              </el-form-item>
              <el-form-item
                label="数据sql"
                prop="yz"
              >
                <el-input
                  type="textarea"
                  v-model="item.sql"
                  :rows='1'
                ></el-input>
              </el-form-item>
              <el-form-item class="btnitem">
                <el-button
                  type="primary"
                  @click="item.editshow = false"
                >确定</el-button>
              </el-form-item>
            </el-form>
          </el-popover>
        </div>
        <div
          class="dragdom textbox"
          v-for="(item, index) in text"
          :key="item.key"
          :id="item.key"
          :class="('text' + index)"
          :index="item.other"
          :dragindex="index"
          type="text"
        >
          <div class="content">
            <div
              v-if="!item.editshow"
              class="fontbox"
            >
              <el-input
                class="input-new-tag fontsinput"
                placeholder="+ 文字"
                v-model="item.data"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="edittext(item, index)"
                @blur="edittext(item, index)"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-close"
                  @click="deltext(index, item.key)"
                ></i>
              </el-input>
              <el-select
                class="fontselect"
                v-model="item.fontsize.fontSize"
                placeholder="请选择"
                @change="changefont(item, index)"
              >
                <el-option
                  key="12px"
                  value="12px"
                > 12px</el-option>
                <el-option
                  key="14px"
                  value="14px"
                > 14px</el-option>
                <el-option
                  key="16px"
                  value="16px"
                >16px</el-option>
                <el-option
                  key="18px"
                  value="18px"
                > 18px</el-option>
                <el-option
                  key="20px"
                  value="20px"
                >20px </el-option>
                <el-option
                  key="22px"
                  value="22px"
                > 22px</el-option>
              </el-select>
            </div>
            <p v-else>
              <span
                v-if="item.data === ''"
                class="textshow nodatatext"
                @click="item.editshow = false"
              >请输入....</span>
              <span
                v-if="item.data !== ''"
                class="textshow"
                @click="item.editshow = false"
                :style="item.fontsize"
              >{{item.data}}</span>
            </p>
          </div>
          <!-- <div class="handle handlequery"></div> -->
        </div>
        <div
          class="dragdom chartbox"
          v-for="(item, index) in charts"
          :key="item.key"
          :id="item.key"
          :class="('charts' + index)"
          :index="item.other"
          :dragindex="index"
          type="charts"
        >
          <div class="handle"></div>
          <i
            class="el-icon-close delchart"
            @click='delcharts(index, item.key)'
          ></i>
          <div
            class="dragall"
            :id="('chartszoom' + item.other)"
          ></div>
          <div
            class="content"
            @dblclick="item.editshow = true"
          >
            <img
              src="../../assets/img/imgchart/zzte.png"
              alt="柱状图"
              srcset=""
              v-if="item.type==='bar'"
            >
            <img
              src="../../assets/img/imgchart/zxte.png"
              alt="柱状图"
              srcset=""
              v-if="item.type==='line'"
            >
            <img
              src="../../assets/img/imgchart/bzte.png"
              alt="饼状图"
              srcset=""
              v-if="item.type==='pie'"
            >
            <img
              src="../../assets/img/imgchart/barlinebig.png"
              alt="折线图柱状图"
              srcset=""
              v-if="item.type==='barline'"
            >
          </div>
          <div
            class="msgbox"
            v-show='item.editshow'
          >
            <div class="msgconter">
              <el-form
                :rules="rules"
                :ref="('chartsform' + index)"
                label-width="70px"
                class="demo-ruleForm"
              >
                <el-form-item
                  label="SQL"
                  prop="sql"
                >
                  <el-input
                    type="textarea"
                    v-model="item.sql.sql"
                    :rows='6'
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="item.editshow = false"
                  >确定</el-button>
                  <el-button @click="item.editshow = false">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div
          class="dragdom listbox"
          v-for="(item, index) in list"
          :key="item.key"
          :id="item.key"
          :class="('list' + index)"
          :index="item.other"
          :dragindex="index"
          type="list"
        >
          <div class="handle"></div>
          <i
            class="el-icon-close dellist"
            @click='dellist(index, item.key)'
          ></i>
          <div
            class="dragall"
            :id="('listzoom' + item.other)"
          ></div>
          <div
            class="content"
            @dblclick="item.editshow = true"
          >
            <img
              src="../../assets/img/imgchart/tablebig.png"
              alt="表格"
              srcset=""
            >
          </div>
          <div
            class="msgbox"
            v-show='item.editshow'
          >
            <div class="msgconter">
              <el-form
                :rules="rules"
                :ref="('listform' + index)"
                label-width="60px"
                class="demo-ruleForm"
              >
                <el-form-item
                  label="表头"
                  prop="title"
                >
                  <el-input
                    type="textarea"
                    v-model="item.title"
                    :rows='1'
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="SQL"
                  prop="sql"
                >
                  <el-input
                    type="textarea"
                    v-model="item.sql"
                    :rows='1'
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="item.editshow = false"
                  >确定</el-button>
                  <el-button @click="item.editshow = false">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <el-button
        type="primary"
        class="savebtn"
        @click="savetemplate"
      >保存</el-button>
    </div>
  </div>
</template>
<style lang="scss">
#configchartbox {
  width: calc(100% - 4px);
  height: calc(100% - 69px);
  background: #fff;
  padding: 2px;
  padding-top: 10px;
  // overflow: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: rgba(0, 0, 0, 0.4);
  }
  ::-webkit-scrollbar-thumb:hover {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    background: rgba(0, 0, 0, 0.4);
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    border-radius: 0;
    background: rgba(0, 0, 0, 0);
  }
  .toolbox {
    width: 50px;
    height: 100%;
    float: left;
    border: 1px solid #039df3;
    border: 1px solid #7b7eff;
    // box-shadow: 0px 3px 3px 3px rgba(74, 160, 234, 0.39) inset;
    > div {
      text-align: center;
    }
    .formname {
      color: red;
      float: left;
    }
  }
  .templatebox {
    width: calc(100% - 55px);
    height: calc(100% - 2px);
    float: left;
    border: 1px solid #7b7eff;
    margin-left: 1px;
    overflow: auto;
    position: relative;
    #datasource {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 2000;
      padding: 15px;
      .datalabel {
        margin-right: 5px;
      }
    }
    .dragbox {
      position: relative;
    }
    .allcon {
      width: 100%;
      position: relative;
      height: calc(100% - 10px);
      // height: 1000px;
      //  background-color: #fff;
    }
    .dragdom {
      position: absolute;
    }
    .chartbox {
      height: 250px;
      width: 300px;
      background: #fff;
      box-shadow: 0px 0px 25px #f7f7f7;
      .content {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .msgbox {
        width: 100%;
        height: 100%;
        background-color: rgba(250, 250, 250, 0.7);
        position: absolute;
        top: 0;
        left: 0;
        .msgconter {
          width: 80%;
          height: 200px;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          // background-color: #fff;
          overflow: auto;
        }
        .el-form {
          .el-form-item {
            margin-bottom: 0px;
          }
          .el-form-item__label {
            font-size: 12px;
          }
          .el-textarea__inner {
            border: 1px solid #7b7eff;
            padding: 2px 3px;
          }
        }
        .el-button {
          padding: 5px 10px;
          font-size: 12px;
          border-radius: 4px;
        }
        .el-button--default {
          background: #fff;
          color: #666;
        }
      }
    }
    .listbox {
      height: 300px;
      width: 98%;
      border: 1px solid #ccc;
      .content {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .msgbox {
        width: 100%;
        height: 100%;
        background-color: rgba(250, 250, 250, 0.7);
        position: absolute;
        top: 0;
        left: 0;
        .msgconter {
          width: 90%;
          height: 120px;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          // background-color: #fff;
          overflow: auto;
          .el-button {
            background-color: #7b7eff;
            border-color: #7b7eff;
            border-radius: 4px;
          }
          .el-button--default {
            background: #fff;
            color: #666;
          }
          .el-button--default:hover {
            color: #7b7eff;
          }
        }
        .el-form {
          .el-form-item {
            margin-bottom: 0px;
          }
          .el-form-item__label {
            font-size: 12px;
          }
          .el-textarea__inner {
            border: 1px solid #7b7eff;
            padding: 2px 3px;
          }
        }
        .el-button {
          padding: 5px 10px;
          font-size: 12px;
          border-radius: 4px;
        }
      }
    }
    .numbershowbox {
      width: 150px;
      height: 30px;
      position: absolute;
      top: 20px;
      left: 40%;
      display: none;
    }
    .activedom {
      // box-shadow: 3px 3px 5px #ccc;
      .content {
        box-shadow: -3px -3px 5px #ccc;
        background: #fff;
        box-shadow: 0px 0px 25px #f7f7f7;
      }
    }
    .querybox {
      box-shadow: 3px 3px 5px #f7f7f7;
      box-shadow: 0px 0px 25px #f7f7f7;
      border-radius: 5px;
      background: #fff;
      .content {
        height: 100%;
        padding: 25px;
        overflow: auto;
        .fontbox {
          height: 100%;
          .fontsinput {
            float: left;
            width: 150px;
            .el-input__inner {
              border-radius: 0;
            }
          }
          .fontselect {
            float: left;
            width: 60px;
            .el-input__icon {
              width: 20px;
            }
            .el-input__inner {
              padding: 3px 2px;
            }
            .el-input__icon + .el-input__inner {
              padding-right: 10px;
            }
          }
        }
        .inputlabel {
          float: left;
          height: 30px;
          color: #000;
          line-height: 30px;
          margin-right: 5px;
        }
        .inputdiv {
          float: left;
          .changewidthdiv {
            .dragall {
              bottom: 0px;
              right: 0px;
              position: absolute;
              width: 15px;
              height: 15px;
              background: url("../../assets/img/iconhead/Dragiconleft.png");
              background-size: 100% 100%;
              cursor: nw-resize;
              color: #ccc;
            }
          }
        }
        .el-input {
          font-size: 12px;
          .el-input__icon {
            line-height: 30px;
          }
        }
        .el-input__inner {
          border: 1px solid #7b7eff;
          height: 30px;
          border-radius: 0;
        }
        .input-new-tag {
          .el-input__inner {
            border: 1px solid #bfcbd9;
            border-radius: 4px;
          }
        }
        .textshow {
          color: #000;
        }
      }
      .qicon {
        float: left;
        height: 30px;
        width: 16px;
        line-height: 30px;
        color: #fff;
        background-color: #7b7eff;
      }
      .el-popover {
        z-index: 2009;
        .el-form {
          .el-form-item {
            margin-bottom: 0px;
          }
          .el-form-item__label {
            font-size: 12px;
          }
          .el-textarea__inner {
            border: 1px solid #7b7eff;
            padding: 2px 3px;
          }
          .el-form-item__content {
            //  margin-left: 10px!important;
          }
          .btnitem {
            .el-form-item__content {
              margin-left: 40px;
            }
          }
        }
        .el-button {
          padding: 5px 10px;
          font-size: 12px;
          float: right;
          margin-top: 5px;
        }
      }
      .nodatatext {
        color: #ccc !important;
      }
    }
    .textbox {
      box-shadow: 0px 0px 25px #f7f7f7;
      border-radius: 5px;
      .content {
        height: 100%;
        padding: 25px;
        p {
          margin: 0;
          span {
            padding: 0;
          }
        }
        .fontbox {
          height: 100%;
          overflow: auto;
          .fontsinput {
            float: left;
            width: 150px;
            .el-input__inner {
              border-radius: 0;
            }
          }
          .fontselect {
            float: left;
            width: 60px;
            .el-input__icon {
              width: 20px;
              line-height: 30px;
            }
            .el-input__inner {
              padding: 3px 2px;
              line-height: 30px;
            }
            .el-input__icon + .el-input__inner {
              padding-right: 10px;
            }
          }
        }
        .inputlabel {
          float: left;
          height: 30px;
          color: #000;
          line-height: 30px;
          margin-right: 5px;
        }
        .inputdiv {
          float: left;
        }
        .el-input {
          font-size: 12px;
        }
        .el-input__inner {
          border: 1px solid #7b7eff;
          height: 30px;
          border-radius: 0;
        }
        .input-new-tag {
          .el-input__inner {
            border: 1px solid #bfcbd9;
            border-radius: 4px;
          }
        }
        .textshow {
          color: #000;
        }
      }
      .qicon {
        float: left;
        height: 30px;
        width: 16px;
        line-height: 30px;
        color: #fff;
        background-color: #7b7eff;
      }
      .el-popover {
        z-index: 2009;
        .el-form {
          .el-form-item {
            margin-bottom: 0px;
          }
          .el-form-item__label {
            font-size: 12px;
          }
          .el-textarea__inner {
            border: 1px solid #7b7eff;
            padding: 2px 3px;
          }
          .el-form-item__content {
            //  margin-left: 10px!important;
          }
          .btnitem {
            .el-form-item__content {
              margin-left: 40px;
            }
          }
        }
        .el-button {
          padding: 5px 10px;
          font-size: 12px;
          float: right;
          margin-top: 5px;
        }
      }
      .nodatatext {
        color: #ccc !important;
      }
    }
    .delchart {
      width: 40px;
      height: 40px;
      position: absolute;
      margin: auto;
      right: -12px;
      top: 10px;
      color: #7b7eff;
      cursor: pointer;
    }
    .dellist {
      width: 40px;
      height: 40px;
      position: absolute;
      margin: auto;
      right: -12px;
      top: 10px;
      color: #7b7eff;
      cursor: pointer;
    }
    .handle {
      width: 0%;
      height: 0%;
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: url("../../assets/img/imgchart/wghandel.png");
      background-size: 100% 100%;
      cursor: move;
      opacity: 0.2;
    }
    .handlequery {
      width: 0px;
      height: 0px;
      position: absolute;
      margin: auto;
      top: -35px;
      background: url("../../assets/img/imgchart/but.png");
      background-size: 100% 100%;
      cursor: move;
      opacity: 0;
    }
    .handle:hover {
      opacity: 1;
    }
    .handlequery:hover {
      opacity: 0.9;
    }
    .dragall {
      bottom: 0px;
      right: 0px;
      position: absolute;
      width: 15px;
      height: 15px;
      background: url("../../assets/img/iconhead/Dragiconleft.png");
      background-size: 100% 100%;
      cursor: nw-resize;
    }
    .savebtn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9;
      background-color: #7b7eff;
      border-color: #7b7eff;
      border-radius: 4px;
    }
    .el-button {
      padding: 7px 12px;
      font-size: 12px;
      border-radius: 4px;
    }
    .el-button--default {
      background: #fff;
    }
    .el-button--default:hover {
      color: #7b7eff;
    }
  }
  .el-button {
    background-color: #7b7eff;
    border-color: #7b7eff;
    border-radius: 4px;
  }
}
</style>
<script>
import Draggabilly from 'draggabilly';
import {
  dragComponent,
  listimg,
  getDbs
} from '@/services/query';
export default {
  data() {
    return {
      datasourceValue: '',
      dataValDefault: '',
      datasourceoptions: [],
      nowposition: {
        left: '',
        top: '',
      },
      optionlist: [],
      querys: [],
      charts: [],
      text: [],
      list: [],
      ruleForm: {
        xz: '',
        yz: ''
      },
      rules: {
        x: '',
        y: ''
      },
      visible2: false,
      formname: '',
      chartsi: 0,
      querysi: 0,
      texti: 0,
      listi: 0,
      dragDom: null,
      divHeight: '',
      heightlist: [],
      initTop: '',
      formlist: []
    }
  },
  created() {
  },
  mounted() {
    // this.testparam();
    let dragDom = this.dragDom = new Drag();
    dragDom.listenevent();
    // 窗口改变大小是要调用的方法
    dragDom.windowReSize();
    window.onresize = function () {
      dragDom.windowReSize();
    };
    this.Getlist();
    this.GetDbs();
  },
  // 此处优化的部分很多，以后有时间再优化（ps: 很多函数可以抽象出来直接调用）by xx
  // select 'beijing' as city ,'01' as month,'100' as data from dual union all  select 'beijing' as city ,'02' as month,'800' as data from dual union all select 'beijing' as city ,'03' as month,'300' as data from dual union all select 'beijing' as city ,'04' as month,'600' as data from dual union all select 'beijing' as city ,'05' as month,'100' as data from dual union all select 'beijing' as city ,'06' as month,'900' as data from dual union all select 'beijing' as city ,'07' as month,'200' as data from dual union all  select 'beijing' as city ,'08' as month,'600' as data from dual union all select 'shanghai' as city ,'01' as month,'100' as data from dual
  methods: {
    // 获取数据源列数据
    GetDbs() {
      getDbs().then((res) => {
        if (res.status === 200) {
          // console.log('数据源：', res.data);
          this.datasourceoptions = res.data;
          this.dataValDefault = this.datasourceoptions[0].value;
          this.datasourceValue = this.datasourceoptions[0].key;
        }
      })
    },
    changeDatasource() {
      // console.log('切换数据源：', this.datasourceValue);
      this.dbsource = this.datasourceValue;
    },
    // gettool
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },
    Getlist() {
      let param = {
        offset: this.offset,
        pageSize: this.pageSize,
      }
      listimg(param).then((res) => {
        if (res.status === 200) {
          this.optionlist = res.data.rows;
          this.optionlist.sort(this.compare('ordercode'));
          for (let i in this.optionlist) {
            if (this.optionlist[i].type === 'select') {
              this.optionlist[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACEUlEQVRYR+2Xv3LTQBDGv5WtO7nCwwwVmUGxBgKEGbuidk+YSZ6AUFECNT0NDSXQEB6AP29AOto4MJBArCRAKgqgknSKbxnZKAjjKLIlERe5TjN7+/32253THeGYFx2zPoYAZk5LU9wjAy2AKsXCcY803vZo/4lSn9/HuRMAM2ctKd8Q2GTQZrHig2wEvsBMZzTCZgxxACCF84CAO0w8HwTuxzIALJybhah+INaPvXD79gDq96qJxgsG5n3lzpUhntDpAPjiKXdhCMB5yeCLvnIvlQywxsCer9xrJwDT7YAQzqIBbhYxDxrUUar7KspVE42sM2DXa8JYBVE+COaOp3Qb2PkxJkAUng+Cwbt+oFux+AQAgGnarSr1nTg1VjuYf+6zbofhzlpy3xgt+LNtbIhDxCdyIMawqnabKpXXWVzoMZbioRuOn8iBAwjTWSYDT9MgWOOmH3ZXDovJBRAltVIgNPhuELgP0wBzA/QhhLNChBtJIWY881V3+agWFQIwDJFVPNcQjqrMks4qMdc95baOqjzxO856EmZJadcHUYNTLssqrAVZxEbFnABMswON5wxc+Q+X0nUAu55yr0czMupafjkI3E+TDlnaPgu2DVHZJNaP/rmWS9k4T0zviPg7gzbKAIgeJv28QXDVw97XvxyIPqScnTM03WIDzZKeZuteaNwHtr7FBU7b47QM49Nz/gK1+KkwpLC2JAAAAABJRU5ErkJggg==';
            } else if (this.optionlist[i].type === 'date') {
              this.optionlist[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFU0lEQVRYR+2XW4wURRSG/9MzU93NcjEGMCyXne3mEhSXZQERo1GjPvggJpKIgnjH+AAxkEhWDSQgaogaiQkh8RYeUJBEI9EYH4yaeEGQqwIRtXsHshAEVFhYuqqmp47p2ZlldhbYJSzyYj31pc45X586f51qwhUe1HP8kbWOSD8qtXoLOHy85/nJjGtq7EzNwyqvNgKH/rqQTY8AjvCWEdFSsJkV6ZaNvQEQwrsvRfQRM5ZIHazoLYDlpLO3wLJuBVBHht6L4uB7R3ivEFEzMz8kdfi+EN5Mi2hBp1PGAQAHQZhaMIXmfD63yxX+AyCsN4xXlQ4WZzLZaSmy7gbABNofabUJaI0SH6UMjLYd23xKoLvO0vLqSIXzbeGttIgWM5u5UresKwOd66sMeKFS4SpHeHOIaJ1hvKZ08Kwj6pcTWUsqbFojpSYCrX8XAeyM97pl0SIwb2ODZsAUZJzaBwRHHeG/RITnwTw70uH6BNrNZKcxw6mGkPHp7cDxU66ovx9kfcjMK6UOm4s2af8mBrtkYQWIpjHwjlTBvCKAa/tHmXkwtPEkcrlKx67wZ4H4zdiYGfl8bktvaiCTqWtKW+kvmHlhsmxd/MEbxQI5Ak5EOrw6ARCu7Stm/k3qcFxvAlzqHEf4ewCMljpwKJGMa/c/naQ/0uHUS3XeG3tH+D8QYXqkAroiAK7wN4NwY6QCm4Ah/V174CkwdkQ6mNybL7jUOa7wtoDohkjRoAoA3hXpcFK186SgUkwDC8Rt+fyBHRXvhZPOTkdMOYmWZC/oHLZdP44KPIwIMuooXO5a2N5WEE2NFA0lYPAA1x7UBubdkQ4buysAG8rPYmMa8/mW3cm9I/wNRJiVXDPzBqnDB5NrIerGpyi9r2zDzHOkDj+o8rsNhMlQGFUJ8Eukw4bKiY7wlhLRsvKzAvNMrcOPO6TrHQZoWBEAfECqMNsBkL03RalPzgKYF6VuWVoFsB2EJgOMIWD0QNfmk8y8R+rw+i4AGe9xsujdTmcFvkvG4ZelDOwlwrWld62RCkZ2ANQ3pMgqZikZ5d2xagl2gqixwDShAgD7pA6uq6oByxH1z4HoNjCOSB0+BiBO5mQy2cYUWQtA5BsuvKF1blPZ1hVeshxzGNQuddsTwLHTVQC7QDQxNpjSKUPmcwJU8fTNrSu83SBqiE3cREBtP9d225mxV+pgQt+EuLAXV3jFDJSWoAzQvQaArGPb1tPEuIoIbZHSa8pt1BHebBDNA/MRMlgdxeF35bBOxn8KxLUEyEhjDRCePFcNGPBYAka4rm2fAXN3FWTqnyTLeruioO5RKvysowi9/UQ0tkMF+EOqYExRHWnvZqTo204bY+arfMvqKhXsAGESK5OtBPg50uHELioQ/hIiLD+rAtwh4+CrYiDbbwUwvPTuWKSCocm1bdfPsGB1FiTz+WUYqTjJUmcGum1ETtq/HRZ/TkTF3l/gwnitc7+WZLiWCI8UARg/RjqY3gEzYrgjRJKdGmYuwJg7ZZz7pioDxY0oUtEQStbZtVMR+NxbcdItnXS/Jk7hqFIt+ysd2bY3hgqmVsbt2yul5qCuHmmqM5Y5qvXBzl2xQqY/gWhKqReUAbAz0kHTf6SCUi8ouMmBJOXafszMv0sdFovqco9yAZfOA4Bj+wEYw6XODwMO/nN5AZIasZNj3xmpg6QdA27GWwWLngHzVjZ4Qcbtm4E/2/sWJKmlmulk4eWkFTPzOqnDuaVj+ZD+rhjwdVIYfRv0vN6OQ8lJEQ61Vv4ZCVd4ixhoABXbbI9/TRcJy2A+xIRtSpm1QO5EYt/XQS6S6X8A4F/+h4gb7Ldv8QAAAABJRU5ErkJggg==';
            } else if (this.optionlist[i].type === 'input') {
              this.optionlist[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABAElEQVRYR+2WXQrCMBCEZy2k9gyiiPVB8Qc9idfRE+h1vImgoC8tot6hNtCuNKJUxT9IqEL2sYGdLxO6s4SCiwrWhwWwDvyOA0LURyU4UyK0Tf4ZzFinSCZSbueZztUBz/UPAComxXO9D1EcVO8BOPuQMPelDJcmQIRodhziVdY7igN1+bwDCuByYAIg6+m5/o3OUwBPNBYAOJLhUCfM5wB3pLogLIB1wDrwRw6cBxEiGQ50zYCvJqFO0Xyvt0+QMHpSBiowdJcQftchqKB7CKOy6+8IUBFpuhjYH+OgdpOG54WkNCOilkkAZt6kSMcPC4lJ0Ve9f2cntA5YB4py4AT2+8EhQCpAoQAAAABJRU5ErkJggg==';
            } else if (this.optionlist[i].type === 'val') {
              this.optionlist[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABF0lEQVRYR+2XPQ6CQBBG52sAo50nEI5gYakXsLey1VsYj6GdlQcw9tqZGI8A3sBKA0szBhISIJv1b4GYLA0hC8zjzWZmADV8oOH4ZAC0GrDt3hiMviytDDoLEezLa1oBHMu9A2hL9xXzLYyDbqUAeQMAFkkwZl6m5zoM5L+uZXucXIfCV1rWmoKvAVqWeyJg8GtNYOJVJIJ58p6yAcdytwAmWQwmOkbCH6UGspvrBMjSUwB4la9PAFV7IL9mAIwBY8AYMAY09wJaR8KfyZuRtwFomi/nSelPARzbO4Bo+Emtl45d9D5AoRv+Glj2/H8NJLoMqGdCvghx3VU6lKqmYmZ+RHHQqRRA/V9Qg4FvUlnZVPwuTOMAT4GeBzBnyLkZAAAAAElFTkSuQmCC';
            } else if (this.optionlist[i].type === 'line') {
              this.optionlist[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACAklEQVRYR+1XMW/TQBh9nxvb8US3LgyN8ydKJYTE1KkDSIgF1nQBMVaqgCIqISYYqcTCwEYH4A+AxAIDCwtD44QBqcBQVULUPsf3kCvSXtokVzvQVChe/d1773vfO/tOMOZHxsyP0ySgNlP1pBErrgOtbyflzL4DVa+2IuKskbgdq+baGASEqyJyl+S9WEWrEwH/pQOBOzuXiZxVqvWi26ARwn+bAd+vLQqdDQC/YtWcBsBcxIkIMMhB0ZeTpPVqFAcqgR/eRIYPu53onS0rB+QUCi+Z5GUcqARefQOCRRIJdLYQd9pvBonwK7ML4ky9Rt43eNWcfRkH9slB7kDkzDARf8hfApwaRF7EgQNycIuJPgfPaYjIcj8RBrmrwSv9Oi/igEGOHxqYT5LmZg5Q9cIHh0WY5ACuxSp6Piwntl1g2r6dQc8r1f5sAgZu+AiO3NpzAvo+4NwB6B6H3DaCnplnwHmlok/9uumKyN+RzPe3tXPrCKpe/ZkIrpP4mbFzIU2/fBxmZeCGjym4AbIRp62ntu1pFRD49a8kpzPqi2nafn9cwKJ1QzJQmwEcAs3vRUGL1NtCWASrVO1EwMSBow4Ab0EO/MOVSlrvIsaKT7pH/yPH8r9AYIcgl3dV9LDnUwzsXUyWzFOSHalUBWOl14H21iEBpcBGXnSa7oYjN1MK4DfdCJAwRxZwvwAAAABJRU5ErkJggg==';
            } else if (this.optionlist[i].type === 'bar') {
              this.optionlist[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABMElEQVRYR+2XsUoDQRCG/9mY3attRSG3bbDRJ7DIK1iIhc+gtdhaxM7Gykp8AZH0ChZ2KSzkNshBXuHu9vRGDiEaOCSXuHcgu/XMvx///CyzhJYPtXw/ZgCBDE9BtEfM94k1502B/QDQt0TYZ+br1JojD+AdWNUBKXW/QxiXOklmN4B4WqXpLIQewKkDCpuaZPewnGlqzVnVbN0CrPUGoiNGXwGLKp/zxgGk7G2Lgtf5/SPOEEeNAwQqHBFoUBR8keXm+H8BBDIcE1EfKE6SbDJUFRlw6oAH8A54B7wDq25Hv/U724gWhf4G6OpnCN4B8ArGw6ICS9UxPaV5dFX2zgCUDN8E0dZSgjWbmPkmteZgHkDpOwLvMmNKwEtNzVrlzPyY5ZPLOYBaCn9Y3Prv+BMHYSE//RGjCgAAAABJRU5ErkJggg==';
            } else if (this.optionlist[i].type === 'pie') {
              this.optionlist[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAENUlEQVRYR8WWXWgcVRTH//+7mS+pL9Jiqa1mZi2iIJZIQzEvgiJoQB+sL5agBa0Imkj9jB+RUJRihaQqmKIIYtRasfhQsG9SHyqpKGhBEZnZJBStFtpilJm5sztHZpK1+djJ7LYPPU87O/9z7u+ec++ZQ1xm42VeH50CdJmmd6MS9mTgURIfAk6Fl7KJdgEMy3B3KaVeBbDu/wVFpkIdbMueLcvrJzAIcCaVZFzr2Z/bASsFMIzqrRWFgwSubwYUwCdQzZ7DOPsJ2GZ1jsSaRZpjjbS+O0lmflgNZFUAx3KfFlF7SXRB5GxK7Inj9CAwfdqxqrIIgI5VTfOFRIZBDAFcL4KYwEOh9j8rgigEcAxvDIpP5TEh70bx3HPAmX+agYoAFjJi2KY3THJ0nindE+naSCuIlgC26Y2SHBGRBkR2Rknto+XOJQC53DbcR0EeIEkR2RHp4JPlcVYAOEb3NqE6ngkJ7Ah18Gkr8nYA5iGqu6hwICtHCtmqdXBycbzlAMq2PJ9gN4B3wth/sqh27QJk/o7hjUNxSATHI+33FQKYZvd9FVa+BOR0GM9tXlzziynBBZ+NjmNZswDW1lPpTZLgu+a7JRlwTO8IyH6R9OVI115b7fp0koE8C5b7DKD2QeRwqIP7WwEYtln9F5BKpBsbgZk/OgDI+kCSX9dyOxXG/qYVAIbhbe1SPCGCXyLt31QWZ1kGYJvui6RaNWsQOSeQwUjXJlcA2Ib7CJV6T0QmIx0MdApQpi9tRJblDSlwHKnsD5Mgb0CrmW1WNQkjjNP1QO3PMn0pQNZ2AfUmUhkLk2B3WUDbqn5N4PYy3fL3ApmO4noPMHtuodfMSyyj+phSmGi7BPCuFYsTENyZZaITEEnxcJT4Hy4ByDogVOVbiPwU6uCWTgK2q3XM6vcgetBAX1j3m9226b7hCtt0zgOiIi3XXEpdWwNtWOtYzhkR1CPtOwDqSzKQNwvT+xzk9hQYjGP/7XZ31o6ueU0FOBrF/t0rrmF+DiyvX4FHBDIbxUE2gCTtBC/XXGjFKXBPHPtftQRYyMIUyF6R9KVI114vD16usMzqG4p4FiInF85XPsysKEH2h2F0b6mwciI7C0jTO6L69LHyJYoVVpd7FxWPZnNJQ6QnSWo/LlYXDSQPkvxYBH8jbdx7sRC24Q6A6n0SZtEHrngkM73nQe7NpiKSw2HsjzVPbnlG1q2xzSvfIrkz0wpkIoqDx1v5rT6Umu4DAjU5vwP5DcBopINDxYfTvdqxMCDgEwSvE4Em8Eqo/X05RwsrHcsty72Boj4gcVvuL3IW4DcQmRHifH6QyKsg6BPIFpJqQXc4JV6I4yADL7RSgKanabrbK+AIyJuLw8lfAnwhkP1xXPu1vFT53NmZGYbbWyE3E9gkgE3KHIS/Q9JamExPFaW6aJWOATrDLVdfdoD/ABKl7jC6Uj6xAAAAAElFTkSuQmCC';
            } else if (this.optionlist[i].type === 'list') {
              this.optionlist[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABYElEQVRYR+2Xz0rDQBDGv0klm72K/aNQlW5vfQHxJbx5U+hBfAYfwKfQgx4Ej76E4NmTl5S2CPVP0eMmS9KRKpUYaikkYQWzx12Y78e3M8MMwfIhy/pIAWw3pOucAdgF0WrOcGMw32kzOQL6T7PYCYB2VYrJPUCNnIVT4Xikw6gDDN+nD98AnqsuiXAIxk2M+MSY/kOeIK7b7lTApyDsMfNFYHrdHwBSqFcAazpEHfBf8hSfxZJQTQgMAYx16FeTACSFmkwvdOgXmZifOszMgek5JcDfdKCI5EvHXJgD1gEWVIEjhYqT9CnYZSopUxWUAKUD/8QB633AOkDZiEoHbDkAKVrPANV0GG0Ag9GcasjciCRamxA0APCoQ785dyxn5uvA9A4ARCmIrAArnquuiLA/dywHVE0Kni4m9WJ7wS+LyZfo1rrnVs4J2Ml9NWN+A3CrTXyc/OIid4CljLQO8AG1l+YwaRIxwgAAAABJRU5ErkJggg==';
            } else if (this.optionlist[i].type === 'text') {
              this.optionlist[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB/UlEQVRYR+2VMWsUQRTH/2/vdmY2X8BGhOzmU9gImqAognZWwUasBBsLsbSxEISUqVQOCy0iGCOIoFUam9Th9gzBRuxOZWcmxz7ZHDHLuXs3d9kxKZxyYeb3e/N/+4ZwzIuOmY//Aj5vIFQi6QDoaps+qIvak8DpSEnxhkAXCnDOeGxseq9KwotAJJMVAHfKwDoJLwIKZ2KS7U2ATpUlmPmRtr375W9NCpASyUMmfm5Mb7tSgnk9s72rPgQK+FMiLAP8jc3grMZuryzBwDtt6DrQNU0LlOAHRx9KSJksgHHb2LS4+sFoIx41AlIifkFEN/7u8EOJcdP2KAItJeJONXyIZMYzbdObPgRakYhfgYpMaxbzVmaDc0C337RAOxLxyybghdi0ERTw1yC6Mqbyz5kNFidVfrB/GgFH+I/zwPefrs+8q0AYiXhtcuXTwV0jCJWM3xJoqb7fsKlt/+I0lTtGsCCVzItXbQLcLAJfM9drd56EKpy/RUGwOr7y2eETI4hEsgbCtSoBBj5pYy7PWrlLBMWk6xPR3KjAEE6XRh+WRiOQ7fmloBW89wkfG0EUxk8Q0N3hTOdfBPrAnK/rPe4AO3qWaqv21M4BJZMNynk7Z94wgy8fAew1BXX+C3wAR890nYTeXP4IRDJhb5SKgzOT7rNPjsC/rP5ENeFv1KbXIZ3aA54AAAAASUVORK5CYII=';
            } else if (this.optionlist[i].type === 'formname') {
              this.optionlist[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC2UlEQVRYR+2XO2gUURSG/zOz80JRLESFGDczRAUbRYsEgyJbCGkEX2Aj+GgsYqNgI9grWASxUQgRRcGopDFWhqAghoCCRglkdxOLgCgYSMzM3Nm5RwaNLMnO7uxssjbeds7ju/+5594zZKLVhqHdBiNHhAwSLmZ89oR7AJj5ntClohmZuv0BhLcI5f3EgRT1BYhnwBCe8LoagSBTd0TIsisIiqNJAUzdXoCU3VCVq2C0NAIRKVAKGR1BUBirB4BkmHNL02Om4QyC2U4L0SjAGwAZS3cGGLwzDcRKAETCKaZu3wOwr16IlADOuIS8JkRxoKxsUay7APZ7otQJfPmRpKTpADLZg6Qoz0C0oVKSkPm4EIUnqwbwO3CLZWWMPYxQL09EqvogZL7YBIDK+zMNZ1IyX/kP8C8VGGbguu/nh1b5ECYJX9smVRsuDavr9jGF6DCAVnD0SNGIF+T7a6cHGgYwdecRwCcIGJLAuALazkA3iF97/twR4Nt8NZCGAEzNPgOi3pD5UPljZhh2uwJ6yYxhT+RPrx6AYRdY8k0/KN6qUJajCjDgibl11VRoQAF7vWXQrOu7G2MGEs3UnZ+QMueViq/iVEgNoGnZ3RlFfef6eYoLbhn2jASdq9aSqQAs3X4KUCsIexkYia0xo5PAEwAmXFE4BaC01DYVQDSSMeMysfxUq9VIUTeD8ND1ww3A1OyKAfwZyaKJqOoykc2SoRabALBti5mhHV4J78t32jQAy3B6AfQwc58nCmcXZWkagKm1nSdFuSOl7Cm/F2oCRK0SsrwgxNRgrXr+3ZVuLyw/A5vWWMbaeQm0+35+MrECltF2iZluEDDKRF4shOR+Lyj0Rd+jLlgOkDUtQ3XZL9kepouJASJDS8t2MFEOIC0OIGR+vvj3VBkAsPS2k64oPgbAdQEklb56CWJmxFptWG/yxRKs2EWUDsD5SIRdyX35q+sXtgIIlvr8AoDbUz+jlLE3AAAAAElFTkSuQmCC';
            } else if (this.optionlist[i].type === 'barline') {
              this.optionlist[i].url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACT0lEQVRYR+2XP2gUURDGv2//X1CwUURDvNuUFioW6SSgjYiNaEQxpDJgGbWw8PBSBARFAmKjnV0uFlqINgo2tmqhjbd3orGIYBfZ3Xd3O3L/YsDc3u3l8A7JVsu+mTe/983svPeIAT8ccHwMB4BlZc7q1JYh0XlflfL/UpW6Ao7l5kjeEpH5QBVz/QRwDPcEdTlcFa0AoKAUPwOFsBWjJ4AU9o/6+L7SBSgdazwgYbVsRaCEciYMi89r35IC1Ca8CUiOwAsoXvHhfYsDse3xkxQ5B/AiCbthK9f8sHgvIUB6r2NrSwSP/VmN+IAsBKp0B4DaDMQ00xMG9Qcgjq77VauTQeXLm64BbDtzWhM+BrkLgp+RSFYjZkBO1NcDeKhiNqh4r1tBUnDHxMJtkhcai5YPIA/VXv0wHAFW/C4A9o04dmqRwOVmoJdBiBnA+1FLn2NmLlHjXYB7GjGQF0qWwmlArpN0AFmViDeqiN4ZmvZeBJ8C5R3sWISmeeCIrhlPCLgiWINEV4Ny6dHfMu/eYVs7swTnSJgbiq0swGKo1uaB1V/AaMqxzLkI+jOlCh9jAWzbPUXhUxKGCN5ClacDfC3GFZuDMRe28ZDgcYG8QliZ7eTTNgWOkZ6krudFcD9Q3gKAqBW816bVzi/pb9hz02rX7P4vgLj0JFKgl4k67SmJAOI2p36PbVoD/Q4Sp842wLYCw6lAyspMgdoSJJryVWl54ybU77HErbiLc2Aik+ECSIS+VePmHaSuwHpetzppEv9mfQ3H1SwJeL9tB67Abz0I0z+Rn+ysAAAAAElFTkSuQmCC';
            }
          }
          this.total = res.data.total;
          this.divHeight = $('.main-body-leftbox').height() - 100;
          // console.log('this.divHeight:', this.divHeight, $('.toolbox').height())
        }
      })
    },
    // 保存
    savetemplate() {
      // console.log('this.querys', this.querys);
      if (this.visible2) {
        let param = {
          query: JSON.parse(JSON.stringify(this.querys)).map((item) => {
            item.position = JSON.stringify(item.position);
            item.dbsource = this.datasourceValue;
            return item
          }),
          charts: JSON.parse(JSON.stringify(this.charts)).map((item) => {
            item.data = JSON.stringify(item.data);
            item.position = JSON.stringify(item.position);
            item.sql = JSON.stringify(item.sql);
            item.dbsource = this.datasourceValue;
            return item
          }),
          text: JSON.parse(JSON.stringify(this.text)).map((item) => {
            item.position = JSON.stringify(item.position);
            item.fontsize = JSON.stringify(item.fontsize);
            item.dbsource = this.datasourceValue;
            return item
          }),
          list: JSON.parse(JSON.stringify(this.list)).map((item) => {
            item.position = JSON.stringify(item.position);
            item.data = JSON.stringify(item.data);
            item.dbsource = this.datasourceValue;
            return item
          })
        }
        dragComponent(param).then((res) => {
          // console.log('配置好保存数据：', param, this.dbsource)
          if (res.status === 200) {
            this.$router.push({
              // path: `/createdchart/${res.data}`
              path: `/createdchart/${res.data}`
            });
          }
        })
      } else {
        this.$confirm('报表名称为空，请配置报表名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
      }
    },
    // 文字组件的方法
    handleInputConfirm(index) {
      this.text[index].editshow = true;
    },
    select(data) {
      this.charts.push({
        uniname: this.formname,
        activeflag: false, // 新增加的属性，默认为false
        editshow: false, // 新增加的属性，默认为false
        other: this.chartsi,
        type: data,
        key: `charts${this.chartsi}`,
        sql: {
          x: '',
          y: '',
          z: '',
          sql: ''
        },
        position: {
          width: '',
          height: '',
          top: '',
          left: ''
        },
        data: {
          x: [],
          y: [],
        },
        fontsize: {
          fontSize: '12px',
        }
      })
      this.formlist.push({
        uniname: this.formname,
        activeflag: false, // 新增加的属性，默认为false
        editshow: false, // 新增加的属性，默认为false
        other: this.chartsi,
        type: data,
        key: `charts${this.chartsi}`,
        sql: {
          x: '',
          y: '',
          z: '',
          sql: ''
        },
        position: {
          width: '',
          height: '',
          top: '',
          left: ''
        },
        data: {
          x: [],
          y: [],
        },
        fontsize: {
          fontSize: '12px',
        }
      })
      // console.log('this.charts-select: ', this.charts, data, this.formlist);
      /* if (this.charts.length > 0) {
        for (let i in this.charts) {
          let _top = this.charts[i].position.top;
          this.heightlist.push(_top)
          let max = this.heightlist.reduce(function (a, b) {
            return b > a ? b : a;
          });
          let _tool = $('.toolbox').height();
          max = max + 250;
          if (max < _tool) {
            this.divHeight = _tool;
          } else {
            this.divHeight = max + 100;
          }
          console.log('_top:', this.heightlist, max, _tool);
        }
      } */
      this.$nextTick(() => {
        this.initposition('charts');
        let dragDom = this.dragDom = new Drag();
        dragDom.listenevent(this);
        dragDom.dragzoom(`chartszoom${this.chartsi}`, `charts${this.chartsi}`, this.$refs[`charts${this.chartsi}`]);
        this.chartsi++;
      })
    },
    selectquery(data) {
      this.querys.push({
        uniname: this.formname,
        activeflag: false, // 新增加的属性，默认为false
        editshow: false, // 新增加的属性，默认为false
        other: this.querysi, // 新增加的属性，默认为false
        label: '',
        value: '',
        type: data,
        position: {
          width: '',
          height: '',
          top: '',
          left: ''
        },
        key: `querys${this.querysi}`,
        sql: '',
        fontsize: {
          fontSize: '12px',
        }
      })
      this.formlist.push({
        uniname: this.formname,
        activeflag: false, // 新增加的属性，默认为false
        editshow: false, // 新增加的属性，默认为false
        other: this.querysi, // 新增加的属性，默认为false
        label: '',
        value: '',
        type: data,
        position: {
          width: '',
          height: '',
          top: '',
          left: ''
        },
        key: `querys${this.querysi}`,
        sql: '',
        fontsize: {
          fontSize: '12px',
        }
      })
      /* if (this.querys.length > 0) {
        for (let i in this.querys) {
          let _top = this.querys[i].position.top;
          this.heightlist.push(_top)
          let max = this.heightlist.reduce(function (a, b) {
            return b > a ? b : a;
          });
          let _tool = $('.toolbox').height();
          max = max + 250;
          if (max < _tool) {
            this.divHeight = _tool;
          } else {
            this.divHeight = max + 100;
          }
        }
      } */
      // console.log('this.querys-selectquery: ', this.querys, data, this.formlist);
      this.$nextTick(() => {
        this.initposition('querys');
        let dragDom = this.dragDom = new Drag();
        dragDom.listenevent(this);
        dragDom.dragzoom(`queryzoom${this.querysi}`, `queryzoombox${this.querysi}`, 'query');
        this.querysi++;
      })
    },
    selecttext(data) {
      this.text.push({
        uniname: this.formname,
        activeflag: false, // 新增加的属性，默认为false
        editshow: false, // 新增加的属性，默认为false
        other: this.texti, // 新增加的属性，默认为false
        data: '',
        sql: '',
        fontsize: {
          fontSize: '12px',
        },
        position: {
          width: '',
          height: '',
          top: '',
          left: ''
        },
        key: `text${this.texti}`,
        type: 'word'
      })
      this.formlist.push({
        uniname: this.formname,
        activeflag: false, // 新增加的属性，默认为false
        editshow: false, // 新增加的属性，默认为false
        other: this.texti, // 新增加的属性，默认为false
        data: '',
        sql: '',
        fontsize: {
          fontSize: '12px',
        },
        position: {
          width: '',
          height: '',
          top: '',
          left: ''
        },
        key: `text${this.texti}`,
        type: 'word'
      })
      // console.log('this.text-selecttext: ', this.text, data, this.formlist);
      /* if (this.text.length > 0) {
        for (let i in this.text) {
          let _top = this.text[i].position.top;
          this.heightlist.push(_top)
          let max = this.heightlist.reduce(function (a, b) {
            return b > a ? b : a;
          });
          let _tool = $('.toolbox').height();
          max = max + 250;
          if (max < _tool) {
            this.divHeight = _tool;
          } else {
            this.divHeight = max + 100;
          }
          // console.log('_top:', this.heightlist, max, _tool);
        }
      } */
      this.$nextTick(() => {
        this.initposition('text');
        let dragDom = this.dragDom = new Drag();
        dragDom.listenevent(this);
        this.texti++;
      })
    },
    selecttable(data) {
      this.list.push({
        uniname: this.formname,
        title: '',
        activeflag: false,
        editshow: false,
        other: this.listi,
        data: {
          rows: [],
          cols: [],
          total: 0,
          offset: 1,
          pageSize: 10,
        },
        sql: '',
        position: {
          width: '',
          height: '',
          top: '',
          left: ''
        },
        key: `list${this.listi}`,
        type: 'list',
        fontsize: {
          fontSize: '12px',
        }
      })
      this.formlist.push({
        uniname: this.formname,
        title: '',
        activeflag: false,
        editshow: false,
        other: this.listi,
        data: {
          rows: [],
          cols: [],
          total: 0,
          offset: 1,
          pageSize: 10,
        },
        sql: '',
        position: {
          width: '',
          height: '',
          top: '',
          left: ''
        },
        key: `list${this.listi}`,
        type: 'list',
        fontsize: {
          fontSize: '12px',
        }
      })
      // console.log('this.list-selecttable: ', this.list, data, this.formlist);
      /* if (this.list.length > 0) {
        for (let i in this.list) {
          let _top = this.list[i].position.top;
          this.heightlist.push(_top)
          let max = this.heightlist.reduce(function (a, b) {
            return b > a ? b : a;
          });
          let _tool = $('.toolbox').height();
          max = max + 250;
          if (max < _tool) {
            this.divHeight = _tool;
          } else {
            this.divHeight = max + 100;
          }
          // console.log('_top:', this.heightlist, max, _tool);
        }
      } */
      this.$nextTick(() => {
        this.initposition('list');
        let dragDom = this.dragDom = new Drag();
        dragDom.listenevent(this);
        dragDom.dragzoom(`listzoom${this.listi}`, `list${this.listi}`);
        this.listi++;
      })
    },
    // 报表名
    selecttextname(data) {
      if (!this.visible2) {
        this.text.push({
          uniname: this.formname,
          activeflag: false, // 新增加的属性，默认为false
          editshow: false, // 新增加的属性，默认为false
          other: this.texti, // 新增加的属性，默认为false
          data: '',
          sql: '',
          fontsize: {
            fontSize: '12px',
          },
          position: {
            width: '',
            height: '',
            top: '',
            left: '',
            type: 'formname'
          },
          key: `text${this.texti}`,
          type: 'keyname'
        })
        this.visible2 = true;
        this.formname = this.text[this.text.length - 1].data; // 如何得到对应的值
        // 给其他每个元素赋值
        for (let item of this.text) {
          item.uniname = this.formname;
        }
        for (let item of this.querys) {
          item.uniname = this.formname;
        }
        for (let item of this.charts) {
          item.uniname = this.formname;
        }
        this.$nextTick(() => {
          this.initposition('text');
          let dragDom = this.dragDom = new Drag();
          dragDom.listenevent(this);
          this.texti++;
        })
      }
    },
    //
    edittext(item, index) {
      this.text[index].editshow = true;
      if (item.position.type === 'formname') {
        this.formname = item.data;
        // 给其他每个元素赋值
        for (let item of this.text) {
          item.uniname = this.formname;
        }
        for (let item of this.querys) {
          item.uniname = this.formname;
        }
        for (let item of this.charts) {
          item.uniname = this.formname;
        }
        for (let item of this.list) {
          item.uniname = this.formname;
        }
      }
    },
    setpositiondata(type, index, left, top) {
      this[type][index].position.left = left;
      this[type][index].position.top = top;
    },
    setpositiionbox(type, index, width, height) {
      this[type][index].position.width = width;
      this[type][index].position.height = height;
    },
    showposition(left, top) {
      this.nowposition.left = left;
      this.nowposition.top = top;
    },
    initposition(type = 'querys') {
      let boxwidth = $('#dragbox').width();
      // let boxwidth = $('.el-tabs__content').width() - 56;
      // console.log('boxwidth：', boxwidth);
      // let boxwidth = $('#panelBox').width() - 89;
      let inittop;
      let initleft = 15;
      let divwidth = 300;
      let left;
      let top;
      // console.log('key.type：', this[type]);
      if (type === 'querys') {
        inittop = 200;
      } else if (type === 'text') {
        inittop = 200;
      } else if (type === 'charts') {
        inittop = 200;
      } else if (type === 'list') {
        inittop = 200;
      }
      if (this[type].length > 0) {
        for (let i in this[type]) {
          if (this[type][i].type === 'keyname') {
            let mustleft = ($('#dragbox').width() - 260) / 2;
            this[type][i].position.left = mustleft;
            this[type][i].position.top = 80;
            $(`#${this[type][i].key}`).css({
              left: mustleft,
              top: 80
            })
          }
        }
      }
      if (this.formlist.length > 1) {
        let num = parseInt((boxwidth - divwidth - 30) / divwidth);
        let spacing = (boxwidth - divwidth - 30 - divwidth * num) / num;
        let preleft = (this.formlist[this.formlist.length - 2].position.left) + spacing + divwidth;
        let pretop = this.formlist[this.formlist.length - 2].position.top;
        // console.log('boxwidth - preleft', boxwidth, preleft, divwidth)
        if (this.formlist[this.formlist.length - 1].type === 'list') {
          if ((boxwidth - preleft) >= divwidth) {
            left = 15;
            top = pretop + 350;
          } else {
            left = 15;
            top = this.formlist[this.formlist.length - 2].position.top + 320;
          }
          this.formlist[this.formlist.length - 1].position.left = left;
          this.formlist[this.formlist.length - 1].position.top = top;
          $(`#${this.formlist[this.formlist.length - 1].key}`).css({
            left: left,
            top: top
          })
        } else {
          if ((boxwidth - preleft) >= divwidth) {
            if (this.formlist[this.formlist.length - 1].type !== 'list' && this.formlist[this.formlist.length - 2].type === 'list') {
              left = 15;
              top = pretop + 350;
              // console.log('1');
            } else {
              left = preleft;
              top = pretop;
              // console.log('2');
            }
          } else {
            // console.log('3');
            left = 15;
            top = this.formlist[this.formlist.length - 2].position.top + 320;
          }
          this.formlist[this.formlist.length - 1].position.left = left;
          this.formlist[this.formlist.length - 1].position.top = top;
          $(`#${this.formlist[this.formlist.length - 1].key}`).css({
            left: left,
            top: top
          })
        }
      } else if (this.formlist.length === 1) {
        this.formlist[0].position.left = initleft;
        this.formlist[0].position.top = inittop;
        $(`#${this.formlist[0].key}`).css({
          left: initleft,
          top: inittop
        })
        /* this[type][this[type].length - 1].position.left = initleft;
        this[type][this[type].length - 1].position.top = inittop;
        $(`#${this[type][this[type].length - 1].key}`).css({
          left: initleft,
          top: inittop
        }) */
      }
      // this.formlist
      if (this[type].length > 0) {
        /* for (let i in this[type]) {
          if (this[type][i].type !== 'keyname') {
            for (let j in this.formlist) {
              if (this[type][i].key === this.formlist[j].key) {
                this[type][i].position.left = this.formlist[j].position.left;
                this[type][i].position.top = this.formlist[j].position.top;
              }
            }
          }
        } */
        if (this[type][this[type].length - 1].position.type !== 'keyname') {
          for (let j in this.formlist) {
            if (this[type][this[type].length - 1].key === this.formlist[j].key) {
              this[type][this[type].length - 1].position.left = this.formlist[j].position.left;
              this[type][this[type].length - 1].position.top = this.formlist[j].position.top;
            }
          }
        }
      }
      if (top === undefined) {
        top = 150;
        this.heightlist.push(top)
      } else {
        if (!this.heightlist.includes(top)) {
          this.heightlist.push(top)
        }
      }
      let max = this.heightlist.reduce(function (a, b) {
        return b > a ? b : a;
      });
      let _tool = $('.toolbox').height();
      max = max + 250;
      if (max < _tool) {
        this.divHeight = _tool;
      } else {
        this.divHeight = max + 100;
      }
      // console.log('2', this.divHeight)
      // console.log('this.formlist:', this.formlist);
    },
    delquery(index, key) {
      for (let i in this.formlist) {
        if (this.formlist[i].key === key) {
          this.formlist.splice(i, 1);
        }
      }
      this.querys.splice(index, 1);
    },
    deltext(index, key) {
      for (let i in this.formlist) {
        if (this.formlist[i].key === key) {
          this.formlist.splice(i, 1);
        }
      }
      this.text.splice(index, 1);
    },
    delcharts(index, key) {
      for (let i in this.formlist) {
        if (this.formlist[i].key === key) {
          this.formlist.splice(i, 1);
        }
      }
      this.charts.splice(index, 1);
    },
    dellist(index, key) {
      for (let i in this.formlist) {
        if (this.formlist[i].key === key) {
          this.formlist.splice(i, 1);
        }
      }
      this.list.splice(index, 1);
    },
    changefont(item, index) {
      this.text[index].editshow = true;
    }
  },
  watch: {},
}
class Drag {
  constructor() {
    this.dragdoms = [];
    this.context = null;
    this.boxattr = {
      boxwidth: 0,
      boxheight: 0,
    };
    this.initdrag('.dragdom', {
      containment: '.dragbox',
      handle: '.content',
    });
  }
  // 初始化宽高
  initbox() {
    this.boxattr.boxwidth = $('#dragbox').width();
    // this.boxattr.boxwidth = $('#panelBox').width() - 89;
    this.boxattr.boxheight = $('#dragbox').height();
    // this.boxattr.boxheight = this.divHeight;
  }
  initdrag(classname, box) {
    // 给组件绑定事件
    this.initbox();
    let dragDom = document.querySelectorAll(classname);
    for (let item of dragDom) {
      let dragdom = new Draggabilly(item, box);
      this.dragdoms.push(dragdom);
    }
  }
  // 缩放
  dragzoom(dragid, boxid, reschart) {
    this.initbox();
    let that = this.context;
    var posix;
    var item = document.getElementById(dragid);
    var itembox = document.getElementById(boxid);
    $(item).mousedown(function (e) {
      posix = {
        'w': $(itembox).width(),
        'h': $(itembox).height(),
        'x': e.pageX,
        'y': e.pageY,
      };
      $('.dragdom').css('z-index', 4);
      $(`.${boxid}`).css('z-index', 5);
      $(itembox).addClass('activedom');
      if (item.setCapture) {
        // 捕捉焦点
        item.setCapture();
        // 设置事件
        item.onmousemove = function (ev) {
          mouseMove(ev || event)
        };
        item.onmouseup = mouseUp;
      } else {
        // 绑定事件
        $(document).bind('mousemove', mouseMove).bind('mouseup', mouseUp)
      }
      // 防止默认事件发生
      e.preventDefault()
    })
    // 移动事件
    function mouseMove(e) {
      var pagewidth = $('.dragbox').width();
      let width;
      let height
      if (reschart === 'query') {
        $(itembox).css({
          'width': (Math.min(Math.max(30, e.pageX - posix.x + posix.w), pagewidth - 10))
        })
        width = (Math.min(Math.max(30, e.pageX - posix.x + posix.w), pagewidth - 10)) + 'px';
        height = '';
      } else {
        $(itembox).css({
          'width': (Math.min(Math.max(30, e.pageX - posix.x + posix.w), pagewidth - 10)) / pagewidth * 100 + '%',
          'height': Math.max(30, e.pageY - posix.y + posix.h)
        })
        width = (Math.min(Math.max(30, e.pageX - posix.x + posix.w), pagewidth - 10)) / pagewidth * 100 + '%';
        height = Math.max(30, e.pageY - posix.y + posix.h);
      }
      let type = $(itembox).attr('type');
      let index = $(itembox).attr('dragindex');
      that.setpositiionbox(type, index, width, height);
      if (reschart !== undefined) {
      } else {
      }
    }
    // 停止事件
    function mouseUp(e) {
      // 在支持 releaseCapture 做些东东
      if (item.releaseCapture) {
        // 释放焦点
        item.releaseCapture();
        // 移除事件
        item.onmousemove = item.onmouseup = null;
      } else {
        // 卸载事件
        $(itembox).removeClass('activedom');
        $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
      }
    }
  }
  upindex(allclassname, clickdom) {
    $(allclassname).css('z-index', 4);
    $(clickdom).css('z-index', 5);
  }
  pointerdown(e, pointer, element) {
    $(element).addClass('activedom');
  }
  dragstart(e, pointer, element) {
    this.upindex('.dragdom', element);
    $(element).children('.numbershowbox').css({ display: 'block' });
  }
  windowReSize() {
    this.initbox();
  }
  Calculatepositionpercentage(dom) {
    $(dom).css({
      // 'left': (($(dom).position().left) * 100 / (this.boxattr.boxwidth)) + '%',
      'left': $(dom).position().left,
      // 'top': (($(dom).position().top) * 100 / (this.boxattr.boxheight)) + '%',
      'top': $(dom).position().top,
    });
    $(dom).removeClass('activedom');
  }
  dragmove(e, pointer, moveVector, element) {
    this.context.showposition(pointer.pageX, pointer.pageY);
  }
  dragend(e, pointer, element) {
    $(element).children('.numbershowbox').css({ display: 'none' });
    let type = $(element).attr('type');
    let index = $(element).attr('dragindex');
    this.initbox();
    // let left = (($(element).position().left) * 100 / (this.boxattr.boxwidth)) + '%';
    let left = $(element).position().left;
    // let top = (($(element).position().top) * 100 / (this.boxattr.boxheight)) + '%';
    let top = $(element).position().top;
    this.Calculatepositionpercentage(element);
    this.context.setpositiondata(type, index, left, top);
    let maxheight = $('#dragbox').height();
    let minheight = $('#dragbox').height() - 350;
    if (top <= maxheight && top >= minheight) {
      document.getElementById('dragbox').style.height = $('#dragbox').height() + 100 + 'px';
    }
    // document.getElementById('dragbox').style.height = $('#dragbox').height() + 100 + 'px';
  }
  listenevent(that) {
    this.context = that;
    for (let item of this.dragdoms) {
      let $element = item.element;
      item.on('dragStart', (event, pointer) => {
        this.dragstart(event, pointer, $element);
      });
      item.on('dragMove', (event, pointer, moveVector) => {
        this.dragmove(event, pointer, moveVector, $element);
      });
      item.on('dragEnd', (event, pointer) => {
        this.dragend(event, pointer, $element);
      });
      item.on('pointerDown', (event, pointer) => {
        this.pointerdown(event, pointer, $element);
      })
    }
  }
}
</script>
