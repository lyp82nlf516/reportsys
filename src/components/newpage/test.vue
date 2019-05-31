<template>
  <div class="commonData" id="commonData">
    <div class="common-group1">
      <div class="_title">用户规模和质量</div>
      <div class="bd">
        <div class="item" v-for="(item, index) in userlist" :key="index">
          <div class="time-content-container">
            <div class="time-topbar">
              <div class="time-title">
                <div class="title nav">{{item.title}}</div>
                <div class="range">{{item.dayago}}<span>~</span>{{item.nowTime}} | 本周</div>
              </div>
              <div class="pull-right time-setting"></div>
            </div>
            <div class="time-chart-container container">
              <div class="only">
                <div class="dashboard-number-container number-type2">
                  <div class="inner">
                    <div class="main-number-content">
                      <div>今日</div>
                      <div class="number-content clearfix">
                        <span class="number">{{item.number}}</span>
                        <span class="measuresUnit">次</span>
                        <div class="mom-yoy-content">
                          <div class="MOM-content">
                            <div>
                              <span class="measuresUnit">环比</span>
                              <span class="kpi-drop">
                                <span class="icon-falling"></span>
                                <span>{{item.rang1}}</span>
                              </span>
                            </div>
                          </div>
                          <div>
                            <span class="measuresUnit">同比</span>
                            <span class="kpi-drop">
                              <span class="icon-falling"></span>
                              <span>{{item.rang2}}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="common-group2">
      <div class="group" v-for="(item, index) in ratelist" :key="index">
        <div class="time-content-container">
          <div class="time-topbar">
            <div class="time-title">
              <div class="title nav">{{item.title}}</div>
              <div class="range">{{item.dayago}}<span>~</span>{{item.nowTime}} | {{item._smtit}}</div>
            </div>
            <div class="pull-right time-setting"></div>
          </div>
          <div class="time-chart-container container">
            <div class="only">
              <div class="dashboard-number-container number-type2">
                <div class="inner">
                  <div class="main-number-content">
                    <div class="number-content clearfix">
                      <div>今日</div>
                      <span class="number">{{item.rate}}</span>
                      <span class="measuresUnit">%</span>
                      <div class="mom-yoy-content">
                        <div class="MOM-content">
                          <div>
                            <span class="measuresUnit">环比</span>
                            <span class="kpi-drop">
                              <span class="icon-falling"></span>
                              <span>{{item.rang1}}</span>
                            </span>
                          </div>
                        </div>
                        <div>
                          <span class="measuresUnit">同比</span>
                          <span class="kpi-drop">
                            <span class="icon-falling"></span>
                            <span>{{item.rang2}}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="second-number-content">
                      <div>
                        <span>合计</span>
                        <span class="number">{{item.total}}</span>
                        <span class="measuresUnit">%</span>
                      </div>
                      <div>
                        <span>均值</span>
                        <span class="number">{{item.meanval}}</span>
                        <span class="measuresUnit">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="time-chart-container container">
            <chart ref="chart2" :options='item.options' :autoResize="true" style="width: 100%;height:200px;"></chart>
          </div>
        </div>
      </div>
    </div>
    <div class="common-group1">
      <div class="_title">整体指标</div>
      <div class="bd">
        <div class="item" v-for="(item, index) in overall" :key="index">
          <div class="time-content-container">
            <div class="time-topbar">
              <div class="time-title">
                <div class="title nav">{{item.title}}</div>
                <div class="range">{{item.dayago}}<span>~</span>{{item.nowTime}} | 本月</div>
              </div>
              <div class="pull-right time-setting"></div>
            </div>
            <div class="time-chart-container container">
              <div class="only">
                <div class="dashboard-number-container number-type2">
                  <div class="inner">
                    <div class="main-number-content">
                      <div>本月</div>
                      <div class="number-content clearfix">
                        <span class="number">{{item.number}}</span>
                        <span class="measuresUnit">次</span>
                        <div class="mom-yoy-content">
                          <div class="MOM-content">
                            <div>
                              <span class="measuresUnit">环比</span>
                              <span class="kpi-drop">
                                <span class="icon-falling"></span>
                                <span>{{item.rang1}}</span>
                              </span>
                            </div>
                          </div>
                          <div>
                            <span class="measuresUnit">同比</span>
                            <span class="kpi-drop">
                              <span class="icon-falling"></span>
                              <span>{{item.rang2}}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="common-group2">
      <div class="group" v-for="(item, index) in peoplelist" :key="index">
        <div class="time-content-container">
          <div class="time-topbar">
            <div class="time-title">
              <div class="title nav">{{item.title}}</div>
              <div class="range"></div>
            </div>
            <div class="pull-right time-setting"></div>
          </div>
          <div class="time-chart-container container">
            <div class="only _onlyNum">
              <div class="dashboard-number-container">
                <div class="inner">
                  <div class="user-analytics-content">
                    <span>{{item.num}}</span>
                    <span>人</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="common-group1">
      <div class="_title">订单转化</div>
      <div class="bd">
        <div class="item" v-for="(item, index) in orderlist" :key="index">
          <div class="time-content-container">
            <div class="time-topbar">
              <div class="time-title">
                <div class="title nav">{{item.title}}</div>
                <div class="range">{{item.dayago}}<span>~</span>{{item.nowTime}} | 今日</div>
              </div>
              <div class="pull-right time-setting"></div>
            </div>
            <div class="time-chart-container container">
              <div class="only">
                <div class="dashboard-number-container number-type2">
                  <div class="inner">
                    <div class="main-number-content">
                      <div>今日</div>
                      <div class="number-content clearfix">
                        <span class="number">{{item.number}}</span>
                        <span class="measuresUnit">{{item.unit}}</span>
                        <div class="mom-yoy-content">
                          <div class="MOM-content">
                            <div>
                              <span class="measuresUnit">环比</span>
                              <span class="kpi-drop">
                                <span class="icon-falling"></span>
                                <span>{{item.rang1}}</span>
                              </span>
                            </div>
                          </div>
                          <div>
                            <span class="measuresUnit">同比</span>
                            <span class="kpi-drop">
                              <span class="icon-falling"></span>
                              <span>{{item.rang2}}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="common-group3">
      <div class="list">
        <div class="time-content-container">
          <div class="time-topbar">
            <div class="time-title">
              <div class="title nav">GMV近30天变化趋势</div>
              <div class="range">2019-05-20<span>~</span>2019-05-26 | 过去 7 天</div>
            </div>
          </div>
          <div class="time-chart-container container">
            <div class="customer-md-2">
              <div class="dashboard-number-container number-type4">
                <div class="inner">
                  <div class="main-number-content">
                    <div>
                      <div>5-26(日)</div>
                      <div class="number-content clearfix">
                        <span class="number">309.28</span>
                        <span class="measuresUnit">万</span>
                        <div class="mom-yoy-content">
                          <div class="MOM-content">
                            <div>
                              <span class="measuresUnit">环比</span>
                              <span class="kpi-drop">
                                <span class="icon-falling"></span>
                                <span>7.38%</span>
                              </span>
                            </div>
                          </div>
                          <div>
                            <div>
                              <span class="measuresUnit">同比</span>
                              <span class="kpi-drop">
                                <span class="icon-falling"></span>
                                <span>5.07%</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="second-number-content">
                    <div>
                      <span>合计</span>
                      <span class="number">2.19</span>
                      <span class="measuresUnit">千万</span>
                    </div>
                    <div>
                      <span>均值</span>
                      <span class="number">312.53</span>
                      <span class="measuresUnit">万</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="customer-md-10">
              <chart :options='options3' :autoResize="true" style="width: 100%;height:300px;"></chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: #F7F9FA;
}
#commonData {
  width: calc(100% - 20px);
  // height: calc(100% - 20px);
  padding: 10px;
  .common-group1 {
    width: 100%;
    ._title {
      color: #475669;
      font-size: 20px;
      font-weight: 700;
      line-height: 36px;
      padding: 0 6px;
      outline: 0;
      max-width: 300px;
      overflow-x: auto;
      white-space: nowrap;
      margin: 20px 23px 10px 0;
    }
    .bd {
      overflow: auto;
      .item {
        float: left;
        width: 25%;
        padding: 10px;
        box-sizing: border-box;
        .time-content-container:hover {
          border: 2px solid #3AD1C5;
        }
        .time-content-container {
          background: #FFF;
          box-shadow: 0 2px 11px 0 rgba(190,202,218,.17);
          border: 2px #FFF solid;
          border-radius: 3px;
          padding: 14px 20px;
          height: 100%;
          .time-topbar {
            cursor: move;
            width: 100%;
            .time-title {
              display: inline-block;
              max-width: calc(100% - 20px);
              .title {
                color: #5F6E82;
                font-weight: 400;
                font-size: 14px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              .nav {
                cursor: pointer;
              }
              .range {
                font-size: 12px;
                color: #8492A6;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .pull-right {
              float: right;
            }
          }
          .dashboard-number-container {
            font-weight: 400;
            margin-top: 8px;
            position: relative;
            color: #8492A6;
            font-size: 13px;
            .inner {
              width: 100%;
              .number-content {
                overflow: auto;
                .number {
                  font-size: 40px;
                  float: left;
                  color: #475669;
                  max-width: calc(100% - 30px);
                  display: inline-block;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .number + .measuresUnit {
                  float: left;
                  margin-top: 30px;
                }
                .mom-yoy-content {
                  float: left;
                  display: inline-block;
                  margin: -5px 0 0;
                  width: 100%;
                  .kpi-drop {
                    font-size: 12px;
                    position: relative;
                    padding-left: 8px;
                  }
                  .MOM-content {
                    display: inline-block;
                    margin: 0 5px 0 0;
                  }
                  .icon-falling {
                    background: url('../../assets/img/index/triange.png') no-repeat left center;
                    background-size: 12px;
                    vertical-align: middle;
                    width: 12px;
                    height: 12px;
                    display: inline-block;
                  }
                  .kpi-drop {
                    padding-left: 0;
                  }
                  div {
                    display: inline-block;
                  }
                }
              }
            }
            .kpi-drop {
              color: #FC6772;
            }
            .measuresUnit {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .common-group2 {
    width: 100%;
    overflow: auto;
    .group {
      padding: 10px;
      float: left;
      width: 50%;
      box-sizing: border-box;
      .time-content-container:hover {
        border: 2px solid #3AD1C5;
      }
      .time-content-container {
        background: #FFF;
        box-shadow: 0 2px 11px 0 rgba(190,202,218,.17);
        border: 2px #FFF solid;
        border-radius: 3px;
        padding: 14px 20px;
        height: 100%;
        .time-topbar {
          cursor: move;
          width: 100%;
          .time-title {
            display: inline-block;
            max-width: calc(100% - 20px);
            .title {
              color: #5F6E82;
              font-weight: 400;
              font-size: 14px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            .nav {
              cursor: pointer;
            }
            .range {
              font-size: 12px;
              color: #8492A6;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .pull-right {
            float: right;
          }
        }
        .dashboard-number-container {
          font-weight: 400;
          margin-top: 8px;
          position: relative;
          color: #8492A6;
          font-size: 13px;
          .main-number-content {
            overflow: auto;
            box-sizing: border-box;
          }
          .inner {
            width: 100%;
            overflow: auto;
            .number-content {
              overflow: auto;
              width: 67%;
              float: left;
              .number {
                font-size: 40px;
                float: left;
                color: #475669;
                max-width: calc(100% - 30px);
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .number + .measuresUnit {
                float: left;
                margin-top: 30px;
              }
              .mom-yoy-content {
                float: left;
                display: inline-block;
                margin: -5px 0 0;
                margin-left: 10px;
                margin-top: 7px;
                .kpi-drop {
                  font-size: 12px;
                  position: relative;
                  padding-left: 8px;
                }
                .MOM-content {
                  margin-bottom: 3px;
                }
                .icon-falling {
                  background: url('../../assets/img/index/triange2.png') no-repeat left center;
                  background-size: 12px;
                  vertical-align: middle;
                  color: #2DCA93;
                  width: 12px;
                  height: 12px;
                  display: inline-block;
                }
                .kpi-drop {
                  padding-left: 0;
                }
              }
            }
            .second-number-content {
              width: 33%;
              float: left;
              padding: 12px 0 12px 11px;
              border-left: 1px solid #E9F0F7;
              box-sizing: border-box;
              div span:nth-of-type(1) {
                font-size: 12px;
              }
              .number {
                color: #475669;
                font-size: 18px;
              }
              .measuresUnit {
                font-weight: 300;
                font-size: 12px;
              }
            }
          }
          .kpi-drop {
            color: #2DCA93;
          }
          .measuresUnit {
            font-size: 12px;
          }
        }
      }
    }
  }
  ._onlyNum {
    height: 275px;
    .user-analytics-content {
      margin-top: 97px;
      color: #475669;
      font-size: 40px;
      text-align: center;
    }
  }
  .common-group3 {
    width: 100%;
    overflow: auto;
    .list {
      float: left;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    .time-content-container {
      background: #FFF;
      box-shadow: 0 2px 11px 0 rgba(190,202,218,.17);
      border: 2px #FFF solid;
      border-radius: 3px;
      padding: 14px 20px;
      height: 100%;
      .time-topbar {
        width: 100%;
        .time-title {
          display: inline-block;
          max-width: calc(100% - 30px);
          .title {
            color: #5F6E82;
            font-weight: 400;
            font-size: 14px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
          }
          .range {
            font-size: 12px;
            color: #8492A6;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .time-chart-container {
        width: 100%;
        padding-left: 0;
        padding-right: 0;
        overflow: auto;
        .customer-md-2 {
          float: left;
          width: 20%;
          .dashboard-number-container {
            font-weight: 400;
            margin-top: 8px;
            position: relative;
            color: #8492A6;
            font-size: 13px;
            .kpi-drop {
              color: #FC6772;
              font-size: 12px;
              position: relative;
              padding-left: 8px;
              .icon-falling {
                background: url('../../assets/img/index/triange.png') no-repeat left center;
                background-size: 12px;
                vertical-align: middle;
                width: 12px;
                height: 12px;
                display: inline-block;
              }
            }
            .mom-yoy-content {
              float: left;
              display: inline-block;
              margin-left: 10px;
              .MOM-content {
                margin-bottom: 3px;
              }
              div {
                div {
                  display: inline-block;
                }
              }
            }
            .inner {
              width: 100%;
            }
            .number-content {
              width: 100%;
              margin-top: -3px;
              .number+.measuresUnit {
                float: left;
                margin-top: 30px;
              }
            }
            .number {
              font-size: 18px;
              color: #475669;
            }
            .measuresUnit {
              font-size: 12px;
            }
          }
          .number-type4 {
            width: 100%;
            .number-content {
              span.number {
                max-width: calc(100% - 30px);
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .number {
                font-size: 40px;
                float: left;
              }
            }
            .mom-yoy-content {
              margin: 0;
              width: 100%;
            }
            .second-number-content {
              float: left;
              border: 0;
              border-top: 1px solid #E9F0F7;
              padding: 28px 0 0;
              margin-top: 28px;
              div span:nth-of-type(1) {
                font-size: 12px;
              }
              .measuresUnit {
                font-weight: 300;
              }
            }
          }
        }
        .customer-md-10 {
          float: left;
          width: 80%;
        }
      }
    }
  }
}
</style>

<script>
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
export default {
  data() {
    return {
      userlist: [
        {
          title: 'PV',
          number: 545,
          dayago: '',
          nowTime: '',
          rang1: '69.19%',
          rang2: '76.34%'
        },
        {
          title: 'UV',
          number: 542,
          dayago: '',
          nowTime: '',
          rang1: '68.83%',
          rang2: '67.7%'
        },
        {
          title: '新增线索量',
          number: 981,
          dayago: '',
          nowTime: '',
          rang1: '69.38%',
          rang2: '67.99%'
        },
        {
          title: '新增付费用户数',
          number: '1,039',
          dayago: '',
          nowTime: '',
          rang1: '69.22%',
          rang2: '69.8%'
        },
      ],
      ratelist: [
        {
          title: '新用户占比',
          _smtit: '本周',
          rate: '73.62',
          dayago: '',
          nowTime: '',
          rang1: '4.25',
          rang2: '4.34',
          total: '69.99',
          meanval: '70.49',
          options: {
            title: {
              text: '新用户占比',
              textStyle: {
                color: '#999',
                fontSize: 15,
                fontWeight: 'normal'
              },
              x: 'center',
              y: '180'
            },
            tooltip: {
              show: true,
              trigger: 'axis',
              formatter: '{b0}<br/>{a0}: {c0}%<br />'
            },
            legend: {
              data: ['新用户占比', '新用户占比', '新用户占比', '新用户占比']
            },
            grid: {
              left: '35',
              top: '30',
              bottom: '40'
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            calculable: true,
            xAxis: {
              type: 'category',
              boundaryGap: true,
              // offset: 10,
              data: ['5-20', '5-21', '5-22', '5-23', '5-24'],
              axisLine: {
                lineStyle: {
                  color: '#cdced0'
                }
              }
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}%'
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#cdced0'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed'
                }
              },
              min: '68'
            },
            series: [
              {
                name: '新用户占比',
                type: 'line',
                data: [70.63, 68.01, 69.56, 70.62, 73.62],
                itemStyle: {
                  color: '#27dec2'
                },
              },
            ]
          }
        },
        {
          title: '落地页跳出率',
          _smtit: '过去7天',
          rate: '100',
          dayago: '',
          nowTime: '',
          rang1: '0.06',
          rang2: '1.39',
          total: '99.61',
          meanval: '99.6',
          options: {
            title: {
              text: '落地页跳出率',
              textStyle: {
                color: '#999',
                fontSize: 15,
                fontWeight: 'normal'
              },
              x: 'center',
              y: '180'
            },
            tooltip: {
              trigger: 'axis',
              formatter: '{b0}<br/>{a0}: {c0}%<br />'
            },
            legend: {
              data: ['落地页跳出率', '落地页跳出率', '落地页跳出率', '落地页跳出率']
            },
            grid: {
              left: '50',
              top: '30',
              bottom: '40'
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            calculable: true,
            xAxis: {
              type: 'category',
              boundaryGap: true,
              // offset: 10,
              data: ['5-17', '5-18', '5-19', '5-20', '5-21', '5-22', '5-23'],
              axisLine: {
                lineStyle: {
                  color: '#cdced0'
                }
              }
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}%'
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#cdced0'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed'
                }
              },
              min: '98.4'
            },
            series: [
              {
                name: '落地页跳出率',
                type: 'line',
                data: [98.53, 98.84, 99.94, 99.94, 100, 99.94, 100],
                itemStyle: {
                  color: '#27dec2'
                },
              },
            ]
          }
        },
      ],
      overall: [
        {
          title: '月度新签客户数',
          number: '2.856',
          dayago: '',
          nowTime: '',
          rang1: '0.19%',
          rang2: '0.34%'
        },
        {
          title: '月流失客户数',
          number: '2.856',
          dayago: '',
          nowTime: '',
          rang1: '0.83%',
          rang2: '0.7%'
        },
        {
          title: '月续费客户数',
          number: '2.856',
          dayago: '',
          nowTime: '',
          rang1: '0.38%',
          rang2: '0.99%'
        },
        {
          title: '活跃客户数',
          number: '2.856',
          dayago: '',
          nowTime: '',
          rang1: '0.22%',
          rang2: '0.8%'
        },
      ],
      peoplelist: [
        {
          title: '当前总客户数',
          num: '97,011'
        },
        {
          title: '历史累计客户数',
          num: '142,106'
        }
      ],
      orderlist: [
        {
          title: 'GMV',
          number: '107.63',
          unit: '万',
          dayago: '',
          nowTime: '',
          rang1: '69.19%',
          rang2: '76.34%'
        },
        {
          title: '订单量',
          number: 417,
          unit: '次',
          dayago: '',
          nowTime: '',
          rang1: '68.83%',
          rang2: '67.7%'
        },
        {
          title: '下单人数',
          number: 416,
          unit: '人',
          dayago: '',
          nowTime: '',
          rang1: '69.38%',
          rang2: '67.99%'
        },
        {
          title: '客单价',
          number: '2,587',
          unit: '',
          dayago: '',
          nowTime: '',
          rang1: '69.22%',
          rang2: '69.8%'
        },
      ],
      options3: {
        title: {
          text: '支付订单的实际支付金额的总和',
          textStyle: {
            color: '#999',
            fontSize: 15,
            fontWeight: 'normal'
          },
          x: 'center',
          y: '275'
        },
        tooltip: {
          trigger: 'item',
          formatter: function(data) {
            return data.name + '<br/>' + data.seriesName + ' : ' + ((data.value * 10000).toFixed(0) || 0).toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
          }
        },
        legend: {
          data: ['支付订单的实际支付金额的总和', '支付订单的实际支付金额的总和', '支付订单的实际支付金额的总和', '支付订单的实际支付金额的总和']
        },
        grid: {
          left: '90',
          top: '30',
          bottom: '50'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: {
          type: 'category',
          boundaryGap: true,
          // offset: 10,
          data: ['5-20', '5-21', '5-22', '5-23', '5-24', '5-25', '5-26'],
          axisLine: {
            lineStyle: {
              color: '#cdced0'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            // formatter: '{b0}<br/>{a0}: {c0}%<br />'
            formatter: '{value}万'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#cdced0'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          min: '290',
        },
        series: [
          {
            name: '支付订单的实际支付金额的总和',
            type: 'line',
            data: [311.5952, 309.4964, 320.6599, 308.2700, 294.5436, 333.9166, 309.2885],
            itemStyle: {
              color: '#27dec2'
            },
          },
        ]
      },
    }
  },
  created() {},
  computed: {},
  mounted() {
    for (let i in this.userlist) {
      this.userlist[i].dayago = this.getBeforeDate(4);
      this.userlist[i].nowTime = this.getBeforeDate(0);
    }
    for (let i in this.ratelist) {
      this.ratelist[i].dayago = this.getBeforeDate(4);
      this.ratelist[i].nowTime = this.getBeforeDate(0);
    }
    for (let i in this.overall) {
      this.overall[i].dayago = this.getBeforeDate(new Date().getDate() - 1);
      this.overall[i].nowTime = this.getBeforeDate(0);
    }
    for (let i in this.orderlist) {
      this.orderlist[i].dayago = this.getBeforeDate(0);
      this.orderlist[i].nowTime = this.getBeforeDate(0);
    }
  },
  components: {},
  methods: {
    getBeforeDate(n) {
      let d = new Date();
      let year = d.getFullYear();
      let mon = d.getMonth() + 1;
      let day = d.getDate();
      if (day <= n) {
        if (mon > 1) {
          mon = mon - 1;
        } else {
          year = year - 1;
          mon = 12;
        }
      }
      d.setDate(d.getDate() - n);
      year = d.getFullYear();
      mon = d.getMonth() + 1;
      day = d.getDate();
      let s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day);
      return s;
    }
  }
}
</script>
