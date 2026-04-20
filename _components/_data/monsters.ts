export type Rank = 'X' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
export type MonsterType = 'slime' | 'nature' | 'material' | 'dragon' | 'undead' | 'demon' | 'incarnus' | 'beast'
export type MonsterTag = 'base' | 'synth' | 'special'
export interface Monster { name: string; type: MonsterType; rank: Rank; tags: MonsterTag[] }
export const monsters: Monster[] = [
  {
    "name": "Slime",
    "type": "slime",
    "rank": "F",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Fencing Fox",
    "type": "nature",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Leonyx",
    "type": "beast",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Malroth",
    "type": "demon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Demon at arms",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Great Dragon",
    "type": "dragon",
    "rank": "A",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Ruin",
    "type": "material",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Overkilling machine",
    "type": "material",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Metal Slime",
    "type": "slime",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Liquid Metal Slime",
    "type": "slime",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Metal King Slime",
    "type": "slime",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dragurn",
    "type": "dragon",
    "rank": "D",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Drako",
    "type": "demon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Khalamari",
    "type": "beast",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Corvus",
    "type": "???",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Snowbird",
    "type": "beast",
    "rank": "E",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Dancing Flame",
    "type": "material",
    "rank": "E",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Hunter Mech",
    "type": "material",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Sagitarus",
    "type": "material",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Leopold",
    "type": "beast",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Cyber Slime",
    "type": "slime",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Beshemoth Slime",
    "type": "slime",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "demon king",
    "type": "na",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "dark slime",
    "type": "na",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "demon rider",
    "type": "na",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "slime family",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "crabid",
    "type": "material",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "high djinks",
    "type": "na",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "boss troll",
    "type": "demon",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "demon family",
    "type": "demon",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "green dragon",
    "type": "dragon",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "alabast dragon",
    "type": "dragon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "dhoulmagus",
    "type": "demon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "tyrannosaurus wrecks",
    "type": "na",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "drakulard",
    "type": "dragon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "mechan-o-wyrm",
    "type": "dragon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "belial",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "drakularge",
    "type": "dragon",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "pazuzu",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "atlas",
    "type": "beast",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "metal dragon",
    "type": "dragon",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "rashaverak",
    "type": "dragon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "nodoph",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "wishmaster",
    "type": "material",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "tortoceratops",
    "type": "dragon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "sintaur",
    "type": "dragon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Aamon",
    "type": "demon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Abyss Diver",
    "type": "dragon",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Korol",
    "type": "na",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Great Argon Lizard",
    "type": "dragon",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Material Family",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "tortured soul",
    "type": "undead",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Aggrosculpture",
    "type": "demon",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Alphyn",
    "type": "beast",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Anchorman",
    "type": "material",
    "rank": "D",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Angel Slime",
    "type": "slime",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Aquarion",
    "type": "beast",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Aquestrian gladiator",
    "type": "dragon",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Archdemon",
    "type": "demon",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Argon lizard",
    "type": "dragon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Armoured wartoise",
    "type": "dragon",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Army ant",
    "type": "nature",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Baalzack",
    "type": "beast",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Baboon beast",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Bad egg",
    "type": "slime",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Bag o' laughs",
    "type": "material",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Balhib",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Bantamweight",
    "type": "nature",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Baramos",
    "type": "demon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Barbarus",
    "type": "dragon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Barracuda",
    "type": "nature",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Battering ram",
    "type": "beast",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Beetleboy",
    "type": "nature",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Behemoth slime",
    "type": "slime",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Bewarewolf",
    "type": "beast",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Bilhaw",
    "type": "dragon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Bjorn",
    "type": "beast",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Black dragon",
    "type": "dragon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Blackmar",
    "type": "demon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Bodkin archer",
    "type": "beast",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Boe",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Boh",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Bona constrictor",
    "type": "undead",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Boppin'badger",
    "type": "beast",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Boreal serpent",
    "type": "dragon",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Boring bug",
    "type": "nature",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Blizzybody",
    "type": "nature",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Bodkinarcher",
    "type": "beast",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Bonaconstrictor",
    "type": "undead",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Bonebaron",
    "type": "undead",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Borealserpent",
    "type": "dragon",
    "rank": "E",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Boringbug",
    "type": "nature",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Brownie",
    "type": "beast",
    "rank": "D",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Bubbleslime",
    "type": "slime",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Buffalogre",
    "type": "beast",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Bullfinch",
    "type": "nature",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "ButchMan",
    "type": "material",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Cactiball",
    "type": "nature",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Cannibox",
    "type": "material",
    "rank": "D",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Canzar",
    "type": "slime",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Capsichum",
    "type": "nature",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "CaptainCrow",
    "type": "undead",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Cerabus",
    "type": "undead",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Chainine",
    "type": "beast",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Chariotchappie",
    "type": "material",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Cheekytiki",
    "type": "material",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Chimaera",
    "type": "nature",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "ClayNite",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Cluboon",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Cluboonace",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Cobracardinal",
    "type": "undead",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Cockateer",
    "type": "beast",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Conkettes",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Conklave",
    "type": "demon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Corruptcarter",
    "type": "material",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "CragDevil",
    "type": "nature",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Crossbones",
    "type": "undead",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Crosseye",
    "type": "demon",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Cruelcumber",
    "type": "nature",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Cumulusrex",
    "type": "material",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Cureslime",
    "type": "slime",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Cyberslime",
    "type": "slime",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Damselfly",
    "type": "dragon",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Dancingdevil",
    "type": "demon",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Dancingflame",
    "type": "material",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Danglerfish",
    "type": "demon",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Darck",
    "type": "incarnus",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Darkrobotslime",
    "type": "slime",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Darkslime",
    "type": "slime",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Darkslime knight",
    "type": "slime",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "DarkCrab",
    "type": "undead",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Darkoniumslime",
    "type": "slime",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "DemoKing",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Demon-at-arms",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Demonrider",
    "type": "undead",
    "rank": "E",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Dessertdemon",
    "type": "demon",
    "rank": "D",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Dhuran",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Diamagon",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Diamagonace",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Diamond Slime",
    "type": "slime",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Diemon",
    "type": "beast",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Dierantula",
    "type": "undead",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dimensionaldragon",
    "type": "dragon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Dingaling",
    "type": "material",
    "rank": "E",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "DonMole",
    "type": "beast",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Dorsalfiend",
    "type": "beast",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "DrSnapped",
    "type": "undead",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Dracky",
    "type": "demon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Dracolord",
    "type": "dragon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Dragracer",
    "type": "dragon",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Drag-goof",
    "type": "dragon",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Dragonrider",
    "type": "dragon",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Dragonslime",
    "type": "slime",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Dragonfry",
    "type": "dragon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Dragonlord",
    "type": "dragon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Dragonthorn",
    "type": "dragon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Dragovianlord",
    "type": "dragon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Drakeslime",
    "type": "slime",
    "rank": "F",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Drakorpse",
    "type": "undead",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Drohldiabolist",
    "type": "undead",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Drohldrone",
    "type": "undead",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Droolingghoul",
    "type": "undead",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Dualduellers",
    "type": "dragon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dullahan",
    "type": "undead",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Elderpipit",
    "type": "nature",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Empyrea",
    "type": "nature",
    "rank": "A",
    "tags": [
      "special"
    ]
  },
  {
    "name": "Erazorblade",
    "type": "demon",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Estark",
    "type": "material",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Etherealserpent",
    "type": "dragon",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Eveel",
    "type": "nature",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Evilbeast",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Exorsus",
    "type": "undead",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Eyevorytusk-tusk",
    "type": "beast",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Fallenpriest",
    "type": "demon",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Fencingfox",
    "type": "beast",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Firebird",
    "type": "beast",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Firespirit",
    "type": "undead",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Firnfiend",
    "type": "material",
    "rank": "D",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Flamethrower",
    "type": "nature",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Florajay",
    "type": "nature",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Fluffy",
    "type": "beast",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Flyguy",
    "type": "undead",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Foodog",
    "type": "material",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Frightknight",
    "type": "undead",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Frogface",
    "type": "demon",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Frostburn",
    "type": "material",
    "rank": "F",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Frou-frou",
    "type": "dragon",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Frou-fry",
    "type": "dragon",
    "rank": "F",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Funghoul",
    "type": "undead",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Gadis",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Gamadius",
    "type": "beast",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Gargoyle",
    "type": "beast",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Garuda",
    "type": "nature",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gasbagon",
    "type": "dragon",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Gemslime",
    "type": "slime",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Gemon",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "General",
    "type": "demon",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Geniesanguini",
    "type": "beast",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Ghost",
    "type": "undead",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Giantmoth",
    "type": "nature",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "GigaMute",
    "type": "undead",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gigantes",
    "type": "beast",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goldgolem",
    "type": "material",
    "rank": "D",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Golem",
    "type": "material",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Goodybag",
    "type": "material",
    "rank": "E",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Goreham-Hogg",
    "type": "beast",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gorerilla",
    "type": "nature",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Goresby-Purrvis",
    "type": "nature",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Gracos",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Grandpaslime",
    "type": "slime",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Greatargonlizard",
    "type": "dragon",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Greatdracky",
    "type": "demon",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Greatdragon",
    "type": "dragon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Greatgodbird",
    "type": "nature",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Greatsabrecat",
    "type": "nature",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Greatsabrecub",
    "type": "nature",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Greendragon",
    "type": "dragon",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Greygnarl",
    "type": "dragon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Grimkeeper",
    "type": "demon",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Grimrider",
    "type": "undead",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gripevine",
    "type": "nature",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gruffon",
    "type": "demon",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Gryphon",
    "type": "demon",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Hacksaurus",
    "type": "dragon",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Hadescondor",
    "type": "nature",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Halfhog",
    "type": "beast",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Hammerhood",
    "type": "beast",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Hargon",
    "type": "demon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Harmour",
    "type": "material",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Hawkhart",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Hawkhartace",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Headhunter",
    "type": "demon",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Healslime",
    "type": "slime",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Heedoovoodoo",
    "type": "demon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Heligator",
    "type": "nature",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Hellhornet",
    "type": "nature",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Hellhound",
    "type": "undead",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Heyedra",
    "type": "undead",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Highdjinks",
    "type": "demon",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Hootingham-Gore",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Huntermech",
    "type": "material",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Hyperheyedra",
    "type": "undead",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Hyperanemon",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Imp",
    "type": "demon",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Jailcat",
    "type": "nature",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Jamirus",
    "type": "demon",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Jargon",
    "type": "dragon",
    "rank": "F",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Juggular",
    "type": "demon",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Jum",
    "type": "material",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Jumpingjackal",
    "type": "beast",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Kapurigon",
    "type": "undead",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Khalamarikid",
    "type": "nature",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Killerpillar",
    "type": "nature",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Killingmachine",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "King bubble slime",
    "type": "slime",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "King cure slime",
    "type": "slime",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "KingGodwyn",
    "type": "(monster",
    "rank": "WIKI",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Kingkelp",
    "type": "material",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Kingsanguini",
    "type": "beast",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Kingslime",
    "type": "slime",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Kingsquid",
    "type": "nature",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Knightaberrant",
    "type": "demon",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Komodo",
    "type": "dragon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Kon",
    "type": "nature",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Ladja",
    "type": "undead",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Leokid",
    "type": "incarnus",
    "rank": "B",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Lesserdemon",
    "type": "demon",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Lethalarmour",
    "type": "demon",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Lips",
    "type": "demon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Liquidmetalslimeking",
    "type": "slime",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Livingstatue",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Lleviathan",
    "type": "nature",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Lumpwizard",
    "type": "demon",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Magarugi",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Magicslime",
    "type": "slime",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Magmalice",
    "type": "material",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Malevolamp",
    "type": "material",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Malevolynx",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Mandrakemarshal",
    "type": "dragon",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Maniacalmole",
    "type": "beast",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Marquisdeleon",
    "type": "beast",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mecha-mynah",
    "type": "material",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Mechanowyrm",
    "type": "dragon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Megalodon",
    "type": "dragon",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Mentalpitcher",
    "type": "nature",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Merman",
    "type": "beast",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Metaldragon",
    "type": "dragon",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Metal kaiser slime",
    "type": "slime",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Metal slime knight",
    "type": "slime",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Mimic",
    "type": "material",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mischievousmole",
    "type": "beast",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Missinglynx",
    "type": "beast",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Moaiminstrel",
    "type": "material",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Mohawker",
    "type": "beast",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Monkeyzombie",
    "type": "undead",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Moosifer",
    "type": "beast",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mortamor",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Mortella",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mortoad",
    "type": "beast",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Mottle king slime",
    "type": "slime",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Mottleslime",
    "type": "slime",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Mudmannequin",
    "type": "material",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Muddyhand",
    "type": "undead",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Mum",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mumboh-jumboe",
    "type": "material",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Mummyboy",
    "type": "undead",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Munchie",
    "type": "nature",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Murdaw",
    "type": "demon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Nardragon",
    "type": "dragon",
    "rank": "E",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Nemeslime",
    "type": "slime",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Nightclubber",
    "type": "beast",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Nightemperor",
    "type": "beast",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Nightknight",
    "type": "undead",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Nimzo",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Noblegasbagon",
    "type": "dragon",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Nokturnus",
    "type": "demon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Notsomacho",
    "type": "beast",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Numen",
    "type": "nature",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Octagoon",
    "type": "material",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Octaviansentry",
    "type": "demon",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Orc",
    "type": "beast",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Orgodemir",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Orochi",
    "type": "dragon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Overkillingmachine",
    "type": "material",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Panpiper",
    "type": "beast",
    "rank": "E",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Panickle",
    "type": "nature",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Paws",
    "type": "nature",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Phantomfencer",
    "type": "undead",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Phantomswordsman",
    "type": "undead",
    "rank": "B",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Pickayune",
    "type": "beast",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Pinksanguini",
    "type": "beast",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Pipit",
    "type": "nature",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Platypunk",
    "type": "beast",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Pocuspoppet",
    "type": "material",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "PomPomBom",
    "type": "undead",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Powieyowie",
    "type": "beast",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Pricklyprankster",
    "type": "demon",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Princeo'Thieves",
    "type": "demon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Prismpeacock",
    "type": "nature",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "ProtoMech",
    "type": "material",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Pruslas",
    "type": "beast",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Psaro",
    "type": "material",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Puppeteer",
    "type": "material",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Ragin'contagion",
    "type": "undead",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Reddragon",
    "type": "dragon",
    "rank": "D",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Restlessarmour",
    "type": "undead",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Rhapthorne",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Rhapthorne 2",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "RigorMortex",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Riptide",
    "type": "nature",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Robbin'Hood",
    "type": "demon",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Robbin'Huddle",
    "type": "demon",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Robbin'sOldLady",
    "type": "beast",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Rockbomb",
    "type": "material",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Roseguardin",
    "type": "undead",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Rottenegg",
    "type": "slime",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Rubbleslime",
    "type": "slime",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Sagittar",
    "type": "material",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Satyr",
    "type": "beast",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Schleimantank",
    "type": "slime",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Schwarzmantank",
    "type": "material",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Scissorbeatle",
    "type": "nature",
    "rank": "F",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Scorpion",
    "type": "nature",
    "rank": "D",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Scytheborg",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Seadog",
    "type": "beast",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Seadragon",
    "type": "dragon",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Seasaur",
    "type": "dragon",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Seeurchin",
    "type": "demon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Seedyweedie",
    "type": "slime",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Sentripede",
    "type": "nature",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Shadow",
    "type": "material",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "She-slime",
    "type": "slime",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Shellslime",
    "type": "slime",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "ShieldOgr",
    "type": "material",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Shogum",
    "type": "slime",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Silvapithecus",
    "type": "demon",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Skelegon",
    "type": "dragon",
    "rank": "D",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Skeleton",
    "type": "undead",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Skeletonsoldier",
    "type": "undead",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Skipper",
    "type": "undead",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Slidergirl",
    "type": "slime",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Slimeblaster",
    "type": "slime",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Slimegang",
    "type": "slime",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Slimeknight",
    "type": "slime",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Slimestack",
    "type": "slime",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Slon",
    "type": "beast",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Smallfry",
    "type": "dragon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Snailslime",
    "type": "slime",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Snapdragon",
    "type": "dragon",
    "rank": "E",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Snowmangler",
    "type": "slime",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Soulspawn",
    "type": "undead",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Spikedhare",
    "type": "nature",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Spitnik",
    "type": "material",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Squign",
    "type": "beast",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Starkraven",
    "type": "nature",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Stella",
    "type": "incarnus",
    "rank": "A",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "StormsgateCitadel",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Stumpchump",
    "type": "undead",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Swarmtroop",
    "type": "nature",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Swingin'hipster",
    "type": "undead",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Tantamount",
    "type": "beast",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Taurus",
    "type": "beast",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Teenysanguini",
    "type": "beast",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Thornella",
    "type": "nature",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Tickingtimeburrm",
    "type": "material",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "TimeSage",
    "type": "material",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Titanis",
    "type": "demon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Trapbox",
    "type": "material",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Trauminator",
    "type": "material",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Treefeller",
    "type": "demon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Treeface",
    "type": "nature",
    "rank": "C",
    "tags": [
      "base",
      "synth"
    ]
  },
  {
    "name": "Trigertaur",
    "type": "beast",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Triwinder",
    "type": "dragon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Trode",
    "type": "nature",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Tyrantosaurus",
    "type": "dragon",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "UberKillingmachine",
    "type": "material",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Ultraslime",
    "type": "slime",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Vampirecat",
    "type": "beast",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Wailin'weed",
    "type": "undead",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Walkingcorpse",
    "type": "undead",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Warubou",
    "type": "demon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Waxmurderer",
    "type": "material",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Weakenbeakon",
    "type": "beast",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Weartiger",
    "type": "beast",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Weedie",
    "type": "slime",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Whackanape",
    "type": "nature",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Wightking",
    "type": "undead",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Wightknight",
    "type": "undead",
    "rank": "B",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Wildboarfish",
    "type": "nature",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Wildslime",
    "type": "slime",
    "rank": "E",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Wildcard",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Winky",
    "type": "demon",
    "rank": "F",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Woopertrooper",
    "type": "nature",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Wormonger",
    "type": "(monster",
    "rank": "WIKI",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Wrecktor",
    "type": "demon",
    "rank": "D",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Wulfspade",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Wulfspadeace",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Xenlon",
    "type": "dragon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Xiphos",
    "type": "dragon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Yabby",
    "type": "nature",
    "rank": "C",
    "tags": [
      "base"
    ]
  },
  {
    "name": "Yggdrasil",
    "type": "nature",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Zenithdragon",
    "type": "dragon",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Zoma",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Zoma'sdevil",
    "type": "incarnus",
    "rank": "A",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Greatdracky Part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Greatdracky Part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Belial part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "archdemon part",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "balhib part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "balhib part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "prism peacock 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "prism peacock 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "torai wanda",
    "type": "dragon",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "rhapthorne part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "rhapthorne part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "time sage 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "time sage 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "trap box 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "trap box 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "metal kaiser slime 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "metal kaiser slime 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mumboh",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Jumboe",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Beetlebully",
    "type": "nature",
    "rank": "S",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "beetlebully 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "beetlebully 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "metal king slime 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "kap",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "darkonium slime 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "darkonium slime 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Inopp",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Rhapthorne 2 part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dhoulmagus part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Marquisdeleon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dorsalfiend part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Conklave X part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Green Dragon Lv.20",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Darkoniumslime part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Skeleton Lv.20",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "DonMole part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Conklave X",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Snowbird part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Kingsquid part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Reddragon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Nightclubber part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Archdemon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dhoulmagus part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Exorsus part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Ruin part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Riptide part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Black Dragon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goodybag X",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Grandpaslime part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Heligator part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Chimaera X Lv.50",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Aquarion part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gemon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goodybag X part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gripevine part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Grimrider part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dancing Flame part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gargoyle part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dessertdemon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "RigorMortex part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Boe part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Greatargonlizard part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Skeleton X part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Wailin'weed part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Skeleton X part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Slime X part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Teeny Sanguini X",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mortamor part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Moosifer part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mimic part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Baramos part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Boss Troll part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Ruin part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Leopold part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gripevine part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Kingsquid part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Fallenpriest part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Slime XY part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Slime Lv.20",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Boh part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Zoma part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Heligator part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Pazuzu part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Boh part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Nimzo part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Killingmachine part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Marquisdeleon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Reddragon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mortella part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Murdaw part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gracos part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "metal dragon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Frou-fry part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Beshemoth Slime part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gemon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Grandpaslime part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dracolord part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "King cure slime part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Bonebaron part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dragovianlord part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Hargon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Xenlon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Xenlon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Roseguardin part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Teeny Sanguini X part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Snowbird part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Phantomswordsman part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Nimzo part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Baramos part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Leonyx part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Conklave X Lv.50",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Treeface part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Skeleton XY",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dorsalfiend part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Drakulard part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Chimaera XY",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goodybag XY part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Leonyx part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Conklave XY",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gemslime part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dierantula part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Wildcard part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Sagittar part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Demonrider part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Fallenpriest part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goodybag part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Metal King Slime part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Zoma part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "metal dragon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Metal King Slime part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Orochi part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Psaro part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Wailin'weed part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dullahan part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Chimaera X part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Jargon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Teeny Sanguini XY part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Green Dragon XY",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Green Dragon X Lv.50",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Metal kaiser slime part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Canzar part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Chimaera XY part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Darkoniumslime part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Brownie part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Wildcard part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goldgolem part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Panpiper part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Trode part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Cannibox part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Psaro part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "DonMole part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Nardragon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Jamirus part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Hunter Mech part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Moosifer part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Belial part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Wightking part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Riptide part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Conkettes part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Garuda part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Slime XY part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Zenithdragon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Wightking part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goodybag XY",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Beetlebully part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Green Dragon XY part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dragurn part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Diemon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Green Dragon X part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Shogum part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Shogum part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Slime XY",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dancing Flame part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Phantomswordsman part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Khalamari part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mumboh-jumboe part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Conklave XY part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Magmalice part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Canzar part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Hadescondor part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dragonlord part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Drakeslime part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Chimaera XY part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Frostburn part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mum part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gargoyle part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "mechan-o-wyrm part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Zenithdragon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Hunter Mech part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Cureslime part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mum part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Green Dragon XY part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Firnfiend part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Trapbox part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Greatsabrecat part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Firnfiend part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "tortured soul part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Slime X Lv.50",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Liquid Metal Slime part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Nature Family",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dragovianlord part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Murdaw part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "mechan-o-wyrm part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Snapdragon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Greatsabrecat part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Orgodemir part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Skeleton X Lv.50",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goodybag part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Overkilling machine part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Malroth part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Black Dragon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Nokturnus part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Undead Family",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Slime X",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Khalamari part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Seadragon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Skelegon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Jamirus part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Frou-frou part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Thornella part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Skeleton XY part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Beetlebully part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dragon Family",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Hargon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Estark part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Trapbox part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Teeny Sanguini X Lv.50",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Trauminator part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Thornella part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Hadescondor part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Teeny Sanguini X part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Nardragon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "atlas part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "King cure slime part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "tortured soul part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Greygnarl part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Chimaera Lv.20",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Greatgodbird part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dessertdemon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Greatargonlizard part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "DrSnapped part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Estark part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Garuda part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Trode part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Lethalarmour part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Conklave X part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Cureslime part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dullahan part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goodybag X part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Ace Of Spades",
    "type": "incarnus",
    "rank": "X",
    "tags": [
      "special",
      "synth"
    ]
  },
  {
    "name": "Grimrider part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Archdemon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Frou-fry part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Liquid Metal Slime part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mimic part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Kingslime part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Drakulard part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Teeny Sanguini Lv.20",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Frostburn part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goldgolem part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Borealserpent part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Scorpion part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Scorpion part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Orochi part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Cannibox part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Drakeslime part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Killingmachine part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "RigorMortex part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mohawker part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Roseguardin part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Conklave Lv.20",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mumboh-jumboe part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Borealserpent part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Boe part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "atlas part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Pazuzu part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dierantula part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gemslime part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Overkilling machine part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Teeny Sanguini XY part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Snapdragon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dragurn part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Green Dragon X",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Boss Troll part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dracolord part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goodybag Lv.20",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Orgodemir part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Malroth part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dualduellers part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Sagittar part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Scissorbeatle part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Chimaera X part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Jargon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mohawker part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Bonebaron part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Metal kaiser slime part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Treeface part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Green Dragon X part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dualduellers part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Lethalarmour part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Leopold part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Exorsus part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Skeleton XY part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Teeny Sanguini XY",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Conklave XY part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Chimaera X",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Aquarion part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Skeleton X",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "DrSnapped part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Brownie part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Magmalice part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Seadragon part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goodybag XY part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Conkettes part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Skelegon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mortella part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Kingslime part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Gracos part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Beshemoth Slime part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Beast Family",
    "type": "material",
    "rank": "A",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Frou-frou part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Mortamor part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Scissorbeatle part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Trauminator part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Panpiper part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Greatgodbird part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Nokturnus part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Slime X part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Demonrider part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Dragonlord part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Diemon part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Goodybag X Lv.50",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Rhapthorne 2 part 2",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Nightclubber part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  },
  {
    "name": "Greygnarl part 1",
    "type": "na",
    "rank": "NA",
    "tags": [
      "synth"
    ]
  }
] as Monster[]
