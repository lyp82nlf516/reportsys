// import { Message } from 'element-ui'
// export const basefild = 'Intelligent-technology'
export const basefild = ' '
// export const basefild = 'cbs-report'
// export const base = 'http://local.cbs.bacic5i5j.com:8080'
// export const base = 'http://n01.yx.5i5j.club:8080'
// export const base = 'http://bi.cbsrpt.com:8081'
// 这一步是将build出的前端包打包成tomcat自动解压的war包。
// export const base = 'http://www.cbsrpt.com:8083'
export const base = 'http://www.beidakeji.com'
// export const basefild = ' '
export const baseurlz = `${base}/${basefild}`
// export const baseurlz = 'http://www.cbsrpt.com:8083'
export const env = 'dev' // online
export const baseurlzz = process.env.NODE_ENV === 'development' ? '/api' : ''

/**
 * 存储sessionStorage
 */
export const setSessionStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
  if (!name) return
  var obj = window.sessionStorage.getItem(name)
  try {
    return JSON.parse(obj)
  } catch (e) {
    return obj
  }
}
