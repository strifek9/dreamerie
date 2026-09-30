import { legacyHolidayDreams, type HolidayDream } from './legacyHolidayDreams.ts'
import { revisitedCollection, revisitIds } from './revisitedCollection.generated.ts'
export type { HolidayDream } from './legacyHolidayDreams.ts'

// New painted puzzles have distinct IDs so earlier attempts retain their artwork and geometry.
export const publishedHolidayDreams: readonly HolidayDream[] = [
  {
    "id": "holiday-painted-halloween",
    "holiday": "halloween",
    "occasion": "Halloween",
    "title": "The Street That Curled into Halloween",
    "original": "/artwork/v3/holidays-painted-v1/halloween-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/halloween-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "The lanterns lead us door to door;",
      "Look back—was that there before?"
    ],
    "edits": [
      {
        "id": "knocker",
        "label": "The door knocker’s round ring becomes heart-shaped.",
        "difficulty": "Easy",
        "box": {
          "left": 0.09988038277511961,
          "top": 0.3134962805526036,
          "width": 0.05861244019138756,
          "height": 0.12327311370882041
        },
        "edgeFade": 2
      },
      {
        "id": "hat",
        "label": "The witch’s gold hat star becomes a crescent.",
        "difficulty": "Medium",
        "box": {
          "left": 0.44019138755980863,
          "top": 0.4218916046758767,
          "width": 0.041866028708133975,
          "height": 0.0765143464399575
        },
        "edgeFade": 2
      },
      {
        "id": "candy",
        "label": "The candy loses its middle gold stripe.",
        "difficulty": "Hard",
        "box": {
          "left": 0.28588516746411485,
          "top": 0.47502656748140276,
          "width": 0.03588516746411483,
          "height": 0.05951115834218916
        },
        "edgeFade": 2
      },
      {
        "id": "button",
        "label": "The robot’s lower red button becomes square.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.5388755980861244,
          "top": 0.8034006376195537,
          "width": 0.02332535885167464,
          "height": 0.04569606801275239
        },
        "edgeFade": 2
      },
      {
        "id": "flag",
        "label": "The mailbox’s square flag becomes triangular.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.9252392344497608,
          "top": 0.5175345377258236,
          "width": 0.05083732057416268,
          "height": 0.06907545164718384
        },
        "edgeFade": 2,
        "source": "/artwork/v3/holidays-painted-v1/halloween-correction-v2.png"
      }
    ]
  },
  {
    "id": "holiday-painted-christmas",
    "holiday": "christmas",
    "occasion": "Christmas",
    "title": "The Elves' First Presents",
    "original": "/artwork/v3/holidays-painted-v1/christmas-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/christmas-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "The gifts unfold in firelight;",
      "What slipped away from sight tonight?"
    ],
    "edits": [
      {
        "id": "topper",
        "label": "The tree’s star becomes a crescent.",
        "difficulty": "Easy",
        "box": {
          "left": 0.06818181818181818,
          "top": 0,
          "width": 0.05562200956937799,
          "height": 0.07970244420828905
        },
        "edgeFade": 2
      },
      {
        "id": "stocking",
        "label": "The middle stocking’s tree becomes a snowflake.",
        "difficulty": "Medium",
        "box": {
          "left": 0.8690191387559809,
          "top": 0.3177470775770457,
          "width": 0.049641148325358854,
          "height": 0.1073326248671626
        },
        "edgeFade": 2
      },
      {
        "id": "flipper",
        "label": "The flying whale loses its front flipper.",
        "difficulty": "Hard",
        "box": {
          "left": 0.42523923444976075,
          "top": 0.4569606801275239,
          "width": 0.046052631578947366,
          "height": 0.08289054197662062
        },
        "edgeFade": 2
      },
      {
        "id": "buckle",
        "label": "The left elf’s square belt buckle becomes round.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.27392344497607657,
          "top": 0.6461211477151966,
          "width": 0.02930622009569378,
          "height": 0.06269925611052073
        },
        "edgeFade": 2
      },
      {
        "id": "mug",
        "label": "The red mug loses its handle.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.9270334928229665,
          "top": 0.6950053134962806,
          "width": 0.038875598086124404,
          "height": 0.0871413390010627
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-valentines",
    "holiday": "valentines",
    "occasion": "Valentine’s Day",
    "title": "The Path Our Shadows Remember",
    "original": "/artwork/v3/holidays-painted-v1/valentines-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/valentines-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "Two shadows meet along the way;",
      "One little detail slips astray."
    ],
    "edits": [
      {
        "id": "scarf",
        "label": "Her ivory scarf turns pale blue.",
        "difficulty": "Easy",
        "box": {
          "left": 0.28289473684210525,
          "top": 0.1434643995749203,
          "width": 0.15251196172248804,
          "height": 0.16578108395324123
        },
        "edgeFade": 2
      },
      {
        "id": "seal",
        "label": "The upper-left envelope’s heart seal becomes round.",
        "difficulty": "Medium",
        "box": {
          "left": 0.24162679425837322,
          "top": 0.1636556854410202,
          "width": 0.023923444976076555,
          "height": 0.04250797024442083
        },
        "edgeFade": 2
      },
      {
        "id": "key",
        "label": "The key’s heart-shaped bow becomes a round ring.",
        "difficulty": "Hard",
        "box": {
          "left": 0.21471291866028708,
          "top": 0.7927736450584485,
          "width": 0.050239234449760764,
          "height": 0.07545164718384698
        },
        "edgeFade": 2
      },
      {
        "id": "ribbon",
        "label": "The gift bow loses its upper-right loop.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.11423444976076555,
          "top": 0.6886291179596175,
          "width": 0.04844497607655503,
          "height": 0.06907545164718384
        },
        "edgeFade": 2,
        "source": "/artwork/v3/holidays-painted-v1/valentines-correction-v1.png"
      },
      {
        "id": "fringe",
        "label": "His scarf loses the fringe at its lower tip.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.5843301435406698,
          "top": 0.19553666312433582,
          "width": 0.03349282296650718,
          "height": 0.05526036131774708
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-st-patricks",
    "holiday": "st-patricks",
    "occasion": "St. Patrick’s Day",
    "title": "The Staircase of Lucky Coins",
    "original": "/artwork/v3/holidays-painted-v1/st-patricks-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/st-patricks-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "Gold steps climb beyond the green;",
      "Luck shifts the things you thought you'd seen."
    ],
    "edits": [
      {
        "id": "buckle",
        "label": "The hat’s square buckle becomes oval.",
        "difficulty": "Easy",
        "box": {
          "left": 0.24222488038277512,
          "top": 0.10945802337938364,
          "width": 0.06339712918660287,
          "height": 0.09670563230605739
        },
        "edgeFade": 2
      },
      {
        "id": "clover",
        "label": "The large clover on the pot gains a leaf.",
        "difficulty": "Medium",
        "box": {
          "left": 0.39712918660287083,
          "top": 0.5664187035069076,
          "width": 0.06160287081339713,
          "height": 0.10626992561105207
        },
        "edgeFade": 2
      },
      {
        "id": "cup",
        "label": "The cup’s shamrock becomes a star.",
        "difficulty": "Hard",
        "box": {
          "left": 0.4880382775119617,
          "top": 0.19553666312433582,
          "width": 0.023923444976076555,
          "height": 0.04357066950053135
        },
        "edgeFade": 2
      },
      {
        "id": "door",
        "label": "The tiny wooden door loses its ring handle.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.5466507177033493,
          "top": 0.6418703506907545,
          "width": 0.02033492822966507,
          "height": 0.052072263549415514
        },
        "edgeFade": 2
      },
      {
        "id": "cuff",
        "label": "The raised sleeve loses its gold button.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.38995215311004783,
          "top": 0.32518597236981933,
          "width": 0.02033492822966507,
          "height": 0.03294367693942614
        },
        "edgeFade": 2,
        "source": "/artwork/v3/holidays-painted-v1/st-patricks-correction-v1.png"
      }
    ]
  },
  {
    "id": "holiday-painted-independence",
    "holiday": "independence",
    "occasion": "Independence Day",
    "title": "Fireworks Beneath the Water",
    "original": "/artwork/v3/holidays-painted-v1/independence-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/independence-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "Bright colors bloom across the night;",
      "Look twice beneath their borrowed light."
    ],
    "edits": [
      {
        "id": "star",
        "label": "The blue pennant’s star becomes a crescent.",
        "difficulty": "Easy",
        "box": {
          "left": 0.39832535885167464,
          "top": 0.8905419766206164,
          "width": 0.037679425837320576,
          "height": 0.07545164718384698
        },
        "edgeFade": 2
      },
      {
        "id": "pitcher",
        "label": "The lemonade pitcher loses its handle.",
        "difficulty": "Medium",
        "box": {
          "left": 0.3696172248803828,
          "top": 0.6705632306057385,
          "width": 0.039473684210526314,
          "height": 0.10520722635494155
        },
        "edgeFade": 2
      },
      {
        "id": "lantern",
        "label": "The lantern’s ivory candle turns red.",
        "difficulty": "Hard",
        "box": {
          "left": 0.06997607655502393,
          "top": 0.6907545164718385,
          "width": 0.03110047846889952,
          "height": 0.06376195536663125
        },
        "edgeFade": 2,
        "source": "/artwork/v3/holidays-painted-v1/independence-correction-v1.png"
      },
      {
        "id": "bow",
        "label": "The girl’s red hair bow turns blue.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.2619617224880383,
          "top": 0.51009564293305,
          "width": 0.034688995215311005,
          "height": 0.048884165781083955
        },
        "edgeFade": 2
      },
      {
        "id": "sail",
        "label": "The small center sailboat’s triangular sail becomes rectangular.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.56877990430622,
          "top": 0.40807651434643993,
          "width": 0.023923444976076555,
          "height": 0.06057385759829968
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-thanksgiving",
    "holiday": "thanksgiving",
    "occasion": "Thanksgiving",
    "title": "The Turkeys' Harvest Feast",
    "original": "/artwork/v3/holidays-painted-v1/thanksgiving-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/thanksgiving-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "The harvest drifts on leaves of gold;",
      "A second look rewrites the fold."
    ],
    "edits": [
      {
        "id": "pie",
        "label": "The pie’s leaf decoration becomes a heart.",
        "difficulty": "Easy",
        "box": {
          "left": 0.465311004784689,
          "top": 0.6057385759829969,
          "width": 0.10107655502392345,
          "height": 0.0818278427205101
        },
        "edgeFade": 2
      },
      {
        "id": "pitcher",
        "label": "The blue pitcher loses its handle.",
        "difficulty": "Medium",
        "box": {
          "left": 0.7356459330143541,
          "top": 0.49946865037194477,
          "width": 0.05083732057416268,
          "height": 0.1381509032943677
        },
        "edgeFade": 2
      },
      {
        "id": "glasses",
        "label": "Grandmother’s spectacles become round.",
        "difficulty": "Hard",
        "box": {
          "left": 0.194377990430622,
          "top": 0.2199787460148778,
          "width": 0.05083732057416268,
          "height": 0.07970244420828905
        },
        "edgeFade": 2
      },
      {
        "id": "napkin",
        "label": "The foreground napkin’s acorn becomes a bow.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.5807416267942583,
          "top": 0.71413390010627,
          "width": 0.04844497607655503,
          "height": 0.0818278427205101
        },
        "edgeFade": 2
      },
      {
        "id": "boat",
        "label": "The gravy boat loses its handle.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.3050239234449761,
          "top": 0.6992561105207227,
          "width": 0.034688995215311005,
          "height": 0.06376195536663125
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-easter",
    "holiday": "easter",
    "occasion": "Easter",
    "title": "The Garden Inside the Egg",
    "original": "/artwork/v3/holidays-painted-v1/easter-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/easter-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "Past painted shells the pathways bend;",
      "Look twice before the hunt can end."
    ],
    "edits": [
      {
        "id": "hat",
        "label": "The boy’s blue hatband turns red.",
        "difficulty": "Easy",
        "box": {
          "left": 0.7631578947368421,
          "top": 0.3995749202975558,
          "width": 0.08492822966507177,
          "height": 0.09564293304994687
        },
        "edgeFade": 2
      },
      {
        "id": "duck-bow",
        "label": "The toy duck gains a blue bow tie.",
        "difficulty": "Medium",
        "box": {
          "left": 0.7888755980861244,
          "top": 0.7013815090329437,
          "width": 0.04066985645933014,
          "height": 0.053134962805526036
        },
        "edgeFade": 2,
        "source": "/artwork/v3/holidays-painted-v1/easter-correction-v2.png"
      },
      {
        "id": "vest",
        "label": "The rabbit’s leafy pocket motif becomes a carrot.",
        "difficulty": "Hard",
        "box": {
          "left": 0.5998803827751196,
          "top": 0.3708820403825717,
          "width": 0.03708133971291866,
          "height": 0.06907545164718384
        },
        "edgeFade": 2
      },
      {
        "id": "spoke",
        "label": "The wheel loses its upper-left spoke.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.8259569377990431,
          "top": 0.8565356004250797,
          "width": 0.02930622009569378,
          "height": 0.05951115834218916
        },
        "edgeFade": 2
      },
      {
        "id": "egg",
        "label": "The purple foreground egg’s spots become hearts.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.6333732057416268,
          "top": 0.8639744952178533,
          "width": 0.061004784688995214,
          "height": 0.11689691817215728
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-mothers",
    "holiday": "mothers",
    "occasion": "Mother’s Day",
    "title": "The Home Inside Her Card",
    "original": "/artwork/v3/holidays-painted-v1/mothers-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/mothers-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "A paper garden wakes in bloom;",
      "Small changes tiptoe through the room."
    ],
    "edits": [
      {
        "id": "heart",
        "label": "The card’s red heart turns blue.",
        "difficulty": "Easy",
        "box": {
          "left": 0.43720095693779903,
          "top": 0.383634431455898,
          "width": 0.04844497607655503,
          "height": 0.09351753453772582
        },
        "edgeFade": 2
      },
      {
        "id": "cup",
        "label": "The teacup loses its handle.",
        "difficulty": "Medium",
        "box": {
          "left": 0.46351674641148327,
          "top": 0.6354941551540914,
          "width": 0.028708133971291867,
          "height": 0.07226354941551541
        },
        "edgeFade": 2
      },
      {
        "id": "jam",
        "label": "The jam heart becomes a circle.",
        "difficulty": "Hard",
        "box": {
          "left": 0.28827751196172247,
          "top": 0.6716259298618491,
          "width": 0.060406698564593304,
          "height": 0.052072263549415514
        },
        "edgeFade": 2
      },
      {
        "id": "button",
        "label": "Her right cuff loses its lower button.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.7356459330143541,
          "top": 0.7343251859723698,
          "width": 0.019138755980861243,
          "height": 0.03719447396386823
        },
        "edgeFade": 2
      },
      {
        "id": "door",
        "label": "The tiny house’s heart window becomes round.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.5005980861244019,
          "top": 0.2773645058448459,
          "width": 0.017344497607655503,
          "height": 0.031880977683315624
        },
        "edgeFade": 2,
        "source": "/artwork/v3/holidays-painted-v1/mothers-correction-v1.png"
      }
    ]
  },
  {
    "id": "holiday-painted-new-years",
    "holiday": "new-years",
    "occasion": "New Year’s Day",
    "title": "The Year Unrolls at Dawn",
    "original": "/artwork/v3/holidays-painted-v1/new-years-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/new-years-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "The year unrolls in ribbons bright;",
      "What changed between the dark and light?"
    ],
    "edits": [
      {
        "id": "knocker",
        "label": "The round door knocker becomes hexagonal.",
        "difficulty": "Easy",
        "box": {
          "left": 0.041866028708133975,
          "top": 0.10201912858660998,
          "width": 0.04066985645933014,
          "height": 0.08289054197662062
        },
        "edgeFade": 2
      },
      {
        "id": "pompom",
        "label": "The dog’s purple pom-pom turns red.",
        "difficulty": "Medium",
        "box": {
          "left": 0.31638755980861244,
          "top": 0.5887353878852285,
          "width": 0.031698564593301434,
          "height": 0.061636556854410204
        },
        "edgeFade": 2
      },
      {
        "id": "tree",
        "label": "The mug loses its smaller tree.",
        "difficulty": "Hard",
        "box": {
          "left": 0.22667464114832536,
          "top": 0.5483528161530287,
          "width": 0.014354066985645933,
          "height": 0.04994686503719448
        },
        "edgeFade": 2
      },
      {
        "id": "wreath-bow",
        "label": "The wreath’s red bow turns blue.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.04485645933014354,
          "top": 0.18809776833156217,
          "width": 0.0867224880382775,
          "height": 0.16790648246546228
        },
        "edgeFade": 2,
        "source": "/artwork/v3/holidays-painted-v1/new-years-correction-v2.png"
      },
      {
        "id": "scarf",
        "label": "Her purple scarf loses its fringe.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.3761961722488038,
          "top": 0.5696068012752391,
          "width": 0.060406698564593304,
          "height": 0.09458023379383634
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-fathers",
    "holiday": "fathers",
    "occasion": "Father’s Day",
    "title": "Dad's Kite Could Carry a Lake",
    "original": "/artwork/v3/holidays-painted-v1/fathers-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/fathers-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "A paper boat takes to the blue;",
      "Look twice—has something drifted too?"
    ],
    "edits": [
      {
        "id": "card",
        "label": "The cub’s paw-print card becomes a star card.",
        "difficulty": "Easy",
        "box": {
          "left": 0.4838516746411483,
          "top": 0.5706695005313497,
          "width": 0.028110047846889953,
          "height": 0.05526036131774708
        },
        "edgeFade": 2
      },
      {
        "id": "mug",
        "label": "The mug’s pine tree becomes an oak leaf.",
        "difficulty": "Medium",
        "box": {
          "left": 0.07117224880382775,
          "top": 0.7311370882040382,
          "width": 0.02452153110047847,
          "height": 0.061636556854410204
        },
        "edgeFade": 2
      },
      {
        "id": "button",
        "label": "Dad’s waistcoat loses its bottom gold button.",
        "difficulty": "Hard",
        "box": {
          "left": 0.33851674641148327,
          "top": 0.6546227417640808,
          "width": 0.02033492822966507,
          "height": 0.03506907545164718
        },
        "edgeFade": 2
      },
      {
        "id": "clasp",
        "label": "The tool tin’s rectangular clasp becomes round.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.20873205741626794,
          "top": 0.7460148777895855,
          "width": 0.019138755980861243,
          "height": 0.04144527098831031
        },
        "edgeFade": 2
      },
      {
        "id": "flag",
        "label": "The tiny sailboat’s blue flag turns red.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.7631578947368421,
          "top": 0.07438894792773645,
          "width": 0.028110047846889953,
          "height": 0.036131774707757705
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-labor",
    "holiday": "labor",
    "occasion": "Labor Day",
    "title": "The Workshop That Fixed Monday",
    "original": "/artwork/v3/holidays-painted-v1/labor-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/labor-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "The workshop winds another day;",
      "A little detail slips away."
    ],
    "edits": [
      {
        "id": "gear",
        "label": "The copper robot’s gear badge becomes a sun.",
        "difficulty": "Easy",
        "box": {
          "left": 0.2452153110047847,
          "top": 0.45908607863974493,
          "width": 0.05382775119617225,
          "height": 0.10095642933049948
        },
        "edgeFade": 2
      },
      {
        "id": "stripe",
        "label": "The teal robot’s helmet stripe turns red.",
        "difficulty": "Medium",
        "box": {
          "left": 0.41208133971291866,
          "top": 0.29543039319872477,
          "width": 0.03289473684210526,
          "height": 0.07438894792773645
        },
        "edgeFade": 2
      },
      {
        "id": "handle",
        "label": "The lunchbox loses its top handle.",
        "difficulty": "Hard",
        "box": {
          "left": 0.590311004784689,
          "top": 0.5866099893730075,
          "width": 0.028708133971291867,
          "height": 0.03294367693942614
        },
        "edgeFade": 2
      },
      {
        "id": "hook",
        "label": "The hanging crane hook becomes a closed ring.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.7715311004784688,
          "top": 0.15196599362380447,
          "width": 0.05382775119617225,
          "height": 0.10201912858660998
        },
        "edgeFade": 2
      },
      {
        "id": "latch",
        "label": "The right toolbox’s square latch becomes round.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.8576555023923444,
          "top": 0.7821466524973433,
          "width": 0.02631578947368421,
          "height": 0.061636556854410204
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-new-years-eve",
    "holiday": "new-years-eve",
    "occasion": "New Year’s Eve",
    "title": "The Midnight Ball That Became a Planet",
    "original": "/artwork/v3/holidays-painted-v1/new-years-eve-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/new-years-eve-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "The midnight music fills the air;",
      "Was every little thing still there?"
    ],
    "edits": [
      {
        "id": "headphone",
        "label": "The DJ’s headphone star becomes a crescent.",
        "difficulty": "Easy",
        "box": {
          "left": 0.05263157894736842,
          "top": 0.41339001062699254,
          "width": 0.02930622009569378,
          "height": 0.07120085015940489
        },
        "edgeFade": 2
      },
      {
        "id": "bow",
        "label": "The orange monster’s blue bow tie turns red.",
        "difficulty": "Medium",
        "box": {
          "left": 0.5299043062200957,
          "top": 0.5929861849096706,
          "width": 0.06160287081339713,
          "height": 0.07970244420828905
        },
        "edgeFade": 2
      },
      {
        "id": "horn",
        "label": "The blue alien’s curled horn becomes straight.",
        "difficulty": "Hard",
        "box": {
          "left": 0.7188995215311005,
          "top": 0.30393198724760895,
          "width": 0.04784688995215311,
          "height": 0.08607863974495218
        },
        "edgeFade": 2
      },
      {
        "id": "stripe",
        "label": "The purple alien’s hat loses its middle gold stripe.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.3534688995215311,
          "top": 0.3645058448459086,
          "width": 0.06220095693779904,
          "height": 0.08820403825717323
        },
        "edgeFade": 2
      },
      {
        "id": "record",
        "label": "The record’s center spindle becomes a little heart.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.15251196172248804,
          "top": 0.5706695005313497,
          "width": 0.02332535885167464,
          "height": 0.04144527098831031
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-mlk",
    "holiday": "mlk",
    "occasion": "Martin Luther King Jr. Day",
    "title": "The Bridge We Make Together",
    "original": "/artwork/v3/holidays-painted-v1/mlk-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/mlk-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "Together, paper hands hold tight;",
      "Small details wander out of sight."
    ],
    "edits": [
      {
        "id": "moon",
        "label": "The hanging crescent becomes a full moon.",
        "difficulty": "Easy",
        "box": {
          "left": 0.3277511961722488,
          "top": 0.025504782146652496,
          "width": 0.07416267942583732,
          "height": 0.13602550478214664
        },
        "edgeFade": 2
      },
      {
        "id": "lantern",
        "label": "The lantern’s star becomes a heart.",
        "difficulty": "Medium",
        "box": {
          "left": 0.1513157894736842,
          "top": 0.24973432518597238,
          "width": 0.041866028708133975,
          "height": 0.07438894792773645
        },
        "edgeFade": 2
      },
      {
        "id": "thread",
        "label": "The spool’s coral thread turns blue.",
        "difficulty": "Hard",
        "box": {
          "left": 0.019736842105263157,
          "top": 0.13496280552603612,
          "width": 0.09210526315789473,
          "height": 0.1806588735387885
        },
        "edgeFade": 2
      },
      {
        "id": "knob",
        "label": "The upper door’s round knob becomes square.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.8809808612440191,
          "top": 0.2678002125398512,
          "width": 0.02033492822966507,
          "height": 0.03719447396386823
        },
        "edgeFade": 2
      },
      {
        "id": "clip",
        "label": "The paperclip loses its inner loop.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.8977272727272727,
          "top": 0.6174282678002125,
          "width": 0.09389952153110048,
          "height": 0.06588735387885228
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-presidents",
    "holiday": "presidents",
    "occasion": "Presidents’ Day",
    "title": "The Library of Impossible Pages",
    "original": "/artwork/v3/holidays-painted-v1/presidents-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/presidents-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "The pages curl around the past;",
      "Which little details failed to last?"
    ],
    "edits": [
      {
        "id": "quill",
        "label": "The ivory quill turns blue.",
        "difficulty": "Easy",
        "box": {
          "left": 0.16148325358851676,
          "top": 0.740701381509033,
          "width": 0.25717703349282295,
          "height": 0.1381509032943677
        },
        "edgeFade": 2
      },
      {
        "id": "hatband",
        "label": "Lincoln’s striped hatband becomes plain burgundy.",
        "difficulty": "Medium",
        "box": {
          "left": 0.7583732057416268,
          "top": 0.23910733262486716,
          "width": 0.10107655502392345,
          "height": 0.053134962805526036
        },
        "edgeFade": 2
      },
      {
        "id": "clasp",
        "label": "The book clasp’s wreath becomes a single leaf.",
        "difficulty": "Hard",
        "box": {
          "left": 0.6339712918660287,
          "top": 0.6865037194473964,
          "width": 0.042464114832535885,
          "height": 0.06269925611052073
        },
        "edgeFade": 2
      },
      {
        "id": "finial",
        "label": "The lamp’s round finial becomes a diamond.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.9677033492822966,
          "top": 0.19128586609989373,
          "width": 0.02631578947368421,
          "height": 0.04675876726886291
        },
        "edgeFade": 2
      },
      {
        "id": "inkwell",
        "label": "The inkwell’s floral ornament becomes a star.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.05083732057416268,
          "top": 0.7736450584484591,
          "width": 0.090311004784689,
          "height": 0.09351753453772582
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-memorial",
    "holiday": "memorial",
    "occasion": "Memorial Day",
    "title": "The Light We Keep",
    "original": "/artwork/v3/holidays-painted-v1/memorial-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/memorial-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "A quiet lantern guards the glow;",
      "What changed along the path below?"
    ],
    "edits": [
      {
        "id": "chair",
        "label": "The chair’s oval opening becomes heart-shaped.",
        "difficulty": "Easy",
        "box": {
          "left": 0.13337320574162678,
          "top": 0.16684378320935175,
          "width": 0.08971291866028708,
          "height": 0.2157279489904357
        },
        "edgeFade": 2
      },
      {
        "id": "moon",
        "label": "The crescent becomes a full moon.",
        "difficulty": "Medium",
        "box": {
          "left": 0.8498803827751196,
          "top": 0.009564293304994687,
          "width": 0.05921052631578947,
          "height": 0.11052072263549416
        },
        "edgeFade": 2,
        "source": "/artwork/v3/holidays-painted-v1/memorial-correction-v1.png"
      },
      {
        "id": "pendant",
        "label": "The oval keepsake pendant becomes heart-shaped.",
        "difficulty": "Hard",
        "box": {
          "left": 0.35167464114832536,
          "top": 0.5132837407013815,
          "width": 0.03588516746411483,
          "height": 0.08395324123273114
        },
        "edgeFade": 2,
        "source": "/artwork/v3/holidays-painted-v1/memorial-correction-v1.png"
      },
      {
        "id": "lantern",
        "label": "The lantern loses its front horizontal bar.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.42404306220095694,
          "top": 0.41870350690754515,
          "width": 0.07177033492822966,
          "height": 0.03825717321997875
        },
        "edgeFade": 2
      },
      {
        "id": "carry-ring",
        "label": "The lantern’s round carrying ring becomes square.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.4431818181818182,
          "top": 0.22422954303931988,
          "width": 0.04844497607655503,
          "height": 0.08076514346439957
        },
        "edgeFade": 2,
        "source": "/artwork/v3/holidays-painted-v1/memorial-correction-v2.png"
      }
    ]
  },
  {
    "id": "holiday-painted-juneteenth",
    "holiday": "juneteenth",
    "occasion": "Juneteenth",
    "title": "The Door That Became the Horizon",
    "original": "/artwork/v3/holidays-painted-v1/juneteenth-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/juneteenth-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "An open door lets daylight through;",
      "Look twice—the dream has shifted too."
    ],
    "edits": [
      {
        "id": "moon",
        "label": "The door’s crescent becomes a sun.",
        "difficulty": "Easy",
        "box": {
          "left": 0.31758373205741625,
          "top": 0.14771519659936239,
          "width": 0.042464114832535885,
          "height": 0.0924548352816153
        },
        "edgeFade": 2
      },
      {
        "id": "kite",
        "label": "The blue kite’s star becomes a heart.",
        "difficulty": "Medium",
        "box": {
          "left": 0.7870813397129187,
          "top": 0.11052072263549416,
          "width": 0.045454545454545456,
          "height": 0.0871413390010627
        },
        "edgeFade": 2
      },
      {
        "id": "key",
        "label": "The key’s clover-shaped bow becomes a round ring.",
        "difficulty": "Hard",
        "box": {
          "left": 0.17643540669856458,
          "top": 0.79596174282678,
          "width": 0.06220095693779904,
          "height": 0.08820403825717323
        },
        "edgeFade": 2
      },
      {
        "id": "clasp",
        "label": "The chest’s ornate clasp becomes a diamond.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.20334928229665072,
          "top": 0.6811902231668437,
          "width": 0.034688995215311005,
          "height": 0.08076514346439957
        },
        "edgeFade": 2
      },
      {
        "id": "handle",
        "label": "The door handle loses its curled tip.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.2942583732057416,
          "top": 0.39638682252922425,
          "width": 0.05143540669856459,
          "height": 0.05526036131774708
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-october-observance",
    "holiday": "october-observance",
    "occasion": "Indigenous Peoples’ Day / Columbus Day",
    "title": "The River Inside a Leaf",
    "original": "/artwork/v3/holidays-painted-v1/october-observance-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/october-observance-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "The river threads a copper seam;",
      "Small things flow elsewhere in the dream."
    ],
    "edits": [
      {
        "id": "leaf",
        "label": "The seed-box lid’s leaf becomes a spiral.",
        "difficulty": "Easy",
        "box": {
          "left": 0.049641148325358854,
          "top": 0.5738575982996812,
          "width": 0.08851674641148326,
          "height": 0.13071200850159406
        },
        "edgeFade": 2
      },
      {
        "id": "sail",
        "label": "The seedpod boat’s ivory sail turns blue.",
        "difficulty": "Medium",
        "box": {
          "left": 0.4061004784688995,
          "top": 0.2263549415515409,
          "width": 0.031698564593301434,
          "height": 0.11583421891604676
        },
        "edgeFade": 2
      },
      {
        "id": "handle",
        "label": "The watering can loses its handle.",
        "difficulty": "Hard",
        "box": {
          "left": 0.13995215311004786,
          "top": 0.3995749202975558,
          "width": 0.04007177033492823,
          "height": 0.08820403825717323
        },
        "edgeFade": 2
      },
      {
        "id": "clasp",
        "label": "The seed box’s rectangular clasp becomes round.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.1854066985645933,
          "top": 0.8055260361317748,
          "width": 0.04007177033492823,
          "height": 0.07120085015940489
        },
        "edgeFade": 2
      },
      {
        "id": "stone",
        "label": "The floating path loses its middle stone.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.8672248803827751,
          "top": 0.1275239107332625,
          "width": 0.07177033492822966,
          "height": 0.08501594048884166
        },
        "edgeFade": 2
      }
    ]
  },
  {
    "id": "holiday-painted-veterans",
    "holiday": "veterans",
    "occasion": "Veterans Day",
    "title": "The Long Way Home",
    "original": "/artwork/v3/holidays-painted-v1/veterans-original.png",
    "altered": "/artwork/v3/holidays-painted-v1/veterans-altered-source.png",
    "aspectRatio": 1.7768331562167907,
    "verse": [
      "A folded road brings evening near;",
      "Look back—did something disappear?"
    ],
    "edits": [
      {
        "id": "tag",
        "label": "The dog’s oval tag becomes heart-shaped.",
        "difficulty": "Easy",
        "box": {
          "left": 0.48086124401913877,
          "top": 0.6068012752391073,
          "width": 0.020933014354066987,
          "height": 0.06057385759829968
        },
        "edgeFade": 2
      },
      {
        "id": "bowl",
        "label": "The bowl loses its middle leafy sprig.",
        "difficulty": "Medium",
        "box": {
          "left": 0.5801435406698564,
          "top": 0.6439957492029755,
          "width": 0.037679425837320576,
          "height": 0.05526036131774708
        },
        "edgeFade": 2
      },
      {
        "id": "clasp",
        "label": "The travel case’s rectangular clasp becomes round.",
        "difficulty": "Hard",
        "box": {
          "left": 0.7936602870813397,
          "top": 0.5377258235919234,
          "width": 0.03648325358851675,
          "height": 0.1030818278427205
        },
        "edgeFade": 2
      },
      {
        "id": "bell",
        "label": "The bell loses its hanging tassel.",
        "difficulty": "Very hard",
        "box": {
          "left": 0.666267942583732,
          "top": 0.19234856535600425,
          "width": 0.028708133971291867,
          "height": 0.09351753453772582
        },
        "edgeFade": 2
      },
      {
        "id": "window",
        "label": "The tiny house’s square attic window becomes round.",
        "difficulty": "Dreamlike",
        "box": {
          "left": 0.29904306220095694,
          "top": 0.4909670563230606,
          "width": 0.022727272727272728,
          "height": 0.039319872476089264
        },
        "edgeFade": 2,
        "source": "/artwork/v3/holidays-painted-v1/veterans-correction-v1.png"
      }
    ]
  }
]

export const supersededHolidayDreams = publishedHolidayDreams.filter(card => revisitIds[card.id])
export const holidayDreams: readonly HolidayDream[] = publishedHolidayDreams.map(card => {
  const revised = revisitedCollection.find(dream => dream.id === revisitIds[card.id])
  return revised ? { ...card, ...revised } : card
})

export function holidayDetails(id: string): HolidayDream | undefined {
  return holidayDreams.find(dream => dream.id === id) ?? publishedHolidayDreams.find(dream => dream.id === id) ?? legacyHolidayDreams.find(dream => dream.id === id)
}
