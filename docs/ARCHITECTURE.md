# 项目结构与维护入口

更新日期：2026-10-21。

项目保留两个独立玩法：原九关使用 Python 规则服务；v0.3 三关使用浏览器纯 JavaScript 内核，可导出为独立静态 H5。两者复用启动器和音效管理器，不混用规则、历史或完成记录。

## 从哪里开始

| 任务 | 修改位置 |
|---|---|
| 启动本机游戏 | main.py、launch.bat |
| 原九关规则、生成和内容 | tile_explorer/engine.py、geometry.py、content.py |
| 原九关页面与小剧场 | web/app.js、tray-content.js、tray-director.js |
| 新三关规则和布局 | web/merge-v03/engine.js、geometry.js、levels.js |
| 新模式手感参数 | web/merge-v03/settings.js |
| 新模式状态与操作历史 | web/merge-v03/session.js |
| 新模式输入、节点与动画 | web/merge-v03/input.js、view.js、presentation.js |
| 新模式页面生命周期 | web/merge-v03/app.js |
| 新模式资源登记 | config/merge-v03.json |
| 本地与 CI 检查 | tools/checks.py |

## 新模式的状态流

~~~mermaid
flowchart LR
    I[input<br/>指针与键盘落点] --> A[app<br/>协调生命周期]
    A --> S[session<br/>稳定状态与历史]
    S --> E[engine<br/>纯规则与事务]
    E --> S
    S --> D[storage<br/>保存与合法回放]
    S --> V[view<br/>按 ID 复用节点]
    A --> P[presentation<br/>可取消的视觉表现]
~~~

engine.js 是规则的唯一来源，不依赖 DOM、时间、音频或存储。GameSession 持有当前状态与完整操作历史，负责提交、撤销、重开、恢复和保存。app.js 连接输入、会话、视图与表现，不再另存一份规则历史。

一次成功操作先提交规则和存档，等当前原生指针事件完成后更新视图。只有这次帧交接暂时阻止新输入；成长或交付动画不锁住下一次操作。下一次手势可以取消旧表现，旧表现结束也不重新渲染棋盘。

view.js 复用存活牌、固定临时窝和目标槽节点，只有材料消耗、恢复或切关才增删必要节点。调整窗口时更新统一的世界到屏幕变换，不创建一套独立命中坐标。

input.js 管理一条指针手势。pointermove 合并到 requestAnimationFrame，用 transform 移动拖动牌；pointerup 使用释放瞬间坐标重新验落点。取消手势清理帧、指针捕获和残影，不留下可再次提交的旧动作；销毁输入控制器时统一移除监听。

## 资源只有一份清单

config/merge-v03.json 记录入口、按加载顺序排列的脚本、样式和素材。tile_explorer/assets.py 验证它们都是 web 目录内的规范相对路径，并检查重复项、文件类型及 HTML 中的实际引用顺序。

本机服务据此建立明确白名单；H5 导出据此复制必要文件。新增脚本或素材时：

1. 添加文件。
2. 更新 config/merge-v03.json。
3. 若是页面脚本或样式，同步 web/merge-v03.html 的引用和顺序。
4. 运行统一检查，确认服务与导出都能找到资源。

不要在服务或导出中再添加另一份手写资源列表，也不要把任意目录开放为静态路径。

## 日常验证

~~~text
python tools/checks.py
~~~

该命令运行 Python 回归、全部网页 JS 语法、动态发现的 tests/*.test.cjs、三关完整验解、静态 H5 导出和空白检查；CI 调用同一命令。Node.js 24 只用于开发检查，不是游戏运行依赖。

真实交互另外使用 tools/playtest_v03.cjs。它需要本机已有 Playwright 和 Edge，检查三关、借位解围、快速操作、触控模拟、恢复与窄视口，并保存截图和报告。V03_URL 指定实际地址，V03_STATIC=1 检查独立导出，V03_QA_OUTPUT 可隔离并行测试产物。

.editorconfig 统一缩进、UTF-8 和换行编辑习惯；.gitattributes 约束 Git 中的文本换行。不要提交 .local、.qa、缓存、账号配置或不相关文件。

## 规则与手感的变更边界

拖动阈值、吸附容错和动画时长放在 settings.js；修改它们不改变材料、遮挡或胜负规则。配方、可落点、临时窝容量或关卡坐标变化则需要重新验解并检查存档兼容。

当前保证只覆盖 merge-v03-2 的三关：全部可达状态仍可通关。新增关卡必须使用实际内核验证，不能把现有结果扩展成任意布局都不会卡住。

本轮具体执行结果和已知体验限制见 [v0.3 实现记录](technical/v0.3.md)；版本和提交约定见 [VERSION_CONTROL.md](VERSION_CONTROL.md)。
