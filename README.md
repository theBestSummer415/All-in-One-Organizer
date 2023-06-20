# All-in-One Organizer

微信小程序
  
## 部署方式

- 在左上角点击【云开发】按钮，进入云开发控制台。
- 如果没有环境则按照提示开通云开发环境
- 进入云开发环境，在【设置】页复制`环境ID`
- 在控制台数据库页，创建云开发数据库 `todo`
- 右键点击 `cloudfunctions/getOpenId` 文件夹，选择云函数云端安装依赖上传
- 如果在新建项目时，小程序下有云开发环境，则会默认注入第一个环境，如果想更换为自己想要的环境，只需要将 `miniprogram/envList.js` 文件里的内容全部替换成如下，注意替换envId
``` js
module.exports = {
  envList: [{
    envId:'上述步骤中你获得的环境ID'
  }]
}
```
