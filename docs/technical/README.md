# 各代技术文档

更新日期：2026-10-24。

本目录保留当前版本 v0.6 的实现文档，以及 v0.7 正式内容版的设计与实现，说明架构、数据、流程、素材接入、技术边界和验证。v0.7 已实现、通过双平台 CI 及线上验收，已部署公网。只想了解每次更新增加了什么，请阅读 [迭代更新记录](../ITERATION_LOG.md)。

> 2026-10-24 精简：v0.1~v0.5 及开发阶段的独立技术文档、验关与浏览器报告、旧截图已从 docs 移除，产品层面的历史摘要保留在 [迭代更新记录](../ITERATION_LOG.md)；旧版代码可从 Git 标签 `v0.1` 与分支 `feat/v0.2-tray-theater`、`codex/v0.3-diagonal-merge`、`codex/v0.4-first-three-polish`、`v0.5` 获取。

## v0.7 正式内容版（已实现）

| 文档 | 内容 |
|---|---|
| [v0.7-deployment.md](v0.7-deployment.md) | 公网入口、部署与校验、源代码 CI、服务器位置和回退方式 |
| [v0.7-implementation.md](v0.7-implementation.md) | 实际实现、配料与棋盘调整、完整图证明、浏览器验收、构建与限制 |
| [v0.7.md](v0.7.md) | 正式版目标、12 项创意筛选、15/20/25 关新机制、规则与状态、存档、可解性证明要求和发布门槛 |
| [v0.7-levels.md](v0.7-levels.md) | 30 关逐关配料、目标、尺寸、地形、出题思路与验收要求；实际坐标与验解已完成 |

## 文档索引（v0.6：布好局，连着收）

| 文档 | 内容 |
|---|---|
| [v0.6.md](v0.6.md) | 方案与实现：十关多阶段滑动合成、三至四次升级链、积分与集章 |
| [v0.6-steps.md](v0.6-steps.md) | 20 步挑战重做：第七关空间死局修复、完整小棋盘、全部空间局面可解证明 |
| [v0.6-deployment.md](v0.6-deployment.md) | 部署与回退记录 |
| [v0.6-level-report.json](v0.6-level-report.json) | 十关验关：489,501 个可达空间局面全部可解 |
| [v0.6-browser-report.json](v0.6-browser-report.json)、[v0.6-static-report.json](v0.6-static-report.json)、[v0.6-preview-report.json](v0.6-preview-report.json)、[v0.6-public-report.json](v0.6-public-report.json) | 主入口、静态 H5、预览与公网的浏览器验收 |
| [v0.6-steps-browser-report.json](v0.6-steps-browser-report.json)、[v0.6-steps-static-report.json](v0.6-steps-static-report.json) | 20 步重做后的主入口与静态包验收 |
| [v0.6-release-manifest.json](v0.6-release-manifest.json)、[v0.6-release-routing.json](v0.6-release-routing.json) | 发布文件清单与路由记录 |

当前稳定入口为 [v0.7 滑出新花样](http://106.12.167.253/tile-explorer/)。旧版 [v0.5](http://106.12.167.253/tile-explorer/releases/20261023-v05-win-9c1b3a91/) 和 [v0.4](http://106.12.167.253/tile-explorer/releases/20261022-v04-4b282549/) 的不可变版本目录仍可访问。

## 文档分工

| 文档 | 记录内容 |
|---|---|
| [ARCHITECTURE.md](../ARCHITECTURE.md) | 当前模块职责、状态流、共享资源清单与统一检查入口 |
| [ITERATION_LOG.md](../ITERATION_LOG.md) | 更新目标、新增功能、体验变化、内容、版本状态和面向玩家的限制 |
| 本目录 v0.6 文档 | 如何实现、模块与数据、交互流程、异常处理、测试和技术限制 |
| 本目录 v0.7 文档 | 正式版设计与 30 关制作规格；计划要求不代表实现或验证结果 |
| [DESIGN.md](../DESIGN.md) | 正式 v0.1 所包含的开发阶段 0.3 设计与研究依据 |
| [ASSETS_V3.md](../ASSETS_V3.md) | 已有卡通图集的素材制作记录、提示词和图集映射 |
| [IDEAS.md](../IDEAS.md) | 尚未纳入具体版本的候选创意，不表示已实现 |
| [VERSION_CONTROL.md](../VERSION_CONTROL.md) | 主分支、版本标签及后续提交约定 |

## 每次更新的维护方式

1. 在迭代记录中登记版本、日期、状态和玩家可感知的新内容，添加对应技术文档链接。
2. 为该代建立 `vX.Y.md`，写明基于哪一正式版本，区分“已实现做法”和“计划做法”。历史开发阶段使用 `dev-X.Y.md`。
3. 技术文档至少包含目标与边界、现有接入点、模块职责、数据或协议、关键流程、素材与存储、异常与降级、验证计划或结果、限制和后续事项。
4. 实现期间更新实际采用的决定，明确说明对原方案的调整，避免文档与最终实现不一致。
5. 只记录实际执行的验证及其结果，未执行、无法复现或设备不可用的项目明确标注。历史记录应说明来源，不把旧结果当作本次复测。
6. 验证后更新为“已验证”；正式发布时再补充真实提交、标签和日期，并同步 README 与本索引。
