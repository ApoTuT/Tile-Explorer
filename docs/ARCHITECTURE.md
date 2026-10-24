# 项目结构与维护入口

更新日期：2026-10-23。

## v0.6 接入点

`web/slide-v06.html` 与 `config/slide-v06.json` 是独立入口和资源清单。`web/slide-v06/content.js` 定义三条多级链；`engine.js` 同时提交地形、碰撞升级、最终交付和计分；`session.js` 保存完整动作与撤销事务；`solver.js` 提供可取消的有界搜索；`app.js` 连接 DOM 视图、合成路径、预览、教学、动画与对话框。输入识别从 v0.5 复用，存档与旧版隔离。

`tools/build_v06_levels.cjs` 用真实内核反向制作十关，`validate_v06_levels.cjs` 正向回放通关和三星证据，前三关另完整枚举可达状态。`tools/export_v06.py` 复用共享清单导出 22 文件静态包；`playtest_v06.cjs` 以浏览器实际输入验收；`release_v06.py` 打包、上传独立预览、切换精确 Nginx 路由并在失败时回退。详见 [v0.6 文档](technical/v0.6.md)。

项目保留三个玩法：原九关旅行模式使用 Python 规则服务；v0.4“叠出新花样”和 v0.5“滑出新花样”各有独立的浏览器纯 JavaScript 内核，可分别导出静态 H5。它们复用启动器、音效管理器；两个合成模式还复用素材／配方注册表，不混用规则、历史或完成记录。

## v0.5 从哪里开始

| 任务 | 修改位置 |
|---|---|
| 新版入口和资源清单 | `web/slide-v05.html`、`config/slide-v05.json` |
| 单块四向滑到头、碰撞合成规则 | `web/slide-v05/grid.js`、`engine.js` |
| 三关数据与参考解 | `web/slide-v05/levels.js` |
| 有环状态图、验关与提示 | `web/slide-v05/solver.js`、`tools/validate_v05_levels.cjs` |
| 状态、撤销、持久化回放 | `web/slide-v05/session.js`、`storage.js` |
| 输入、节点、效果、非阻塞指引 | `web/slide-v05/input.js`、`view.js`、`presentation.js`、`tutorial.js` |
| 生命周期与界面连接 | `web/slide-v05/app.js` |
| 共享素材／配方 | `web/shared/merge-content.js`；旧 `merge-v03/content.js` 保留兼容出口 |
| 清单驱动的静态导出 | `tile_explorer/export.py`、`tools/export_v05.py`；旧 `export_v03.py` 复用相同实现 |
| 浏览器复测 | `tools/playtest_v05.cjs`、`tools/playtest_v05_recovery.cjs` |

`GameSession` 独占稳定状态与历史，另有单调递增的会话 revision；规则动作只包含方块 ID 和方向。`slide-v05-2` 沿该方向扫描到边界、异类前或第一张同类，返回完整路径、距离与终点。每段成功滑行产生一个完整事务，成品交付与棋盘消耗同时提交。输入、指引和表现共用这条路径，不能另算终点。取消、撤销、弹窗、切关或页面生命周期变化会使旧手势与异步提示失效。动画可被下一次操作取消，不锁整段收集过程。

v0.5 状态图存在往返循环，验关先完整枚举，再从胜利状态逆向标记；不能通过“有合法操作”判断可解。三关的正式内核报告见 [v0.5-level-report.json](technical/v0.5-level-report.json)。提示搜索分时间片让出主线程，超预算返回未验证，不误判死局。

v0.5 的正式存档前缀是 `tile-explorer.slide.v05.`，预览为 `tile-explorer.slide.v05.preview.`。进行中记录保存完整成功动作并用真实内核回放，允许合法往返；存储失败继续使用内存状态。只迁移旧版验证过的音效和减少动态偏好。

以下保留 v0.4 的结构说明。它沿用 `web/merge-v03/`、`merge-v03.html`、`config/merge-v03.json` 的内部命名；共享注册表抽取后，v0.4 静态包从 25 个文件变为 26 个。

## 从哪里开始

| 任务 | 修改位置 |
|---|---|
| 启动本机游戏 | main.py、launch.bat |
| 原九关规则、生成和内容 | tile_explorer/engine.py、geometry.py、content.py |
| 原九关页面与小剧场 | web/app.js、tray-content.js、tray-director.js |
| 新三关规则和布局 | web/merge-v03/engine.js、geometry.js、levels.js |
| 图形、合成配方和统一文案 | web/merge-v03/content.js、copy.js |
| 新模式手感参数 | web/merge-v03/settings.js |
| 新模式状态、历史和存档 | web/merge-v03/session.js、storage.js |
| 新模式输入、节点与动画 | web/merge-v03/input.js、view.js、presentation.js |
| 非阻塞教程与虚影演示 | web/merge-v03/tutorial.js、guide-view.js |
| 新模式页面生命周期 | web/merge-v03/app.js |
| 新模式资源登记 | config/merge-v03.json |
| v0.4 六张图形与素材说明 | web/assets/merge-v04/ |
| 本地与 CI 检查 | tools/checks.py |
| 当前真实输入浏览器复测 | tools/playtest_v04.cjs |

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
    A --> T[tutorial<br/>只读建议与能力记录]
    T --> H[guide-view<br/>不拦输入的虚影]
~~~

engine.js 是规则的唯一来源，不依赖 DOM、时间、音频或存储。content.js 注册材料、成品和配方：两张同类基础材料生成对应成品，交付按 resultId 更新 delivered 计数，胜利需满足全部目标并清空棋盘和暂放位。当前包含草莓、汽车、树苗三类，使用六张本地 SVG；界面和事件都从内容注册表读取对应图形。

GameSession 持有当前状态与完整操作历史，负责提交、撤销、重开、恢复和保存。app.js 连接输入、会话、视图、教学与表现，不再另存一份规则历史。布局哈希涵盖规则、材料、配方与坐标；编辑说明文字不会改变规则身份。

一次成功操作先提交规则和存档，等当前原生指针事件完成后更新视图。只有这次帧交接暂时阻止新输入；成长或交付动画不锁住下一次操作。下一次手势可以取消旧表现，旧表现结束也不重新渲染棋盘。

view.js 复用存活牌、固定暂放位和各类目标槽节点，只有材料消耗、恢复或切关才增删必要节点。调整窗口时更新统一的世界到屏幕变换，不创建一套独立命中坐标。目标按成品 ID 对应图形、计数和交付终点，不能用总数替代多类目标。

input.js 管理一条指针手势。pointermove 合并到 requestAnimationFrame，用 transform 移动拖动牌；pointerup 使用释放瞬间坐标重新验落点。取消手势清理帧、指针捕获和残影，不留下可再次提交的旧动作；销毁输入控制器时统一移除监听。

tutorial.js 从当前规则状态查询可继续通关的合法建议，guide-view.js 只画虚影和方向，不移动真实方块，也不调用提交。自动演示限轮次，真实抓牌立即取消；延时任务同时核对关卡、局面 revision、生命周期令牌与自身 epoch。只有成功操作事件才能记录已学会的合成、暂放与接回，撤销不删除能力记录。帮助可主动展示当前提示，关闭弹窗后恢复符合当前进度的教学。

app.js 统一处理切关、重开、撤销、弹窗、窗口变动和页面隐藏时的取消。设置中的减少动态效果与系统偏好共同控制拖回、合成交付、拒绝反馈和演示；静音不影响规则提交。

## 存档隔离与恢复

SaveStore 正式前缀为 tile-explorer.merge.v04.，预览前缀为 tile-explorer.merge.v04.preview.；各类键追加名称与 .v1。路径包含 preview 时使用预览范围，避免预览试玩改动正式进度。进行中记录保存 levelId、规则版本、定义哈希和操作序列，恢复时用实际内核逐步合法回放，重建状态与撤销历史；不兼容或无效记录安全重开当前关。

v0.3 的牌局、完成记录和教程不迁入 v0.4，只尝试继承旧设置中的布尔静音偏好，旧键保留。存储不可用时退化为本次页面内存状态并显示保存提示，仍可正常游玩。

## 资源只有一份清单

config/merge-v03.json 记录入口、按加载顺序排列的脚本、样式和素材。tile_explorer/assets.py 验证它们都是 web 目录内的规范相对路径，并检查重复项、文件类型及 HTML 中的实际引用顺序。

本机服务据此建立明确白名单；H5 导出据此复制必要文件。新增脚本或素材时：

1. 添加文件。
2. 更新 config/merge-v03.json。
3. 若是页面脚本或样式，同步 web/merge-v03.html 的引用和顺序。
4. 运行统一检查，确认服务与导出都能找到资源。

不要在服务或导出中再添加另一份手写资源列表，也不要把任意目录开放为静态路径。

当前清单包含 25 个文件，独立导出将入口改为 index.html，其他相对路径保留；tools/export_v03.py 默认输出 .local/h5-v04。原九关的 Python 规则接口不进入这个静态包。

## 日常验证

~~~text
python tools/checks.py
~~~

该命令运行 Python 回归、全部网页 JS 语法、动态发现的 tests/*.test.cjs、三关完整验解、静态 H5 导出和空白检查；CI 调用同一命令。Node.js 24 只用于开发检查，不是游戏运行依赖。

真实交互另外使用 tools/playtest_v04.cjs。它需要本机已有 Playwright 和 Edge，检查三关、多类目标、借位顺序、快速操作、教程、设置、撤销与恢复，并保存截图和报告。V04_URL 指定实际地址，V04_STATIC=1 检查独立静态导出，V04_QA_OUTPUT 可隔离并行测试产物；PLAYWRIGHT_MODULE 可指定已有 Playwright 模块路径。tools/playtest_v03.cjs 留作上一版历史脚本。

2026-10-22 本地统一检查通过 57 项 Python、127 项 JavaScript、网页脚本语法、三关验解、25 文件导出与空白检查。主模式、独立静态 H5 及公网入口均检查 320×568、375×667、390×844、768×1024、1280×900 五种尺寸，以及鼠标、Chromium 触摸模拟和键盘，报告错误列表为空。结果见 [主模式](technical/v0.4-browser-report.json)、[静态 H5](technical/v0.4-static-report.json)、[公网](technical/v0.4-public-report.json)。实施提交 4b282549 已通过 [GitHub Actions Linux／Windows 回归](https://github.com/ApoTuT/Tile-Explorer/actions/runs/39806403450)。这些检查不等于 Android/iOS 实机或陌生玩家试玩。

.editorconfig 统一缩进、UTF-8 和换行编辑习惯；.gitattributes 约束 Git 中的文本换行。不要提交 .local、.qa、缓存、账号配置或不相关文件。

## 规则与手感的变更边界

拖动阈值、吸附容错和动画时长放在 settings.js；修改它们不改变材料、遮挡或胜负规则。配方、可落点、暂放位容量或关卡坐标变化则需要重新验解并检查存档兼容。

当前保证只覆盖 merge-v04-1 的三关：分别枚举 3、6、30 个合法可达状态，死局均为 0，最短通关操作数分别为 1、3、5，证据见 [v0.4 验关报告](technical/v0.4-level-report.json)。新增关卡必须使用实际内核验证，不能把现有结果扩展成任意布局都不会卡住。新模式仍是三关，比赛要求的 50 关未实现。

本轮已实现并部署到 [在线入口](http://106.12.167.253/tile-explorer/)，[PR #3](https://github.com/ApoTuT/Tile-Explorer/pull/3) 尚未合并。稳定入口通过不缓存的 HTTP 302 跳转至不可变版本目录 /tile-explorer/releases/20261022-v04-4b282549/，对应源码提交 4b282549a804ce5341bdd9f28e974ce3ed85c33c；旧版资源保留用于回退。具体部署与回退步骤见 [v0.4 发布记录](technical/v0.4-deployment.md)，实现和体验限制见 [v0.4 实现记录](technical/v0.4.md)。v0.3 原规则与当时证据保留在 [历史实现记录](technical/v0.3.md)。版本和提交约定见 [VERSION_CONTROL.md](VERSION_CONTROL.md)。
