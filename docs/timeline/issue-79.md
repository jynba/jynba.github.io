### 📖 背景

  :::tip 原文地址
  [tapd状态流转通知钉钉——zapier，一个好用的无代码流程自动化工具 | GitHub](https://github.com/jynba/jynba.github.io/issues/79)
  :::
  tapd需求流转状态后，还需要在群里通知测试，告知对应的需求提测了。希望通过tapd的webhook自动化完成，但是发现tapd的webhook发送的数据格式和钉钉机器人接收的数据格式不一样，但是我又不想专门起一个后端服务来处理转换数据。于是我发现了这个 `Zapier`， 他可以作为中间件来处理数据。

### 🧠 什么是 Zapier？
Zapier = 无代码 RPA（机器人流程自动化）+ SaaS 系统连接器

它的工作逻辑很简单：
### ✅ 一个 Zap（自动化流程） = 「触发器（Trigger）」 + 「动作（Action）」
比如：
```markdown
🧩 触发器：TAPD 有新状态变更事件
     ↓
⚡ 动作：发送一条消息到钉钉群机器人
```

 ### 🔧 核心术语解释

概念 | 含义
-- | --
Zap | 一条自动化规则，包含触发器 + 动作
Trigger | 某个事件发生（如 TAPD 新任务、邮箱收到邮件）
Action | 响应触发的操作（如 发消息、创建记录）
Task | 每执行一次 Zap 动作算一次 task（免费账户有配额）

### 🚀具体操作
* TAPD 新需求创建 → 通知到钉钉群

> ⚠️ 注意：TAPD 目前并不原生支持 Zapier，所以需要配合「Webhook」触发器 + 转换器

流程如下：

1. Trigger：使用 Webhooks by Zapier，作为 TAPD 的 webhook 接收端

2. Action：Zapier 将 webhook 内容转换成钉钉需要的格式

3. Post：Zapier 向钉钉机器人 Webhook URL 发送 POST 请求

<img width="1176" height="815" alt="Image" src="https://github.com/user-attachments/assets/3d1e496f-0a52-4fa5-958f-a3552dcd7cca" />

* ⚠️ 注意：`Headers` 设置区分大小写

### ✅ 适合使用 Zapier 的场景：

* 不想自己写后端代码

* 想快速连接各种工具

* 只处理 100 次/月以内的自动任务（免费额度）

* 想先快速验证是否可行，后续再自己部署



