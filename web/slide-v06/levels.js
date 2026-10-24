/* Authored layouts; complete spatial proofs and scoring replays. */
(function(root){const levels=[
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
    "ruleset": "slide-v06-3",
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
    "ruleset": "slide-v06-3",
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
    "ruleset": "slide-v06-3",
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
    "title": "爱心停车位",
    "subtitle": "先放一块障碍，给两组水果安排停靠。",
    "rows": 3,
    "cols": 3,
    "mask": [
      "###",
      "###",
      "###"
    ],
    "rocks": [],
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 0,
        "col": 1
      },
      {
        "id": "t2",
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
        "id": "t4",
        "itemId": "fruit-0",
        "row": 1,
        "col": 2
      },
      {
        "id": "t6",
        "itemId": "fruit-1",
        "row": 2,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "fruit-0",
        "row": 2,
        "col": 1
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 2,
        "count": 2
      }
    },
    "footprintByChain": {},
    "pattern": [
      ".#.#.",
      "#####",
      "#####",
      ".###.",
      "..#.."
    ],
    "moveLimit": 20,
    "parMoves": 7,
    "twoStarScore": 650,
    "threeStarScore": 800,
    "ruleset": "slide-v06-3",
    "obstacle": {
      "enabled": true,
      "moveLimit": 0,
      "placementCells": [
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 2,
          "col": 2
        }
      ]
    },
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 0,
        "col": 0
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t3",
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
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "place-obstacle",
            "row": 0,
            "col": 0
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t3",
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
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "right"
          }
        ],
        "score": 800,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-05",
    "title": "横块先让路",
    "subtitle": "横着的车占两格，先留好整条通路。",
    "rows": 3,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####"
    ],
    "rocks": [],
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "car-0",
        "row": 0,
        "col": 1
      },
      {
        "id": "t6",
        "itemId": "car-1",
        "row": 1,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 1,
        "col": 2
      },
      {
        "id": "t3",
        "itemId": "fruit-1",
        "row": 2,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "car-0",
        "row": 2,
        "col": 2
      }
    ],
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
    "footprintByChain": {
      "car": {
        "width": 2,
        "height": 1
      }
    },
    "pattern": [
      ".###.",
      "#####",
      "#####",
      "#####",
      ".###."
    ],
    "moveLimit": 20,
    "parMoves": 12,
    "twoStarScore": 850,
    "threeStarScore": 1000,
    "ruleset": "slide-v06-3",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "up"
      },
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
        "tileId": "t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "left"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "up"
          },
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
            "tileId": "t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t4",
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
    "title": "花园竖着长",
    "subtitle": "竖块要整齐碰面，石块也能成为接应点。",
    "rows": 4,
    "cols": 3,
    "mask": [
      "###",
      "###",
      "###",
      "###"
    ],
    "rocks": [],
    "tiles": [
      {
        "id": "t3",
        "itemId": "fruit-1",
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
        "id": "t1",
        "itemId": "fruit-0",
        "row": 1,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "plant-0",
        "row": 1,
        "col": 2
      },
      {
        "id": "t5",
        "itemId": "plant-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 3,
        "col": 1
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 2,
        "count": 1
      },
      "plant": {
        "targetTier": 2,
        "count": 1
      }
    },
    "footprintByChain": {
      "plant": {
        "width": 1,
        "height": 2
      }
    },
    "pattern": [
      "##...##",
      "###.###",
      ".#####.",
      "###.###",
      "##...##"
    ],
    "moveLimit": 20,
    "parMoves": 13,
    "twoStarScore": 850,
    "threeStarScore": 1000,
    "ruleset": "slide-v06-3",
    "obstacle": {
      "enabled": true,
      "moveLimit": 0,
      "placementCells": [
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 3,
        "col": 2
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "left"
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
        "tileId": "t6",
        "direction": "up"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "place-obstacle",
            "row": 3,
            "col": 2
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "left"
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
            "tileId": "t6",
            "direction": "up"
          }
        ],
        "score": 1000,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-07",
    "title": "小鸟换个停点",
    "subtitle": "每次挪动一格，把障碍的机会留给苹果。",
    "rows": 3,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####"
    ],
    "rocks": [],
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
        "row": 0,
        "col": 1
      },
      {
        "id": "t3",
        "itemId": "fruit-0",
        "row": 0,
        "col": 3
      },
      {
        "id": "t4",
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
        "col": 1
      },
      {
        "id": "t8",
        "itemId": "fruit-0",
        "row": 2,
        "col": 2
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      }
    },
    "footprintByChain": {},
    "pattern": [
      "...#...",
      "..###..",
      "#######",
      ".#####.",
      "..###..",
      "...#..."
    ],
    "moveLimit": 20,
    "parMoves": 8,
    "twoStarScore": 1700,
    "threeStarScore": 1850,
    "ruleset": "slide-v06-3",
    "obstacle": {
      "enabled": true,
      "moveLimit": 1,
      "placementCells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 0,
        "col": 2
      },
      {
        "type": "move-obstacle",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "down"
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
        "tileId": "t4",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "place-obstacle",
            "row": 0,
            "col": 2
          },
          {
            "type": "move-obstacle",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
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
            "tileId": "t4",
            "direction": "right"
          }
        ],
        "score": 1850,
        "stars": 3
      }
    ],
    "design": {
      "withoutObstacleMoves": 8
    }
  },
  {
    "id": "slide06-08",
    "title": "大块的转身空间",
    "subtitle": "四格大块不能挤过窄口，小块先腾出位置。",
    "rows": 4,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [],
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 0,
        "col": 1
      },
      {
        "id": "t5",
        "itemId": "plant-1",
        "row": 1,
        "col": 0
      },
      {
        "id": "t6",
        "itemId": "plant-2",
        "row": 2,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "plant-0",
        "row": 2,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 2,
        "col": 2
      },
      {
        "id": "t4",
        "itemId": "plant-0",
        "row": 3,
        "col": 0
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 1,
        "count": 1
      },
      "plant": {
        "targetTier": 3,
        "count": 1
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 2,
        "height": 2
      }
    },
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
    "parMoves": 8,
    "twoStarScore": 750,
    "threeStarScore": 900,
    "ruleset": "slide-v06-3",
    "obstacle": {
      "enabled": true,
      "moveLimit": 2,
      "placementCells": [
        {
          "row": 3,
          "col": 1
        }
      ]
    },
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 3,
        "col": 1
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "move-obstacle",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "up"
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
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "place-obstacle",
            "row": 3,
            "col": 1
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "move-obstacle",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "up"
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
          }
        ],
        "score": 900,
        "stars": 3
      }
    ],
    "design": {
      "withoutObstacleMoves": 9
    }
  },
  {
    "id": "slide06-09",
    "title": "双心倒着想",
    "subtitle": "先想桃子在哪儿相遇，再安排横块让路。",
    "rows": 3,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####"
    ],
    "rocks": [],
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "fruit-3",
        "row": 0,
        "col": 1
      },
      {
        "id": "t6",
        "itemId": "car-0",
        "row": 0,
        "col": 2
      },
      {
        "id": "t3",
        "itemId": "fruit-1",
        "row": 1,
        "col": 0
      },
      {
        "id": "t7",
        "itemId": "car-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 2,
        "col": 2
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 2,
        "col": 3
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 1
      },
      "car": {
        "targetTier": 1,
        "count": 1
      }
    },
    "footprintByChain": {
      "car": {
        "width": 2,
        "height": 1
      }
    },
    "pattern": [
      ".#...#.",
      "###.###",
      "#######",
      "#######",
      ".#####.",
      "..#.#.."
    ],
    "moveLimit": 20,
    "parMoves": 12,
    "twoStarScore": 1300,
    "threeStarScore": 1450,
    "ruleset": "slide-v06-3",
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t1",
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
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "down"
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
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "up"
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
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "down"
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
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "right"
          }
        ],
        "score": 1450,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide06-10",
    "title": "凤凰归巢",
    "subtitle": "先让种子成长腾出通路，再把两颗大桃子送到一起。",
    "rows": 4,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [],
    "tiles": [
      {
        "id": "t3",
        "itemId": "plant-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t7",
        "itemId": "plant-2",
        "row": 0,
        "col": 1
      },
      {
        "id": "t1",
        "itemId": "fruit-3",
        "row": 0,
        "col": 2
      },
      {
        "id": "t4",
        "itemId": "plant-0",
        "row": 1,
        "col": 1
      },
      {
        "id": "t5",
        "itemId": "plant-0",
        "row": 2,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-3",
        "row": 2,
        "col": 2
      },
      {
        "id": "t6",
        "itemId": "plant-0",
        "row": 3,
        "col": 1
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
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 2,
        "height": 2
      }
    },
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
    "parMoves": 7,
    "twoStarScore": 1300,
    "threeStarScore": 1450,
    "ruleset": "slide-v06-3",
    "obstacle": {
      "enabled": true,
      "moveLimit": 3,
      "placementCells": [
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 3,
        "col": 0
      },
      {
        "type": "move-obstacle",
        "direction": "up"
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
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "place-obstacle",
            "row": 3,
            "col": 0
          },
          {
            "type": "move-obstacle",
            "direction": "up"
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
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "down"
          }
        ],
        "score": 1450,
        "stars": 3
      }
    ],
    "design": {
      "withoutObstacleMoves": 7
    }
  }
];root.TileSlideV06={...(root.TileSlideV06||{}),levels};if(typeof module!=="undefined")module.exports=levels;})(globalThis);
