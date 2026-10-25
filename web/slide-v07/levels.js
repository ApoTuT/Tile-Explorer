/* Thirty authored levels, with counterfactual mechanic proofs. */
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
    "title": "一炸开一条路",
    "subtitle": "把爆破苹果合到墙边，一次炸穿整排火药箱。",
    "chapter": 3,
    "rows": 3,
    "cols": 5,
    "mask": [
      "#####",
      "#####",
      "#####"
    ],
    "rocks": [],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "a1",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "peach",
        "itemId": "fruit-3",
        "row": 1,
        "col": 4
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 1
      }
    },
    "footprintByChain": {},
    "moveLimit": 20,
    "parMoves": 4,
    "twoStarScore": 500,
    "threeStarScore": 700,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [
          "a0"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "peach",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "right"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "peach",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a1",
                "direction": "right"
              }
            ],
            "score": 700,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [
        {
          "id": "wall-0",
          "row": 0,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-1",
          "row": 1,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-2",
          "row": 2,
          "col": 2,
          "powder": true
        }
      ],
      "brakes": [],
      "portals": []
    },
    "pattern": [
      "#####",
      "#####",
      "#####"
    ],
    "requiredMechanics": [
      "bomb"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "peach",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "a1",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "peach",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "right"
          }
        ],
        "score": 700,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-16",
    "title": "五颗苹果的缺口",
    "subtitle": "两边都缺一个伙伴；先用爆破打通中间。",
    "chapter": 4,
    "rows": 3,
    "cols": 5,
    "mask": [
      "#####",
      "#####",
      "#####"
    ],
    "rocks": [],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "a1",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "a2",
        "itemId": "fruit-2",
        "row": 0,
        "col": 3
      },
      {
        "id": "a3",
        "itemId": "fruit-2",
        "row": 1,
        "col": 4
      },
      {
        "id": "a4",
        "itemId": "fruit-2",
        "row": 2,
        "col": 3
      },
      {
        "id": "o1",
        "itemId": "fruit-1",
        "row": 0,
        "col": 1
      },
      {
        "id": "o2",
        "itemId": "fruit-1",
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
    "moveLimit": 20,
    "parMoves": 7,
    "twoStarScore": 900,
    "threeStarScore": 1100,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "v1",
        "bombTileIds": [
          "a0"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a3",
            "direction": "left"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a2",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "o1",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "o1",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "o2",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a3",
                "direction": "left"
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
          "a1"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "a3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a2",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "o1",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "o1",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "o1",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "o2",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "a3",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              }
            ],
            "score": 1100,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [
        {
          "id": "wall-0",
          "row": 0,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-1",
          "row": 1,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-2",
          "row": 2,
          "col": 2,
          "powder": true
        }
      ],
      "brakes": [],
      "portals": []
    },
    "pattern": [
      "#####",
      "#####",
      "#####"
    ],
    "requiredMechanics": [
      "bomb"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "a2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "o1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "o1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "o2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "a3",
        "direction": "left"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "a2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a3",
            "direction": "left"
          }
        ],
        "score": 1100,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-17",
    "title": "给跑车开路",
    "subtitle": "水果负责拆墙，横向跑车借新通道会合。",
    "chapter": 4,
    "rows": 4,
    "cols": 6,
    "mask": [
      "######",
      "######",
      "######",
      "######"
    ],
    "rocks": [],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "a1",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "c1",
        "itemId": "car-1",
        "row": 3,
        "col": 0
      },
      {
        "id": "c2",
        "itemId": "car-1",
        "row": 0,
        "col": 4
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
    "moveLimit": 20,
    "parMoves": 4,
    "twoStarScore": 400,
    "threeStarScore": 600,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [
          "a0"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "c2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "c1",
            "direction": "up"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "c2",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "c1",
                "direction": "up"
              }
            ],
            "score": 600,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [
        {
          "id": "wall-0",
          "row": 0,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-1",
          "row": 1,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-2",
          "row": 2,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-3",
          "row": 3,
          "col": 2,
          "powder": true
        }
      ],
      "brakes": [],
      "portals": []
    },
    "pattern": [
      "######",
      "######",
      "######",
      "######"
    ],
    "requiredMechanics": [
      "bomb"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "c2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "c1",
        "direction": "up"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "c2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "c1",
            "direction": "up"
          }
        ],
        "score": 600,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-18",
    "title": "隔墙接力",
    "subtitle": "先在墙边完成带爆破的升级，再去找另一颗桃子。",
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
        "id": "o1",
        "itemId": "fruit-1",
        "row": 0,
        "col": 0
      },
      {
        "id": "o2",
        "itemId": "fruit-1",
        "row": 1,
        "col": 1
      },
      {
        "id": "a",
        "itemId": "fruit-2",
        "row": 0,
        "col": 3
      },
      {
        "id": "p",
        "itemId": "fruit-3",
        "row": 3,
        "col": 2
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 1
      }
    },
    "footprintByChain": {},
    "moveLimit": 20,
    "parMoves": 6,
    "twoStarScore": 750,
    "threeStarScore": 950,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "v1",
        "bombTileIds": [
          "o1"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "a",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a",
            "direction": "left"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "o1",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "o2",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "o1",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "o1",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "a",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a",
                "direction": "left"
              }
            ],
            "score": 950,
            "stars": 3
          }
        ]
      },
      {
        "id": "v2",
        "bombTileIds": [
          "o2"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "a",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a",
            "direction": "left"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "o1",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "o2",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "o1",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "o1",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "a",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a",
                "direction": "left"
              }
            ],
            "score": 950,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [
        {
          "id": "wall-0",
          "row": 2,
          "col": 0,
          "powder": true
        },
        {
          "id": "wall-1",
          "row": 2,
          "col": 1,
          "powder": true
        },
        {
          "id": "wall-2",
          "row": 2,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-3",
          "row": 2,
          "col": 3,
          "powder": true
        }
      ],
      "brakes": [],
      "portals": []
    },
    "pattern": [
      "####",
      "####",
      "####",
      "####"
    ],
    "requiredMechanics": [
      "bomb"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "o1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "o2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "o1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "o1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "a",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "a",
        "direction": "left"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "a",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a",
            "direction": "left"
          }
        ],
        "score": 950,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-19",
    "title": "十字爆破",
    "subtitle": "把合成移到十字墙旁，让四个小房间连起来。",
    "chapter": 4,
    "rows": 5,
    "cols": 5,
    "mask": [
      "#####",
      "#####",
      "#####",
      "#####",
      "#####"
    ],
    "rocks": [],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "a1",
        "itemId": "fruit-2",
        "row": 1,
        "col": 1
      },
      {
        "id": "p",
        "itemId": "fruit-3",
        "row": 4,
        "col": 4
      },
      {
        "id": "s1",
        "itemId": "plant-1",
        "row": 0,
        "col": 4
      },
      {
        "id": "s2",
        "itemId": "plant-1",
        "row": 4,
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
      }
    },
    "footprintByChain": {},
    "moveLimit": 20,
    "parMoves": 6,
    "twoStarScore": 750,
    "threeStarScore": 950,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [
          "a0"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "s1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "s1",
            "direction": "left"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "a1",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a1",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "s1",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "s1",
                "direction": "left"
              }
            ],
            "score": 950,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [
        {
          "id": "wall-0",
          "row": 0,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-1",
          "row": 1,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-2",
          "row": 2,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-3",
          "row": 3,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-4",
          "row": 4,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-5",
          "row": 2,
          "col": 0,
          "powder": true
        },
        {
          "id": "wall-6",
          "row": 2,
          "col": 1,
          "powder": true
        },
        {
          "id": "wall-7",
          "row": 2,
          "col": 3,
          "powder": true
        },
        {
          "id": "wall-8",
          "row": 2,
          "col": 4,
          "powder": true
        }
      ],
      "brakes": [],
      "portals": []
    },
    "pattern": [
      "#####",
      "#####",
      "#####",
      "#####",
      "#####"
    ],
    "requiredMechanics": [
      "bomb"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "a1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "a1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "s1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "s1",
        "direction": "left"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "s1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "s1",
            "direction": "left"
          }
        ],
        "score": 950,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-20",
    "title": "拐个弯就碰面",
    "subtitle": "沿箭头拐进中央缺口；花台可以反复使用。",
    "chapter": 4,
    "rows": 3,
    "cols": 5,
    "mask": [
      "#####",
      "#####",
      "#####"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 2,
        "col": 2
      }
    ],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "a1",
        "itemId": "fruit-2",
        "row": 2,
        "col": 4
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      }
    },
    "footprintByChain": {},
    "moveLimit": 20,
    "parMoves": 2,
    "twoStarScore": 200,
    "threeStarScore": 400,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              }
            ],
            "score": 400,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [],
      "brakes": [
        {
          "id": "turn",
          "row": 1,
          "col": 0,
          "direction": "right",
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "pattern": [
      "#####",
      "#####",
      "#####"
    ],
    "requiredMechanics": [
      "turn"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          }
        ],
        "score": 400,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-21",
    "title": "双弯接力",
    "subtitle": "两次转向连成一条路线，合成可以在同一步完成。",
    "chapter": 5,
    "rows": 3,
    "cols": 5,
    "mask": [
      "#####",
      "#####",
      "#####"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 2,
        "col": 2
      }
    ],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "a1",
        "itemId": "fruit-2",
        "row": 2,
        "col": 4
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      }
    },
    "footprintByChain": {},
    "moveLimit": 20,
    "parMoves": 1,
    "twoStarScore": 200,
    "threeStarScore": 400,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              }
            ],
            "score": 400,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [],
      "brakes": [
        {
          "id": "turn-a",
          "row": 1,
          "col": 0,
          "direction": "right",
          "width": 1,
          "height": 1,
          "charges": 1
        },
        {
          "id": "turn-b",
          "row": 1,
          "col": 4,
          "direction": "down",
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "pattern": [
      "#####",
      "#####",
      "#####"
    ],
    "requiredMechanics": [
      "turn"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          }
        ],
        "score": 400,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-22",
    "title": "大块也会拐弯",
    "subtitle": "横向花台只接横块：先对齐，再沿箭头入弯。",
    "chapter": 5,
    "rows": 4,
    "cols": 7,
    "mask": [
      "#######",
      "#######",
      "#######",
      "#######"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 3,
        "col": 3
      }
    ],
    "tiles": [
      {
        "id": "c1",
        "itemId": "car-1",
        "row": 0,
        "col": 1
      },
      {
        "id": "c2",
        "itemId": "car-1",
        "row": 3,
        "col": 5
      }
    ],
    "chainGoals": {
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
    "moveLimit": 20,
    "parMoves": 3,
    "twoStarScore": 150,
    "threeStarScore": 350,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "c1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "c1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "c1",
            "direction": "down"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "c1",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "c1",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "c1",
                "direction": "down"
              }
            ],
            "score": 350,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [],
      "brakes": [
        {
          "id": "turn",
          "row": 1,
          "col": 0,
          "direction": "right",
          "width": 2,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "pattern": [
      "#######",
      "#######",
      "#######",
      "#######"
    ],
    "requiredMechanics": [
      "turn"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "c1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "c1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "c1",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "c1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "c1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "c1",
            "direction": "down"
          }
        ],
        "score": 350,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-23",
    "title": "拐弯引爆",
    "subtitle": "用花台把爆破牌送到墙边的合成点。",
    "chapter": 5,
    "rows": 3,
    "cols": 7,
    "mask": [
      "#######",
      "#######",
      "#######"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 2,
        "col": 2
      }
    ],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "a1",
        "itemId": "fruit-2",
        "row": 2,
        "col": 4
      },
      {
        "id": "p",
        "itemId": "fruit-3",
        "row": 2,
        "col": 6
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 1
      }
    },
    "footprintByChain": {},
    "moveLimit": 20,
    "parMoves": 3,
    "twoStarScore": 500,
    "threeStarScore": 700,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [
          "a0"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "right"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a1",
                "direction": "right"
              }
            ],
            "score": 700,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [
        {
          "id": "wall-0",
          "row": 0,
          "col": 5,
          "powder": true
        },
        {
          "id": "wall-1",
          "row": 1,
          "col": 5,
          "powder": true
        },
        {
          "id": "wall-2",
          "row": 2,
          "col": 5,
          "powder": true
        }
      ],
      "brakes": [
        {
          "id": "turn",
          "row": 1,
          "col": 0,
          "direction": "right",
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "pattern": [
      "#######",
      "#######",
      "#######"
    ],
    "requiredMechanics": [
      "bomb",
      "turn"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "a1",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "right"
          }
        ],
        "score": 700,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-24",
    "title": "先开路再入弯",
    "subtitle": "爆破开通通道，再借花台穿过中央缺口。",
    "chapter": 5,
    "rows": 3,
    "cols": 7,
    "mask": [
      "#######",
      "#######",
      "#######"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "a1",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "p",
        "itemId": "fruit-3",
        "row": 2,
        "col": 6
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 1
      }
    },
    "footprintByChain": {},
    "moveLimit": 20,
    "parMoves": 4,
    "twoStarScore": 500,
    "threeStarScore": 700,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "v1",
        "bombTileIds": [
          "a0"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a1",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              }
            ],
            "score": 700,
            "stars": 3
          }
        ]
      },
      {
        "id": "v2",
        "bombTileIds": [
          "a1"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "a1",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              }
            ],
            "score": 700,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [
        {
          "id": "wall-0",
          "row": 0,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-1",
          "row": 1,
          "col": 2,
          "powder": true
        },
        {
          "id": "wall-2",
          "row": 2,
          "col": 2,
          "powder": true
        }
      ],
      "brakes": [
        {
          "id": "turn",
          "row": 1,
          "col": 0,
          "direction": "right",
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "pattern": [
      "#######",
      "#######",
      "#######"
    ],
    "requiredMechanics": [
      "bomb",
      "turn"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "a1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          }
        ],
        "score": 700,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-25",
    "title": "隔墙穿门",
    "subtitle": "穿门后沿原方向继续滑，一步跨区合成。",
    "chapter": 5,
    "rows": 3,
    "cols": 5,
    "mask": [
      "#####",
      "#####",
      "#####"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 2
      }
    ],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "a1",
        "itemId": "fruit-2",
        "row": 2,
        "col": 4
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      }
    },
    "footprintByChain": {},
    "moveLimit": 20,
    "parMoves": 1,
    "twoStarScore": 200,
    "threeStarScore": 400,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "right"
              }
            ],
            "score": 400,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [],
      "brakes": [],
      "portals": [
        {
          "id": "gate",
          "a": {
            "row": 0,
            "col": 1
          },
          "b": {
            "row": 2,
            "col": 3
          },
          "width": 1,
          "height": 1,
          "charges": 1,
          "reusable": true
        }
      ]
    },
    "pattern": [
      "#####",
      "#####",
      "#####"
    ],
    "requiredMechanics": [
      "portal"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          }
        ],
        "score": 400,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-26",
    "title": "先让开出口",
    "subtitle": "门两边都能用；先让开出口，再组织跨区接力。",
    "chapter": 6,
    "rows": 3,
    "cols": 5,
    "mask": [
      "#####",
      "#####",
      "#####"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 2
      }
    ],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "a1",
        "itemId": "fruit-2",
        "row": 2,
        "col": 4
      },
      {
        "id": "o1",
        "itemId": "fruit-1",
        "row": 2,
        "col": 3
      },
      {
        "id": "o2",
        "itemId": "fruit-1",
        "row": 1,
        "col": 4
      },
      {
        "id": "a2",
        "itemId": "fruit-2",
        "row": 0,
        "col": 4
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 2
      }
    },
    "footprintByChain": {},
    "moveLimit": 20,
    "parMoves": 5,
    "twoStarScore": 700,
    "threeStarScore": 900,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "right"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "o2",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "o1",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "o2",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "o2",
                "direction": "right"
              }
            ],
            "score": 900,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [],
      "brakes": [],
      "portals": [
        {
          "id": "gate",
          "a": {
            "row": 0,
            "col": 1
          },
          "b": {
            "row": 2,
            "col": 3
          },
          "width": 1,
          "height": 1,
          "charges": 1,
          "reusable": true
        }
      ]
    },
    "pattern": [
      "#####",
      "#####",
      "#####"
    ],
    "requiredMechanics": [
      "portal"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "o2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "o1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "o2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "o2",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "o1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "right"
          }
        ],
        "score": 900,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-27",
    "title": "横跨双车道",
    "subtitle": "整块穿过宽门，落地继续加速。",
    "chapter": 6,
    "rows": 4,
    "cols": 6,
    "mask": [
      "######",
      "######",
      "######",
      "######"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 3,
        "col": 3
      }
    ],
    "tiles": [
      {
        "id": "c1",
        "itemId": "car-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "c2",
        "itemId": "car-0",
        "row": 2,
        "col": 4
      },
      {
        "id": "r",
        "itemId": "car-1",
        "row": 3,
        "col": 0
      }
    ],
    "chainGoals": {
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
    "moveLimit": 20,
    "parMoves": 5,
    "twoStarScore": 300,
    "threeStarScore": 500,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "c2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "c1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "c1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "c2",
            "direction": "down"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "c2",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "c1",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "c1",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "r",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "c2",
                "direction": "down"
              }
            ],
            "score": 500,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [],
      "brakes": [],
      "portals": [
        {
          "id": "gate",
          "a": {
            "row": 0,
            "col": 1
          },
          "b": {
            "row": 2,
            "col": 4
          },
          "width": 2,
          "height": 1,
          "charges": 1,
          "reusable": true
        }
      ]
    },
    "pattern": [
      "######",
      "######",
      "######",
      "######"
    ],
    "requiredMechanics": [
      "portal"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "c2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "c1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "c1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "c2",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "c2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "c1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "c1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "c2",
            "direction": "down"
          }
        ],
        "score": 500,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-28",
    "title": "把爆破送过去",
    "subtitle": "先穿门，再在另一侧引爆通往目标的墙。",
    "chapter": 6,
    "rows": 4,
    "cols": 6,
    "mask": [
      "######",
      "######",
      "######",
      "######"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 3,
        "col": 2
      }
    ],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "a1",
        "itemId": "fruit-2",
        "row": 2,
        "col": 3
      },
      {
        "id": "p",
        "itemId": "fruit-3",
        "row": 3,
        "col": 5
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 1
      }
    },
    "footprintByChain": {},
    "moveLimit": 20,
    "parMoves": 4,
    "twoStarScore": 500,
    "threeStarScore": 700,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [
          "a0"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "p",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "down"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "down"
              },
              {
                "type": "slide",
                "tileId": "p",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "a1",
                "direction": "down"
              }
            ],
            "score": 700,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [
        {
          "id": "wall-0",
          "row": 0,
          "col": 4,
          "powder": true
        },
        {
          "id": "wall-1",
          "row": 1,
          "col": 4,
          "powder": true
        },
        {
          "id": "wall-2",
          "row": 2,
          "col": 4,
          "powder": true
        },
        {
          "id": "wall-3",
          "row": 3,
          "col": 4,
          "powder": true
        }
      ],
      "brakes": [],
      "portals": [
        {
          "id": "gate",
          "a": {
            "row": 0,
            "col": 1
          },
          "b": {
            "row": 0,
            "col": 3
          },
          "width": 1,
          "height": 1,
          "charges": 1,
          "reusable": true
        }
      ]
    },
    "pattern": [
      "######",
      "######",
      "######",
      "######"
    ],
    "requiredMechanics": [
      "bomb",
      "portal"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "p",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "a1",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "p",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "a1",
            "direction": "down"
          }
        ],
        "score": 700,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-29",
    "title": "穿门再转弯",
    "subtitle": "传送保留方向，花台负责转向，连成跨区路线。",
    "chapter": 6,
    "rows": 4,
    "cols": 6,
    "mask": [
      "######",
      "######",
      "######",
      "######"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 1,
        "col": 5
      }
    ],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "a1",
        "itemId": "fruit-2",
        "row": 3,
        "col": 5
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 1
      }
    },
    "footprintByChain": {},
    "moveLimit": 20,
    "parMoves": 2,
    "twoStarScore": 200,
    "threeStarScore": 400,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "right"
              }
            ],
            "score": 400,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [],
      "brakes": [
        {
          "id": "turn",
          "row": 0,
          "col": 4,
          "direction": "down",
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": [
        {
          "id": "gate",
          "a": {
            "row": 0,
            "col": 1
          },
          "b": {
            "row": 0,
            "col": 3
          },
          "width": 1,
          "height": 1,
          "charges": 1,
          "reusable": true
        }
      ]
    },
    "pattern": [
      "######",
      "######",
      "######",
      "######"
    ],
    "requiredMechanics": [
      "turn",
      "portal"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          }
        ],
        "score": 400,
        "stars": 3
      }
    ]
  },
  {
    "id": "slide07-30",
    "title": "一滑三连",
    "subtitle": "先准备合成点，再让爆破苹果穿门、转向、炸开封锁。",
    "chapter": 6,
    "rows": 6,
    "cols": 6,
    "mask": [
      "######",
      "######",
      "######",
      "######",
      "######",
      "######"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 5,
        "col": 2
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 1,
        "col": 5
      }
    ],
    "tiles": [
      {
        "id": "a0",
        "itemId": "fruit-2",
        "row": 5,
        "col": 0
      },
      {
        "id": "o1",
        "itemId": "fruit-1",
        "row": 2,
        "col": 3
      },
      {
        "id": "o2",
        "itemId": "fruit-1",
        "row": 2,
        "col": 5
      },
      {
        "id": "p",
        "itemId": "fruit-3",
        "row": 4,
        "col": 4
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 1
      }
    },
    "footprintByChain": {},
    "moveLimit": 20,
    "parMoves": 4,
    "twoStarScore": 750,
    "threeStarScore": 950,
    "ruleset": "slide-v07-2",
    "variants": [
      {
        "id": "default",
        "bombTileIds": [
          "a0"
        ],
        "referenceSolution": [
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "p",
            "direction": "up"
          }
        ],
        "scoreProofs": [
          {
            "actions": [
              {
                "type": "slide",
                "tileId": "o2",
                "direction": "left"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "up"
              },
              {
                "type": "slide",
                "tileId": "a0",
                "direction": "right"
              },
              {
                "type": "slide",
                "tileId": "p",
                "direction": "up"
              }
            ],
            "score": 950,
            "stars": 3
          }
        ]
      }
    ],
    "features": {
      "crates": [
        {
          "id": "wall-0",
          "row": 3,
          "col": 3,
          "powder": true
        },
        {
          "id": "wall-1",
          "row": 3,
          "col": 4,
          "powder": true
        },
        {
          "id": "wall-2",
          "row": 3,
          "col": 5,
          "powder": true
        }
      ],
      "brakes": [
        {
          "id": "turn-a",
          "row": 0,
          "col": 4,
          "direction": "down",
          "width": 1,
          "height": 1,
          "charges": 1
        },
        {
          "id": "turn-b",
          "row": 2,
          "col": 4,
          "direction": "left",
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": [
        {
          "id": "gate",
          "a": {
            "row": 0,
            "col": 1
          },
          "b": {
            "row": 0,
            "col": 3
          },
          "width": 1,
          "height": 1,
          "charges": 1,
          "reusable": true
        }
      ]
    },
    "pattern": [
      "######",
      "######",
      "######",
      "######",
      "######",
      "######"
    ],
    "requiredMechanics": [
      "bomb",
      "turn",
      "portal"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "o2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "a0",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "p",
        "direction": "up"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "o2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "p",
            "direction": "up"
          }
        ],
        "score": 950,
        "stars": 3
      }
    ]
  }
];root.TileSlideV07={...(root.TileSlideV07||{}),levels};if(typeof module!=="undefined")module.exports=levels;})(globalThis);
