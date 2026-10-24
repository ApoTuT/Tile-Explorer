/* Thirty authored levels; complete kernel proofs in docs/technical/v0.7-level-report.json. */
(function(root){const levels=[
  {
    "id": "slide07-01",
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
    "ruleset": "slide-v07-1",
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
    ],
    "chapter": 1,
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ]
  },
  {
    "id": "slide07-02",
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
    "ruleset": "slide-v07-1",
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
    ],
    "chapter": 1,
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ]
  },
  {
    "id": "slide07-03",
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
    "ruleset": "slide-v07-1",
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
    ],
    "chapter": 1,
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ]
  },
  {
    "id": "slide07-04",
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
    "ruleset": "slide-v07-1",
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
    ],
    "chapter": 1,
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ]
  },
  {
    "id": "slide07-05",
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
    "ruleset": "slide-v07-1",
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
    ],
    "chapter": 1,
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ]
  },
  {
    "id": "slide07-06",
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
    "ruleset": "slide-v07-1",
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
    ],
    "chapter": 2,
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ]
  },
  {
    "id": "slide07-07",
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
    "ruleset": "slide-v07-1",
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
    },
    "chapter": 2,
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ]
  },
  {
    "id": "slide07-08",
    "title": "大块的落脚处",
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
    "ruleset": "slide-v07-1",
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
    },
    "chapter": 2,
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ]
  },
  {
    "id": "slide07-09",
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
    "ruleset": "slide-v07-1",
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
    ],
    "chapter": 2,
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ]
  },
  {
    "id": "slide07-10",
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
    "ruleset": "slide-v07-1",
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
    },
    "chapter": 2,
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ]
  },
  {
    "id": "slide07-11",
    "title": "双线会车",
    "subtitle": "横车和水果共用通道，先安排谁的落点？",
    "chapter": 3,
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
        "id": "t5",
        "itemId": "car-1",
        "row": 0,
        "col": 0
      },
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 3
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 1,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "t6",
        "itemId": "car-1",
        "row": 3,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 3,
        "col": 2
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
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
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 9,
    "twoStarScore": 1100,
    "threeStarScore": 1300,
    "ruleset": "slide-v07-1",
    "obstacle": {
      "enabled": true,
      "moveLimit": 1,
      "placementCells": [
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "place-obstacle",
            "row": 2,
            "col": 0
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
            "type": "slide",
            "tileId": "t2",
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
            "tileId": "t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "up"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "place-obstacle",
                "row": 2,
                "col": 0
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
                "type": "slide",
                "tileId": "t2",
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
                "tileId": "t4",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t6",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t5",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t1",
                "direction": "up"
              }
            ],
            "score": 1300,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 2,
        "col": 0
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
        "type": "slide",
        "tileId": "t2",
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
        "tileId": "t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "up"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "place-obstacle",
            "row": 2,
            "col": 0
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
            "type": "slide",
            "tileId": "t2",
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
            "tileId": "t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "up"
          }
        ],
        "score": 1300,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-12",
    "title": "借一段树荫",
    "subtitle": "先借植物停靠，再决定何时收走。",
    "chapter": 3,
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
        "id": "t3",
        "itemId": "fruit-1",
        "row": 0,
        "col": 1
      },
      {
        "id": "t7",
        "itemId": "plant-1",
        "row": 0,
        "col": 2
      },
      {
        "id": "t5",
        "itemId": "plant-0",
        "row": 1,
        "col": 0
      },
      {
        "id": "t6",
        "itemId": "plant-0",
        "row": 1,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 1,
        "col": 3
      },
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 2,
        "col": 2
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
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
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 9,
    "twoStarScore": 1000,
    "threeStarScore": 1200,
    "ruleset": "slide-v07-1",
    "obstacle": {
      "enabled": true,
      "moveLimit": 1,
      "placementCells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "place-obstacle",
            "row": 0,
            "col": 3
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
            "type": "slide",
            "tileId": "t3",
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
            "tileId": "t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "right"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "place-obstacle",
                "row": 0,
                "col": 3
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
                "type": "slide",
                "tileId": "t3",
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
                "tileId": "t3",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t1",
                "direction": "right"
              }
            ],
            "score": 1200,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 0,
        "col": 3
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
        "type": "slide",
        "tileId": "t3",
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
        "tileId": "t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "place-obstacle",
            "row": 0,
            "col": 3
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
            "type": "slide",
            "tileId": "t3",
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
            "tileId": "t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "right"
          }
        ],
        "score": 1200,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-13",
    "title": "三路会合",
    "subtitle": "三条链只各合成一次，顺序很重要。",
    "chapter": 3,
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
        "itemId": "fruit-2",
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
        "id": "t3",
        "itemId": "plant-1",
        "row": 0,
        "col": 3
      },
      {
        "id": "t6",
        "itemId": "car-0",
        "row": 1,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "plant-1",
        "row": 1,
        "col": 2
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 3
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
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
    "footprintByChain": {
      "plant": {
        "width": 1,
        "height": 2
      },
      "car": {
        "width": 2,
        "height": 1
      }
    },
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 8,
    "twoStarScore": 600,
    "threeStarScore": 800,
    "ruleset": "slide-v07-1",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
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
            "tileId": "t3",
            "direction": "left"
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
            "tileId": "t5",
            "direction": "down"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "t6",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t1",
                "direction": "down"
              },
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
                "tileId": "t3",
                "direction": "left"
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
                "tileId": "t5",
                "direction": "down"
              }
            ],
            "score": 800,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
      },
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
        "tileId": "t3",
        "direction": "left"
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
        "tileId": "t5",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
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
            "tileId": "t3",
            "direction": "left"
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
            "tileId": "t5",
            "direction": "down"
          }
        ],
        "score": 800,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-14",
    "title": "最后一个停点",
    "subtitle": "从最后两个桃子的碰面位置倒着想。",
    "chapter": 3,
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
        "id": "t4",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "t6",
        "itemId": "plant-1",
        "row": 0,
        "col": 2
      },
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 0,
        "col": 3
      },
      {
        "id": "t5",
        "itemId": "fruit-3",
        "row": 1,
        "col": 0
      },
      {
        "id": "t7",
        "itemId": "plant-1",
        "row": 1,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 2,
        "col": 2
      },
      {
        "id": "t3",
        "itemId": "fruit-1",
        "row": 2,
        "col": 3
      }
    ],
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
    "footprintByChain": {
      "plant": {
        "width": 1,
        "height": 2
      }
    },
    "features": {
      "crates": [],
      "brakes": [],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 11,
    "twoStarScore": 1300,
    "threeStarScore": 1500,
    "ruleset": "slide-v07-1",
    "obstacle": {
      "enabled": true,
      "moveLimit": 1,
      "placementCells": [
        {
          "row": 0,
          "col": 1
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "place-obstacle",
            "row": 0,
            "col": 1
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
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "move-obstacle",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t7",
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
            "direction": "up"
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
            "tileId": "t3",
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
                "type": "place-obstacle",
                "row": 0,
                "col": 1
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
                "tileId": "t3",
                "direction": "up"
              },
              {
                "type": "move-obstacle",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t7",
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
                "direction": "up"
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
                "tileId": "t3",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t4",
                "direction": "down"
              }
            ],
            "score": 1500,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 0,
        "col": 1
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
        "tileId": "t3",
        "direction": "up"
      },
      {
        "type": "move-obstacle",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t7",
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
        "direction": "up"
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
        "tileId": "t3",
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
            "type": "place-obstacle",
            "row": 0,
            "col": 1
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
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "move-obstacle",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t7",
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
            "direction": "up"
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
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "down"
          }
        ],
        "score": 1500,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-15",
    "title": "砰，路开了",
    "subtitle": "带爆破标记的苹果合成，会炸开四周木箱。",
    "chapter": 3,
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
        "id": "t3",
        "itemId": "car-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 0,
        "col": 1
      },
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 2
      },
      {
        "id": "t4",
        "itemId": "car-0",
        "row": 2,
        "col": 0
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      },
      "car": {
        "targetTier": 1,
        "count": 1
      }
    },
    "footprintByChain": {},
    "features": {
      "crates": [
        {
          "id": "crate-0",
          "row": 1,
          "col": 0
        }
      ],
      "brakes": [],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 7,
    "twoStarScore": 350,
    "threeStarScore": 550,
    "ruleset": "slide-v07-1",
    "variants": [
      {
        "id": "v1",
        "bombTileIds": [
          "t1"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t2",
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
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t2",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "t3",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t1",
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
              }
            ],
            "score": 550,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t2",
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
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t1",
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
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
          }
        ],
        "score": 550,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-16",
    "title": "五个苹果的惊喜",
    "subtitle": "两颗橘子补出第六个苹果，再安排爆点。",
    "chapter": 4,
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
        "id": "t2",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "fruit-2",
        "row": 0,
        "col": 3
      },
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 1,
        "col": 1
      },
      {
        "id": "t6",
        "itemId": "fruit-1",
        "row": 1,
        "col": 2
      },
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 1,
        "col": 3
      },
      {
        "id": "t5",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "t7",
        "itemId": "fruit-1",
        "row": 2,
        "col": 3
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 3
      }
    },
    "footprintByChain": {},
    "features": {
      "crates": [
        {
          "id": "crate-0",
          "row": 2,
          "col": 2
        },
        {
          "id": "crate-1",
          "row": 0,
          "col": 1
        }
      ],
      "brakes": [],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 8,
    "twoStarScore": 900,
    "threeStarScore": 1100,
    "ruleset": "slide-v07-1",
    "variants": [
      {
        "id": "v1",
        "bombTileIds": [
          "t1"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t7",
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
                "tileId": "t2",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t3",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t1",
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
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t7",
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
        "id": "v2",
        "bombTileIds": [
          "t2"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
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
                "tileId": "t2",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t3",
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
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "t4",
                "direction": "right"
              }
            ],
            "score": 1250,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t1",
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
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t7",
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
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t7",
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
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-17",
    "title": "先让车，再开路",
    "subtitle": "横车要整条通路，先让车再开路。",
    "chapter": 4,
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
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "car-0",
        "row": 1,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "car-1",
        "row": 2,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 3,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "car-0",
        "row": 3,
        "col": 1
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
    "footprintByChain": {
      "car": {
        "width": 2,
        "height": 1
      }
    },
    "features": {
      "crates": [
        {
          "id": "crate-0",
          "row": 2,
          "col": 3
        },
        {
          "id": "crate-1",
          "row": 2,
          "col": 2
        }
      ],
      "brakes": [],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 12,
    "twoStarScore": 500,
    "threeStarScore": 700,
    "ruleset": "slide-v07-1",
    "obstacle": {
      "enabled": true,
      "moveLimit": 1,
      "placementCells": [
        {
          "row": 3,
          "col": 3
        }
      ]
    },
    "variants": [
      {
        "id": "v1",
        "bombTileIds": [
          "t1"
        ],
        "referenceSolution": [
          {
            "type": "place-obstacle",
            "row": 3,
            "col": 3
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
            "tileId": "t1",
            "direction": "left"
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
            "tileId": "t4",
            "direction": "up"
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
            "tileId": "t3",
            "direction": "left"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "place-obstacle",
                "row": 3,
                "col": 3
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
                "tileId": "t1",
                "direction": "left"
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
                "tileId": "t4",
                "direction": "up"
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
                "tileId": "t3",
                "direction": "left"
              }
            ],
            "score": 700,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 3,
        "col": 3
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
        "tileId": "t1",
        "direction": "left"
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
        "tileId": "t4",
        "direction": "up"
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
        "tileId": "t3",
        "direction": "left"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "place-obstacle",
            "row": 3,
            "col": 3
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
            "tileId": "t1",
            "direction": "left"
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
            "tileId": "t4",
            "direction": "up"
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
            "tileId": "t3",
            "direction": "left"
          }
        ],
        "score": 700,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-18",
    "title": "中间产物也能开路",
    "subtitle": "爆破之后桃子留下，能力只用一次。",
    "chapter": 4,
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
        "id": "t2",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 3
      },
      {
        "id": "t3",
        "itemId": "fruit-2",
        "row": 1,
        "col": 1
      },
      {
        "id": "t5",
        "itemId": "plant-1",
        "row": 1,
        "col": 2
      },
      {
        "id": "t6",
        "itemId": "plant-1",
        "row": 1,
        "col": 3
      },
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      }
    ],
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
    "footprintByChain": {
      "plant": {
        "width": 1,
        "height": 2
      }
    },
    "features": {
      "crates": [
        {
          "id": "crate-0",
          "row": 0,
          "col": 2
        },
        {
          "id": "crate-1",
          "row": 0,
          "col": 1
        }
      ],
      "brakes": [],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 7,
    "twoStarScore": 1100,
    "threeStarScore": 1300,
    "ruleset": "slide-v07-1",
    "variants": [
      {
        "id": "v1",
        "bombTileIds": [
          "t1"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
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
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t2",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t5",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t3",
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
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t1",
                "direction": "left"
              }
            ],
            "score": 1300,
            "stars": 3
          }
        ]
      },
      {
        "id": "v2",
        "bombTileIds": [
          "t2"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "up"
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
                "tileId": "t5",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t4",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "t2",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t2",
                "direction": "up"
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
              }
            ],
            "score": 1300,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t3",
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
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
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
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
          }
        ],
        "score": 1300,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-19",
    "title": "爆破花园",
    "subtitle": "木箱也能停靠，选好时机再炸开。",
    "chapter": 4,
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
        "itemId": "fruit-2",
        "row": 0,
        "col": 3
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 1,
        "col": 1
      },
      {
        "id": "t6",
        "itemId": "plant-2",
        "row": 1,
        "col": 2
      },
      {
        "id": "t4",
        "itemId": "plant-1",
        "row": 1,
        "col": 3
      },
      {
        "id": "t5",
        "itemId": "plant-1",
        "row": 2,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "fruit-3",
        "row": 2,
        "col": 2
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
    "footprintByChain": {},
    "features": {
      "crates": [
        {
          "id": "crate-0",
          "row": 2,
          "col": 3
        }
      ],
      "brakes": [],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 11,
    "twoStarScore": 1100,
    "threeStarScore": 1300,
    "ruleset": "slide-v07-1",
    "variants": [
      {
        "id": "v1",
        "bombTileIds": [
          "t1"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
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
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t5",
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
                "tileId": "t1",
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
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "t2",
                "direction": "right"
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
                "tileId": "t2",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t5",
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
                "direction": "right"
              }
            ],
            "score": 1300,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t1",
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
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "right"
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
        "tileId": "t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t5",
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
            "tileId": "t1",
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
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
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
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t5",
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
            "direction": "right"
          }
        ],
        "score": 1300,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-20",
    "title": "花台停一停",
    "subtitle": "滑进同样大小的花台，会提前停一次。",
    "chapter": 4,
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
        "itemId": "fruit-2",
        "row": 1,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 0
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      }
    },
    "footprintByChain": {},
    "features": {
      "crates": [],
      "brakes": [
        {
          "id": "brake-0",
          "row": 0,
          "col": 2,
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 4,
    "twoStarScore": 200,
    "threeStarScore": 400,
    "ruleset": "slide-v07-1",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t1",
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
                "tileId": "t1",
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
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t1",
                "direction": "left"
              }
            ],
            "score": 400,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t1",
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
            "tileId": "t1",
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
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
          }
        ],
        "score": 400,
        "stars": 3
      }
    ],
    "pattern": [
      "###",
      "###",
      "###"
    ]
  },
  {
    "id": "slide07-21",
    "title": "停点留给谁",
    "subtitle": "同一个停点，先留给哪条链？",
    "chapter": 5,
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
        "id": "t5",
        "itemId": "car-0",
        "row": 0,
        "col": 1
      },
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 3
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 1,
        "col": 1
      },
      {
        "id": "t3",
        "itemId": "fruit-2",
        "row": 1,
        "col": 2
      },
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 2,
        "col": 0
      },
      {
        "id": "t6",
        "itemId": "car-0",
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
    "footprintByChain": {},
    "features": {
      "crates": [],
      "brakes": [
        {
          "id": "brake-0",
          "row": 0,
          "col": 0,
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 8,
    "twoStarScore": 1050,
    "threeStarScore": 1250,
    "ruleset": "slide-v07-1",
    "obstacle": {
      "enabled": true,
      "moveLimit": 0,
      "placementCells": [
        {
          "row": 2,
          "col": 2
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "place-obstacle",
            "row": 2,
            "col": 2
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "left"
          },
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
            "tileId": "t2",
            "direction": "right"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "place-obstacle",
                "row": 2,
                "col": 2
              },
              {
                "type": "slide",
                "tileId": "t5",
                "direction": "left"
              },
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
                "tileId": "t2",
                "direction": "right"
              }
            ],
            "score": 1250,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 2,
        "col": 2
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "left"
      },
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
        "tileId": "t2",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "place-obstacle",
            "row": 2,
            "col": 2
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "left"
          },
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
            "tileId": "t2",
            "direction": "right"
          }
        ],
        "score": 1250,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-22",
    "title": "长车专用站",
    "subtitle": "长花台只接住完整对齐的横车。",
    "chapter": 5,
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
        "id": "t3",
        "itemId": "car-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 0,
        "col": 3
      },
      {
        "id": "t5",
        "itemId": "car-1",
        "row": 1,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "car-0",
        "row": 1,
        "col": 2
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 2,
        "col": 0
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 1,
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
    "features": {
      "crates": [],
      "brakes": [
        {
          "id": "brake-0",
          "row": 0,
          "col": 1,
          "width": 2,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 10,
    "twoStarScore": 500,
    "threeStarScore": 700,
    "ruleset": "slide-v07-1",
    "obstacle": {
      "enabled": true,
      "moveLimit": 1,
      "placementCells": [
        {
          "row": 2,
          "col": 2
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "place-obstacle",
            "row": 2,
            "col": 2
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
          },
          {
            "type": "move-obstacle",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
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
            "tileId": "t3",
            "direction": "down"
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
                "type": "place-obstacle",
                "row": 2,
                "col": 2
              },
              {
                "type": "slide",
                "tileId": "t3",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t3",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t1",
                "direction": "left"
              },
              {
                "type": "move-obstacle",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t2",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t5",
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
                "tileId": "t3",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t1",
                "direction": "down"
              }
            ],
            "score": 700,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 2,
        "col": 2
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "left"
      },
      {
        "type": "move-obstacle",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t5",
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
        "tileId": "t3",
        "direction": "down"
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
            "type": "place-obstacle",
            "row": 2,
            "col": 2
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
          },
          {
            "type": "move-obstacle",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t5",
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
            "tileId": "t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          }
        ],
        "score": 700,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-23",
    "title": "先停稳，再爆破",
    "subtitle": "先用花台定位，再让爆破落在对的地方。",
    "chapter": 5,
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
        "itemId": "fruit-2",
        "row": 0,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 0,
        "col": 2
      },
      {
        "id": "t6",
        "itemId": "fruit-1",
        "row": 0,
        "col": 3
      },
      {
        "id": "t3",
        "itemId": "fruit-2",
        "row": 1,
        "col": 1
      },
      {
        "id": "t7",
        "itemId": "fruit-1",
        "row": 1,
        "col": 2
      },
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 1,
        "col": 3
      },
      {
        "id": "t5",
        "itemId": "fruit-2",
        "row": 2,
        "col": 0
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 3
      }
    },
    "footprintByChain": {},
    "features": {
      "crates": [
        {
          "id": "crate-0",
          "row": 2,
          "col": 3
        }
      ],
      "brakes": [
        {
          "id": "brake-0",
          "row": 1,
          "col": 0,
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 9,
    "twoStarScore": 900,
    "threeStarScore": 1100,
    "ruleset": "slide-v07-1",
    "variants": [
      {
        "id": "v1",
        "bombTileIds": [
          "t1"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "left"
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
            "tileId": "t2",
            "direction": "down"
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
                "tileId": "t1",
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
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t7",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "t7",
                "direction": "left"
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
                "tileId": "t2",
                "direction": "down"
              }
            ],
            "score": 1250,
            "stars": 3
          }
        ]
      },
      {
        "id": "v2",
        "bombTileIds": [
          "t2"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t2",
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
            "direction": "down"
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
                "tileId": "t1",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t7",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t2",
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
                "direction": "down"
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
            "score": 1100,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t1",
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
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t7",
        "direction": "left"
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
        "tileId": "t2",
        "direction": "down"
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
            "tileId": "t1",
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
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "left"
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
            "tileId": "t2",
            "direction": "down"
          }
        ],
        "score": 1250,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-24",
    "title": "花园调度员",
    "subtitle": "小花台安排爆点，大花台接住横车。",
    "chapter": 5,
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
        "id": "t2",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 1
      },
      {
        "id": "t3",
        "itemId": "fruit-2",
        "row": 0,
        "col": 2
      },
      {
        "id": "t7",
        "itemId": "car-1",
        "row": 1,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "car-0",
        "row": 1,
        "col": 2
      },
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "t6",
        "itemId": "car-0",
        "row": 2,
        "col": 2
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
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
    "features": {
      "crates": [
        {
          "id": "crate-0",
          "row": 2,
          "col": 0
        }
      ],
      "brakes": [
        {
          "id": "brake-0",
          "row": 1,
          "col": 3,
          "width": 1,
          "height": 1,
          "charges": 1
        },
        {
          "id": "brake-1",
          "row": 0,
          "col": 1,
          "width": 2,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "moveLimit": 20,
    "parMoves": 12,
    "twoStarScore": 1050,
    "threeStarScore": 1250,
    "ruleset": "slide-v07-1",
    "variants": [
      {
        "id": "v1",
        "bombTileIds": [
          "t1"
        ],
        "referenceSolution": [
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
            "tileId": "t7",
            "direction": "left"
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
            "direction": "down"
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
                "tileId": "t7",
                "direction": "left"
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
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t2",
                "direction": "left"
              }
            ],
            "score": 1250,
            "stars": 3
          }
        ]
      },
      {
        "id": "v2",
        "bombTileIds": [
          "t2"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t1",
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
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t7",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t4",
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
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "right"
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
                "type": "slide",
                "tileId": "t1",
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
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t3",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t7",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t2",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t7",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "t4",
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
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t2",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t7",
                "direction": "down"
              }
            ],
            "score": 1300,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
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
        "tileId": "t7",
        "direction": "left"
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
        "direction": "down"
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
            "tileId": "t7",
            "direction": "left"
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
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          }
        ],
        "score": 1250,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-25",
    "title": "从另一边见面",
    "subtitle": "滑进门，从另一端出现；这一步到此为止。",
    "chapter": 5,
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
        "itemId": "fruit-2",
        "row": 1,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 1,
        "col": 3
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      }
    },
    "footprintByChain": {},
    "features": {
      "crates": [],
      "brakes": [],
      "portals": [
        {
          "id": "portal-0",
          "width": 1,
          "height": 1,
          "charges": 1,
          "a": {
            "row": 2,
            "col": 1
          },
          "b": {
            "row": 0,
            "col": 3
          }
        }
      ]
    },
    "moveLimit": 20,
    "parMoves": 3,
    "twoStarScore": 200,
    "threeStarScore": 400,
    "ruleset": "slide-v07-1",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
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
                "tileId": "t1",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t1",
                "direction": "down"
              }
            ],
            "score": 400,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "down"
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
            "tileId": "t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "down"
          }
        ],
        "score": 400,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-26",
    "title": "给出口让个位",
    "subtitle": "先让开出口，再借门与伙伴见面。",
    "chapter": 6,
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
        "id": "t3",
        "itemId": "plant-0",
        "row": 0,
        "col": 3
      },
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 1,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "plant-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "plant-1",
        "row": 2,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 2
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      },
      "plant": {
        "targetTier": 2,
        "count": 1
      }
    },
    "footprintByChain": {},
    "features": {
      "crates": [],
      "brakes": [],
      "portals": [
        {
          "id": "portal-0",
          "width": 1,
          "height": 1,
          "charges": 1,
          "a": {
            "row": 2,
            "col": 0
          },
          "b": {
            "row": 1,
            "col": 0
          }
        }
      ]
    },
    "moveLimit": 20,
    "parMoves": 8,
    "twoStarScore": 600,
    "threeStarScore": 800,
    "ruleset": "slide-v07-1",
    "obstacle": {
      "enabled": true,
      "moveLimit": 1,
      "placementCells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "place-obstacle",
            "row": 0,
            "col": 0
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
            "tileId": "t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
                "tileId": "t3",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t1",
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
                "tileId": "t1",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t1",
                "direction": "right"
              }
            ],
            "score": 800,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 0,
        "col": 0
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t1",
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
        "tileId": "t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t1",
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
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
            "tileId": "t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "right"
          }
        ],
        "score": 800,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-27",
    "title": "长车穿门",
    "subtitle": "长车完整穿门，大小和朝向都不变。",
    "chapter": 6,
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
        "id": "t3",
        "itemId": "car-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 0,
        "col": 2
      },
      {
        "id": "t5",
        "itemId": "car-1",
        "row": 1,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "car-0",
        "row": 2,
        "col": 2
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 1,
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
    "features": {
      "crates": [],
      "brakes": [],
      "portals": [
        {
          "id": "portal-0",
          "width": 2,
          "height": 1,
          "charges": 1,
          "a": {
            "row": 0,
            "col": 2
          },
          "b": {
            "row": 1,
            "col": 2
          }
        }
      ]
    },
    "moveLimit": 20,
    "parMoves": 9,
    "twoStarScore": 500,
    "threeStarScore": 700,
    "ruleset": "slide-v07-1",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "left"
          },
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
            "tileId": "t1",
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
            "tileId": "t3",
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
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "t4",
                "direction": "left"
              },
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
                "tileId": "t1",
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
                "tileId": "t3",
                "direction": "right"
              }
            ],
            "score": 700,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "left"
      },
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
        "tileId": "t1",
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
        "tileId": "t3",
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
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "left"
          },
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
            "tileId": "t1",
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
            "tileId": "t3",
            "direction": "right"
          }
        ],
        "score": 700,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-28",
    "title": "炸开入口",
    "subtitle": "炸开短路，再把门留给需要的伙伴。",
    "chapter": 6,
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
        "id": "t2",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "fruit-2",
        "row": 0,
        "col": 1
      },
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 0,
        "col": 2
      },
      {
        "id": "t5",
        "itemId": "plant-1",
        "row": 0,
        "col": 3
      },
      {
        "id": "t6",
        "itemId": "plant-1",
        "row": 1,
        "col": 1
      },
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 1,
        "col": 3
      }
    ],
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
    "footprintByChain": {},
    "features": {
      "crates": [
        {
          "id": "crate-0",
          "row": 1,
          "col": 2
        },
        {
          "id": "crate-1",
          "row": 1,
          "col": 0
        }
      ],
      "brakes": [],
      "portals": [
        {
          "id": "portal-0",
          "width": 1,
          "height": 1,
          "charges": 1,
          "a": {
            "row": 0,
            "col": 0
          },
          "b": {
            "row": 0,
            "col": 2
          }
        }
      ]
    },
    "moveLimit": 20,
    "parMoves": 10,
    "twoStarScore": 950,
    "threeStarScore": 1150,
    "ruleset": "slide-v07-1",
    "variants": [
      {
        "id": "v1",
        "bombTileIds": [
          "t1"
        ],
        "referenceSolution": [
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
            "tileId": "t6",
            "direction": "left"
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
          },
          {
            "type": "slide",
            "tileId": "t1",
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
            "direction": "right"
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
                "tileId": "t6",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "t6",
                "direction": "left"
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
              },
              {
                "type": "slide",
                "tileId": "t1",
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
                "direction": "right"
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
              }
            ],
            "score": 1150,
            "stars": 3
          }
        ]
      },
      {
        "id": "v2",
        "bombTileIds": [
          "t2"
        ],
        "referenceSolution": [
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
            "tileId": "t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "left"
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
            "tileId": "t1",
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
            "direction": "up"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
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
                "tileId": "t4",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t4",
                "direction": "left"
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
                "tileId": "t1",
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
                "direction": "up"
              }
            ],
            "score": 1150,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
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
        "tileId": "t6",
        "direction": "left"
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
      },
      {
        "type": "slide",
        "tileId": "t1",
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
        "direction": "right"
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
            "tileId": "t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "left"
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
          },
          {
            "type": "slide",
            "tileId": "t1",
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
            "direction": "right"
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
          }
        ],
        "score": 1150,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-29",
    "title": "穿门之后停哪里",
    "subtitle": "车借门换侧，苹果借花台安排挡位。",
    "chapter": 6,
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
        "itemId": "car-0",
        "row": 1,
        "col": 1
      },
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 1,
        "col": 3
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "t5",
        "itemId": "car-1",
        "row": 2,
        "col": 2
      },
      {
        "id": "t4",
        "itemId": "car-0",
        "row": 3,
        "col": 1
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
    "footprintByChain": {
      "car": {
        "width": 2,
        "height": 1
      }
    },
    "features": {
      "crates": [],
      "brakes": [
        {
          "id": "brake-0",
          "row": 1,
          "col": 3,
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": [
        {
          "id": "portal-0",
          "width": 2,
          "height": 1,
          "charges": 1,
          "a": {
            "row": 2,
            "col": 2
          },
          "b": {
            "row": 3,
            "col": 1
          }
        }
      ]
    },
    "moveLimit": 20,
    "parMoves": 12,
    "twoStarScore": 600,
    "threeStarScore": 800,
    "ruleset": "slide-v07-1",
    "obstacle": {
      "enabled": true,
      "moveLimit": 1,
      "placementCells": [
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "place-obstacle",
            "row": 2,
            "col": 0
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
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
            "tileId": "t4",
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
            "direction": "up"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "place-obstacle",
                "row": 2,
                "col": 0
              },
              {
                "type": "slide",
                "tileId": "t3",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "t3",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "t1",
                "direction": "left"
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
                "tileId": "t4",
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
                "direction": "up"
              }
            ],
            "score": 800,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 2,
        "col": 0
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "left"
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
        "tileId": "t4",
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
        "direction": "up"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "place-obstacle",
            "row": 2,
            "col": 0
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "left"
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
            "tileId": "t4",
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
            "direction": "up"
          }
        ],
        "score": 800,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
    ]
  },
  {
    "id": "slide07-30",
    "title": "三十关，新花样",
    "subtitle": "爆破开路、植物穿门、长车停靠，收齐三条链。",
    "chapter": 6,
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
        "id": "t3",
        "itemId": "fruit-3",
        "row": 0,
        "col": 0
      },
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 2
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 0,
        "col": 3
      },
      {
        "id": "t6",
        "itemId": "car-1",
        "row": 1,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "plant-1",
        "row": 1,
        "col": 2
      },
      {
        "id": "t5",
        "itemId": "plant-1",
        "row": 1,
        "col": 3
      },
      {
        "id": "t7",
        "itemId": "car-1",
        "row": 2,
        "col": 0
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 1
      },
      "plant": {
        "targetTier": 2,
        "count": 1
      },
      "car": {
        "targetTier": 2,
        "count": 1
      }
    },
    "footprintByChain": {
      "plant": {
        "width": 1,
        "height": 2
      },
      "car": {
        "width": 2,
        "height": 1
      }
    },
    "features": {
      "crates": [
        {
          "id": "crate-0",
          "row": 0,
          "col": 1
        }
      ],
      "brakes": [
        {
          "id": "brake-0",
          "row": 2,
          "col": 2,
          "width": 2,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": [
        {
          "id": "portal-0",
          "width": 1,
          "height": 2,
          "charges": 1,
          "a": {
            "row": 1,
            "col": 1
          },
          "b": {
            "row": 0,
            "col": 3
          }
        }
      ]
    },
    "moveLimit": 20,
    "parMoves": 11,
    "twoStarScore": 800,
    "threeStarScore": 1000,
    "ruleset": "slide-v07-1",
    "variants": [
      {
        "id": "v1",
        "bombTileIds": [
          "t1"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t3",
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
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "down"
          },
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
            "tileId": "t4",
            "direction": "left"
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
                "tileId": "t3",
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
                "tileId": "t6",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t4",
                "direction": "down"
              },
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
        "id": "v2",
        "bombTileIds": [
          "t2"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t3",
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
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "down"
          },
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
            "tileId": "t4",
            "direction": "left"
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
                "tileId": "t3",
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
                "tileId": "t6",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "t4",
                "direction": "down"
              },
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
                "tileId": "t4",
                "direction": "left"
              }
            ],
            "score": 1000,
            "stars": 3
          }
        ]
      }
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t3",
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
        "tileId": "t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "down"
      },
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
        "tileId": "t4",
        "direction": "left"
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
            "tileId": "t3",
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
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "down"
          },
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
            "tileId": "t4",
            "direction": "left"
          }
        ],
        "score": 1000,
        "stars": 3
      }
    ],
    "pattern": [
      "####",
      "####",
      "####"
    ]
  }
];root.TileSlideV07={...(root.TileSlideV07||{}),levels};if(typeof module!=="undefined")module.exports=levels;})(globalThis);
