> [官方文档](https://playwright.nodejs.cn/docs/intro)

  :::tip 原文地址
  [如何快速上手 playwright 自动化测试？ | GitHub](https://github.com/jynba/jynba.github.io/issues/51)
  :::
  
### 自动化测试有什么用？
* 个人观点：便于复用脚本进行测试，减少回归测试带来的时间成本。因此，编写的测试脚本一般适用于可复测的测试案例。
### playwright的优势
个人觉得playwright最大的亮点在于可以通过可视化界面生成自动化脚本，无需学习成本，只需要点点点即可上手。
### 使用教程
●生成自动化脚本，复制代码创建脚本，即可测试
`npx playwright codegen http://localhost:6587/`
![image](https://github.com/jynba/jynba.github.io/assets/75623303/da5d049c-dd3a-4d36-a14c-49086b0e5e92)
复制代码->编写脚本-> `npx playwright test test.spec.ts`   ( 注意：默认目录是 playwright.config.ts 中的 testDir )
●运行命令
○常规运行： `npx playwright test test.spec.ts`
○UI界面截图显示： `npx playwright test test.spec.ts --ui`
○模拟浏览器运行显示(有头模式)：`npx playwright test test.spec.ts --headed`

### 进阶用法
●全局配置默认登录 ：自动登录、并保存用户数据的解决方案。 [参考](https://juejin.cn/post/7080817954396307486#heading-5)
1.先创建文件夹（保存缓存信息），并让 git 忽略它
```bash
mkdir -p playwright/auth
echo "playwright/auth" >> .gitignore
```
2.创建 global-setup.ts  ; sign-page-model.ts
```js
import { chromium } from "@playwright/test";

import { SignPage } from "./sign-page-model.ts";

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const sign = new SignPage(page);
  await sign.login();

  await context.storageState({ path: "./playwright/auth/user.json" });
  await browser.close();
}
export default globalSetup;

============================================================================
import type { Page } from "@playwright/test";

import { BASE_URL } from "./config";

export class SignPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async login() {
    const { page } = this;
    await page.goto(`${BASE_URL}/`);

    await page.getByPlaceholder("输入账号").click();
    await page.getByPlaceholder("输入账号").fill("username");
    await page.getByPlaceholder("输入账号").press("Tab");
    await page.getByPlaceholder("输入密码").fill("passsword");
    await page.getByPlaceholder("输入密码").press("Enter");

    await page.waitForNavigation();
  }
}
```

3.playwright.config.ts中添加：
```js
  globalSetup: require.resolve("./global-setup"),
  use: {
    baseURL: "http://localhost:6587/",
    storageState: "playwright/auth/user.json",
  },
```

使用例子：
```js
import { test, expect } from "@playwright/test";
import { BASE_URL } from "../config";

test.describe("The sub page below the admin is rendered", () => {
  test("Sub page render", async ({ page }) => {
    await page.goto(BASE_URL);
    // 已经登录了,可以做任何想做的事情需要
    // 这里作为登录用户来实现我们的测试目标和断言
    
  });
});
```

### 断言
codegen中正上方有断言 但是只能断言元素可见、文本可见、在需要计算数量或是其他情况下，不能满足我们的需求，因此需要自己写代码去断言，而断言的首要是先要定位元素。
参考如下：
![image](https://github.com/jynba/jynba.github.io/assets/75623303/445bd2e1-0cb6-4bea-82b0-5ea7bad3d747)
