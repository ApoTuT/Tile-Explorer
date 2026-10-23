/* Authored by reverse moves, verified by forward replay. */
(function(root){
  const levels=[
  {
    "id": "slide06-01",
    "title": "初次碰面",
    "subtitle": "朝荔枝划一下，碰到同类就升级。",
    "rows": 2,
    "cols": 3,
    "mask": [
      "###",
      "###"
    ],
    "rocks": [],
    "chainGoals": {
      "fruit": {
        "targetTier": 1,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 1,
        "col": 0
      }
    ],
    "parMoves": 1,
    "twoStarScore": 150,
    "threeStarScore": 300,
    "ruleset": "slide-v06-1",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "up"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "up"
          }
        ],
        "score": 300,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-02",
    "title": "苹果接力",
    "subtitle": "橘子会留下来，再找一颗橘子。",
    "rows": 3,
    "cols": 3,
    "mask": [
      "###",
      "###",
      "###"
    ],
    "rocks": [],
    "chainGoals": {
      "fruit": {
        "targetTier": 2,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
        "row": 2,
        "col": 2
      },
      {
        "id": "t3",
        "itemId": "fruit-0",
        "row": 1,
        "col": 1
      }
    ],
    "parMoves": 4,
    "twoStarScore": 350,
    "threeStarScore": 500,
    "ruleset": "slide-v06-1",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          }
        ],
        "score": 500,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-03",
    "title": "三步成长",
    "subtitle": "想一想，新图案应该留在哪里？",
    "rows": 4,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 2,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "fruit-1",
        "row": 2,
        "col": 3
      },
      {
        "id": "t4",
        "itemId": "fruit-0",
        "row": 0,
        "col": 2
      }
    ],
    "parMoves": 7,
    "twoStarScore": 650,
    "threeStarScore": 800,
    "ruleset": "slide-v06-1",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          }
        ],
        "score": 800,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-04",
    "title": "爱心相遇",
    "subtitle": "两颗苹果，两段接力。",
    "rows": 5,
    "cols": 5,
    "mask": [
      ".#.#.",
      "#####",
      "#####",
      ".###.",
      "..#.."
    ],
    "rocks": [],
    "chainGoals": {
      "fruit": {
        "targetTier": 2,
        "count": 2
      }
    },
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 3,
        "col": 2
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
        "row": 1,
        "col": 1
      },
      {
        "id": "t3",
        "itemId": "fruit-0",
        "row": 2,
        "col": 4
      },
      {
        "id": "t4",
        "itemId": "fruit-1",
        "row": 2,
        "col": 3
      },
      {
        "id": "t5",
        "itemId": "fruit-0",
        "row": 2,
        "col": 2
      },
      {
        "id": "t7",
        "itemId": "fruit-0",
        "row": 0,
        "col": 3
      }
    ],
    "parMoves": 9,
    "twoStarScore": 850,
    "threeStarScore": 1000,
    "ruleset": "slide-v06-1",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
          }
        ],
        "score": 1000,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-05",
    "title": "花园绕一绕",
    "subtitle": "石块不会动，也能帮你停靠。",
    "rows": 5,
    "cols": 5,
    "mask": [
      ".###.",
      "#####",
      "#####",
      "#####",
      ".###."
    ],
    "rocks": [
      {
        "row": 2,
        "col": 2
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      },
      "car": {
        "targetTier": 2,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t1",
        "itemId": "car-1",
        "row": 3,
        "col": 2
      },
      {
        "id": "t3",
        "itemId": "car-0",
        "row": 3,
        "col": 4
      },
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 2,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "fruit-1",
        "row": 1,
        "col": 0
      },
      {
        "id": "t6",
        "itemId": "car-0",
        "row": 3,
        "col": 3
      },
      {
        "id": "t7",
        "itemId": "fruit-0",
        "row": 1,
        "col": 3
      },
      {
        "id": "t8",
        "itemId": "fruit-0",
        "row": 1,
        "col": 4
      }
    ],
    "parMoves": 12,
    "twoStarScore": 1200,
    "threeStarScore": 1350,
    "ruleset": "slide-v06-1",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "left"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          }
        ],
        "score": 1350,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-06",
    "title": "蝴蝶借道",
    "subtitle": "留住中间形态，让双翼接起来。",
    "rows": 5,
    "cols": 7,
    "mask": [
      "##...##",
      "###.###",
      ".#####.",
      "###.###",
      "##...##"
    ],
    "rocks": [
      {
        "row": 1,
        "col": 1
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      },
      "plant": {
        "targetTier": 3,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t1",
        "itemId": "plant-1",
        "row": 2,
        "col": 5
      },
      {
        "id": "t2",
        "itemId": "plant-2",
        "row": 3,
        "col": 1
      },
      {
        "id": "t3",
        "itemId": "fruit-0",
        "row": 0,
        "col": 5
      },
      {
        "id": "t5",
        "itemId": "fruit-2",
        "row": 3,
        "col": 5
      },
      {
        "id": "t6",
        "itemId": "plant-0",
        "row": 2,
        "col": 2
      },
      {
        "id": "t9",
        "itemId": "fruit-1",
        "row": 1,
        "col": 5
      },
      {
        "id": "t11",
        "itemId": "plant-0",
        "row": 2,
        "col": 3
      },
      {
        "id": "t15",
        "itemId": "fruit-0",
        "row": 0,
        "col": 6
      }
    ],
    "parMoves": 15,
    "twoStarScore": 1550,
    "threeStarScore": 1700,
    "ruleset": "slide-v06-1",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t9",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t9",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t15",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t15",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t9",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t11",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t9",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t9",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t9",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t15",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t15",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t9",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t11",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t9",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          }
        ],
        "score": 1700,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-07",
    "title": "小鸟展翅",
    "subtitle": "从八颗荔枝，慢慢合成一颗桃子。",
    "rows": 6,
    "cols": 7,
    "mask": [
      "...#...",
      "..###..",
      "#######",
      ".#####.",
      "..###..",
      "...#..."
    ],
    "rocks": [],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      },
      "plant": {
        "targetTier": 3,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 2,
        "col": 4
      },
      {
        "id": "t3",
        "itemId": "plant-0",
        "row": 4,
        "col": 2
      },
      {
        "id": "t4",
        "itemId": "plant-2",
        "row": 4,
        "col": 4
      },
      {
        "id": "t6",
        "itemId": "plant-1",
        "row": 1,
        "col": 3
      },
      {
        "id": "t8",
        "itemId": "fruit-0",
        "row": 3,
        "col": 2
      },
      {
        "id": "t9",
        "itemId": "plant-0",
        "row": 2,
        "col": 3
      },
      {
        "id": "t13",
        "itemId": "fruit-0",
        "row": 2,
        "col": 5
      },
      {
        "id": "t14",
        "itemId": "fruit-0",
        "row": 3,
        "col": 4
      },
      {
        "id": "t16",
        "itemId": "fruit-0",
        "row": 2,
        "col": 2
      },
      {
        "id": "t18",
        "itemId": "fruit-0",
        "row": 3,
        "col": 5
      },
      {
        "id": "t27",
        "itemId": "fruit-0",
        "row": 2,
        "col": 1
      }
    ],
    "parMoves": 31,
    "twoStarScore": 2450,
    "threeStarScore": 2600,
    "ruleset": "slide-v06-1",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t27",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t9",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t18",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t9",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t16",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t9",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t14",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t13",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t9",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t27",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t9",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t18",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t9",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t16",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t9",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t14",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t13",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t9",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          }
        ],
        "score": 2600,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-08",
    "title": "星光接力",
    "subtitle": "三条升级路线，共用一片星光。",
    "rows": 7,
    "cols": 7,
    "mask": [
      "...#...",
      "..###..",
      "#######",
      ".#####.",
      "..###..",
      ".##.##.",
      ".#...#."
    ],
    "rocks": [
      {
        "row": 3,
        "col": 3
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      },
      "plant": {
        "targetTier": 3,
        "count": 1
      },
      "car": {
        "targetTier": 2,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 3,
        "col": 2
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
        "row": 2,
        "col": 5
      },
      {
        "id": "t3",
        "itemId": "car-1",
        "row": 2,
        "col": 6
      },
      {
        "id": "t4",
        "itemId": "car-0",
        "row": 3,
        "col": 4
      },
      {
        "id": "t5",
        "itemId": "plant-1",
        "row": 1,
        "col": 2
      },
      {
        "id": "t7",
        "itemId": "plant-2",
        "row": 2,
        "col": 0
      },
      {
        "id": "t10",
        "itemId": "plant-0",
        "row": 3,
        "col": 1
      },
      {
        "id": "t11",
        "itemId": "fruit-0",
        "row": 1,
        "col": 3
      },
      {
        "id": "t12",
        "itemId": "car-0",
        "row": 3,
        "col": 5
      },
      {
        "id": "t13",
        "itemId": "fruit-0",
        "row": 1,
        "col": 4
      },
      {
        "id": "t14",
        "itemId": "plant-0",
        "row": 2,
        "col": 4
      }
    ],
    "parMoves": 18,
    "twoStarScore": 2100,
    "threeStarScore": 2250,
    "ruleset": "slide-v06-1",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t14",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t14",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t13",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t12",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t12",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t11",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t11",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t10",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t14",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t14",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t13",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t12",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t12",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t11",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t11",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t10",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
          }
        ],
        "score": 2250,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-09",
    "title": "双心相连",
    "subtitle": "先安排接应，再让桃子相遇。",
    "rows": 6,
    "cols": 7,
    "mask": [
      ".#...#.",
      "###.###",
      "#######",
      "#######",
      ".#####.",
      "..#.#.."
    ],
    "rocks": [
      {
        "row": 3,
        "col": 3
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 1
      },
      "plant": {
        "targetTier": 3,
        "count": 1
      },
      "car": {
        "targetTier": 2,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-3",
        "row": 0,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
        "row": 3,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "plant-0",
        "row": 2,
        "col": 2
      },
      {
        "id": "t4",
        "itemId": "plant-2",
        "row": 2,
        "col": 6
      },
      {
        "id": "t5",
        "itemId": "car-1",
        "row": 1,
        "col": 2
      },
      {
        "id": "t6",
        "itemId": "car-0",
        "row": 3,
        "col": 2
      },
      {
        "id": "t7",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "t8",
        "itemId": "plant-1",
        "row": 1,
        "col": 0
      },
      {
        "id": "t12",
        "itemId": "fruit-0",
        "row": 3,
        "col": 1
      },
      {
        "id": "t13",
        "itemId": "car-0",
        "row": 4,
        "col": 2
      },
      {
        "id": "t16",
        "itemId": "fruit-0",
        "row": 4,
        "col": 1
      },
      {
        "id": "t18",
        "itemId": "plant-0",
        "row": 2,
        "col": 4
      }
    ],
    "parMoves": 20,
    "twoStarScore": 2500,
    "threeStarScore": 2650,
    "ruleset": "slide-v06-1",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t18",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t16",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t13",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t12",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "up"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t18",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t16",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t13",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t12",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "up"
          }
        ],
        "score": 2650,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-10",
    "title": "凤凰归巢",
    "subtitle": "双翼与长尾，都藏着下一次成长。",
    "rows": 7,
    "cols": 7,
    "mask": [
      "...#...",
      "..###..",
      "#######",
      ".#####.",
      "..###..",
      ".##.##.",
      "##...##"
    ],
    "rocks": [
      {
        "row": 3,
        "col": 3
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 2
      },
      "plant": {
        "targetTier": 3,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-3",
        "row": 6,
        "col": 6
      },
      {
        "id": "t5",
        "itemId": "fruit-2",
        "row": 5,
        "col": 4
      },
      {
        "id": "t6",
        "itemId": "fruit-0",
        "row": 2,
        "col": 5
      },
      {
        "id": "t7",
        "itemId": "fruit-3",
        "row": 2,
        "col": 1
      },
      {
        "id": "t8",
        "itemId": "plant-1",
        "row": 1,
        "col": 3
      },
      {
        "id": "t9",
        "itemId": "plant-2",
        "row": 2,
        "col": 4
      },
      {
        "id": "t10",
        "itemId": "fruit-0",
        "row": 4,
        "col": 3
      },
      {
        "id": "t11",
        "itemId": "plant-0",
        "row": 3,
        "col": 1
      },
      {
        "id": "t15",
        "itemId": "fruit-2",
        "row": 2,
        "col": 6
      },
      {
        "id": "t16",
        "itemId": "fruit-1",
        "row": 3,
        "col": 4
      },
      {
        "id": "t17",
        "itemId": "plant-0",
        "row": 3,
        "col": 2
      },
      {
        "id": "t19",
        "itemId": "fruit-1",
        "row": 5,
        "col": 2
      },
      {
        "id": "t21",
        "itemId": "fruit-0",
        "row": 3,
        "col": 5
      },
      {
        "id": "t23",
        "itemId": "fruit-0",
        "row": 4,
        "col": 4
      }
    ],
    "parMoves": 24,
    "twoStarScore": 3250,
    "threeStarScore": 3400,
    "ruleset": "slide-v06-1",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t19",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t23",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t10",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t21",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t19",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t17",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t16",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t15",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t11",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t10",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t9",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t19",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t23",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t10",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t21",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t19",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t17",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t16",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t15",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t11",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t10",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t9",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "right"
          }
        ],
        "score": 3400,
        "stars": 3
      }
    ]
  }
];
  root.TileSlideV06={...(root.TileSlideV06||{}),levels};
  if(typeof module!=="undefined")module.exports=levels;
})(globalThis);
