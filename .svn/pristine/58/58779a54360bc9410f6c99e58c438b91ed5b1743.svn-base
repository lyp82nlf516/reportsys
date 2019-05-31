<template>
  <div id="chartVisual">
    <div class="chartLeft">
      <div class="item iteml">
        <chart
          ref="chart1"
          :options="options"
          :autoResize="true"
          style="width: 100%;height:164px;"
        ></chart>
      </div>
      <div class="item iteml">
        <chart
          ref="chart2"
          :options="options2"
          :autoResize="true"
          style="width: 100%;height:160px;"
        ></chart>
      </div>
      <div class="item">
        <chart
          ref="chart3"
          :options="options3"
          :autoResize="true"
          style="width: 100%;height:165px;"
        ></chart>
      </div>
    </div>
    <div class="chartCenter">
      <div
        class="item iteml"
        style="width: 100%;height:335px;"
      >
        <chart
          :options="options8"
          :autoResize="true"
          style="width: 100%;height:335px;"
        ></chart>
      </div>
      <div class="item">
        <div class="list list_l">
          <chart
            :options="options4"
            :autoResize="true"
            style="width: 100%;height:165px;"
          ></chart>
        </div>
        <div class="list">
          <chart
            :options="options10"
            :autoResize="true"
            style="width: 100%;height:165px;"
          ></chart>
        </div>
      </div>
    </div>
    <div class="chartRight">
      <div class="item iteml">
        <chart
          ref="chart7"
          :options="options7"
          :autoResize="true"
          style="width: 100%;height:165px;"
        ></chart>
      </div>
      <div class="item iteml">
        <chart
          ref="chart2"
          :options="options9"
          :autoResize="true"
          style="width: 100%;height:160px;"
        ></chart>
      </div>
      <div class="item">
        <chart
          ref="chart3"
          :options="options6"
          :autoResize="true"
          style="width: 100%;height:165px;"
        ></chart>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#chartVisual {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  overflow: auto;
  padding: 10px;
  background: rgb(244, 249, 255);
  .item {
    width: 100%;
    height: 100%;
  }
  .chartLeft,
  .chartCenter,
  .chartRight {
    float: left;
  }
  .chartLeft {
    width: 289px;
  }
  .chartRight {
    width: 300px;
  }
  .chartCenter {
    width: calc(100% - 609px);
    margin: 0 10px;
    .item {
      width: 100%;
      background: #fff;
      height: 100%;
    }
    .list {
      float: left;
      width: 50%;
      height: 100%;
      background: #fff;
    }
    .list_l {
      margin-right: 10px;
      width: calc(50% - 10px);
      background: #fff;
    }
  }
  .chartLeft .item {
    background: #fff;
  }
  .chartLeft .iteml {
    margin-bottom: 10px;
  }
  .chartCenter .item {
    background: #fff;
  }
  .chartRight .item {
    background: #fff;
  }
  .chartCenter .iteml {
    margin-bottom: 10px;
  }
  .chartRight .iteml {
    margin-bottom: 10px;
  }
}
</style>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/polar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/funnel';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/chart/map';
import 'echarts/lib/coord/geo/geoCreator.js';
export default {
  data() {
    return {
      options: {
        grid: {
          left: '60',
          top: '30',
          bottom: '20',
          borderWidth: 1
        },
        title: {
          text: '北京买卖销售数据',
          textStyle: {
            color: '#999',
            fontSize: 15,
            fontWeight: 'normal'
          },
          left: 'center'
        },
        tooltip: {
          // trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        legend: {
          data: ['价值业务', '其它业务']
        },
        xAxis: {
          type: 'category',
          data: ['2015', '2016', '2017', '2018'],
          axisLine: {
            lineStyle: {
              color: '#cdced0'
            }
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#cdced0'
              }
            },
            axisLabel: {
              color: '#7a7476'
            },
            axisTick: {
              show: false
            },
            max: 800
          }
        ],
        series: [
          {
            name: '其它业务',
            data: [280, 280, 340, 310],
            type: 'bar',
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            },
            itemStyle: {
              color: '#67a0ff'
            }
          },
          {
            name: '价值业务',
            data: [600, 660, 610, 700],
            type: 'bar',
            legendHoverLink: true,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            itemStyle: {
              color: '#27dec2'
            },
            markLine: {
              itemStyle: {
                color: '#27dec2',
                borderType: 'dashed',
                opacity: '.7',
                normal: {
                  lineStyle: {
                    type: 'dashed',
                    color: '#000'
                  }
                }
              },
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      },
      options2: {
        title: {
          text: '北京租赁数据',
          textStyle: {
            color: '#999',
            fontSize: 15,
            fontWeight: 'normal'
          },
          left: 'center'
        },
        tooltip: {
          // trigger: 'axis',
        },
        legend: {
          data: ['产品A', '产品B', '产品C']
        },
        grid: {
          left: '60',
          top: '30',
          bottom: '20'
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
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
            axisLine: {
              lineStyle: {
                color: '#cdced0'
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#cdced0'
              }
            },
            axisLabel: {
              color: '#7a7476'
            },
            axisTick: {
              show: false
            },
            max: 600
          }
        ],
        series: [
          {
            name: '产品A',
            type: 'line',
            data: [198, 175, 280, 175, 256, 145, 230],
            itemStyle: {
              color: '#00e4c3',
              lineStyle: {
                width: 3,
                type: 'dotted',
                color: '#00e4c3'
              },
              emphasis: {
                color: '#00e4c3',
                lineStyle: {
                  width: 3,
                  type: 'dotted',
                  color: '#00e4c3'
                }
              }
            },
            symbolSize: 5
          },
          {
            name: '产品B',
            type: 'line',
            data: [290, 230, 390, 287, 342, 365, 376],
            itemStyle: {
              color: '#58b1ff',
              lineStyle: {
                width: 3,
                type: 'solid',
                color: '#0180ff'
              },
              emphasis: {
                color: '#0180ff',
                lineStyle: {
                  width: 3,
                  type: 'dotted',
                  color: '#0180ff'
                }
              }
              // width: 12,
              // type: 'dotted'
            },
            symbolSize: 5
          },
          {
            name: '产品C',
            type: 'line',
            data: [410, 300, 485, 378, 464, 476, 432],
            itemStyle: {
              color: '#fdd178',
              lineStyle: {
                width: 3,
                type: 'solid',
                color: '#fdd178'
              },
              emphasis: {
                color: '#fdd178',
                lineStyle: {
                  width: 3,
                  type: 'dotted',
                  color: '#fdd178'
                }
              }
            },
            symbolSize: 5
          }
        ]
      },
      options3: {
        title: {
          text: '上海租赁数据',
          textStyle: {
            color: '#999',
            fontSize: 15,
            fontWeight: 'normal'
          },
          left: 'center'
        },
        tooltip: {
          // trigger: 'axis'
        },
        legend: {
          data: ['意向', '预购', '成交']
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
        grid: {
          left: '60',
          top: '30',
          bottom: '20',
          borderWidth: 1
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLine: {
              lineStyle: {
                color: '#cdced0'
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            boundaryGap: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#cdced0'
              }
            },
            axisLabel: {
              color: '#7a7476'
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '热销产品1',
            type: 'line',
            smooth: true,
            data: [35, 67, 97, 45, 66, 53, 43, 67, 99, 54, 88, 52],
            itemStyle: {
              normal: {
                color: new ECharts.graphic.LinearGradient(
                  0, 0, 0, 1, [{
                    offset: 0,
                    color: '#5aabfd'
                  },
                  {
                    offset: 0.5,
                    color: '#5aabfd'
                  },
                  {
                    offset: 1,
                    color: '#5aabfd'
                  }
                  ]
                )
              }
            }
          },
          {
            name: '热销产品2',
            type: 'line',
            smooth: true,
            data: [350, 476, 356, 278, 432, 376, 353, 477, 387, 276, 476, 276],
            itemStyle: {
              normal: {
                areaStyle: { type: 'default' },
                color: new ECharts.graphic.LinearGradient(
                  0, 0, 0, 1, [{
                    offset: 0,
                    color: '#40e1c5'
                  },
                  {
                    offset: 0.5,
                    color: '#40e1c5'
                  },
                  {
                    offset: 1,
                    color: '#fff'
                  }
                  ]
                )
              },
              emphasis: {
                color: new ECharts.graphic.LinearGradient(
                  0, 0, 0, 1, [{
                    offset: 0,
                    color: '#40e1c5'
                  },
                  {
                    offset: 0.7,
                    color: '#40e1c5'
                  },
                  {
                    offset: 1,
                    color: '#40e1c5'
                  }
                  ]
                )
              }
            }
          }
        ]
      },
      options4: {
        title: {
          text: '各城市房源所占比例',
          textStyle: {
            color: '#999',
            fontSize: 15,
            fontWeight: 'normal'
          },
          left: 'center'
        },
        grid: {
          left: '60',
          top: '60',
          bottom: '20',
          borderWidth: 1
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {d}%'
          // formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          // x: 'left',
          data: ['产品A', '产品B', '产品C']
        },
        series: [
          {
            name: '11',
            type: 'pie',
            radius: ['40%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inner',
                formatter: '{d}%'
              },
            },
            data: [
              { value: 60, name: '产品C' },
              { value: 24, name: '产品A' },
              { value: 16, name: '产品B' }
            ],
            color: ['#24dec9', '#ffdb60', '#5ba9fc']
          }
        ]
      },
      options5: {
        grid: {
          left: '60',
          top: '20',
          bottom: '40',
          borderWidth: 1
        },
        title: {
          text: '北京买卖销售数据',
          textStyle: {
            color: '#999',
            fontSize: 15,
            fontWeight: 'normal'
          },
          left: 'center'
        },
        tooltip: {
          show: true,
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['35%', 200],
            radius: 80,
            itemStyle: {
              normal: {
                label: {
                  color: '#ffb980',
                  position: 'inner',
                  formatter: function (params) {
                    return (params.percent - 0).toFixed(0) + '%'
                  }
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  color: '#d87a80',
                  show: true,
                  formatter: '{b}\n{d}%'
                }
              }
            },
            data: [
              { value: 335, name: '直达' },
              { value: 679, name: '营销广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            center: ['35%', 200],
            radius: [110, 140],
            data: [
              { value: 335, name: '直达' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              {
                value: 1048,
                name: '百度',
                itemStyle: {
                  normal: {
                    color: new ECharts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        { offset: 0, color: '#2ec7c9' },
                        { offset: 0.5, color: '#e5cf0d' },
                        { offset: 1, color: '#ff0000' }
                      ]
                    ),
                    /* color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStop: [
                        {offset: 0, color: '#2ec7c9'},
                        {offset: 0.5, color: '#ff0000'},
                        {offset: 1, color: '#e5cf0d'}
                      ],
                      globalCoord: true
                    }, */
                    label: {
                      textStyle: {
                        color: 'rgba(30,144,255,0.8)',
                        align: 'center',
                        baseline: 'middle',
                        fontFamily: '微软雅黑',
                        fontSize: 30,
                        fontWeight: 'bolder'
                      }
                    },
                    labelLine: {
                      length: 40,
                      lineStyle: {
                        color: '#f0f',
                        width: 3,
                        type: 'dotted'
                      }
                    }
                  }
                }
              },
              { value: 251, name: '谷歌' },
              {
                value: 102,
                name: '必应',
                itemStyle: {
                  normal: {
                    color: '#ffb980',
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    label: {
                      show: true
                    },
                    labelLine: {
                      show: true,
                      length: 50
                    }
                  }
                }
              },
              { value: 147, name: '其他' }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            clockWise: true,
            startAngle: 135,
            center: ['75%', 200],
            radius: [80, 120],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  color: '#2ec7c9',
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                color: new ECharts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#2ec7c9' },
                    { offset: 0.5, color: '#e5cf0d' },
                    { offset: 1, color: '#ff0000' }
                  ]
                ),
                label: {
                  show: true,
                  position: 'center',
                  formatter: '{d}%',
                  textStyle: {
                    color: 'red',
                    fontSize: '30',
                    fontFamily: '微软雅黑',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: [
              { value: 335, name: '直达' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            markPoint: {
              symbol: 'star',
              data: [
                { name: '最大', value: 1548, x: '80%', y: 50, symbolSize: 32 }
              ]
            }
          }
        ]
      },
      options6: {
        title: {
          text: '北京租赁数据',
          textStyle: {
            color: '#999',
            fontSize: 15,
            fontWeight: 'normal'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '60',
          top: '30',
          bottom: '20',
          borderWidth: 1
        },
        legend: {
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
        xAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#cdced0'
              }
            },
            axisLabel: {
              show: true
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLine: {
              show: false,
              lineStyle: {
                color: '#cdced0'
              }
            },
            axisLabel: {
              color: '#7a7476'
            },
            axisTick: {
              show: false
            },
          },
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              emphasis: {
                barBorderRadius: 4
              },
              normal: {
                color: '#2ec7c9',
                barBorderRadius: 4,
                label: { show: false, position: 'insideRight' }
              }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              emphasis: {
                barBorderRadius: 4
              },
              normal: {
                color: '#b6a2de',
                barBorderRadius: 4,
                label: { show: false, position: 'insideRight' }
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              emphasis: {
                barBorderRadius: 4
              },
              normal: {
                color: '#5ab1ef',
                barBorderRadius: 4,
                label: { show: false, position: 'insideRight' }
              }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              emphasis: {
                barBorderRadius: 4
              },
              normal: {
                color: '#ffb980',
                barBorderRadius: 4,
                label: { show: false, position: 'insideRight' }
              }
            },
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              emphasis: {
                barBorderRadius: 4
              },
              normal: {
                color: '#d87a80',
                barBorderRadius: 4,
                label: { show: false, position: 'insideRight' }
              }
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      options7: {
        grid: {
          left: '60',
          top: '30',
          bottom: '20',
          borderWidth: 1
        },
        title: {
          text: '上半年销售量',
          textStyle: {
            color: '#999',
            fontSize: 15,
            fontWeight: 'normal'
          },
          left: 'center'
        },
        legend: {
          data: ['北京买卖销售数据']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: false,
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
            axisLine: {
              lineStyle: {
                color: '#cdced0'
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#cdced0'
              }
            },
            axisLabel: {
              color: '#7a7476'
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '产品B',
            type: 'line',
            symbolSize: 7,
            smooth: false,
            color: ['red'],
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#24deca',
                lineStyle: {
                  width: 0,
                  shadowColor: 'rgba(0,0,0,0.4)'
                }
              }
            },
            data: [{ value: 0, symbol: 'none' }, 134, 244, 364, 424, 343, 254, 432]
          },
          {
            name: '产品C',
            type: 'line',
            symbolSize: 7,
            smooth: false,
            color: ['red'],
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#4e8fdf',
                lineStyle: {
                  width: 0,
                  shadowColor: 'rgba(0,0,0,0.4)'
                }
              }
            },
            data: [{ value: 0, symbol: 'none' }, 45, 74, 154, 245, 300, 476, 345]
          }
        ]
      },
      options8: {
        grid: {
          left: '60',
          top: '10',
          bottom: '20',
          borderWidth: 1
        },
        title: {
          text: '北京买卖销售数据',
          textStyle: {
            color: '#999',
            fontSize: 15,
            fontWeight: 'normal'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['展现', '点击', '访问', '咨询', '订单']
        },
        calculable: true,
        series: [
          {
            name: '各数据对比',
            type: 'funnel',
            x: '15%',
            sort: 'ascending',
            itemStyle: {
              normal: {
                label: {
                  position: 'left'
                }
              }
            },
            data: [
              { value: 60, name: '访问', itemStyle: { normal: { color: '#d87a80' } } },
              { value: 40, name: '咨询', itemStyle: { normal: { color: '#ffb980' } } },
              { value: 20, name: '订单', itemStyle: { normal: { color: '#5ab1ef' } } },
              { value: 80, name: '点击', itemStyle: { normal: { color: '#b6a2de' } } },
              { value: 100, name: '展现', itemStyle: { normal: { color: '#2ec7c9' } } }
            ]
          }
        ]
      },
      options9: {
        grid: {
          top: '100',
          bottom: '0',
          borderWidth: 1
        },
        title: {
          text: '北京买卖销售数据',
          offsetCenter: [0, '20%'],
          textStyle: {
            color: '#999',
            fontSize: 15,
            fontWeight: 'normal'
          },
          left: 'center'
        },
        tooltip: {
          show: true,
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                width: 10,
                shadowBlur: 0,
                color: [[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
              }
            },
            title: {
              show: false
            },
            splitLine: {
              show: false,
              length: 10,
              lineStyle: {
                color: '#0095ff'
              }
            },
            axisTick: {
              lineStyle: {
                width: 1,
                color: '#fff'
              }
            },
            detail: {
              formatter: '{value}%',
              itemStyle: { normal: { color: '#d87a80' } },
              textStyle: { fontSize: 12 },
              show: false
            },
            data: [{ value: 67, name: '完成率', textStyle: { fontSize: 0 } }],
            pointer: {
              width: 2,
              length: '70%'
            },
            itemStyle: {
              color: '#2ec7c9'
            }
          }
        ]
      },
      // cities: ['北京', '上海', '深圳', '广州', '苏州', '杭州', '南京', '福州', '青岛', '济南', '长春', '大连', '温州', '郑州', '武汉', '成都', '东莞', '沈阳', '烟台'],
      // barHeight: 50,
      data1: [
        [5000, 10000, 6785.71],
        [4000, 10000, 6825],
        [3000, 6500, 4463.33],
        [2500, 5600, 3793.83],
        [2000, 4000, 3060],
        [2000, 4000, 3222.33],
        [2500, 4000, 3133.33],
        [1800, 4000, 3100],
        [2000, 3500, 2750],
        [2000, 3000, 2500],
        [1800, 3000, 2433.33],
        [2000, 2700, 2375],
        [1500, 2800, 2150],
        [1500, 2300, 2100],
        [1600, 3500, 2057.14],
        [1500, 2600, 2037.5],
        [1500, 2417.54, 1905.85],
        [1500, 2000, 1775],
        [1500, 1800, 1650]
      ],
      // data1: [5000, 4000, 3000, 2500, 2000, 2000, 2500, 1800, 2000, 2000, 1800, 2000, 1500, 1500, 1600, 1500, 1500, 1500, 1500],
      // data2: [5000, 6000, 3500, 3100, 2000, 2000, 1500, 3200, 1500, 1000, 1200, 700, 1300, 800, 1900, 1100, 1917.54, 500, 300],
      // data3: [6735.71, 6775, 4413.33, 3743.83, 3010, 3172.33, 3083.33, 3050, 2700, 2450, 2383.33, 2325, 2100, 2050, 2002.14, 1987.5, 1855.85, 1725, 1600],
      options10: {
        title: {
          text: '各城市房源所占比例',
          textStyle: {
            color: '#999',
            fontSize: 15,
            fontWeight: 'normal'
          },
          left: 'center'
        },
        grid: {
          left: '60',
          top: '60',
          bottom: '20',
          borderWidth: 1
        },
        angleAxis: {
          type: 'category',
          axisLabel: {
            margin: 0,
            show: false,
            color: '#ccc'
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          data: ['北京', '上海', '深圳', '广州', '苏州', '杭州', '南京', '福州', '青岛', '济南', '长春', '大连', '温州', '郑州', '武汉', '成都', '东莞', '沈阳', '烟台']
        },
        tooltip: {
          formatter: function (params) {
            let id = params.dataIndex;
            let cities = ['北京', '上海', '深圳', '广州', '苏州', '杭州', '南京', '福州', '青岛', '济南', '长春', '大连', '温州', '郑州', '武汉', '成都', '东莞', '沈阳', '烟台'];
            let data = [
              [5000, 10000, 6785.71],
              [4000, 10000, 6825],
              [3000, 6500, 4463.33],
              [2500, 5600, 3793.83],
              [2000, 4000, 3060],
              [2000, 4000, 3222.33],
              [2500, 4000, 3133.33],
              [1800, 4000, 3100],
              [2000, 3500, 2750],
              [2000, 3000, 2500],
              [1800, 3000, 2433.33],
              [2000, 2700, 2375],
              [1500, 2800, 2150],
              [1500, 2300, 2100],
              [1600, 3500, 2057.14],
              [1500, 2600, 2037.5],
              [1500, 2417.54, 1905.85],
              [1500, 2000, 1775],
              [1500, 1800, 1650]
            ];
            return cities[id] + '<br>最低：' + data[id][0] + '<br>最高：' + data[id][1] + '<br>平均：' + data[id][2];
          }
        },
        radiusAxis: {
          axisLabel: {
            margin: 0,
            show: false,
            color: '#ccc'
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        polar: {
          center: ['50%', '50%']
        },
        series: [{
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#24dec9'
            }
          },
          data: [5000, 4000, 3000, 2500, 2000, 2000, 2500, 1800, 2000, 2000, 1800, 2000, 1500, 1500, 1600, 1500, 1500, 1500, 1500],
          coordinateSystem: 'polar',
          stack: '最大最小值',
          silent: true
        }, {
          type: 'bar',
          data: [5000, 6000, 3500, 3100, 2000, 2000, 1500, 3200, 1500, 1000, 1200, 700, 1300, 800, 1900, 1100, 1917.54, 500, 300],
          coordinateSystem: 'polar',
          name: '价格范围',
          stack: '最大最小值',
          itemStyle: {
            normal: {
              color: '#d87a80'
            }
          },
        }, {
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#b6a2de'
            }
          },
          data: [6735.71, 6775, 4413.33, 3743.83, 3010, 3172.33, 3083.33, 3050, 2700, 2450, 2383.33, 2325, 2100, 2050, 2002.14, 1987.5, 1855.85, 1725, 1600],
          coordinateSystem: 'polar',
          stack: '均值',
          silent: true,
          z: 10
        }, {
          type: 'bar',
          data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          coordinateSystem: 'polar',
          name: '均值',
          stack: '均值',
          barGap: '-100%',
          z: 10,
          itemStyle: {
            normal: {
              color: '#ffb980'
            }
          },
        }],
        legend: {
          show: true,
          data: ['A', 'B', 'C']
        }
      },
    }
  },
  created() { },
  computed: {},
  mounted() {
  },
  components: {
    ECharts
  },
  methods: {}
}
</script>
