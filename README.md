# 桥牌第一关：谁赢这一墩？

这是一个纯静态网页小测试，不需要后端、不需要数据库、不需要登录。

## 文件说明

- `index.html`：网页入口，浏览器会先打开它。
- `style.css`：页面样式。
- `script.js`：10 道题、答题逻辑和结算逻辑。
- `.nojekyll`：告诉 GitHub Pages 直接发布静态文件。

## 推荐发布到 GitHub Pages

1. 打开 GitHub，创建一个新仓库。
2. 仓库名可以叫 `bridge-trick-quiz`，也可以用中文拼音，例如 `qiaopai-quiz`。
3. 把本文件夹里的 4 个文件上传到仓库最外层：
   - `index.html`
   - `style.css`
   - `script.js`
   - `.nojekyll`
4. 进入仓库的 `Settings`。
5. 左侧找到 `Pages`。
6. 在 `Build and deployment` 里，`Source` 选择 `Deploy from a branch`。
7. 分支选择 `main`，文件夹选择 `/root`，然后保存。
8. 等一会儿，GitHub 会生成网址，通常长这样：

```text
https://你的GitHub用户名.github.io/bridge-trick-quiz/
```

## 安全说明

这个网页只有前端文件，没有服务器、数据库、账号系统，也没有收集用户信息。发布前只要确认不要把密码、密钥、手机号、身份证等私人内容写进代码，就可以放心作为公开静态网页使用。

## 关于名字

`index.html` 是网页入口文件名，很多网站首页都叫这个名字。真正显示给用户看的网页标题在 `index.html` 里面：

```html
<title>桥牌第一关：谁赢这一墩？</title>
```

如果发布到 GitHub Pages，网址中的项目名来自你的仓库名，比如 `bridge-trick-quiz`。
