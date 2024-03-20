# uniapp 入坑之旅

### uniapp 的优势

- 使用 Vue 开发跨平台应用，一套代码兼容小程序、h5、app；**支持转换**
- 语法上使用 vue，兼容 view(类似于微信小程序) div(web)的语法
- 可以搭配 vite、sass 等，和正常 vue 开发区别不大

### 开发细节

- 使用组件库，配置 easycom 之后无需导入即可使用
  配置 page.json 文件

```json
  "easycom": {
    "autoscan": true,
    "custom": {
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue",
      "^b-(.*)": "@/components/basic/b-$1/b-$1.vue"
    }
  },
```
