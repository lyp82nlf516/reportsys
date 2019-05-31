// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    jquery: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-trailing-spaces': 0,
    indent: 0, // 忽略indent
    semi: 0, //关闭语句强制分号结尾
    'eol-last': 0, //文件以单一的换行符结束
    'no-trailing-spaces': 0, //一行结束后面不要有空格
    'arrow-parens': 0, //箭头函数用小括号括起来
    'comma-dangle': 0, //对象字面量项尾不能有逗号
    'space-before-function-paren': 0, //函数定义时括号前面要不要有空格
    // allow async-await
    'generator-star-spacing': 0, //生成器函数*的前后空格
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
