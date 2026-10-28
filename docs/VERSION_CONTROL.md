# Git 版本管理

远程仓库：[ApoTuT/Tile-Explorer](https://github.com/ApoTuT/Tile-Explorer)。主分支为 `main`。

## 首个基线

`v0.1` 对应本项目首次纳入 Git 的完整可玩版本：三城九关、三个功能键、紧密交错牌阵、卡通图集、知识卡、设计文档与测试。

此前的开发轮次保存在迭代文档中，文档内的 0.1、0.2、0.3 是开发阶段记录，不是 Git 发布标签；不补造历史提交。正式版本从 `v0.1` 这个真实快照继续记录。

## 后续迭代

1. 从最新 `main` 创建功能分支，例如 `feat/level-editor` 或 `fix/tile-selection`。
2. 完成一个可独立说明的改动后，运行测试，再提交相关文件。
3. 推送功能分支，通过 Pull Request 检查后合入 `main`。
4. 可交付的稳定版本使用标签，例如 `v0.2`；既有标签不移动、不覆盖远端历史。

```text
git switch main
git pull --ff-only
git switch -c feat/your-change
python tools/checks.py
git add <本次修改的文件>
git commit -m "feat: describe the completed change"
git push -u origin HEAD
```

提交说明使用 `feat:`（功能）、`fix:`（修复）、`docs:`（文档）、`test:`（测试）或 `chore:`（维护），描述实际完成的改动。

## v0.2 的分支与检查

本轮功能分支为 `feat/v0.2-tray-theater`，从同步后的 `main` 创建。保留 `v0.1` 原标签，不直接向 `main` 提交开发改动。

已按职责拆分文档基线、后端表现事件、前端角色与声音，以及验证文档提交。代码通过本地检查后推送该分支，创建面向 `main` 的 Pull Request，再按实际检查与审阅结果决定合入；正式 `v0.2` 标签留到验收后建立。

[Game checks](../.github/workflows/checks.yml) 在功能分支推送和 PR 上执行 Linux/Windows 检查：Python 规则与服务测试、JavaScript 语法、音频/调度/UI 生命周期测试。Node.js 是开发测试工具，不成为游戏运行依赖。CI 使用只读仓库权限，不在工作流中发布或修改分支。

本地测试结果原记录已随 2026-10-24 文档精简归档（摘要见 [迭代记录](ITERATION_LOG.md)，代码见 `feat/v0.2-tray-theater` 分支），远程结果以 GitHub PR 页面显示为准。当前尚未创建正式 `v0.2` 发布标签。

## v0.3 的分支与检查

当前工作分支为 codex/v0.3-diagonal-merge，基于已有 v0.2 实现继续开发三关合成模式。2026-10-21 的交互与代码结构整理已通过统一自动检查，以及主模式、独立 H5 的浏览器复测，实现已推送并建立 [PR #2](https://github.com/ApoTuT/Tile-Explorer/pull/2)。

远端 main 仍是 v0.1 基线，[v0.2 的 PR #1](https://github.com/ApoTuT/Tile-Explorer/pull/1) 尚未合并。v0.3 的 PR #2 以 feat/v0.2-tray-theater 为目标分支，单独呈现 v0.3 的差异；这是依赖分支的审阅关系。两个 PR 均未在本轮合并，未建立正式 v0.2 或 v0.3 标签。

本地与 GitHub Actions 共用 tools/checks.py。它运行 Python、全部网页 JavaScript 语法、自动发现的全部 JavaScript 测试、三关验关、独立 H5 导出和空白检查。浏览器实际拖放及截图另外运行 tools/playtest_v03.cjs，不用纯内核测试代替交互验证。PR 检查覆盖 main、feat/** 和 codex/** 目标，支持本轮依赖分支。

首轮远程 CI 因实现提交未附关卡报告而失败；关卡报告随本轮验证文档纳入，复跑结果以 PR 最新提交的实际记录为准，不把本地通过当作远程通过。不把本机导出、玩家进度、临时 QA 或与本次无关的文件带入提交。v0.3 的状态和证据原记录已随 2026-10-24 文档精简归档，摘要见 [迭代记录](ITERATION_LOG.md)，代码见 `codex/v0.3-diagonal-merge` 分支。

## v0.4–v0.7 的分支现状

后续各代沿用同一约定：每代一个功能分支、一个 PR，正式标签留到验收后建立。截至 2026-10-27 的实际状态：

| 版本 | 分支 | PR | 标签 |
|---|---|---|---|
| v0.4 层叠模式 | `codex/v0.4-first-three-polish` | [PR #3](https://github.com/ApoTuT/Tile-Explorer/pull/3)，未合并 | 未建立 |
| v0.5 滑动合成 | `v0.5` | — | 未建立 |
| v0.6 二十步挑战 | `codex/v0.6-multistage` | [PR #4](https://github.com/ApoTuT/Tile-Explorer/pull/4)，未合并 | 未建立 |
| v0.7 花园挑战（当前） | `codex/v0.7-thirty-levels` | [PR #5](https://github.com/ApoTuT/Tile-Explorer/pull/5)，未合并 | 未建立 |

远端 `main` 仍是 `v0.1` 基线，PR #1–#5 均未合并；`v0.1` 是目前唯一正式标签。v0.7 的发布构建号约定为 `YYYYMMDD-v07rN-<提交前八位>`，构建产物与 SHA-256 清单保存在 `.local/deploy/`（不提交），发布与回退记录见 [v0.7 花园挑战发布记录](technical/v0.7-challenge-deployment.md)。

## 跟踪范围

- 提交源码、启动器、测试、玩法与迭代文档、游戏内必需图集及试玩截图。
- 不提交 `.local/` 中的玩家进度、`.qa/` 临时测试文件、Python 缓存、虚拟环境、日志或 `.env` 等本地配置。
- 图集和预览图目前可直接纳入普通 Git，无需额外下载资源。
- `.gitattributes` 统一文本换行；Windows 启动器保留 CRLF，其他源码使用 LF。
