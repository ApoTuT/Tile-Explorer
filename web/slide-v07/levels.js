/* Thirty challenge gardens; exact room distances and checked separations. */
(function(root){const levels=[
  {
    "id": "slide07-01",
    "title": "借位起手",
    "subtitle": "先留好停靠点，再让材料碰面。",
    "chapter": 1,
    "rows": 4,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 0,
        "col": 0
      }
    ],
    "tiles": [
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 2,
        "col": 0
      },
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 2,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 3,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "fruit-1",
        "row": 3,
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
    ],
    "moveLimit": 12,
    "parMoves": 7,
    "twoStarScore": 550,
    "threeStarScore": 800,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
    ],
    "referenceSolution": [
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
        "tileId": "t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
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
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "right"
          }
        ],
        "score": 800,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 7,
      "optimalMoves": 7,
      "setupMoves": 4,
      "decisionPoints": 7,
      "greedyTraps": 2,
      "maxSetupRun": 4,
      "openingChoices": 5,
      "openingOptimal": 2,
      "authorAttempt": 0
    }
  },
  {
    "id": "slide07-02",
    "title": "回字小径",
    "subtitle": "一条回字路，几次必要的让位。",
    "chapter": 1,
    "rows": 4,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 3,
        "col": 3
      },
      {
        "row": 2,
        "col": 2
      }
    ],
    "tiles": [
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 0,
        "col": 3
      },
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
        "col": 1
      },
      {
        "id": "t3",
        "itemId": "fruit-1",
        "row": 3,
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
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 15,
    "parMoves": 10,
    "twoStarScore": 550,
    "threeStarScore": 800,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t2",
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
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "up"
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
        "direction": "right"
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
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "up"
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
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "down"
          }
        ],
        "score": 800,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 8,
      "optimalMoves": 10,
      "setupMoves": 7,
      "decisionPoints": 9,
      "greedyTraps": 4,
      "maxSetupRun": 6,
      "openingChoices": 6,
      "openingOptimal": 2,
      "authorAttempt": 0
    }
  },
  {
    "id": "slide07-03",
    "title": "交错四角",
    "subtitle": "相同的材料，也有不同的合成次序。",
    "chapter": 1,
    "rows": 4,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 3,
        "col": 0
      },
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 0,
        "col": 3
      }
    ],
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-1",
        "row": 1,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
        "row": 1,
        "col": 3
      },
      {
        "id": "t3",
        "itemId": "fruit-1",
        "row": 2,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "fruit-1",
        "row": 3,
        "col": 1
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
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 14,
    "parMoves": 9,
    "twoStarScore": 600,
    "threeStarScore": 850,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
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
        "tileId": "t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t3",
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
        "direction": "right"
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
            "tileId": "t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t3",
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
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "up"
          }
        ],
        "score": 850,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 9,
      "optimalMoves": 9,
      "setupMoves": 6,
      "decisionPoints": 5,
      "greedyTraps": 5,
      "maxSetupRun": 5,
      "openingChoices": 6,
      "openingOptimal": 4,
      "authorAttempt": 16
    }
  },
  {
    "id": "slide07-04",
    "title": "双线借道",
    "subtitle": "两条升级链争用同一条路。",
    "chapter": 1,
    "rows": 4,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 0,
        "col": 3
      }
    ],
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-1",
        "row": 0,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "plant-1",
        "row": 2,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "fruit-2",
        "row": 2,
        "col": 3
      },
      {
        "id": "t5",
        "itemId": "plant-1",
        "row": 3,
        "col": 2
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
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
        "targetTier": 2,
        "count": 1
      }
    },
    "footprintByChain": {},
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
    ],
    "moveLimit": 15,
    "parMoves": 10,
    "twoStarScore": 600,
    "threeStarScore": 850,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
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
        "tileId": "t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t5",
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
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t5",
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
        "score": 850,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 10,
      "optimalMoves": 10,
      "setupMoves": 7,
      "decisionPoints": 7,
      "greedyTraps": 3,
      "maxSetupRun": 7,
      "openingChoices": 6,
      "openingOptimal": 5,
      "authorAttempt": 0
    }
  },
  {
    "id": "slide07-05",
    "title": "最后的停靠点",
    "subtitle": "提前收走伙伴，可能失去最后的停靠点。",
    "chapter": 1,
    "rows": 4,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 1
      }
    ],
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
        "id": "t4",
        "itemId": "fruit-2",
        "row": 0,
        "col": 2
      },
      {
        "id": "t5",
        "itemId": "fruit-3",
        "row": 1,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
        "row": 1,
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
    ],
    "moveLimit": 18,
    "parMoves": 13,
    "twoStarScore": 950,
    "threeStarScore": 1200,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t3",
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
        "direction": "right"
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
            "tileId": "t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t3",
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
            "direction": "right"
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
            "tileId": "t3",
            "direction": "down"
          }
        ],
        "score": 1200,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 11,
      "optimalMoves": 13,
      "setupMoves": 9,
      "decisionPoints": 12,
      "greedyTraps": 3,
      "maxSetupRun": 9,
      "openingChoices": 1,
      "openingOptimal": 1,
      "authorAttempt": 1
    }
  },
  {
    "id": "slide07-06",
    "title": "竖向拥堵",
    "subtitle": "长块需要完整的通道。",
    "chapter": 2,
    "rows": 4,
    "cols": 5,
    "mask": [
      "#####",
      "#####",
      "#####",
      "#####"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 3,
        "col": 4
      },
      {
        "row": 3,
        "col": 3
      }
    ],
    "tiles": [
      {
        "id": "t4",
        "itemId": "plant-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "t1",
        "itemId": "plant-0",
        "row": 0,
        "col": 3
      },
      {
        "id": "t2",
        "itemId": "plant-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "plant-1",
        "row": 2,
        "col": 2
      }
    ],
    "chainGoals": {
      "plant": {
        "targetTier": 3,
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
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 20,
    "parMoves": 15,
    "twoStarScore": 550,
    "threeStarScore": 800,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "#####",
      "#####",
      "#####",
      "#####"
    ],
    "referenceSolution": [
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
        "tileId": "t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t1",
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
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
          }
        ],
        "score": 800,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 12,
      "optimalMoves": 15,
      "setupMoves": 12,
      "decisionPoints": 10,
      "greedyTraps": 2,
      "maxSetupRun": 11,
      "openingChoices": 4,
      "openingOptimal": 1,
      "authorAttempt": 199
    }
  },
  {
    "id": "slide07-07",
    "title": "横车让路",
    "subtitle": "先为横向跑车留出转场空间。",
    "chapter": 2,
    "rows": 4,
    "cols": 5,
    "mask": [
      "#####",
      "#####",
      "#####",
      "#####"
    ],
    "rocks": [
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 3,
        "col": 4
      },
      {
        "row": 3,
        "col": 0
      },
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 3,
        "col": 3
      }
    ],
    "tiles": [
      {
        "id": "t4",
        "itemId": "car-0",
        "row": 0,
        "col": 2
      },
      {
        "id": "t1",
        "itemId": "fruit-1",
        "row": 0,
        "col": 4
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
        "row": 1,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "car-0",
        "row": 1,
        "col": 3
      },
      {
        "id": "t3",
        "itemId": "fruit-2",
        "row": 2,
        "col": 4
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
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 19,
    "parMoves": 14,
    "twoStarScore": 550,
    "threeStarScore": 800,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "#####",
      "#####",
      "#####",
      "#####"
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
        "direction": "left"
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
        "tileId": "t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t1",
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
            "tileId": "t3",
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
            "tileId": "t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t1",
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
        "score": 800,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 13,
      "optimalMoves": 14,
      "setupMoves": 11,
      "decisionPoints": 13,
      "greedyTraps": 1,
      "maxSetupRun": 11,
      "openingChoices": 3,
      "openingOptimal": 1,
      "authorAttempt": 62
    }
  },
  {
    "id": "slide07-08",
    "title": "大块留白",
    "subtitle": "大块占地多，空位要提前安排。",
    "chapter": 2,
    "rows": 4,
    "cols": 5,
    "mask": [
      "#####",
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
        "row": 3,
        "col": 2
      },
      {
        "row": 3,
        "col": 3
      }
    ],
    "tiles": [
      {
        "id": "t3",
        "itemId": "plant-0",
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
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "plant-0",
        "row": 2,
        "col": 2
      },
      {
        "id": "t5",
        "itemId": "plant-1",
        "row": 2,
        "col": 4
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
      "fruit": {
        "width": 2,
        "height": 2
      }
    },
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
    ],
    "moveLimit": 18,
    "parMoves": 13,
    "twoStarScore": 550,
    "threeStarScore": 800,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "#####",
      "#####",
      "#####",
      "#####"
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
        "direction": "up"
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
        "tileId": "t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t5",
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
        "direction": "left"
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
            "direction": "up"
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
            "tileId": "t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t5",
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
            "direction": "left"
          }
        ],
        "score": 800,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 13,
      "optimalMoves": 13,
      "setupMoves": 10,
      "decisionPoints": 11,
      "greedyTraps": 6,
      "maxSetupRun": 9,
      "openingChoices": 6,
      "openingOptimal": 3,
      "authorAttempt": 32
    }
  },
  {
    "id": "slide07-09",
    "title": "双线换位",
    "subtitle": "两条路线交织，先合哪个会改变后续位置。",
    "chapter": 2,
    "rows": 4,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 2,
        "col": 1
      }
    ],
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "t4",
        "itemId": "fruit-2",
        "row": 1,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "fruit-1",
        "row": 2,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "plant-1",
        "row": 3,
        "col": 0
      },
      {
        "id": "t6",
        "itemId": "plant-1",
        "row": 3,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-0",
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
        "targetTier": 2,
        "count": 1
      }
    },
    "footprintByChain": {},
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
    ],
    "moveLimit": 19,
    "parMoves": 14,
    "twoStarScore": 850,
    "threeStarScore": 1100,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
    ],
    "referenceSolution": [
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
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "up"
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
        "direction": "down"
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
        "tileId": "t3",
        "direction": "down"
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
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "up"
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
            "direction": "up"
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
            "direction": "down"
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
            "tileId": "t3",
            "direction": "down"
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
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "up"
          }
        ],
        "score": 1100,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 14,
      "optimalMoves": 14,
      "setupMoves": 10,
      "decisionPoints": 6,
      "greedyTraps": 6,
      "maxSetupRun": 10,
      "openingChoices": 3,
      "openingOptimal": 3,
      "authorAttempt": 31
    }
  },
  {
    "id": "slide07-10",
    "title": "三路争先",
    "subtitle": "三种材料互相挡路，也互相帮助停靠。",
    "chapter": 2,
    "rows": 4,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [
      {
        "row": 3,
        "col": 1
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
        "row": 1,
        "col": 0
      }
    ],
    "tiles": [
      {
        "id": "t3",
        "itemId": "plant-0",
        "row": 0,
        "col": 1
      },
      {
        "id": "t1",
        "itemId": "fruit-1",
        "row": 0,
        "col": 3
      },
      {
        "id": "t4",
        "itemId": "plant-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t6",
        "itemId": "car-0",
        "row": 2,
        "col": 1
      },
      {
        "id": "t5",
        "itemId": "plant-1",
        "row": 2,
        "col": 3
      },
      {
        "id": "t7",
        "itemId": "car-0",
        "row": 3,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
        "row": 3,
        "col": 2
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
      },
      "car": {
        "targetTier": 1,
        "count": 1
      }
    },
    "footprintByChain": {},
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
    ],
    "moveLimit": 23,
    "parMoves": 18,
    "twoStarScore": 550,
    "threeStarScore": 800,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
    ],
    "referenceSolution": [
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
        "tileId": "t4",
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
        "tileId": "t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "left"
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
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "up"
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
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
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
            "tileId": "t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t4",
            "direction": "left"
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
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "t1",
            "direction": "up"
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
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 15,
      "optimalMoves": 18,
      "setupMoves": 14,
      "decisionPoints": 17,
      "greedyTraps": 3,
      "maxSetupRun": 8,
      "openingChoices": 9,
      "openingOptimal": 2,
      "authorAttempt": 22
    }
  },
  {
    "id": "slide07-11",
    "title": "车道回旋",
    "subtitle": "合成的位置，决定下一趟能走多远。",
    "chapter": 3,
    "rows": 4,
    "cols": 5,
    "mask": [
      "#####",
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
        "row": 3,
        "col": 4
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-1",
        "row": 1,
        "col": 1
      },
      {
        "id": "t4",
        "itemId": "car-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t6",
        "itemId": "car-1",
        "row": 2,
        "col": 2
      },
      {
        "id": "t3",
        "itemId": "fruit-2",
        "row": 3,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "car-0",
        "row": 3,
        "col": 1
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
        "row": 3,
        "col": 3
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
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 21,
    "parMoves": 16,
    "twoStarScore": 650,
    "threeStarScore": 900,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "#####",
      "#####",
      "#####",
      "#####"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t4",
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
        "tileId": "t5",
        "direction": "left"
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
        "tileId": "t4",
        "direction": "down"
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
        "tileId": "t3",
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
        "direction": "up"
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
            "type": "slide",
            "tileId": "t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t4",
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
            "tileId": "t5",
            "direction": "left"
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
            "tileId": "t4",
            "direction": "down"
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
            "tileId": "t3",
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
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
          }
        ],
        "score": 900,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 16,
      "optimalMoves": 16,
      "setupMoves": 12,
      "decisionPoints": 14,
      "greedyTraps": 1,
      "maxSetupRun": 9,
      "openingChoices": 2,
      "openingOptimal": 1,
      "authorAttempt": 23
    }
  },
  {
    "id": "slide07-12",
    "title": "花园暗线",
    "subtitle": "纵向通道里，需要连续准备才能会合。",
    "chapter": 3,
    "rows": 5,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [
      {
        "row": 2,
        "col": 0
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 0,
        "col": 3
      }
    ],
    "tiles": [
      {
        "id": "t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 0
      },
      {
        "id": "t3",
        "itemId": "plant-0",
        "row": 0,
        "col": 2
      },
      {
        "id": "t4",
        "itemId": "plant-0",
        "row": 1,
        "col": 3
      },
      {
        "id": "t6",
        "itemId": "plant-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "t5",
        "itemId": "plant-1",
        "row": 2,
        "col": 2
      },
      {
        "id": "t2",
        "itemId": "fruit-2",
        "row": 4,
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
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 25,
    "parMoves": 20,
    "twoStarScore": 900,
    "threeStarScore": 1150,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "####",
      "####",
      "####",
      "####",
      "####"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "t6",
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
        "tileId": "t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "down"
      },
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
        "tileId": "t6",
        "direction": "up"
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
        "tileId": "t1",
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
        "direction": "left"
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
            "tileId": "t6",
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
            "tileId": "t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "down"
          },
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
            "tileId": "t6",
            "direction": "up"
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
            "tileId": "t1",
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
            "direction": "left"
          }
        ],
        "score": 1150,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 16,
      "optimalMoves": 20,
      "setupMoves": 16,
      "decisionPoints": 19,
      "greedyTraps": 2,
      "maxSetupRun": 14,
      "openingChoices": 5,
      "openingOptimal": 1,
      "authorAttempt": 1
    }
  },
  {
    "id": "slide07-13",
    "title": "交换次序",
    "subtitle": "眼前的合成，不一定是正确的下一步。",
    "chapter": 3,
    "rows": 4,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 1,
        "col": 1
      }
    ],
    "tiles": [
      {
        "id": "t4",
        "itemId": "plant-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "t5",
        "itemId": "plant-0",
        "row": 2,
        "col": 1
      },
      {
        "id": "t6",
        "itemId": "plant-1",
        "row": 2,
        "col": 3
      },
      {
        "id": "t1",
        "itemId": "fruit-1",
        "row": 3,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
        "row": 3,
        "col": 2
      },
      {
        "id": "t3",
        "itemId": "fruit-2",
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
        "targetTier": 2,
        "count": 1
      }
    },
    "footprintByChain": {},
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
    ],
    "moveLimit": 25,
    "parMoves": 20,
    "twoStarScore": 650,
    "threeStarScore": 900,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t6",
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
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "up"
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
        "tileId": "t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "left"
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
        "tileId": "t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "down"
      },
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
        "tileId": "t2",
        "direction": "down"
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
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
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
            "tileId": "t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "left"
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
            "tileId": "t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "down"
          },
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
            "tileId": "t2",
            "direction": "down"
          }
        ],
        "score": 900,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 17,
      "optimalMoves": 20,
      "setupMoves": 16,
      "decisionPoints": 15,
      "greedyTraps": 10,
      "maxSetupRun": 10,
      "openingChoices": 4,
      "openingOptimal": 2,
      "authorAttempt": 19
    }
  },
  {
    "id": "slide07-14",
    "title": "序章终局",
    "subtitle": "把两条升级链的顺序一起考虑。",
    "chapter": 3,
    "rows": 4,
    "cols": 4,
    "mask": [
      "####",
      "####",
      "####",
      "####"
    ],
    "rocks": [
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 2,
        "col": 2
      }
    ],
    "tiles": [
      {
        "id": "t4",
        "itemId": "plant-0",
        "row": 0,
        "col": 3
      },
      {
        "id": "t1",
        "itemId": "fruit-1",
        "row": 1,
        "col": 3
      },
      {
        "id": "t3",
        "itemId": "fruit-2",
        "row": 2,
        "col": 3
      },
      {
        "id": "t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 0
      },
      {
        "id": "t2",
        "itemId": "fruit-1",
        "row": 3,
        "col": 2
      },
      {
        "id": "t6",
        "itemId": "plant-1",
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
        "targetTier": 2,
        "count": 1
      }
    },
    "footprintByChain": {},
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
    ],
    "moveLimit": 26,
    "parMoves": 22,
    "twoStarScore": 700,
    "threeStarScore": 950,
    "ruleset": "slide-v07-2",
    "requiredMechanics": [],
    "pattern": [
      "####",
      "####",
      "####",
      "####"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t4",
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
        "tileId": "t1",
        "direction": "down"
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
        "tileId": "t6",
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
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "t6",
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
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "t6",
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
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "t5",
        "direction": "up"
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
            "tileId": "t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t4",
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
            "tileId": "t1",
            "direction": "down"
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
            "tileId": "t6",
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
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "t6",
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
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "t6",
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
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "t5",
            "direction": "up"
          }
        ],
        "score": 950,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "challenge-1",
      "minimumMoves": 18,
      "optimalMoves": 22,
      "setupMoves": 18,
      "decisionPoints": 14,
      "greedyTraps": 13,
      "maxSetupRun": 16,
      "openingChoices": 2,
      "openingOptimal": 1,
      "authorAttempt": 25
    }
  },
  {
    "id": "slide07-15",
    "title": "封锁三庭",
    "subtitle": "三处庭院共享步数；爆破需要落在正确的墙边。",
    "chapter": 3,
    "rows": 9,
    "cols": 9,
    "mask": [
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      "#########",
      "#########",
      "#########",
      "#########",
      "#########"
    ],
    "rocks": [
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 3,
        "col": 3
      },
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
        "col": 5
      },
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 8,
        "col": 0
      },
      {
        "row": 8,
        "col": 1
      },
      {
        "row": 7,
        "col": 2
      },
      {
        "row": 6,
        "col": 2
      },
      {
        "row": 5,
        "col": 7
      },
      {
        "row": 8,
        "col": 6
      },
      {
        "row": 5,
        "col": 6
      },
      {
        "row": 5,
        "col": 5
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 6,
        "col": 4
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 8,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t1",
        "itemId": "fruit-0",
        "row": 1,
        "col": 6
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-1",
        "row": 2,
        "col": 6,
        "effect": "bomb"
      },
      {
        "id": "r0-t4",
        "itemId": "fruit-2",
        "row": 3,
        "col": 1
      },
      {
        "id": "r0-t5",
        "itemId": "fruit-3",
        "row": 3,
        "col": 5
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-0",
        "row": 3,
        "col": 6
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-3",
        "row": 5,
        "col": 1
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 5,
        "col": 3
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 6,
        "col": 3
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 7,
        "col": 3
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-2",
        "row": 8,
        "col": 2
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-2",
        "row": 8,
        "col": 3
      },
      {
        "id": "r2-t4",
        "itemId": "fruit-3",
        "row": 7,
        "col": 5
      },
      {
        "id": "r2-t1",
        "itemId": "fruit-1",
        "row": 7,
        "col": 6
      },
      {
        "id": "r2-t2",
        "itemId": "fruit-1",
        "row": 8,
        "col": 5
      },
      {
        "id": "r2-t3",
        "itemId": "fruit-2",
        "row": 8,
        "col": 7
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 3
      },
      "plant": {
        "targetTier": 2,
        "count": 1
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [
        {
          "id": "r0-crate-0",
          "row": 0,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-1",
          "row": 1,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-2",
          "row": 2,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-3",
          "row": 3,
          "col": 4,
          "powder": true
        }
      ],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 40,
    "parMoves": 34,
    "twoStarScore": 2250,
    "threeStarScore": 2550,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 1,
        "rows": 4,
        "cols": 6,
        "minimumMoves": 14
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 5,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 13
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 7
      }
    ],
    "requiredMechanics": [
      "bomb"
    ],
    "pattern": [
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      "#########",
      "#########",
      "#########",
      "#########",
      "#########"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t4",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t4",
            "direction": "right"
          }
        ],
        "score": 2550,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 34,
      "optimalMoves": 34,
      "setupMoves": 23,
      "decisionPoints": 29,
      "greedyTraps": 13,
      "maxSetupRun": 7
    }
  },
  {
    "id": "slide07-16",
    "title": "五苹果迷局",
    "subtitle": "前庭的五颗苹果分居两侧，其余庭院也在等待调度。",
    "chapter": 4,
    "rows": 9,
    "cols": 9,
    "mask": [
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      "#########",
      "#########",
      "#########",
      "#########",
      "#########"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 0,
        "col": 6
      },
      {
        "row": 3,
        "col": 3
      },
      {
        "row": 3,
        "col": 6
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 0,
        "col": 5
      },
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 7,
        "col": 3
      },
      {
        "row": 5,
        "col": 0
      },
      {
        "row": 7,
        "col": 2
      },
      {
        "row": 7,
        "col": 1
      },
      {
        "row": 7,
        "col": 8
      },
      {
        "row": 8,
        "col": 5
      },
      {
        "row": 7,
        "col": 6
      },
      {
        "row": 5,
        "col": 8
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 6,
        "col": 4
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 8,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t6",
        "itemId": "fruit-1",
        "row": 0,
        "col": 1
      },
      {
        "id": "r0-t1",
        "itemId": "fruit-2",
        "row": 1,
        "col": 1
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-2",
        "row": 1,
        "col": 2
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-2",
        "row": 1,
        "col": 6
      },
      {
        "id": "r0-t5",
        "itemId": "fruit-2",
        "row": 2,
        "col": 6
      },
      {
        "id": "r0-t4",
        "itemId": "fruit-2",
        "row": 3,
        "col": 2,
        "effect": "bomb"
      },
      {
        "id": "r0-t7",
        "itemId": "fruit-1",
        "row": 3,
        "col": 5
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-1",
        "row": 5,
        "col": 2
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-1",
        "row": 5,
        "col": 3
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-2",
        "row": 6,
        "col": 3
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 7,
        "col": 0
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 8,
        "col": 1
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 8,
        "col": 2
      },
      {
        "id": "r2-t1",
        "itemId": "fruit-1",
        "row": 6,
        "col": 5
      },
      {
        "id": "r2-t2",
        "itemId": "fruit-1",
        "row": 6,
        "col": 8
      },
      {
        "id": "r2-t3",
        "itemId": "fruit-1",
        "row": 7,
        "col": 5
      },
      {
        "id": "r2-t4",
        "itemId": "fruit-1",
        "row": 8,
        "col": 6
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 5
      },
      "plant": {
        "targetTier": 2,
        "count": 1
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [
        {
          "id": "r0-crate-0",
          "row": 0,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-1",
          "row": 1,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-2",
          "row": 2,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-3",
          "row": 3,
          "col": 4,
          "powder": true
        }
      ],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 46,
    "parMoves": 40,
    "twoStarScore": 2350,
    "threeStarScore": 2650,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 1,
        "rows": 4,
        "cols": 6,
        "minimumMoves": 18
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 5,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 13
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 9
      }
    ],
    "requiredMechanics": [
      "bomb"
    ],
    "pattern": [
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      "#########",
      "#########",
      "#########",
      "#########",
      "#########"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t7",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "up"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t7",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "up"
          }
        ],
        "score": 2650,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 40,
      "optimalMoves": 40,
      "setupMoves": 29,
      "decisionPoints": 33,
      "greedyTraps": 27,
      "maxSetupRun": 11
    }
  },
  {
    "id": "slide07-17",
    "title": "爆破车站",
    "subtitle": "炸出车道，再用可挪动障碍安排会合。",
    "chapter": 4,
    "rows": 9,
    "cols": 9,
    "mask": [
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      "#########",
      "#########",
      "#########",
      "#########",
      "#####...."
    ],
    "rocks": [
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 1,
        "col": 6
      },
      {
        "row": 3,
        "col": 6
      },
      {
        "row": 1,
        "col": 5
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 7,
        "col": 2
      },
      {
        "row": 8,
        "col": 3
      },
      {
        "row": 7,
        "col": 0
      },
      {
        "row": 8,
        "col": 0
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 6,
        "col": 4
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 8,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 3,
        "effect": "bomb"
      },
      {
        "id": "r0-t6",
        "itemId": "car-1",
        "row": 0,
        "col": 5
      },
      {
        "id": "r0-t4",
        "itemId": "car-0",
        "row": 1,
        "col": 2
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-3",
        "row": 2,
        "col": 2
      },
      {
        "id": "r0-t5",
        "itemId": "car-0",
        "row": 3,
        "col": 2
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-0",
        "row": 5,
        "col": 2
      },
      {
        "id": "r1-t4",
        "itemId": "fruit-2",
        "row": 7,
        "col": 1
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-0",
        "row": 7,
        "col": 3
      },
      {
        "id": "r1-t5",
        "itemId": "fruit-3",
        "row": 8,
        "col": 1
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-1",
        "row": 8,
        "col": 2
      },
      {
        "id": "r2-t1",
        "itemId": "fruit-1",
        "row": 5,
        "col": 5
      },
      {
        "id": "r2-t3",
        "itemId": "fruit-2",
        "row": 5,
        "col": 6
      },
      {
        "id": "r2-t7",
        "itemId": "plant-1",
        "row": 5,
        "col": 7
      },
      {
        "id": "r2-t5",
        "itemId": "plant-0",
        "row": 6,
        "col": 5
      },
      {
        "id": "r2-t6",
        "itemId": "plant-0",
        "row": 6,
        "col": 6
      },
      {
        "id": "r2-t2",
        "itemId": "fruit-1",
        "row": 6,
        "col": 8
      },
      {
        "id": "r2-t4",
        "itemId": "fruit-3",
        "row": 7,
        "col": 7
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 3
      },
      "car": {
        "targetTier": 2,
        "count": 1
      },
      "plant": {
        "targetTier": 2,
        "count": 1
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "car": {
        "width": 2,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 2
      }
    },
    "features": {
      "crates": [
        {
          "id": "r0-crate-0",
          "row": 0,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-1",
          "row": 1,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-2",
          "row": 2,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-3",
          "row": 3,
          "col": 4,
          "powder": true
        }
      ],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 49,
    "parMoves": 43,
    "twoStarScore": 2800,
    "threeStarScore": 3100,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 1,
        "rows": 4,
        "cols": 6,
        "minimumMoves": 23
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 5,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 11
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 5,
        "rows": 3,
        "cols": 4,
        "minimumMoves": 9
      }
    ],
    "requiredMechanics": [
      "bomb"
    ],
    "obstacle": {
      "enabled": true,
      "moveLimit": 1,
      "placementCells": [
        {
          "type": "place-obstacle",
          "row": 5,
          "col": 8
        }
      ]
    },
    "pattern": [
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      "#########",
      "#########",
      "#########",
      "#########",
      "#####...."
    ],
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 5,
        "col": 8
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t7",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t7",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "place-obstacle",
            "row": 5,
            "col": 8
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t7",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t7",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "down"
          }
        ],
        "score": 3100,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 43,
      "optimalMoves": 43,
      "setupMoves": 30,
      "decisionPoints": 34,
      "greedyTraps": 9,
      "maxSetupRun": 13
    }
  },
  {
    "id": "slide07-18",
    "title": "回廊深处",
    "subtitle": "先拆封锁，再整理留下的通道。",
    "chapter": 4,
    "rows": 10,
    "cols": 9,
    "mask": [
      "..#####..",
      "..#####..",
      "..#####..",
      "..#####..",
      "..#####..",
      "#########",
      "#########",
      "#########",
      "#########",
      "#########"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 5
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 1,
        "col": 5
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 3,
        "col": 5
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 7,
        "col": 2
      },
      {
        "row": 8,
        "col": 1
      },
      {
        "row": 8,
        "col": 0
      },
      {
        "row": 8,
        "col": 2
      },
      {
        "row": 9,
        "col": 6
      },
      {
        "row": 8,
        "col": 6
      },
      {
        "row": 6,
        "col": 6
      },
      {
        "row": 6,
        "col": 8
      },
      {
        "row": 5,
        "col": 0
      },
      {
        "row": 5,
        "col": 1
      },
      {
        "row": 5,
        "col": 2
      },
      {
        "row": 5,
        "col": 3
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 5,
        "col": 5
      },
      {
        "row": 5,
        "col": 6
      },
      {
        "row": 5,
        "col": 7
      },
      {
        "row": 5,
        "col": 8
      },
      {
        "row": 6,
        "col": 4
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 8,
        "col": 4
      },
      {
        "row": 9,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t3",
        "itemId": "fruit-1",
        "row": 0,
        "col": 2
      },
      {
        "id": "r0-t1",
        "itemId": "fruit-0",
        "row": 0,
        "col": 6
      },
      {
        "id": "r0-t5",
        "itemId": "fruit-3",
        "row": 1,
        "col": 2
      },
      {
        "id": "r0-t4",
        "itemId": "fruit-2",
        "row": 3,
        "col": 6
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-0",
        "row": 4,
        "col": 6,
        "effect": "bomb"
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-2",
        "row": 6,
        "col": 2
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-2",
        "row": 7,
        "col": 0
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 7,
        "col": 1
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 9,
        "col": 0
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-3",
        "row": 9,
        "col": 1
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 9,
        "col": 2
      },
      {
        "id": "r2-t1",
        "itemId": "fruit-2",
        "row": 6,
        "col": 5
      },
      {
        "id": "r2-t4",
        "itemId": "plant-1",
        "row": 8,
        "col": 5
      },
      {
        "id": "r2-t3",
        "itemId": "fruit-3",
        "row": 8,
        "col": 8
      },
      {
        "id": "r2-t5",
        "itemId": "plant-1",
        "row": 9,
        "col": 7
      },
      {
        "id": "r2-t2",
        "itemId": "fruit-2",
        "row": 9,
        "col": 8
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 3
      },
      "plant": {
        "targetTier": 2,
        "count": 2
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [
        {
          "id": "r0-crate-0",
          "row": 0,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-1",
          "row": 1,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-2",
          "row": 2,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-3",
          "row": 3,
          "col": 4,
          "powder": true
        },
        {
          "id": "r0-crate-4",
          "row": 4,
          "col": 4,
          "powder": true
        }
      ],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 49,
    "parMoves": 43,
    "twoStarScore": 2350,
    "threeStarScore": 2650,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 2,
        "rows": 5,
        "cols": 5,
        "minimumMoves": 20
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 6,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 13
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 6,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 10
      }
    ],
    "requiredMechanics": [
      "bomb"
    ],
    "pattern": [
      "..#####..",
      "..#####..",
      "..#####..",
      "..#####..",
      "..#####..",
      "#########",
      "#########",
      "#########",
      "#########",
      "#########"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "right"
          }
        ],
        "score": 2650,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 43,
      "optimalMoves": 43,
      "setupMoves": 32,
      "decisionPoints": 37,
      "greedyTraps": 11,
      "maxSetupRun": 8
    }
  },
  {
    "id": "slide07-19",
    "title": "十字封园",
    "subtitle": "十字封锁与双链调度，分别找到突破口。",
    "chapter": 4,
    "rows": 10,
    "cols": 9,
    "mask": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      "..#####..",
      "..#####..",
      "..#####..",
      "..#####..",
      "..#####.."
    ],
    "rocks": [
      {
        "row": 3,
        "col": 3
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 1,
        "col": 7
      },
      {
        "row": 1,
        "col": 6
      },
      {
        "row": 0,
        "col": 7
      },
      {
        "row": 2,
        "col": 6
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t4",
        "itemId": "plant-0",
        "row": 0,
        "col": 0
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-3",
        "row": 0,
        "col": 1
      },
      {
        "id": "r0-t6",
        "itemId": "plant-1",
        "row": 0,
        "col": 2
      },
      {
        "id": "r0-t5",
        "itemId": "plant-0",
        "row": 1,
        "col": 2
      },
      {
        "id": "r0-t1",
        "itemId": "fruit-2",
        "row": 1,
        "col": 3
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 3
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 0,
        "col": 5
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-3",
        "row": 0,
        "col": 6
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 8
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 1,
        "col": 5
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 7
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 8
      },
      {
        "id": "r2-a0",
        "itemId": "fruit-2",
        "row": 5,
        "col": 2,
        "effect": "bomb"
      },
      {
        "id": "r2-a1",
        "itemId": "fruit-2",
        "row": 6,
        "col": 3
      },
      {
        "id": "r2-p",
        "itemId": "fruit-3",
        "row": 9,
        "col": 6
      },
      {
        "id": "r2-s1",
        "itemId": "plant-1",
        "row": 5,
        "col": 6
      },
      {
        "id": "r2-s2",
        "itemId": "plant-1",
        "row": 9,
        "col": 2
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 3
      },
      "plant": {
        "targetTier": 2,
        "count": 3
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [
        {
          "id": "r2-wall-0",
          "row": 5,
          "col": 4,
          "powder": true
        },
        {
          "id": "r2-wall-1",
          "row": 6,
          "col": 4,
          "powder": true
        },
        {
          "id": "r2-wall-2",
          "row": 7,
          "col": 4,
          "powder": true
        },
        {
          "id": "r2-wall-3",
          "row": 8,
          "col": 4,
          "powder": true
        },
        {
          "id": "r2-wall-4",
          "row": 9,
          "col": 4,
          "powder": true
        },
        {
          "id": "r2-wall-5",
          "row": 7,
          "col": 2,
          "powder": true
        },
        {
          "id": "r2-wall-6",
          "row": 7,
          "col": 3,
          "powder": true
        },
        {
          "id": "r2-wall-7",
          "row": 7,
          "col": 5,
          "powder": true
        },
        {
          "id": "r2-wall-8",
          "row": 7,
          "col": 6,
          "powder": true
        }
      ],
      "brakes": [],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 44,
    "parMoves": 38,
    "twoStarScore": 2250,
    "threeStarScore": 2550,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 19
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 0,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 13
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 2,
        "rows": 5,
        "cols": 5,
        "minimumMoves": 6
      }
    ],
    "requiredMechanics": [
      "bomb"
    ],
    "pattern": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      "..#####..",
      "..#####..",
      "..#####..",
      "..#####..",
      "..#####.."
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-a1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-s1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-a1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-s1",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-a1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-s1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-a1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-s1",
            "direction": "down"
          }
        ],
        "score": 2550,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 38,
      "optimalMoves": 38,
      "setupMoves": 27,
      "decisionPoints": 29,
      "greedyTraps": 19,
      "maxSetupRun": 12
    }
  },
  {
    "id": "slide07-20",
    "title": "转向庭院",
    "subtitle": "前庭安排合成，后庭借花台穿过缺口。",
    "chapter": 4,
    "rows": 8,
    "cols": 9,
    "mask": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      "..#####..",
      "..#####..",
      "..#####.."
    ],
    "rocks": [
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 0,
        "col": 7
      },
      {
        "row": 1,
        "col": 7
      },
      {
        "row": 1,
        "col": 6
      },
      {
        "row": 2,
        "col": 6
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t1",
        "itemId": "fruit-1",
        "row": 1,
        "col": 0
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-1",
        "row": 2,
        "col": 3
      },
      {
        "id": "r0-t4",
        "itemId": "plant-0",
        "row": 3,
        "col": 0
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-2",
        "row": 3,
        "col": 1
      },
      {
        "id": "r0-t6",
        "itemId": "plant-1",
        "row": 3,
        "col": 2
      },
      {
        "id": "r0-t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 3
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 0,
        "col": 5
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-2",
        "row": 0,
        "col": 6
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 1,
        "col": 5
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-1",
        "row": 1,
        "col": 8
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 2,
        "col": 5
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-1",
        "row": 3,
        "col": 5
      },
      {
        "id": "r2-a0",
        "itemId": "fruit-2",
        "row": 5,
        "col": 2
      },
      {
        "id": "r2-a1",
        "itemId": "fruit-2",
        "row": 7,
        "col": 6
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 3
      },
      "plant": {
        "targetTier": 2,
        "count": 2
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [],
      "brakes": [
        {
          "id": "r2-turn",
          "row": 6,
          "col": 2,
          "direction": "right",
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 45,
    "parMoves": 38,
    "twoStarScore": 1900,
    "threeStarScore": 2200,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 21
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 0,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 15
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 2,
        "rows": 3,
        "cols": 5,
        "minimumMoves": 2
      }
    ],
    "requiredMechanics": [
      "turn"
    ],
    "pattern": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      "..#####..",
      "..#####..",
      "..#####.."
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "down"
          }
        ],
        "score": 2200,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 38,
      "optimalMoves": 38,
      "setupMoves": 29,
      "decisionPoints": 34,
      "greedyTraps": 10,
      "maxSetupRun": 15
    }
  },
  {
    "id": "slide07-21",
    "title": "双弯花园",
    "subtitle": "双弯连接两侧，另一处庭院考验合成顺序。",
    "chapter": 5,
    "rows": 8,
    "cols": 9,
    "mask": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      "..#####..",
      "..#####..",
      "..#####.."
    ],
    "rocks": [
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 3,
        "col": 0
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 1,
        "col": 7
      },
      {
        "row": 3,
        "col": 7
      },
      {
        "row": 2,
        "col": 5
      },
      {
        "row": 1,
        "col": 6
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t1",
        "itemId": "fruit-1",
        "row": 0,
        "col": 3
      },
      {
        "id": "r0-t4",
        "itemId": "plant-0",
        "row": 1,
        "col": 3
      },
      {
        "id": "r0-t5",
        "itemId": "plant-0",
        "row": 2,
        "col": 1
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-2",
        "row": 2,
        "col": 3
      },
      {
        "id": "r0-t6",
        "itemId": "plant-1",
        "row": 3,
        "col": 2
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-1",
        "row": 3,
        "col": 3
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-1",
        "row": 0,
        "col": 5
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 0,
        "col": 8
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-2",
        "row": 1,
        "col": 5
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 5
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 3,
        "col": 6
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-1",
        "row": 3,
        "col": 8
      },
      {
        "id": "r2-a0",
        "itemId": "fruit-2",
        "row": 5,
        "col": 2
      },
      {
        "id": "r2-a1",
        "itemId": "fruit-2",
        "row": 7,
        "col": 6
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 3
      },
      "plant": {
        "targetTier": 2,
        "count": 2
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [],
      "brakes": [
        {
          "id": "r2-turn-a",
          "row": 6,
          "col": 2,
          "direction": "right",
          "width": 1,
          "height": 1,
          "charges": 1
        },
        {
          "id": "r2-turn-b",
          "row": 6,
          "col": 6,
          "direction": "down",
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 43,
    "parMoves": 36,
    "twoStarScore": 2050,
    "threeStarScore": 2350,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 20
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 0,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 15
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 2,
        "rows": 3,
        "cols": 5,
        "minimumMoves": 1
      }
    ],
    "requiredMechanics": [
      "turn"
    ],
    "pattern": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      "..#####..",
      "..#####..",
      "..#####.."
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "down"
          }
        ],
        "score": 2350,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 36,
      "optimalMoves": 36,
      "setupMoves": 27,
      "decisionPoints": 27,
      "greedyTraps": 11,
      "maxSetupRun": 16
    }
  },
  {
    "id": "slide07-22",
    "title": "宽车入弯",
    "subtitle": "宽花台只接宽车；为另一条升级链留下空间。",
    "chapter": 5,
    "rows": 9,
    "cols": 9,
    "mask": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".#######.",
      ".#######.",
      ".#######.",
      ".#######."
    ],
    "rocks": [
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 1,
        "col": 7
      },
      {
        "row": 0,
        "col": 8
      },
      {
        "row": 2,
        "col": 6
      },
      {
        "row": 3,
        "col": 8
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 8,
        "col": 4
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t6",
        "itemId": "plant-1",
        "row": 0,
        "col": 1
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-2",
        "row": 0,
        "col": 2
      },
      {
        "id": "r0-t4",
        "itemId": "plant-0",
        "row": 1,
        "col": 0
      },
      {
        "id": "r0-t1",
        "itemId": "fruit-1",
        "row": 1,
        "col": 2
      },
      {
        "id": "r0-t5",
        "itemId": "plant-0",
        "row": 1,
        "col": 3
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-1",
        "row": 3,
        "col": 0
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 0,
        "col": 5
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 0,
        "col": 7
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-2",
        "row": 1,
        "col": 8
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-1",
        "row": 2,
        "col": 5
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 2,
        "col": 7
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-1",
        "row": 2,
        "col": 8
      },
      {
        "id": "r2-c1",
        "itemId": "car-1",
        "row": 5,
        "col": 2
      },
      {
        "id": "r2-c2",
        "itemId": "car-1",
        "row": 8,
        "col": 6
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 2
      },
      "plant": {
        "targetTier": 2,
        "count": 2
      },
      "car": {
        "targetTier": 2,
        "count": 1
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      },
      "car": {
        "width": 2,
        "height": 1
      }
    },
    "features": {
      "crates": [],
      "brakes": [
        {
          "id": "r2-turn",
          "row": 6,
          "col": 1,
          "direction": "right",
          "width": 2,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 48,
    "parMoves": 41,
    "twoStarScore": 1700,
    "threeStarScore": 2000,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 23
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 0,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 15
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 1,
        "rows": 4,
        "cols": 7,
        "minimumMoves": 3
      }
    ],
    "requiredMechanics": [
      "turn"
    ],
    "pattern": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".#######.",
      ".#######.",
      ".#######.",
      ".#######."
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-c1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-c1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-c1",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-c1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-c1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-c1",
            "direction": "down"
          }
        ],
        "score": 2000,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 41,
      "optimalMoves": 41,
      "setupMoves": 32,
      "decisionPoints": 37,
      "greedyTraps": 5,
      "maxSetupRun": 16
    }
  },
  {
    "id": "slide07-23",
    "title": "墙后花台",
    "subtitle": "在墙边的正确位置完成转向和爆破。",
    "chapter": 5,
    "rows": 8,
    "cols": 9,
    "mask": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".#######.",
      ".#######.",
      ".#######."
    ],
    "rocks": [
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 1,
        "col": 6
      },
      {
        "row": 3,
        "col": 8
      },
      {
        "row": 2,
        "col": 8
      },
      {
        "row": 1,
        "col": 7
      },
      {
        "row": 5,
        "col": 3
      },
      {
        "row": 7,
        "col": 3
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t3",
        "itemId": "fruit-3",
        "row": 0,
        "col": 2
      },
      {
        "id": "r0-t4",
        "itemId": "plant-0",
        "row": 1,
        "col": 2
      },
      {
        "id": "r0-t1",
        "itemId": "fruit-2",
        "row": 1,
        "col": 3
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 1
      },
      {
        "id": "r0-t6",
        "itemId": "plant-1",
        "row": 2,
        "col": 3
      },
      {
        "id": "r0-t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 2
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 6
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-3",
        "row": 0,
        "col": 7
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 0,
        "col": 8
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-2",
        "row": 1,
        "col": 8
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 2,
        "col": 7
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 5
      },
      {
        "id": "r2-a0",
        "itemId": "fruit-2",
        "row": 5,
        "col": 1,
        "effect": "bomb"
      },
      {
        "id": "r2-a1",
        "itemId": "fruit-2",
        "row": 7,
        "col": 5
      },
      {
        "id": "r2-p",
        "itemId": "fruit-3",
        "row": 7,
        "col": 7
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 3
      },
      "plant": {
        "targetTier": 2,
        "count": 2
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [
        {
          "id": "r2-wall-0",
          "row": 5,
          "col": 6,
          "powder": true
        },
        {
          "id": "r2-wall-1",
          "row": 6,
          "col": 6,
          "powder": true
        },
        {
          "id": "r2-wall-2",
          "row": 7,
          "col": 6,
          "powder": true
        }
      ],
      "brakes": [
        {
          "id": "r2-turn",
          "row": 6,
          "col": 1,
          "direction": "right",
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 46,
    "parMoves": 39,
    "twoStarScore": 2650,
    "threeStarScore": 2950,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 21
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 0,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 15
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 1,
        "rows": 3,
        "cols": 7,
        "minimumMoves": 3
      }
    ],
    "requiredMechanics": [
      "bomb",
      "turn"
    ],
    "pattern": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".#######.",
      ".#######.",
      ".#######."
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-a1",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-a1",
            "direction": "right"
          }
        ],
        "score": 2950,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 39,
      "optimalMoves": 39,
      "setupMoves": 29,
      "decisionPoints": 37,
      "greedyTraps": 11,
      "maxSetupRun": 17
    }
  },
  {
    "id": "slide07-24",
    "title": "封锁回廊",
    "subtitle": "先打开封锁，再借花台进入深处。",
    "chapter": 5,
    "rows": 8,
    "cols": 9,
    "mask": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".#######.",
      ".#######.",
      ".#######."
    ],
    "rocks": [
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 3,
        "col": 0
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 2,
        "col": 6
      },
      {
        "row": 1,
        "col": 6
      },
      {
        "row": 2,
        "col": 7
      },
      {
        "row": 3,
        "col": 8
      },
      {
        "row": 5,
        "col": 5
      },
      {
        "row": 7,
        "col": 5
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t4",
        "itemId": "plant-0",
        "row": 0,
        "col": 2
      },
      {
        "id": "r0-t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 3
      },
      {
        "id": "r0-t6",
        "itemId": "plant-1",
        "row": 1,
        "col": 3
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-3",
        "row": 3,
        "col": 1
      },
      {
        "id": "r0-t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 2
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-2",
        "row": 3,
        "col": 3
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 0,
        "col": 5
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 0,
        "col": 6
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-3",
        "row": 0,
        "col": 7
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 1,
        "col": 5
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-2",
        "row": 2,
        "col": 8
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-2",
        "row": 3,
        "col": 5
      },
      {
        "id": "r2-a0",
        "itemId": "fruit-2",
        "row": 5,
        "col": 1,
        "effect": "bomb"
      },
      {
        "id": "r2-a1",
        "itemId": "fruit-2",
        "row": 7,
        "col": 2
      },
      {
        "id": "r2-p",
        "itemId": "fruit-3",
        "row": 7,
        "col": 7
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 3
      },
      "plant": {
        "targetTier": 2,
        "count": 2
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [
        {
          "id": "r2-wall-0",
          "row": 5,
          "col": 3,
          "powder": true
        },
        {
          "id": "r2-wall-1",
          "row": 6,
          "col": 3,
          "powder": true
        },
        {
          "id": "r2-wall-2",
          "row": 7,
          "col": 3,
          "powder": true
        }
      ],
      "brakes": [
        {
          "id": "r2-turn",
          "row": 6,
          "col": 1,
          "direction": "right",
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": []
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 46,
    "parMoves": 39,
    "twoStarScore": 2650,
    "threeStarScore": 2950,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 20
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 0,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 15
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 1,
        "rows": 3,
        "cols": 7,
        "minimumMoves": 4
      }
    ],
    "requiredMechanics": [
      "bomb",
      "turn"
    ],
    "pattern": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".#######.",
      ".#######.",
      ".#######."
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-a1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-a1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "down"
          }
        ],
        "score": 2950,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 39,
      "optimalMoves": 39,
      "setupMoves": 29,
      "decisionPoints": 39,
      "greedyTraps": 5,
      "maxSetupRun": 16
    }
  },
  {
    "id": "slide07-25",
    "title": "跨区花园",
    "subtitle": "传送两端需要接应，双链庭院也要安排顺序。",
    "chapter": 5,
    "rows": 9,
    "cols": 9,
    "mask": [
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      "#########",
      "#########",
      "#########",
      "#########",
      "#########"
    ],
    "rocks": [
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 4
      },
      {
        "row": 0,
        "col": 5
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 3,
        "col": 5
      },
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 6,
        "col": 1
      },
      {
        "row": 8,
        "col": 3
      },
      {
        "row": 8,
        "col": 2
      },
      {
        "row": 7,
        "col": 1
      },
      {
        "row": 5,
        "col": 8
      },
      {
        "row": 8,
        "col": 7
      },
      {
        "row": 6,
        "col": 6
      },
      {
        "row": 7,
        "col": 6
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 6,
        "col": 4
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 8,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t1",
        "itemId": "fruit-0",
        "row": 1,
        "col": 3
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-1",
        "row": 2,
        "col": 1
      },
      {
        "id": "r0-t5",
        "itemId": "fruit-3",
        "row": 3,
        "col": 1
      },
      {
        "id": "r0-t4",
        "itemId": "fruit-2",
        "row": 3,
        "col": 2
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-0",
        "row": 3,
        "col": 3
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 6,
        "col": 0
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 6,
        "col": 2
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-3",
        "row": 7,
        "col": 0
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-2",
        "row": 7,
        "col": 3
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-2",
        "row": 8,
        "col": 0
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 8,
        "col": 1
      },
      {
        "id": "r2-t1",
        "itemId": "fruit-1",
        "row": 5,
        "col": 5
      },
      {
        "id": "r2-t4",
        "itemId": "fruit-3",
        "row": 6,
        "col": 5
      },
      {
        "id": "r2-t3",
        "itemId": "fruit-2",
        "row": 7,
        "col": 5
      },
      {
        "id": "r2-t5",
        "itemId": "plant-1",
        "row": 8,
        "col": 5
      },
      {
        "id": "r2-t6",
        "itemId": "plant-1",
        "row": 8,
        "col": 6
      },
      {
        "id": "r2-t2",
        "itemId": "fruit-1",
        "row": 8,
        "col": 8
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 3
      },
      "plant": {
        "targetTier": 2,
        "count": 2
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [],
      "brakes": [],
      "portals": [
        {
          "id": "r0-relay",
          "width": 1,
          "height": 1,
          "a": {
            "row": 1,
            "col": 3
          },
          "b": {
            "row": 2,
            "col": 5
          },
          "charges": 1,
          "reusable": true
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 55,
    "parMoves": 48,
    "twoStarScore": 2950,
    "threeStarScore": 3250,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 1,
        "rows": 4,
        "cols": 6,
        "minimumMoves": 19
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 5,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 15
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 14
      }
    ],
    "requiredMechanics": [
      "portal"
    ],
    "pattern": [
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      "#########",
      "#########",
      "#########",
      "#########",
      "#########"
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t4",
        "direction": "up"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t4",
            "direction": "up"
          }
        ],
        "score": 3250,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 48,
      "optimalMoves": 48,
      "setupMoves": 36,
      "decisionPoints": 31,
      "greedyTraps": 18,
      "maxSetupRun": 15
    }
  },
  {
    "id": "slide07-26",
    "title": "出口调度",
    "subtitle": "门口调度与障碍停靠，共用有限的步数。",
    "chapter": 6,
    "rows": 10,
    "cols": 9,
    "mask": [
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      "#########",
      "#########",
      "#########",
      "#########",
      "#####...."
    ],
    "rocks": [
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 4
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 1,
        "col": 6
      },
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 2,
        "col": 3
      },
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 3,
        "col": 3
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 3,
        "col": 5
      },
      {
        "row": 7,
        "col": 1
      },
      {
        "row": 8,
        "col": 2
      },
      {
        "row": 7,
        "col": 0
      },
      {
        "row": 7,
        "col": 2
      },
      {
        "row": 5,
        "col": 0
      },
      {
        "row": 5,
        "col": 1
      },
      {
        "row": 5,
        "col": 2
      },
      {
        "row": 5,
        "col": 3
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 5,
        "col": 5
      },
      {
        "row": 5,
        "col": 6
      },
      {
        "row": 5,
        "col": 7
      },
      {
        "row": 5,
        "col": 8
      },
      {
        "row": 6,
        "col": 4
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 8,
        "col": 4
      },
      {
        "row": 9,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t6",
        "itemId": "plant-1",
        "row": 0,
        "col": 3
      },
      {
        "id": "r0-t4",
        "itemId": "fruit-2",
        "row": 0,
        "col": 6
      },
      {
        "id": "r0-t5",
        "itemId": "fruit-3",
        "row": 1,
        "col": 1
      },
      {
        "id": "r0-t7",
        "itemId": "plant-1",
        "row": 1,
        "col": 2
      },
      {
        "id": "r0-t1",
        "itemId": "fruit-0",
        "row": 1,
        "col": 3
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-0",
        "row": 2,
        "col": 6
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-1",
        "row": 4,
        "col": 6
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-3",
        "row": 6,
        "col": 0
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-2",
        "row": 6,
        "col": 1
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 6,
        "col": 2
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 7,
        "col": 3
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-2",
        "row": 8,
        "col": 3
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 9,
        "col": 2
      },
      {
        "id": "r2-t1",
        "itemId": "fruit-1",
        "row": 6,
        "col": 5
      },
      {
        "id": "r2-t2",
        "itemId": "fruit-1",
        "row": 6,
        "col": 6
      },
      {
        "id": "r2-t3",
        "itemId": "fruit-1",
        "row": 6,
        "col": 8
      },
      {
        "id": "r2-t4",
        "itemId": "fruit-1",
        "row": 7,
        "col": 5
      },
      {
        "id": "r2-t5",
        "itemId": "fruit-1",
        "row": 7,
        "col": 6
      },
      {
        "id": "r2-t6",
        "itemId": "fruit-1",
        "row": 8,
        "col": 5
      },
      {
        "id": "r2-t7",
        "itemId": "fruit-1",
        "row": 8,
        "col": 6
      },
      {
        "id": "r2-t8",
        "itemId": "fruit-1",
        "row": 8,
        "col": 7
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 3
      },
      "plant": {
        "targetTier": 2,
        "count": 2
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [],
      "brakes": [],
      "portals": [
        {
          "id": "r0-relay",
          "width": 1,
          "height": 1,
          "a": {
            "row": 0,
            "col": 3
          },
          "b": {
            "row": 3,
            "col": 6
          },
          "charges": 1,
          "reusable": true
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 60,
    "parMoves": 53,
    "twoStarScore": 4100,
    "threeStarScore": 4400,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 1,
        "rows": 5,
        "cols": 6,
        "minimumMoves": 27
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 6,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 18
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 6,
        "col": 5,
        "rows": 3,
        "cols": 4,
        "minimumMoves": 8
      }
    ],
    "requiredMechanics": [
      "portal"
    ],
    "obstacle": {
      "enabled": true,
      "moveLimit": 1,
      "placementCells": [
        {
          "type": "place-obstacle",
          "row": 6,
          "col": 7
        }
      ]
    },
    "pattern": [
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      "#########",
      "#########",
      "#########",
      "#########",
      "#####...."
    ],
    "referenceSolution": [
      {
        "type": "place-obstacle",
        "row": 6,
        "col": 7
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t7",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-t8",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-t5",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "place-obstacle",
            "row": 6,
            "col": 7
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t7",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-t8",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-t5",
            "direction": "down"
          }
        ],
        "score": 4400,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 53,
      "optimalMoves": 53,
      "setupMoves": 37,
      "decisionPoints": 46,
      "greedyTraps": 6,
      "maxSetupRun": 18
    }
  },
  {
    "id": "slide07-27",
    "title": "双车道接应",
    "subtitle": "宽门连接车道，庭院里另有两条升级链。",
    "chapter": 6,
    "rows": 9,
    "cols": 9,
    "mask": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".######..",
      ".######..",
      ".######..",
      ".######.."
    ],
    "rocks": [
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 3,
        "col": 8
      },
      {
        "row": 2,
        "col": 8
      },
      {
        "row": 1,
        "col": 7
      },
      {
        "row": 1,
        "col": 6
      },
      {
        "row": 5,
        "col": 4
      },
      {
        "row": 6,
        "col": 4
      },
      {
        "row": 7,
        "col": 4
      },
      {
        "row": 8,
        "col": 4
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t4",
        "itemId": "plant-0",
        "row": 2,
        "col": 0
      },
      {
        "id": "r0-t1",
        "itemId": "fruit-1",
        "row": 2,
        "col": 3
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-1",
        "row": 3,
        "col": 0
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-2",
        "row": 3,
        "col": 1
      },
      {
        "id": "r0-t6",
        "itemId": "plant-1",
        "row": 3,
        "col": 2
      },
      {
        "id": "r0-t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 3
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 0,
        "col": 5
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-1",
        "row": 0,
        "col": 6
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 0,
        "col": 7
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-2",
        "row": 0,
        "col": 8
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-1",
        "row": 1,
        "col": 8
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 7
      },
      {
        "id": "r2-c1",
        "itemId": "car-0",
        "row": 5,
        "col": 1
      },
      {
        "id": "r2-c2",
        "itemId": "car-0",
        "row": 7,
        "col": 5
      },
      {
        "id": "r2-r",
        "itemId": "car-1",
        "row": 8,
        "col": 1
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 2
      },
      "plant": {
        "targetTier": 2,
        "count": 2
      },
      "car": {
        "targetTier": 2,
        "count": 1
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      },
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
          "id": "r2-gate",
          "a": {
            "row": 5,
            "col": 2
          },
          "b": {
            "row": 7,
            "col": 5
          },
          "width": 2,
          "height": 1,
          "charges": 1,
          "reusable": true
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 52,
    "parMoves": 45,
    "twoStarScore": 1800,
    "threeStarScore": 2100,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 23
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 0,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 17
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 1,
        "rows": 4,
        "cols": 6,
        "minimumMoves": 5
      }
    ],
    "requiredMechanics": [
      "portal"
    ],
    "pattern": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".######..",
      ".######..",
      ".######..",
      ".######.."
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-c2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-c1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-r",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-c1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-c2",
        "direction": "down"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-c2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-c1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-r",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-c1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-c2",
            "direction": "down"
          }
        ],
        "score": 2100,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 45,
      "optimalMoves": 45,
      "setupMoves": 35,
      "decisionPoints": 32,
      "greedyTraps": 10,
      "maxSetupRun": 16
    }
  },
  {
    "id": "slide07-28",
    "title": "异地引爆",
    "subtitle": "把爆破送到异地，打开最后一片封锁。",
    "chapter": 6,
    "rows": 9,
    "cols": 9,
    "mask": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".######..",
      ".######..",
      ".######..",
      ".######.."
    ],
    "rocks": [
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 3,
        "col": 1
      },
      {
        "row": 3,
        "col": 6
      },
      {
        "row": 2,
        "col": 7
      },
      {
        "row": 1,
        "col": 5
      },
      {
        "row": 1,
        "col": 7
      },
      {
        "row": 5,
        "col": 3
      },
      {
        "row": 6,
        "col": 3
      },
      {
        "row": 7,
        "col": 3
      },
      {
        "row": 8,
        "col": 3
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t4",
        "itemId": "plant-0",
        "row": 1,
        "col": 2
      },
      {
        "id": "r0-t1",
        "itemId": "fruit-2",
        "row": 1,
        "col": 3
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 0
      },
      {
        "id": "r0-t5",
        "itemId": "plant-0",
        "row": 2,
        "col": 3
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-3",
        "row": 3,
        "col": 2
      },
      {
        "id": "r0-t6",
        "itemId": "plant-1",
        "row": 3,
        "col": 3
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 6
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 0,
        "col": 7
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 5
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 2,
        "col": 8
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 5
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-3",
        "row": 3,
        "col": 8
      },
      {
        "id": "r2-a0",
        "itemId": "fruit-2",
        "row": 5,
        "col": 1,
        "effect": "bomb"
      },
      {
        "id": "r2-a1",
        "itemId": "fruit-2",
        "row": 7,
        "col": 4
      },
      {
        "id": "r2-p",
        "itemId": "fruit-3",
        "row": 8,
        "col": 6
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 3
      },
      "plant": {
        "targetTier": 2,
        "count": 2
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [
        {
          "id": "r2-wall-0",
          "row": 5,
          "col": 5,
          "powder": true
        },
        {
          "id": "r2-wall-1",
          "row": 6,
          "col": 5,
          "powder": true
        },
        {
          "id": "r2-wall-2",
          "row": 7,
          "col": 5,
          "powder": true
        },
        {
          "id": "r2-wall-3",
          "row": 8,
          "col": 5,
          "powder": true
        }
      ],
      "brakes": [],
      "portals": [
        {
          "id": "r2-gate",
          "a": {
            "row": 5,
            "col": 2
          },
          "b": {
            "row": 5,
            "col": 4
          },
          "width": 1,
          "height": 1,
          "charges": 1,
          "reusable": true
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 51,
    "parMoves": 44,
    "twoStarScore": 2000,
    "threeStarScore": 2300,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 22
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 0,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 18
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 1,
        "rows": 4,
        "cols": 6,
        "minimumMoves": 4
      }
    ],
    "requiredMechanics": [
      "bomb",
      "portal"
    ],
    "pattern": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".######..",
      ".######..",
      ".######..",
      ".######.."
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-a1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-a1",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-a1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-a1",
            "direction": "right"
          }
        ],
        "score": 2300,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 44,
      "optimalMoves": 44,
      "setupMoves": 34,
      "decisionPoints": 29,
      "greedyTraps": 10,
      "maxSetupRun": 9
    }
  },
  {
    "id": "slide07-29",
    "title": "回路接力",
    "subtitle": "穿门后的方向很重要，回廊里的次序也一样。",
    "chapter": 6,
    "rows": 9,
    "cols": 9,
    "mask": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".######..",
      ".######..",
      ".######..",
      ".######.."
    ],
    "rocks": [
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 3,
        "col": 3
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 3,
        "col": 5
      },
      {
        "row": 1,
        "col": 6
      },
      {
        "row": 1,
        "col": 7
      },
      {
        "row": 2,
        "col": 8
      },
      {
        "row": 5,
        "col": 3
      },
      {
        "row": 6,
        "col": 3
      },
      {
        "row": 7,
        "col": 3
      },
      {
        "row": 8,
        "col": 3
      },
      {
        "row": 6,
        "col": 4
      },
      {
        "row": 6,
        "col": 6
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t1",
        "itemId": "fruit-1",
        "row": 2,
        "col": 0
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-1",
        "row": 2,
        "col": 2
      },
      {
        "id": "r0-t4",
        "itemId": "plant-0",
        "row": 2,
        "col": 3
      },
      {
        "id": "r0-t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 0
      },
      {
        "id": "r0-t6",
        "itemId": "plant-1",
        "row": 3,
        "col": 1
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-2",
        "row": 3,
        "col": 2
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-2",
        "row": 0,
        "col": 6
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 0,
        "col": 7
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 0,
        "col": 8
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 1,
        "col": 8
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-1",
        "row": 3,
        "col": 7
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-1",
        "row": 3,
        "col": 8
      },
      {
        "id": "r2-a0",
        "itemId": "fruit-2",
        "row": 5,
        "col": 1
      },
      {
        "id": "r2-a1",
        "itemId": "fruit-2",
        "row": 8,
        "col": 6
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 3,
        "count": 3
      },
      "plant": {
        "targetTier": 2,
        "count": 2
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [],
      "brakes": [
        {
          "id": "r2-turn",
          "row": 5,
          "col": 5,
          "direction": "down",
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": [
        {
          "id": "r2-gate",
          "a": {
            "row": 5,
            "col": 2
          },
          "b": {
            "row": 5,
            "col": 4
          },
          "width": 1,
          "height": 1,
          "charges": 1,
          "reusable": true
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 52,
    "parMoves": 45,
    "twoStarScore": 1600,
    "threeStarScore": 1900,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 25
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 0,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 18
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 1,
        "rows": 4,
        "cols": 6,
        "minimumMoves": 2
      }
    ],
    "requiredMechanics": [
      "turn",
      "portal"
    ],
    "pattern": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".######..",
      ".######..",
      ".######..",
      ".######.."
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t4",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "right"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t4",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "right"
          }
        ],
        "score": 1900,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 45,
      "optimalMoves": 45,
      "setupMoves": 36,
      "decisionPoints": 34,
      "greedyTraps": 14,
      "maxSetupRun": 18
    }
  },
  {
    "id": "slide07-30",
    "title": "终局花园",
    "subtitle": "三处庭院、三种机关；先看清路线，再完成接力。",
    "chapter": 6,
    "rows": 11,
    "cols": 9,
    "mask": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      ".######.."
    ],
    "rocks": [
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 1,
        "col": 6
      },
      {
        "row": 2,
        "col": 7
      },
      {
        "row": 3,
        "col": 5
      },
      {
        "row": 0,
        "col": 6
      },
      {
        "row": 5,
        "col": 3
      },
      {
        "row": 6,
        "col": 3
      },
      {
        "row": 7,
        "col": 3
      },
      {
        "row": 8,
        "col": 3
      },
      {
        "row": 9,
        "col": 3
      },
      {
        "row": 10,
        "col": 3
      },
      {
        "row": 6,
        "col": 4
      },
      {
        "row": 6,
        "col": 6
      },
      {
        "row": 4,
        "col": 0
      },
      {
        "row": 4,
        "col": 1
      },
      {
        "row": 4,
        "col": 2
      },
      {
        "row": 4,
        "col": 3
      },
      {
        "row": 4,
        "col": 4
      },
      {
        "row": 4,
        "col": 5
      },
      {
        "row": 4,
        "col": 6
      },
      {
        "row": 4,
        "col": 7
      },
      {
        "row": 4,
        "col": 8
      },
      {
        "row": 0,
        "col": 4
      },
      {
        "row": 1,
        "col": 4
      },
      {
        "row": 2,
        "col": 4
      },
      {
        "row": 3,
        "col": 4
      }
    ],
    "tiles": [
      {
        "id": "r0-t1",
        "itemId": "fruit-2",
        "row": 0,
        "col": 3
      },
      {
        "id": "r0-t3",
        "itemId": "fruit-3",
        "row": 1,
        "col": 3
      },
      {
        "id": "r0-t4",
        "itemId": "plant-0",
        "row": 2,
        "col": 3
      },
      {
        "id": "r0-t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 1
      },
      {
        "id": "r0-t2",
        "itemId": "fruit-2",
        "row": 3,
        "col": 2
      },
      {
        "id": "r0-t6",
        "itemId": "plant-1",
        "row": 3,
        "col": 3
      },
      {
        "id": "r1-t6",
        "itemId": "plant-1",
        "row": 1,
        "col": 5
      },
      {
        "id": "r1-t4",
        "itemId": "plant-0",
        "row": 2,
        "col": 5
      },
      {
        "id": "r1-t1",
        "itemId": "fruit-2",
        "row": 2,
        "col": 6
      },
      {
        "id": "r1-t2",
        "itemId": "fruit-2",
        "row": 2,
        "col": 8
      },
      {
        "id": "r1-t3",
        "itemId": "fruit-3",
        "row": 3,
        "col": 6
      },
      {
        "id": "r1-t5",
        "itemId": "plant-0",
        "row": 3,
        "col": 8
      },
      {
        "id": "r2-a0",
        "itemId": "fruit-2",
        "row": 10,
        "col": 1,
        "effect": "bomb"
      },
      {
        "id": "r2-o1",
        "itemId": "fruit-1",
        "row": 7,
        "col": 4
      },
      {
        "id": "r2-o2",
        "itemId": "fruit-1",
        "row": 7,
        "col": 6
      },
      {
        "id": "r2-p",
        "itemId": "fruit-3",
        "row": 9,
        "col": 5
      }
    ],
    "chainGoals": {
      "fruit": {
        "targetTier": 4,
        "count": 3
      },
      "plant": {
        "targetTier": 2,
        "count": 2
      }
    },
    "footprintByChain": {
      "fruit": {
        "width": 1,
        "height": 1
      },
      "plant": {
        "width": 1,
        "height": 1
      }
    },
    "features": {
      "crates": [
        {
          "id": "r2-wall-0",
          "row": 8,
          "col": 4,
          "powder": true
        },
        {
          "id": "r2-wall-1",
          "row": 8,
          "col": 5,
          "powder": true
        },
        {
          "id": "r2-wall-2",
          "row": 8,
          "col": 6,
          "powder": true
        }
      ],
      "brakes": [
        {
          "id": "r2-turn-a",
          "row": 5,
          "col": 5,
          "direction": "down",
          "width": 1,
          "height": 1,
          "charges": 1
        },
        {
          "id": "r2-turn-b",
          "row": 7,
          "col": 5,
          "direction": "left",
          "width": 1,
          "height": 1,
          "charges": 1
        }
      ],
      "portals": [
        {
          "id": "r2-gate",
          "a": {
            "row": 5,
            "col": 2
          },
          "b": {
            "row": 5,
            "col": 4
          },
          "width": 1,
          "height": 1,
          "charges": 1,
          "reusable": true
        }
      ]
    },
    "variants": [
      {
        "id": "default",
        "bombTileIds": []
      }
    ],
    "moveLimit": 52,
    "parMoves": 45,
    "twoStarScore": 2500,
    "threeStarScore": 2800,
    "ruleset": "slide-v07-2",
    "regions": [
      {
        "id": "r0",
        "title": "前庭",
        "row": 0,
        "col": 0,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 23
      },
      {
        "id": "r1",
        "title": "侧庭",
        "row": 0,
        "col": 5,
        "rows": 4,
        "cols": 4,
        "minimumMoves": 18
      },
      {
        "id": "r2",
        "title": "后庭",
        "row": 5,
        "col": 1,
        "rows": 6,
        "cols": 6,
        "minimumMoves": 4
      }
    ],
    "requiredMechanics": [
      "bomb",
      "turn",
      "portal"
    ],
    "pattern": [
      "#########",
      "#########",
      "#########",
      "#########",
      "#########",
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      ".######..",
      ".######.."
    ],
    "referenceSolution": [
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t6",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r0-t4",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r0-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r0-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t3",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t2",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t1",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r1-t5",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r1-t6",
        "direction": "down"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "up"
      },
      {
        "type": "slide",
        "tileId": "r2-o2",
        "direction": "left"
      },
      {
        "type": "slide",
        "tileId": "r2-a0",
        "direction": "right"
      },
      {
        "type": "slide",
        "tileId": "r2-p",
        "direction": "up"
      }
    ],
    "scoreProofs": [
      {
        "actions": [
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t6",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r0-t4",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r0-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r0-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t3",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t2",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t1",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r1-t5",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r1-t6",
            "direction": "down"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "up"
          },
          {
            "type": "slide",
            "tileId": "r2-o2",
            "direction": "left"
          },
          {
            "type": "slide",
            "tileId": "r2-a0",
            "direction": "right"
          },
          {
            "type": "slide",
            "tileId": "r2-p",
            "direction": "up"
          }
        ],
        "score": 2800,
        "stars": 3
      }
    ],
    "difficulty": {
      "edition": "gardens-1",
      "proof": "sealed-region-sum",
      "minimumMoves": 45,
      "optimalMoves": 45,
      "setupMoves": 34,
      "decisionPoints": 41,
      "greedyTraps": 2,
      "maxSetupRun": 15
    }
  }
];root.TileSlideV07={...(root.TileSlideV07||{}),levels};if(typeof module!=="undefined")module.exports=levels;})(globalThis);
