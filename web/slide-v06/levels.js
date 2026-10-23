/* Authored by reverse moves, verified by forward replay. */
(function(root){
  const levels=[
  {
    "id": "slide06-01",
    "title": "初次碰面",
    "subtitle": "20步内，让两颗荔枝碰个面。",
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
    "pattern": [
      "###",
      "###"
    ],
    "moveLimit": 20,
    "parMoves": 1,
    "twoStarScore": 150,
    "threeStarScore": 300,
    "ruleset": "slide-v06-2",
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
    "subtitle": "20步内，安排两次升级。",
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
    "pattern": [
      "###",
      "###",
      "###"
    ],
    "moveLimit": 20,
    "parMoves": 4,
    "twoStarScore": 350,
    "threeStarScore": 500,
    "ruleset": "slide-v06-2",
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
    "subtitle": "20步内，选好新图案留下的位置。",
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
        "targetTier": 3,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t3",
        "itemId": "fruit-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 1,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
        "row": 1,
        "col": 1
      },
      {
        "id": "t4",
        "itemId": "fruit-0",
        "row": 2,
        "col": 0
      }
    ],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
    ],
    "moveLimit": 20,
    "parMoves": 6,
    "twoStarScore": 650,
    "threeStarScore": 800,
    "ruleset": "slide-v06-2",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "right"
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
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "right"
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
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
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
    "subtitle": "20步内，完成两段苹果接力。",
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
        "count": 2
      }
    },
    "tiles": [
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 0,
        "col": 1
      },
      {
        "id": "t1",
        "itemId": "fruit-1",
        "row": 0,
        "col": 2
      },
      {
        "id": "t4",
        "itemId": "fruit-0",
        "row": 1,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "fruit-1",
        "row": 1,
        "col": 1
      },
      {
        "id": "t5",
        "itemId": "fruit-0",
        "row": 1,
        "col": 2
      },
      {
        "id": "t7",
        "itemId": "fruit-0",
        "row": 2,
        "col": 1
      }
    ],
    "pattern": [
      ".#.#.",
      "#####",
      "#####",
      ".###.",
      "..#.."
    ],
    "moveLimit": 20,
    "parMoves": 6,
    "twoStarScore": 850,
    "threeStarScore": 1000,
    "ruleset": "slide-v06-2",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "down"
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
        "tileId": "t7",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
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
            "tileId": "t7",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
    "subtitle": "20步内，水果和汽车互相让路。",
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
      },
      "car": {
        "targetTier": 2,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "car-0",
        "row": 0,
        "col": 2
      },
      {
        "id": "t5",
        "itemId": "car-0",
        "row": 1,
        "col": 0
      },
      {
        "id": "t1",
        "itemId": "fruit-1",
        "row": 1,
        "col": 1
      },
      {
        "id": "t4",
        "itemId": "car-1",
        "row": 2,
        "col": 0
      },
      {
        "id": "t7",
        "itemId": "fruit-0",
        "row": 2,
        "col": 1
      }
    ],
    "pattern": [
      ".###.",
      "#####",
      "#####",
      "#####",
      ".###."
    ],
    "moveLimit": 20,
    "parMoves": 8,
    "twoStarScore": 850,
    "threeStarScore": 1000,
    "ruleset": "slide-v06-2",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "left"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
          }
        ],
        "score": 1000,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-06",
    "title": "蝴蝶借道",
    "subtitle": "20步内，让嫩芽长成大树。",
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
      },
      "plant": {
        "targetTier": 3,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t4",
        "itemId": "fruit-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t6",
        "itemId": "plant-1",
        "row": 0,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "plant-0",
        "row": 0,
        "col": 2
      },
      {
        "id": "t3",
        "itemId": "fruit-1",
        "row": 1,
        "col": 1
      },
      {
        "id": "t7",
        "itemId": "plant-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t1",
        "itemId": "plant-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "t8",
        "itemId": "fruit-0",
        "row": 2,
        "col": 2
      }
    ],
    "pattern": [
      "##...##",
      "###.###",
      ".#####.",
      "###.###",
      "##...##"
    ],
    "moveLimit": 20,
    "parMoves": 11,
    "twoStarScore": 1200,
    "threeStarScore": 1350,
    "ruleset": "slide-v06-2",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "right"
          }
        ],
        "score": 1350,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-07",
    "title": "小鸟展翅",
    "subtitle": "20步内，把荔枝逐层合成桃子。",
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
        "targetTier": 3,
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
        "id": "t4",
        "itemId": "fruit-1",
        "row": 0,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 0,
        "col": 2
      },
      {
        "id": "t3",
        "itemId": "fruit-0",
        "row": 1,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "fruit-0",
        "row": 1,
        "col": 1
      },
      {
        "id": "t6",
        "itemId": "fruit-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t7",
        "itemId": "fruit-0",
        "row": 2,
        "col": 2
      }
    ],
    "pattern": [
      "...#...",
      "..###..",
      "#######",
      ".#####.",
      "..###..",
      "...#..."
    ],
    "moveLimit": 20,
    "parMoves": 7,
    "twoStarScore": 1450,
    "threeStarScore": 1600,
    "ruleset": "slide-v06-2",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "down"
          }
        ],
        "score": 1600,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-08",
    "title": "星光接力",
    "subtitle": "20步内，安排三条升级路线。",
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
      },
      "plant": {
        "targetTier": 2,
        "count": 1
      },
      "car": {
        "targetTier": 1,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t4",
        "itemId": "plant-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "car-0",
        "row": 0,
        "col": 1
      },
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 0,
        "col": 2
      },
      {
        "id": "t7",
        "itemId": "fruit-0",
        "row": 1,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "plant-1",
        "row": 1,
        "col": 1
      },
      {
        "id": "t6",
        "itemId": "car-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
        "row": 2,
        "col": 1
      },
      {
        "id": "t8",
        "itemId": "plant-0",
        "row": 2,
        "col": 2
      }
    ],
    "pattern": [
      "...#...",
      "..###..",
      "#######",
      ".#####.",
      "..###..",
      ".##.##.",
      ".#...#."
    ],
    "moveLimit": 20,
    "parMoves": 12,
    "twoStarScore": 950,
    "threeStarScore": 1100,
    "ruleset": "slide-v06-2",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t8",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "right"
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
            "tileId": "t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t8",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "right"
          }
        ],
        "score": 1100,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-09",
    "title": "双心相连",
    "subtitle": "20步内，让两颗桃子合成西瓜。",
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
        "targetTier": 4,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t5",
        "itemId": "fruit-0",
        "row": 0,
        "col": 1
      },
      {
        "id": "t1",
        "itemId": "fruit-3",
        "row": 1,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "fruit-1",
        "row": 1,
        "col": 1
      },
      {
        "id": "t6",
        "itemId": "fruit-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      }
    ],
    "pattern": [
      ".#...#.",
      "###.###",
      "#######",
      "#######",
      ".#####.",
      "..#.#.."
    ],
    "moveLimit": 20,
    "parMoves": 8,
    "twoStarScore": 1050,
    "threeStarScore": 1200,
    "ruleset": "slide-v06-2",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "left"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
          }
        ],
        "score": 1200,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-10",
    "title": "凤凰归巢",
    "subtitle": "20步内，完成四级成长与跨链接力。",
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
        "targetTier": 4,
        "count": 1
      },
      "plant": {
        "targetTier": 2,
        "count": 1
      }
    },
    "tiles": [
      {
        "id": "t3",
        "itemId": "plant-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "plant-1",
        "row": 0,
        "col": 1
      },
      {
        "id": "t7",
        "itemId": "fruit-0",
        "row": 0,
        "col": 2
      },
      {
        "id": "t5",
        "itemId": "fruit-1",
        "row": 1,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 1,
        "col": 1
      },
      {
        "id": "t9",
        "itemId": "fruit-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t1",
        "itemId": "fruit-3",
        "row": 2,
        "col": 1
      },
      {
        "id": "t6",
        "itemId": "plant-0",
        "row": 2,
        "col": 2
      }
    ],
    "pattern": [
      "...#...",
      "..###..",
      "#######",
      ".#####.",
      "..###..",
      ".##.##.",
      "##...##"
    ],
    "moveLimit": 20,
    "parMoves": 15,
    "twoStarScore": 1600,
    "threeStarScore": 1750,
    "ruleset": "slide-v06-2",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "right"
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
        "tileId": "t7",
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
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t9",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "right"
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
            "tileId": "t7",
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
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t9",
            "direction": "down"
          }
        ],
        "score": 1750,
        "stars": 3
      }
    ]
  }
];
  root.TileSlideV06={...(root.TileSlideV06||{}),levels};
  if(typeof module!=="undefined")module.exports=levels;
})(globalThis);
