# 牌面图集 V3

- 最终文件：`web/assets/tile-atlas-v3.png`
- 生成方式：Codex 内置 `image_gen.imagegen`，透明背景；未使用 CLI/API fallback，未进行程序化图片编辑。
- 风格参考：用户提供的 `IMG_0673.PNG`（参考图不纳入仓库）；仅参考其中饱满明亮、深色描边、有圆润体积和高光的卡通图案。
- 真实尺寸：1774 × 887（2:1），Format32bppArgb，保留原生 alpha。
- 完全透明像素：1,235,179 / 1,573,538（约 78.5%）。无白色牌框、标签或背景。
- 制作过程：先生成，随后使用同一内置工具修正格内留白两次。初版兔耳越过等分行边界，最终版18个完整图案均位于自己的等分单元内；图案占单元约 50%–62%，留足裁切安全边距。
- 渲染：6列 × 3行，CSS `background-size: 600% 300%` 按格显示。生成图并非整数256像素格，使用百分比等分。前端已用每图的alpha边界分别校准背景位置，修正第一行偏下、第三行偏上的问题，并统一放大1.42倍裁去透明留白；原PNG未修改。具体校准值见 `web/app.js` 的 `atlasPositions`。

## 顺序映射

按行、从左到右；下标均从0开始。

| 行 | 列 | 类型 | 图案 |
|---|---|---|---|
| 0 | 0 | apple | 红苹果 |
| 0 | 1 | banana | 黄色香蕉 |
| 0 | 2 | cherry | 红樱桃 |
| 0 | 3 | grape | 紫葡萄 |
| 0 | 4 | orange | 橙子与切面 |
| 0 | 5 | strawberry | 红草莓 |
| 1 | 0 | car | 蓝色汽车 |
| 1 | 1 | taxi | 黄色出租车 |
| 1 | 2 | bus | 绿色巴士 |
| 1 | 3 | train | 红米色火车 |
| 1 | 4 | bicycle | 青色自行车 |
| 1 | 5 | scooter | 紫色踏板摩托 |
| 2 | 0 | cat | 全身橘猫 |
| 2 | 1 | dog | 全身棕色小狗 |
| 2 | 2 | rabbit | 全身白兔 |
| 2 | 3 | panda | 全身熊猫 |
| 2 | 4 | fox | 全身狐狸 |
| 2 | 5 | bear | 全身棕熊 |

## 只读像素检查

用 Windows System.Drawing 读取尺寸和 alpha；未修改图片。以下为 alpha > 32 的实际图案边界，坐标为原图像素，右/下边界为排他坐标。所有图案均未碰等分格边缘。

```text
cell 0,0 bbox=[85,123,228,275]
cell 0,1 bbox=[370,129,531,273]
cell 0,2 bbox=[671,120,822,278]
cell 0,3 bbox=[968,124,1125,277]
cell 0,4 bbox=[1250,123,1416,284]
cell 0,5 bbox=[1560,119,1701,278]
cell 1,0 bbox=[75,402,243,525]
cell 1,1 bbox=[370,392,541,529]
cell 1,2 bbox=[663,395,836,524]
cell 1,3 bbox=[958,388,1124,529]
cell 1,4 bbox=[1240,400,1418,532]
cell 1,5 bbox=[1553,387,1710,533]
cell 2,0 bbox=[79,624,217,796]
cell 2,1 bbox=[371,631,531,799]
cell 2,2 bbox=[683,617,806,799]
cell 2,3 bbox=[961,630,1117,799]
cell 2,4 bbox=[1263,624,1418,800]
cell 2,5 bbox=[1554,628,1704,800]
```

## 完整提示词：初始生成

```text
Use case: stylized-concept.
Asset type: a single production sprite atlas for a casual triple-match tile game.
Reference image: the attached mobile game screenshot is a STYLE REFERENCE ONLY for the bright glossy cartoon symbols on the tiles. Do not copy its screen layout, UI, white tile backgrounds, or advertisement.
Primary request: Create ONE TRANSPARENT PNG sprite sheet with an EXACT UNIFORM GRID OF SIX COLUMNS AND THREE ROWS. Canvas aspect ratio 2:1, ideal 1536x768 pixels, each of the 18 square cells is exactly the same size. Each cell contains only ONE complete, independent cartoon object, centered at the exact middle of its cell and never touching any other cell. Each subject occupies about 78 to 82 percent of the square cell with generous clear transparent margin all around. Do not draw grid lines.
The exact order left to right, top to bottom is:
ROW ONE: shiny red apple with green leaf; yellow curved banana; pair of red cherries on joined stems; bunch of purple grapes with green leaf; whole orange with one orange cross section in front; ripe red strawberry with green leafy crown.
ROW TWO: blue compact car; yellow taxi with simple small roof sign but no letters; green city bus; red-and-cream train locomotive; turquoise bicycle with two fully visible wheels; purple motor scooter with two fully visible wheels.
ROW THREE: full-body sitting orange tabby cat; full-body sitting friendly brown dog; full-body sitting white rabbit with pink ears; full-body sitting black and white panda; full-body sitting orange fox with white chest and big tail; full-body sitting warm brown teddy-like bear.
Style/medium: high-quality hand-painted 2D casual mobile game symbols, puffy rounded forms, vivid saturated colors, thick clean dark outlines, a little soft volume shading, large white glossy specular highlights. High readability at 48 pixels. Match the reference screenshot's pleasant shiny toy-like symbol style. Cute complete small animals, not just flat face icons. Animals all face forward with a slight three-quarter turn, all show their body and feet. Keep all subjects consistent in illustration style.
Background: actual transparent alpha across every part outside the icon silhouettes. Absolutely no scenery, plate, pedestal, square, white card, colored circle, enclosing border, background shadow rectangle, checkerboard pixels, typography, label, logo, watermark, or text anywhere.
Composition constraint: exactly 18 icons, exactly 6 columns and 3 rows, no duplicates, no missing icons, no merging adjacent subjects. Every icon within its own square cell, evenly spaced on both axes with identical transparent margins.
```

## 完整提示词：第一次布局修正

```text
Use case: precise-object-edit.
Asset type: corrected transparent production sprite atlas for CSS grid extraction.
Edit the referenced image to fix ONE CRITICAL DEFECT: every subject MUST fit entirely inside its own cell on a PERFECT UNIFORM SIX-COLUMN THREE-ROW grid. Keep the same 18 subjects, the same exact row-major order, same colors, same glossy cute cartoon design and dark outline, same overall 2:1 canvas aspect ratio, and real transparent background. Do not add white tiles or panels.
Each of the 18 cells must be a perfect equal square. Inside EACH cell leave at least 12% of the cell width completely transparent along ALL FOUR EDGES. Thus each icon may occupy at most 76% of its square cell width and height, including ears, wheels, leaves, tails and outlines. Scale ALL subjects smaller if necessary. NO part of ANY subject may enter another cell. Rabbit ears MUST sit entirely within row three with 12% margin at top. All fruit leaves stay in row one with 12% top margin. Keep every object's center strictly at its cell center. Do not enlarge objects to fill outer canvas edges.
Grid: column center x positions 8.3333%,25%,41.6667%,58.3333%,75%,91.6667% of canvas width. Row center y positions 16.6667%,50%,83.3333% of canvas height. Align subject bounding-box centers to these positions. All 18 subject boxes must have identical maximum width and height in pixels.
Order remains EXACTLY:
row 1: red apple, yellow banana, pair of red cherries, purple grape bunch, orange with cut section, red strawberry.
row 2: blue car, yellow taxi, green bus, red cream train, turquoise bicycle, purple motor scooter.
row 3: full-body sitting orange cat, full-body sitting brown dog, full-body sitting white rabbit, full-body sitting panda, full-body sitting orange fox, full-body sitting brown bear.
No labels, letters, numbers, grid lines, background cards, background decoration, cast-shadow squares, duplicate subjects, checkerboard pixels or watermarks. Genuine transparent alpha outside the isolated icons. Preserve the same cheerful high quality cartoon rendering.
```

## 完整提示词：最终留白修正

```text
Use case: precise-object-edit.
This referenced image is a sprite atlas. Keep the EXACTLY SAME eighteen icons, order, style, transparent background and 2:1 canvas. The SOLE EDIT is resize each icon smaller independently about its own center: reduce EACH icon's width and height by a further TWENTY FIVE PERCENT (25%), leaving the transparent space where it used to be. Do not move or reflow the icons, do not crop canvas, do not enlarge anything to fill empty space. Every icon now MUST fit well within one of the eighteen equal square cells in a six-column, three-row grid. Rabbit ears may not cross above the third row. All icons must have huge ample transparent breathing room at every edge of every cell. The fruit remain in row 1, vehicles row 2, animals row 3. No typography, cards, colored background, grid, framing, shadow patches or any extra items. Preserve real transparent alpha. This is a sparse atlas with small icons and generous completely transparent gutters.
```

## 生成来源

最终内置工具输出已复制为项目内的 `web/assets/tile-atlas-v3.png`，并纳入版本管理。项目不依赖工具的默认生成目录。
