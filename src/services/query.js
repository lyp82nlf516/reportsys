import axios from 'axios'
import { basefild } from '@/utils/mUtils.js'
import { post } from './http'
// import jsonp from 'common/js/jsonp'
// import qs from 'qs' // qs库-->作用是格式化数据

// const timeout = 50000 // 如果请求的时间超过'timeout'，请求将被中止,
var proxy = process.env.NODE_ENV === 'development' ? '/api' : ''
var report = basefild
var orgbase = `${proxy}/${report}`

var baseaxiosoptions = {
  credentials: 'include',
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}
var orgAxios = axios.create(
  Object.assign({}, { baseURL: orgbase }, baseaxiosoptions)
)
export const orgModuleApi = {
  queryHomePage: params => {
    return orgAxios.get('system/priv/queryHomePage.htm').then(res => res.data)
  },
  acquireTitleMsg: params => {
    return orgAxios
      .get('system/showGraphical/acquireTitleMsg.htm?rptId=params')
      .then(res => res.data)
  }
}

// 首页位置的存储http://bi.cbs.bacic5i5j.com:8080/report/system/priv/setHomePage.htm
export const setHomePage = val =>
  post(`/${report}/system/priv/setHomePage.htm`, val)
// http://bi.cbs.bacic5i5j.com:8080/report/system/priv/queryHomePage.htm
export const queryHomePage = () =>
  post(`/${report}/system/priv/queryHomePage.htm`)
// 左侧权限菜单http://bi.cbs.bacic5i5j.com:8080/report/system/priv/queryMemuByUserId.htm
export const getleftmenuz = () =>
  post(`/${report}/system/priv/queryMemuByUserId.htm`)
//  目录树/report/system/reprot.htm
export const gettree = () => post(`/${report}/system/reprot.htm`)
// 收藏表system/sub/addSub.htm？rId = XXXXXXX
export const collecttable = params =>
  post(`/${report}/system/sub/addSub.htm?rId=${params}`)
// 更新收藏system/sub/updateSub.htm？rId = XXXXXXX
export const updateSub = params =>
  post(`/${report}/system/sub/updateSub.htm?rId=${params}`)
// 取消订阅system/sub/delSub.htm？rId = XXXXXXX
export const canceltable = params =>
  post(`/${report}/system/sub/delSub.htm?rId=${params}`)
// 查询已收藏的表system/sub/list.htm
export const getcollecttable = () => post(`/${report}/system/sub/list.htm`)
// 日历的接口
export const getDate = () => post(`/${report}/system/sub/getDate.htm`)
// 点击日历获取事件的接口
export const getToday = val =>
  post(`/${report}/system/sub/getToday.htm?rId=${val}`)
// 筛选条件report/system/report/getSerchTreeMsg.htm
export const getComponentMsg = () =>
  post(`/${report}/system/querycomponent/getComponentMsg.htm`)
// 配置表头report/system/report/getColumnTreeMsg.htm
export const getColumnTreeMsg = () =>
  post(`/${report}/system/report/getColumnTreeMsg.htm`)
// 提交报表 let saveDataSourceInfo = (data) => fetch('POST',
// `${PROXY}/report/system/report/addDefConfBody.htm`, data);
export const saveaddDefConfEntityBody = data =>
  post(`/${report}/system/report/addDefConfEntityBody.htm`, data)
// 分页查询offset  pageSize

// 修改是查询数据的接口
export const findDefConfByCode = val =>
  post(`/${report}/system/report/findDefConfByCode.htm?rptCode=${val}`)
// 修改后提交数据
export const editDefConfEntityBody = val =>
  post(`/${report}/system/report/editDefConfEntityBody.htm`, val)
// let findDefConfByCode = (val) => fetch('POST',
// `${PROXY}/report/system/report/findDefConfByCode.htm`, val); 删除列表数据的接口
export const delDefConf = val =>
  post(`/${report}/system/report/delDefConf.htm?rptIds=${val}`)
// 预览/report/viewUnion/rpt1505706109755/newttttttttttt/custom.htm let
// callProcedure = (val) => fetch('POST',
// `${PROXY2}/report/system/report/callProcedure.htm`, val);
export const callProcedure = val =>
  post(`/${report}/viewUnion/${val.rptCode}/${val.rptName}/custom.htm`)
// 表相关,返回值是可以选的表http://slocal.cbs.bacic5i5j.com:8080/report/system/report/callTa
// bleProcedure.htm
export const callTableProcedure = val =>
  post(`/${report}/system/report/callTableProcedure.htm?tableCode=${val}`)
// 图形的新接口http://bi.cbs.bacic5i5j.com:8081/cbs-report/view/queryEcharts.htm?displayType=line
export const queryCitycbs = () => post(`/${report}/view/queryEcharts.htm`)
// 图形/report/system/queryCity.htm
export const queryCity = () => post(`/${report}/system/queryCity.htm`)
// 大区图像接口/report/system/queryArea.htm newpostparamsajax
export const queryArea = val =>
  post(`/${report}/system/queryArea.htm?companyName=${val}`)
// 用户信息/system/priv/logonMsg.htm
export const logonMsg = () => post(`/${report}/system/priv/logonMsg.htm`)
// 缩略图8080/report/view/callThumbnailData.htm
export const callThumbnailData = val =>
  post(`/${report}/view/callThumbnailData.htm?rptId=${val}`)
// 搜索接口http://bi.cbs.bacic5i5j.com:8080/report/system/sub/searchMain.htm?content
// =%E6%8A%A5%E8%A1%A8 export async function searchMain(val) {     return
// request(`${PROXY2}/report/system/sub/searchMain.htm?content=${val}`, {
// ...newpostparams     }); } bug xg
export const searchMain = params => {
  let val = encodeURI(params)
  return post(`/${report}/system/sub/searchMain.htm?content=${val}`)
}
// 常用接口http://bi.cbs.bacic5i5j.com:8080/report/system/sub/userMain.htm  返回值报表ID
// rptId  报表名称rptName  表头rptDes
export const userMain = () => post(`/${report}/system/sub/userMain.htm`)
// 退出接口/report/system/priv/logout.htm
export const logout = () => post(`/${report}/system/priv/logout.htm`)
// 拖拽目录树的接口
export const saverptorder = val =>
  post(`/${report}/system/saveRptOrder.htm`, val)
// 判断职位是否发生变化的函数/system/jobTransfer.htm
export const jobTransfer = val => post(`/${report}/system/jobTransfer.htm`)
// 查询条件http://bi.cbs.bacic5i5j.com:8081/cbs-report/system/showGraphical/acquireQueryMsg.htm
export const acquireQueryMsg = val =>
  post(`/${report}/system/showGraphical/acquireQueryMsg.htm?rptId=${val}`)
// 表头数http://bi.cbs.bacic5i5j.com:8081/cbs-report/system/showGraphical/acquireTitleMsg.htm
export const acquireTitleMsg = val =>
  post(`/${report}/system/showGraphical/acquireTitleMsg.htm?rptId=${val}`)
// 表格数据数http://bi.cbs.bacic5i5j.com:8081/cbs-report/system/showGraphical/acquireTableMsg.htm
export const acquireTableMsg = val =>
  post(`/${report}/system/showGraphical/acquireTableMsg.htm`, val)
// 用户的基础信息acquireBasisMsg
// 表格数据数http://bi.cbs.bacic5i5j.com:8081/cbs-report/system/showGraphical/acquireTableMsg.htm
export const acquireBasisMsg = val =>
  post(`/${report}/system/showGraphical/acquireBasisMsg.htm?rptId=${val}`)
// 保存位置信息接口savePositionMsg
export const savePositionMsg = val =>
  post(`/${report}/system/showGraphical/savePositionMsg.htm`, val)
// 查询位置信息接口 acquirePositionMsg
export const acquirePositionMsg = val =>
  post(`/${report}/system/showGraphical/acquirePositionMsg.htm?rptId=${val}`)
// 配置页面的接口  查询条件  参数：String primaryKey  /model/acquireQueryMsg.htm
export const modelacquireQueryMsg = val =>
  post(`/${report}/model/acquireQueryMsg.htm?primaryKey=${val}`)
// 配置页面的接口  操作按钮 参数：String primaryKey /model/acquireOperationMsg.htm
export const modelacquireOperationMsg = val =>
  post(`/${report}/model/acquireOperationMsg.htm?primaryKey=${val}`)
// 配置页面的接口  --表头和页面数据 参数：String primaryKey /model/acquirePageMsg.htm
export const modelacquirePageMsg = val =>
  post(`/${report}/model/acquirePageMsg.htm?primaryKey=${val}`)
// 配置页面的接口 --列表数据  参数：String jsonStr (json字符串 包含primaryKey) /model/list.htm
export const modellist = val => {
  let jmparme = encodeURIComponent(encodeURIComponent(val))
  return post(`/${report}/model/list.htm?jsonStr=${jmparme}`)
}
// 配置页面的接口 --新增数据  参数：String jsonStr (json字符串 包含primaryKey)/model/add.htm
export const modeladd = val => {
  let jmparme = encodeURIComponent(encodeURIComponent(val))
  return post(`/${report}/model/add.htm?jsonStr=${jmparme}`)
}
// 配置页面的接口 --修改数据  参数：String jsonStr (json字符串 包含primaryKey)/model/edit.htm
export const modeledit = val => {
  let jmparme = encodeURIComponent(encodeURIComponent(val))
  return post(`/${report}/model/edit.htm?jsonStr=${jmparme}`)
}
// 配置页面的接口 --删除数据  参数：String jsonStr (json字符串 包含primaryKey) /model/del.htm
export const modeldel = val => post(`/${report}/model/del.htm?jsonStr=${val}`)
// 配置报表列表接口(参数：以实体形式接收、参数名称同数据库字段名称) /system/showGraphical/confmanagerList.htm
export const confmanagerList = val =>
  post(`/${report}/system/showGraphical/confmanagerList.htm`, val)
// 配置报表删除接口(参数：单参数形式接收，参数类型为数组，参数名称 ids )/system/showGraphical / delConfmanager.htm
export const delConfmanager = val =>
  post(`/${report}/system/showGraphical/delConfmanager.htm?ids=${val}`)
// 角色列表接口(参数：以实体形式接收、参数名称同数据库字段名称) /system/showGraphical / listrole.htm
export const listrole = val =>
  post(`/${report}/system/showGraphical/listrole.htm`, val)
// 角色新增接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical / addrole.htm
export const addrole = val =>
  post(`/${report}/system/showGraphical/addrole.htm`, val)
// 角色修改接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical/editrole.htm
export const editrole = val =>
  post(`/${report}/system/showGraphical/editrole.htm`, val)
// 角色删除接口(参数：单参数形式接收，参数类型为数组，参数名称 ids )/system/showGraphical / delrole.htm
export const delrole = val =>
  post(`/${report}/system/showGraphical/delrole.htm?ids=${val}`)
// 用户列表接口人员列表接口(参数：以实体形式接收、参数名称同数据库字段名称) /system/showGraphical/listuser.htm
export const listuser = val =>
  post(`/${report}/system/showGraphical/listuser.htm`, val)
// 人员新增接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical/adduser.htm
export const adduser = val =>
  post(`/${report}/system/showGraphical/adduser.htm`, val)
// 人员新增接口校验(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical/checkuser.htm
export const checkuser = val =>
  post(`/${report}/system/showGraphical/checkuser.htm`, val)
// 人员修改接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical/edituser.htm
export const edituser = val =>
  post(`/${report}/system/showGraphical/edituser.htm`, val)
// 人员删除接口(参数：单参数形式接收，参数类型为数组，参数名称ids)/system/showGraphical/deluser.htm
export const deluser = val =>
  post(`/${report}/system/showGraphical/deluser.htm?ids=${val}`)
// 人员密码重置接口(参数：单参数形式接收，参数类型为数组，参数名称ids)/system/showGraphical/resetpwd.htm
export const resetpwd = val =>
  post(`/${report}/system/showGraphical/resetpwd.htm?`, val)
// 目录全给你，报表只穿编码长短为8
// 获取角色下拉/system/showGraphical/getRoles.htm
export const getRolesz = () =>
  post(`/${report}/system/showGraphical/getRoles.htm`)
// 报表树接口/system/roledefine/reprotInit.htm
export const reprotInitz = () =>
  post(`/${report}/system/roledefine/reprotInit.htm`)
// 目录树接口/system/priv/queryAllMenu.htm
export const queryAllMenuz = () =>
  post(`/${report}/system/priv/queryAllMenu.htm`)
export const queryAllMenuzs = val =>
  post(`/${report}/system/priv/queryAllMenu.htm?treetype=${val}`)
// /system/showGraphical/mountToMenu.htm --参数uniflag:主键 menuid:目录id rpttype:报表类型 rpt|img
export const mountToMenus = val => {
  let jmparme = encodeURIComponent(encodeURIComponent(val))
  return post(
    `/${report}/system/showGraphical/mountToMenu.htm?jsonStr=${jmparme}`
  )
}

// 数据源新增接口(参数：以实体形式接收)/system/showGraphical/adddb.htm
export const adddb = val =>
  post(`/${report}/system/showGraphical/adddb.htm`, val)
// 数据库列表 /system/showGraphical/listdb.htm
export const listdb = val =>
  post(`/${report}/system/showGraphical/listdb.htm`, val)
// 数据库新增接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical / addrole.htm
// export const adddb = val =>
//   post(`/${report}/system/showGraphical/adddb.htm`, val)
// 数据库修改接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical/editrole.htm
export const editdb = val =>
  post(`/${report}/system/showGraphical/editdb.htm`, val)
// 数据库删除接口(参数：单参数形式接收，参数类型为数组，参数名称 ids )/system/showGraphical / delrole.htm
export const deldb = val =>
  post(`/${report}/system/showGraphical/deldb.htm?ids=${val}`)
// 凭证新增接口(参数：以实体形式接收)/system/showGraphical/addvoucher.htm
export const addvoucher = val =>
  post(`/${report}/system/showGraphical/addvoucher.htm`, val)
// --获取数据源（无参数）/system/showGraphical/getDbs.htm
export const getDbs = val => post(`/${report}/system/showGraphical/getDbs.htm`)
// --根据数据源查询表(单参数)参数id（数据源对应的key）/system/showGraphical/getTables.htm返回值是参数名为key，value的集合
export const getTables = val =>
  post(`/${report}/system/showGraphical/getTables.htm?id=${val}`)
// --根据数据源和表名查询表对应字段（两个参数）参数id，tableName（数据源对应的key）/system/showGraphical/getTableColumns.htm返回值是参数名为key，value的集合
export const getTableColumns = val =>
  post(
    `/${report}/system/showGraphical/getTableColumns.htm?id=${
      val.id
    }&tableName=${val.tableName}`
  )
// --保存数据接口--保存数据接口 实体接收：（数据源key：dbid， 表名：tablename，拼接sql：confmsg）/system/showGraphical/saveConfInfo.htm
export const saveConfInfo = val =>
  post(`/${report}/system/showGraphical/saveConfInfo.htm`, val)
// -根据主键返回表字段信息 单字符串参数id /system/showGraphical/getTableColumnsByKey.htm
export const getTableColumnsByKey = val =>
  post(`/${report}/system/showGraphical/getTableColumnsByKey.htm?id=${val}`)
// --保存配置明细（实体集合）/system/showGraphical/saveTableColumn.htm
export const saveTableColumn = val =>
  post(`/${report}/system/showGraphical/saveTableColumn.htm`, val)
// --获取基础信息参数为单字符串：primaryKey  /system/showGraphical/getBaseMsg.htm--返回值tablecode:列编码 tabletitle:列名称 querylist:查询条件信息
export const getBaseMsg = val =>
  post(`/${report}/system/showGraphical/getBaseMsg.htm?primaryKey=${val}`)
// --列表查询接口：参数为json字符串jsonStr同单表操作  /system/showGraphical/confList.htm
export const confList = val => {
  let jmparme = encodeURIComponent(encodeURIComponent(val))
  return post(`/${report}/system/showGraphical/confList.htm?jsonStr=${jmparme}`)
}
// --新增接口：参数为json类型字符串jsonStr  /system/showGraphical/add.htm
export const filderadd = val => {
  let jmparme = encodeURIComponent(encodeURIComponent(val))
  return post(`/${report}/system/showGraphical/add.htm?jsonStr=${jmparme}`)
}
// --修改接口：参数为json类型字符串jsonStr  /system/showGraphical/edit.htm
export const filderedit = val => {
  let jmparme = encodeURIComponent(encodeURIComponent(val))
  return post(`/${report}/system/showGraphical/edit.htm?jsonStr=${jmparme}`)
}
// --删除数据  参数为json类型字符串jsonStr（包含primaryKey和id） /system/showGraphical/del.htm
export const filderdel = val =>
  post(`/${report}/system/showGraphical/del.htm?jsonStr=${val}`)

// 报表配置 /system/reportconfigure/listConf.htm
export const listConf = val =>
  post(`/${report}/system/reportconfigure/listConf.htm`, val)

// 报表预览 system/reportconfigure/viewlist.htm
export const viewlist = val =>
  post(`/${report}/system/reportconfigure/view/${val}.htm`)

// 删除报表： /system/report/delConf.htm
export const delConf = val =>
  post(`/${report}/system/reportconfigure/delConf.htm?ids=${val}`)

// 预览表格 :system/reportconfigure/list
export const tableList = val =>
  post(`/${report}/system/reportconfigure/list.htm`, val)

// 修改 updateConf system/reportconfigure/updateConf.htm?
export const updateConf = val =>
  post(`/${report}/system/reportconfigure/updateConf.htm?rptId=${val}`)

// 报表配置：system/reportconfigure/openConf.htm
export const openConf = () =>
  post(`/${report}/system/reportconfigure/openConf.htm`)

// 新增 addConf
export const addConf = val =>
  post(`/${report}/system/reportconfigure/addConf.htm`, val)

// /system/reportconfigure/saveReportConf
export const saveReportConf = val =>
  post(`/${report}/system/reportconfigure/saveReportConf.htm`, val)

// 查询列表:system/assembly/queryByAssembly
export const queryByAssembly = val =>
  post(`/${report}/system/assembly/queryByAssembly.htm`, val)

// 组件类别下拉  system/assembly/queryAssemblyModel 无参
export const queryAssemblyModel = () =>
  post(`/${report}/system/assembly/queryAssemblyModel.htm`)

// 添加条件组件:system/assembly/addAssembly
export const addAssembly = val =>
  post(`/${report}/system/assembly/addAssembly.htm`, val)

// 修改条件组件:system/assembly/editAssembly
export const editAssembly = val =>
  post(`/${report}/system/assembly/editAssembly.htm`, val)

// 删除:system/assembly/delAssembly
export const delAssembly = val =>
  post(`/${report}/system/assembly/delAssembly.htm?ids=${val}`)

// 下载:system/assembly/delAssembly
export const download = val =>
  post(`/${report}/system/reportconfigure/download.htm`, val)

// --列表接口实体形式（目前只有一个参数keyWord）/system/showGraphical/dragComponentList.htm
export const dragComponentList = val =>
  post(`/${report}/system/showGraphical/dragComponentList.htm`, val)

// --删除接口(参数：单参数形式接收，参数类型为数组，参数名称ids)/system/showGraphical/delDragComponent.htm
export const delDragComponent = val =>
  post(`/${report}/system/showGraphical/delDragComponent.htm?ids=${val}`)

// 组件删除（参数：单字符串dragid）/system/showGraphical/delDragComponentSingle.htm
export const delDragComponentSingle = val =>
  post(
    `/${report}/system/showGraphical/delDragComponentSingle.htm?dragid=${val}`
  )

// 所有组件修改(参数：实体集合<与新增相同>)/system/showGraphical/editAllDragComponent.htm
export const editAllDragComponent = val =>
  post(`/${report}/system/showGraphical/editAllDragComponent.htm`, val)

// 单个组件修改(参数：实体)/system/showGraphical/editDragComponent.htm
export const editDragComponent = val =>
  post(`/${report}/system/showGraphical/editDragComponent.htm`, val)

// --按照模板添加参数为uniflag单字符串
export const createbytemplate = val =>
  post(`/${report}/system/showGraphical/createbytemplate.htm?uniflag=${val}`)

// --保存数据接口，实体实体集合接收（之前测试的参数接收方式）/system/showGraphical/dragComponent.htm
export const dragComponent = val =>
  post(`/${report}/system/showGraphical/dragComponent.htm`, val)

// --两个参数uniflag（唯一标识），dragType（这个传值为空就行，空字符串）/system/showGraphical/getDragComponent.htm
export const getDragComponent = val =>
  post(
    `/${report}/system/showGraphical/getDragComponent.htm?uniflag=${
      val.uniflag
    }&dragType=${val.dragType}`
  )

// /system/showGraphical/dragImageData.htm
export const dragImageData = val =>
  post(`/${report}/system/showGraphical/dragImageData.htm?uniflag=${val}`)

// --获取列表数据接口同/system/showGraphical/acquireTableMsg.htm   /system/showGraphical/dragListData.htm
export const dragListData = val =>
  post(`/${report}/system/showGraphical/dragListData.htm`, val)

// 单组件新增单个组件新增(参数：实体) /system/showGraphical/dragComponentSingle.htm
export const dragComponentSingle = val =>
  post(`/${report}/system/showGraphical/dragComponentSingle.htm`, val)

// get到图形列表接口(参数：以实体形式接收、参数名称同数据库字段名称) /system/showGraphical/listimg.htm
export const listimg = val =>
  post(`/${report}/system/showGraphical/listimg.htm`, val)

// 图形新增接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical/addimg.htm
export const addimg = val =>
  post(`/${report}/system/showGraphical/addimg.htm`, val)

// 图形修改接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical/editimg.htm
export const editimg = val =>
  post(`/${report}/system/showGraphical/editimg.htm`, val)

// 图形删除接口(参数：单参数形式接收，参数类型为数组，参数名称ids)/system/showGraphical/delimg.htm
export const delimg = val =>
  post(`/${report}/system/showGraphical/delimg.htm?ids=${val}`)

// 图形接口
export const initmenudata = val =>
  post(`/${report}/system/priv/queryAllMenu.htm?treetype=${val}`)

// 目录操作接口包括新增和修改
export const addoreditmenu = val =>
  post(`/${report}/system/priv/addoreditmenu.htm`, val)
export const delmenus = val =>
  post(`/${report}/system/priv/delMenus.htm?menuIds=${val}`)

// login.htm
export const login = () => post(`/${report}/login.htm`)
