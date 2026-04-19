export type Rank = 'X' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
export type MonsterType = 'slime' | 'nature' | 'material' | 'dragon' | 'undead' | 'demon' | 'incarnus' | 'beast'
export interface Monster { name: string; type: MonsterType; rank: Rank }
export const monsters: Monster[] = [
  {
    "name": "Slime",
    "type": "slime",
    "rank": "F"
  },
  {
    "name": "Fencing Fox",
    "type": "nature",
    "rank": "E"
  },
  {
    "name": "Leonyx",
    "type": "beast",
    "rank": "X"
  },
  {
    "name": "Malroth",
    "type": "demon",
    "rank": "S"
  },
  {
    "name": "Demon at arms",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "Great Dragon",
    "type": "dragon",
    "rank": "A"
  },
  {
    "name": "Mumboh Jumboh",
    "type": "material",
    "rank": "S"
  },
  {
    "name": "Ruin",
    "type": "material",
    "rank": "S"
  },
  {
    "name": "Overkilling machine",
    "type": "material",
    "rank": "S"
  },
  {
    "name": "Metal Slime",
    "type": "slime",
    "rank": "D"
  },
  {
    "name": "Liquid Metal Slime",
    "type": "slime",
    "rank": "C"
  },
  {
    "name": "Metal King Slime",
    "type": "slime",
    "rank": "A"
  },
  {
    "name": "Dragurn",
    "type": "dragon",
    "rank": "D"
  },
  {
    "name": "Drako",
    "type": "demon",
    "rank": "F"
  },
  {
    "name": "Khalamari",
    "type": "beast",
    "rank": "S"
  },
  {
    "name": "Corvus",
    "type": "???",
    "rank": "X"
  },
  {
    "name": "Snowbird",
    "type": "beast",
    "rank": "E"
  },
  {
    "name": "Dancing Flame",
    "type": "material",
    "rank": "E"
  },
  {
    "name": "Hunter Mech",
    "type": "material",
    "rank": "C"
  },
  {
    "name": "Sagitarus",
    "type": "material",
    "rank": "X"
  },
  {
    "name": "Leopold",
    "type": "beast",
    "rank": "X"
  },
  {
    "name": "Cyber Slime",
    "type": "slime",
    "rank": "C"
  },
  {
    "name": "Beshemoth Slime",
    "type": "slime",
    "rank": "C"
  },
  {
    "name": "demon king",
    "type": "na",
    "rank": "A"
  },
  {
    "name": "dark slime",
    "type": "na",
    "rank": "C"
  },
  {
    "name": "demon rider",
    "type": "na",
    "rank": "D"
  },
  {
    "name": "slime family",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "crabid",
    "type": "material",
    "rank": "C"
  },
  {
    "name": "high djinks",
    "type": "na",
    "rank": "B"
  },
  {
    "name": "boss troll",
    "type": "demon",
    "rank": "B"
  },
  {
    "name": "demon family",
    "type": "demon",
    "rank": "NA"
  },
  {
    "name": "green dragon",
    "type": "dragon",
    "rank": "D"
  },
  {
    "name": "alabast dragon",
    "type": "dragon",
    "rank": "X"
  },
  {
    "name": "dhoulmagus",
    "type": "demon",
    "rank": "X"
  },
  {
    "name": "tyrannosaurus wrecks",
    "type": "na",
    "rank": "S"
  },
  {
    "name": "drakulard",
    "type": "dragon",
    "rank": "S"
  },
  {
    "name": "mechan-o-wyrm",
    "type": "dragon",
    "rank": "A"
  },
  {
    "name": "belial",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "drakularge",
    "type": "dragon",
    "rank": "B"
  },
  {
    "name": "pazuzu",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "atlas",
    "type": "beast",
    "rank": "S"
  },
  {
    "name": "metal dragon",
    "type": "dragon",
    "rank": "C"
  },
  {
    "name": "rashaverak",
    "type": "dragon",
    "rank": "A"
  },
  {
    "name": "nodoph",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "wishmaster",
    "type": "material",
    "rank": "B"
  },
  {
    "name": "tortoceratops",
    "type": "dragon",
    "rank": "A"
  },
  {
    "name": "sintaur",
    "type": "dragon",
    "rank": "A"
  },
  {
    "name": "Aamon",
    "type": "demon",
    "rank": "S"
  },
  {
    "name": "Abyss Diver",
    "type": "dragon",
    "rank": "B"
  },
  {
    "name": "Korol",
    "type": "na",
    "rank": "A"
  },
  {
    "name": "Great Argon Lizard",
    "type": "dragon",
    "rank": "B"
  },
  {
    "name": "Material Family",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "tortured soul",
    "type": "undead",
    "rank": "A"
  },
  {
    "name": "Aggrosculpture",
    "type": "demon",
    "rank": "C"
  },
  {
    "name": "Alphyn",
    "type": "beast",
    "rank": "A"
  },
  {
    "name": "Anchorman",
    "type": "material",
    "rank": "D"
  },
  {
    "name": "Angel Slime",
    "type": "slime",
    "rank": "D"
  },
  {
    "name": "Aquarion",
    "type": "beast",
    "rank": "X"
  },
  {
    "name": "Aquestrian gladiator",
    "type": "dragon",
    "rank": "D"
  },
  {
    "name": "Archdemon",
    "type": "demon",
    "rank": "B"
  },
  {
    "name": "Argon lizard",
    "type": "dragon",
    "rank": "F"
  },
  {
    "name": "Armoured wartoise",
    "type": "dragon",
    "rank": "C"
  },
  {
    "name": "Army ant",
    "type": "nature",
    "rank": "F"
  },
  {
    "name": "Baalzack",
    "type": "beast",
    "rank": "S"
  },
  {
    "name": "Baboon beast",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Bad egg",
    "type": "slime",
    "rank": "F"
  },
  {
    "name": "Bag o' laughs",
    "type": "material",
    "rank": "F"
  },
  {
    "name": "Balhib",
    "type": "material",
    "rank": "A"
  },
  {
    "name": "Bantamweight",
    "type": "nature",
    "rank": "E"
  },
  {
    "name": "Baramos",
    "type": "demon",
    "rank": "S"
  },
  {
    "name": "Barbarus",
    "type": "dragon",
    "rank": "X"
  },
  {
    "name": "Barracuda",
    "type": "nature",
    "rank": "C"
  },
  {
    "name": "Battering ram",
    "type": "beast",
    "rank": "D"
  },
  {
    "name": "Beetleboy",
    "type": "nature",
    "rank": "B"
  },
  {
    "name": "Behemoth slime",
    "type": "slime",
    "rank": "D"
  },
  {
    "name": "Bewarewolf",
    "type": "beast",
    "rank": "C"
  },
  {
    "name": "Bilhaw",
    "type": "dragon",
    "rank": "S"
  },
  {
    "name": "Bjorn",
    "type": "beast",
    "rank": "B"
  },
  {
    "name": "Black dragon",
    "type": "dragon",
    "rank": "S"
  },
  {
    "name": "Blackmar",
    "type": "demon",
    "rank": "S"
  },
  {
    "name": "Bodkin archer",
    "type": "beast",
    "rank": "D"
  },
  {
    "name": "Boe",
    "type": "material",
    "rank": "A"
  },
  {
    "name": "Boh",
    "type": "material",
    "rank": "A"
  },
  {
    "name": "Bona constrictor",
    "type": "undead",
    "rank": "D"
  },
  {
    "name": "Boppin'badger",
    "type": "beast",
    "rank": "F"
  },
  {
    "name": "Boreal serpent",
    "type": "dragon",
    "rank": "E"
  },
  {
    "name": "Boring bug",
    "type": "nature",
    "rank": "D"
  },
  {
    "name": "Blizzybody",
    "type": "nature",
    "rank": "A"
  },
  {
    "name": "Bodkinarcher",
    "type": "beast",
    "rank": "D"
  },
  {
    "name": "Bonaconstrictor",
    "type": "undead",
    "rank": "D"
  },
  {
    "name": "Bonebaron",
    "type": "undead",
    "rank": "A"
  },
  {
    "name": "Borealserpent",
    "type": "dragon",
    "rank": "E"
  },
  {
    "name": "Boringbug",
    "type": "nature",
    "rank": "D"
  },
  {
    "name": "Brownie",
    "type": "beast",
    "rank": "D"
  },
  {
    "name": "Bubbleslime",
    "type": "slime",
    "rank": "F"
  },
  {
    "name": "Buffalogre",
    "type": "beast",
    "rank": "A"
  },
  {
    "name": "Bullfinch",
    "type": "nature",
    "rank": "E"
  },
  {
    "name": "ButchMan",
    "type": "material",
    "rank": "E"
  },
  {
    "name": "Cactiball",
    "type": "nature",
    "rank": "E"
  },
  {
    "name": "Cannibox",
    "type": "material",
    "rank": "D"
  },
  {
    "name": "Canzar",
    "type": "slime",
    "rank": "S"
  },
  {
    "name": "Capsichum",
    "type": "nature",
    "rank": "F"
  },
  {
    "name": "CaptainCrow",
    "type": "undead",
    "rank": "S"
  },
  {
    "name": "Cerabus",
    "type": "undead",
    "rank": "C"
  },
  {
    "name": "Chainine",
    "type": "beast",
    "rank": "E"
  },
  {
    "name": "Chariotchappie",
    "type": "material",
    "rank": "D"
  },
  {
    "name": "Cheekytiki",
    "type": "material",
    "rank": "F"
  },
  {
    "name": "Chimaera",
    "type": "nature",
    "rank": "E"
  },
  {
    "name": "ClayNite",
    "type": "material",
    "rank": "A"
  },
  {
    "name": "Cluboon",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Cluboonace",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Cobracardinal",
    "type": "undead",
    "rank": "B"
  },
  {
    "name": "Cockateer",
    "type": "beast",
    "rank": "B"
  },
  {
    "name": "Conkettes",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "Conklave",
    "type": "demon",
    "rank": "F"
  },
  {
    "name": "Corruptcarter",
    "type": "material",
    "rank": "B"
  },
  {
    "name": "CragDevil",
    "type": "nature",
    "rank": "D"
  },
  {
    "name": "Crossbones",
    "type": "undead",
    "rank": "B"
  },
  {
    "name": "Crosseye",
    "type": "demon",
    "rank": "D"
  },
  {
    "name": "Cruelcumber",
    "type": "nature",
    "rank": "F"
  },
  {
    "name": "Cumulusrex",
    "type": "material",
    "rank": "C"
  },
  {
    "name": "Cureslime",
    "type": "slime",
    "rank": "C"
  },
  {
    "name": "Cyberslime",
    "type": "slime",
    "rank": "C"
  },
  {
    "name": "Damselfly",
    "type": "dragon",
    "rank": "E"
  },
  {
    "name": "Dancingdevil",
    "type": "demon",
    "rank": "E"
  },
  {
    "name": "Dancingflame",
    "type": "material",
    "rank": "E"
  },
  {
    "name": "Danglerfish",
    "type": "demon",
    "rank": "D"
  },
  {
    "name": "Darck",
    "type": "incarnus",
    "rank": "S"
  },
  {
    "name": "Darkrobotslime",
    "type": "slime",
    "rank": "X"
  },
  {
    "name": "Darkslime",
    "type": "slime",
    "rank": "B"
  },
  {
    "name": "Darkslime knight",
    "type": "slime",
    "rank": "B"
  },
  {
    "name": "DarkCrab",
    "type": "undead",
    "rank": "C"
  },
  {
    "name": "Darkoniumslime",
    "type": "slime",
    "rank": "S"
  },
  {
    "name": "DemoKing",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "Demon-at-arms",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "Demonrider",
    "type": "undead",
    "rank": "E"
  },
  {
    "name": "Dessertdemon",
    "type": "demon",
    "rank": "D"
  },
  {
    "name": "Dhuran",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "Diamagon",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Diamagonace",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Diamond Slime",
    "type": "slime",
    "rank": "X"
  },
  {
    "name": "Diemon",
    "type": "beast",
    "rank": "C"
  },
  {
    "name": "Dierantula",
    "type": "undead",
    "rank": "A"
  },
  {
    "name": "Dimensionaldragon",
    "type": "dragon",
    "rank": "X"
  },
  {
    "name": "Dingaling",
    "type": "material",
    "rank": "E"
  },
  {
    "name": "DonMole",
    "type": "beast",
    "rank": "S"
  },
  {
    "name": "Dorsalfiend",
    "type": "beast",
    "rank": "A"
  },
  {
    "name": "DrSnapped",
    "type": "undead",
    "rank": "X"
  },
  {
    "name": "Dracky",
    "type": "demon",
    "rank": "F"
  },
  {
    "name": "Dracolord",
    "type": "dragon",
    "rank": "S"
  },
  {
    "name": "Dragracer",
    "type": "dragon",
    "rank": "E"
  },
  {
    "name": "Drag-goof",
    "type": "dragon",
    "rank": "C"
  },
  {
    "name": "Dragonrider",
    "type": "dragon",
    "rank": "B"
  },
  {
    "name": "Dragonslime",
    "type": "slime",
    "rank": "C"
  },
  {
    "name": "Dragonfry",
    "type": "dragon",
    "rank": "F"
  },
  {
    "name": "Dragonlord",
    "type": "dragon",
    "rank": "X"
  },
  {
    "name": "Dragonthorn",
    "type": "dragon",
    "rank": "F"
  },
  {
    "name": "Dragovianlord",
    "type": "dragon",
    "rank": "X"
  },
  {
    "name": "Drakeslime",
    "type": "slime",
    "rank": "F"
  },
  {
    "name": "Drakorpse",
    "type": "undead",
    "rank": "A"
  },
  {
    "name": "Drohldiabolist",
    "type": "undead",
    "rank": "E"
  },
  {
    "name": "Drohldrone",
    "type": "undead",
    "rank": "F"
  },
  {
    "name": "Droolingghoul",
    "type": "undead",
    "rank": "F"
  },
  {
    "name": "Dualduellers",
    "type": "dragon",
    "rank": "A"
  },
  {
    "name": "Dullahan",
    "type": "undead",
    "rank": "S"
  },
  {
    "name": "Elderpipit",
    "type": "nature",
    "rank": "S"
  },
  {
    "name": "Empyrea",
    "type": "nature",
    "rank": "A"
  },
  {
    "name": "Erazorblade",
    "type": "demon",
    "rank": "C"
  },
  {
    "name": "Estark",
    "type": "material",
    "rank": "X"
  },
  {
    "name": "Etherealserpent",
    "type": "dragon",
    "rank": "B"
  },
  {
    "name": "Eveel",
    "type": "nature",
    "rank": "D"
  },
  {
    "name": "Evilbeast",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Exorsus",
    "type": "undead",
    "rank": "A"
  },
  {
    "name": "Eyevorytusk-tusk",
    "type": "beast",
    "rank": "B"
  },
  {
    "name": "Fallenpriest",
    "type": "demon",
    "rank": "B"
  },
  {
    "name": "Fencingfox",
    "type": "beast",
    "rank": "D"
  },
  {
    "name": "Firebird",
    "type": "beast",
    "rank": "B"
  },
  {
    "name": "Firespirit",
    "type": "undead",
    "rank": "F"
  },
  {
    "name": "Firnfiend",
    "type": "material",
    "rank": "D"
  },
  {
    "name": "Flamethrower",
    "type": "nature",
    "rank": "B"
  },
  {
    "name": "Florajay",
    "type": "nature",
    "rank": "F"
  },
  {
    "name": "Fluffy",
    "type": "beast",
    "rank": "X"
  },
  {
    "name": "Flyguy",
    "type": "undead",
    "rank": "E"
  },
  {
    "name": "Foodog",
    "type": "material",
    "rank": "D"
  },
  {
    "name": "Frightknight",
    "type": "undead",
    "rank": "B"
  },
  {
    "name": "Frogface",
    "type": "demon",
    "rank": "E"
  },
  {
    "name": "Frostburn",
    "type": "material",
    "rank": "F"
  },
  {
    "name": "Frou-frou",
    "type": "dragon",
    "rank": "B"
  },
  {
    "name": "Frou-fry",
    "type": "dragon",
    "rank": "F"
  },
  {
    "name": "Funghoul",
    "type": "undead",
    "rank": "F"
  },
  {
    "name": "Gadis",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Gamadius",
    "type": "beast",
    "rank": "S"
  },
  {
    "name": "Gargoyle",
    "type": "beast",
    "rank": "C"
  },
  {
    "name": "Garuda",
    "type": "nature",
    "rank": "A"
  },
  {
    "name": "Gasbagon",
    "type": "dragon",
    "rank": "D"
  },
  {
    "name": "Gemslime",
    "type": "slime",
    "rank": "X"
  },
  {
    "name": "Gemon",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "General",
    "type": "demon",
    "rank": "B"
  },
  {
    "name": "Geniesanguini",
    "type": "beast",
    "rank": "S"
  },
  {
    "name": "Ghost",
    "type": "undead",
    "rank": "F"
  },
  {
    "name": "Giantmoth",
    "type": "nature",
    "rank": "B"
  },
  {
    "name": "GigaMute",
    "type": "undead",
    "rank": "A"
  },
  {
    "name": "Gigantes",
    "type": "beast",
    "rank": "A"
  },
  {
    "name": "Goldgolem",
    "type": "material",
    "rank": "D"
  },
  {
    "name": "Golem",
    "type": "material",
    "rank": "C"
  },
  {
    "name": "Goodybag",
    "type": "material",
    "rank": "E"
  },
  {
    "name": "Goreham-Hogg",
    "type": "beast",
    "rank": "A"
  },
  {
    "name": "Gorerilla",
    "type": "nature",
    "rank": "B"
  },
  {
    "name": "Goresby-Purrvis",
    "type": "nature",
    "rank": "S"
  },
  {
    "name": "Gracos",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "Grandpaslime",
    "type": "slime",
    "rank": "S"
  },
  {
    "name": "Greatargonlizard",
    "type": "dragon",
    "rank": "B"
  },
  {
    "name": "Greatdracky",
    "type": "demon",
    "rank": "C"
  },
  {
    "name": "Greatdragon",
    "type": "dragon",
    "rank": "A"
  },
  {
    "name": "Greatgodbird",
    "type": "nature",
    "rank": "X"
  },
  {
    "name": "Greatsabrecat",
    "type": "nature",
    "rank": "C"
  },
  {
    "name": "Greatsabrecub",
    "type": "nature",
    "rank": "E"
  },
  {
    "name": "Greendragon",
    "type": "dragon",
    "rank": "E"
  },
  {
    "name": "Greygnarl",
    "type": "dragon",
    "rank": "X"
  },
  {
    "name": "Grimkeeper",
    "type": "demon",
    "rank": "C"
  },
  {
    "name": "Grimrider",
    "type": "undead",
    "rank": "B"
  },
  {
    "name": "Gripevine",
    "type": "nature",
    "rank": "A"
  },
  {
    "name": "Gruffon",
    "type": "demon",
    "rank": "E"
  },
  {
    "name": "Gryphon",
    "type": "demon",
    "rank": "C"
  },
  {
    "name": "Hacksaurus",
    "type": "dragon",
    "rank": "C"
  },
  {
    "name": "Hadescondor",
    "type": "nature",
    "rank": "C"
  },
  {
    "name": "Halfhog",
    "type": "beast",
    "rank": "C"
  },
  {
    "name": "Hammerhood",
    "type": "beast",
    "rank": "F"
  },
  {
    "name": "Hargon",
    "type": "demon",
    "rank": "S"
  },
  {
    "name": "Harmour",
    "type": "material",
    "rank": "D"
  },
  {
    "name": "Hawkhart",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Hawkhartace",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Headhunter",
    "type": "demon",
    "rank": "E"
  },
  {
    "name": "Healslime",
    "type": "slime",
    "rank": "F"
  },
  {
    "name": "Heedoovoodoo",
    "type": "demon",
    "rank": "F"
  },
  {
    "name": "Heligator",
    "type": "nature",
    "rank": "A"
  },
  {
    "name": "Hellhornet",
    "type": "nature",
    "rank": "F"
  },
  {
    "name": "Hellhound",
    "type": "undead",
    "rank": "E"
  },
  {
    "name": "Heyedra",
    "type": "undead",
    "rank": "C"
  },
  {
    "name": "Highdjinks",
    "type": "demon",
    "rank": "B"
  },
  {
    "name": "Hootingham-Gore",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "Huntermech",
    "type": "material",
    "rank": "C"
  },
  {
    "name": "Hyperheyedra",
    "type": "undead",
    "rank": "D"
  },
  {
    "name": "Hyperanemon",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "Imp",
    "type": "demon",
    "rank": "E"
  },
  {
    "name": "Jailcat",
    "type": "nature",
    "rank": "D"
  },
  {
    "name": "Jamirus",
    "type": "demon",
    "rank": "B"
  },
  {
    "name": "Jargon",
    "type": "dragon",
    "rank": "F"
  },
  {
    "name": "Juggular",
    "type": "demon",
    "rank": "B"
  },
  {
    "name": "Jum",
    "type": "material",
    "rank": "B"
  },
  {
    "name": "Jumpingjackal",
    "type": "beast",
    "rank": "C"
  },
  {
    "name": "Kapurigon",
    "type": "undead",
    "rank": "A"
  },
  {
    "name": "Khalamarikid",
    "type": "nature",
    "rank": "D"
  },
  {
    "name": "Killerpillar",
    "type": "nature",
    "rank": "F"
  },
  {
    "name": "Killingmachine",
    "type": "material",
    "rank": "A"
  },
  {
    "name": "King bubble slime",
    "type": "slime",
    "rank": "A"
  },
  {
    "name": "King cure slime",
    "type": "slime",
    "rank": "B"
  },
  {
    "name": "KingGodwyn",
    "type": "(monster",
    "rank": "WIKI"
  },
  {
    "name": "Kingkelp",
    "type": "material",
    "rank": "C"
  },
  {
    "name": "Kingsanguini",
    "type": "beast",
    "rank": "S"
  },
  {
    "name": "Kingslime",
    "type": "slime",
    "rank": "C"
  },
  {
    "name": "Kingsquid",
    "type": "nature",
    "rank": "S"
  },
  {
    "name": "Knightaberrant",
    "type": "demon",
    "rank": "B"
  },
  {
    "name": "Komodo",
    "type": "dragon",
    "rank": "F"
  },
  {
    "name": "Kon",
    "type": "nature",
    "rank": "A"
  },
  {
    "name": "Ladja",
    "type": "undead",
    "rank": "S"
  },
  {
    "name": "Leokid",
    "type": "incarnus",
    "rank": "B"
  },
  {
    "name": "Lesserdemon",
    "type": "demon",
    "rank": "D"
  },
  {
    "name": "Lethalarmour",
    "type": "demon",
    "rank": "B"
  },
  {
    "name": "Lips",
    "type": "demon",
    "rank": "F"
  },
  {
    "name": "Liquidmetalslimeking",
    "type": "slime",
    "rank": "X"
  },
  {
    "name": "Livingstatue",
    "type": "material",
    "rank": "A"
  },
  {
    "name": "Lleviathan",
    "type": "nature",
    "rank": "C"
  },
  {
    "name": "Lumpwizard",
    "type": "demon",
    "rank": "E"
  },
  {
    "name": "Magarugi",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Magicslime",
    "type": "slime",
    "rank": "B"
  },
  {
    "name": "Magmalice",
    "type": "material",
    "rank": "B"
  },
  {
    "name": "Malevolamp",
    "type": "material",
    "rank": "C"
  },
  {
    "name": "Malevolynx",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Mandrakemarshal",
    "type": "dragon",
    "rank": "B"
  },
  {
    "name": "Maniacalmole",
    "type": "beast",
    "rank": "B"
  },
  {
    "name": "Marquisdeleon",
    "type": "beast",
    "rank": "A"
  },
  {
    "name": "Mecha-mynah",
    "type": "material",
    "rank": "D"
  },
  {
    "name": "Mechanowyrm",
    "type": "dragon",
    "rank": "A"
  },
  {
    "name": "Megalodon",
    "type": "dragon",
    "rank": "B"
  },
  {
    "name": "Mentalpitcher",
    "type": "nature",
    "rank": "E"
  },
  {
    "name": "Merman",
    "type": "beast",
    "rank": "C"
  },
  {
    "name": "Metaldragon",
    "type": "dragon",
    "rank": "C"
  },
  {
    "name": "Metal kaiser slime",
    "type": "slime",
    "rank": "A"
  },
  {
    "name": "Metal slime knight",
    "type": "slime",
    "rank": "D"
  },
  {
    "name": "Mimic",
    "type": "material",
    "rank": "B"
  },
  {
    "name": "Mischievousmole",
    "type": "beast",
    "rank": "F"
  },
  {
    "name": "Missinglynx",
    "type": "beast",
    "rank": "C"
  },
  {
    "name": "Moaiminstrel",
    "type": "material",
    "rank": "D"
  },
  {
    "name": "Mohawker",
    "type": "beast",
    "rank": "A"
  },
  {
    "name": "Monkeyzombie",
    "type": "undead",
    "rank": "A"
  },
  {
    "name": "Moosifer",
    "type": "beast",
    "rank": "A"
  },
  {
    "name": "Mortamor",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Mortella",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "Mortoad",
    "type": "beast",
    "rank": "C"
  },
  {
    "name": "Mottle king slime",
    "type": "slime",
    "rank": "D"
  },
  {
    "name": "Mottleslime",
    "type": "slime",
    "rank": "E"
  },
  {
    "name": "Mudmannequin",
    "type": "material",
    "rank": "F"
  },
  {
    "name": "Muddyhand",
    "type": "undead",
    "rank": "F"
  },
  {
    "name": "Mum",
    "type": "material",
    "rank": "A"
  },
  {
    "name": "Mumboh-jumboe",
    "type": "material",
    "rank": "S"
  },
  {
    "name": "Mummyboy",
    "type": "undead",
    "rank": "E"
  },
  {
    "name": "Munchie",
    "type": "nature",
    "rank": "X"
  },
  {
    "name": "Murdaw",
    "type": "demon",
    "rank": "S"
  },
  {
    "name": "Nardragon",
    "type": "dragon",
    "rank": "E"
  },
  {
    "name": "Nemeslime",
    "type": "slime",
    "rank": "A"
  },
  {
    "name": "Nightclubber",
    "type": "beast",
    "rank": "S"
  },
  {
    "name": "Nightemperor",
    "type": "beast",
    "rank": "D"
  },
  {
    "name": "Nightknight",
    "type": "undead",
    "rank": "A"
  },
  {
    "name": "Nimzo",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Noblegasbagon",
    "type": "dragon",
    "rank": "C"
  },
  {
    "name": "Nokturnus",
    "type": "demon",
    "rank": "X"
  },
  {
    "name": "Notsomacho",
    "type": "beast",
    "rank": "C"
  },
  {
    "name": "Numen",
    "type": "nature",
    "rank": "X"
  },
  {
    "name": "Octagoon",
    "type": "material",
    "rank": "C"
  },
  {
    "name": "Octaviansentry",
    "type": "demon",
    "rank": "C"
  },
  {
    "name": "Orc",
    "type": "beast",
    "rank": "D"
  },
  {
    "name": "Orgodemir",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Orochi",
    "type": "dragon",
    "rank": "X"
  },
  {
    "name": "Overkillingmachine",
    "type": "material",
    "rank": "S"
  },
  {
    "name": "Panpiper",
    "type": "beast",
    "rank": "E"
  },
  {
    "name": "Panickle",
    "type": "nature",
    "rank": "B"
  },
  {
    "name": "Paws",
    "type": "nature",
    "rank": "C"
  },
  {
    "name": "Phantomfencer",
    "type": "undead",
    "rank": "D"
  },
  {
    "name": "Phantomswordsman",
    "type": "undead",
    "rank": "B"
  },
  {
    "name": "Pickayune",
    "type": "beast",
    "rank": "F"
  },
  {
    "name": "Pinksanguini",
    "type": "beast",
    "rank": "B"
  },
  {
    "name": "Pipit",
    "type": "nature",
    "rank": "C"
  },
  {
    "name": "Platypunk",
    "type": "beast",
    "rank": "F"
  },
  {
    "name": "Pocuspoppet",
    "type": "material",
    "rank": "E"
  },
  {
    "name": "PomPomBom",
    "type": "undead",
    "rank": "D"
  },
  {
    "name": "Powieyowie",
    "type": "beast",
    "rank": "E"
  },
  {
    "name": "Pricklyprankster",
    "type": "demon",
    "rank": "D"
  },
  {
    "name": "Princeo'Thieves",
    "type": "demon",
    "rank": "X"
  },
  {
    "name": "Prismpeacock",
    "type": "nature",
    "rank": "S"
  },
  {
    "name": "ProtoMech",
    "type": "material",
    "rank": "B"
  },
  {
    "name": "Pruslas",
    "type": "beast",
    "rank": "X"
  },
  {
    "name": "Psaro",
    "type": "material",
    "rank": "X"
  },
  {
    "name": "Puppeteer",
    "type": "material",
    "rank": "C"
  },
  {
    "name": "Ragin'contagion",
    "type": "undead",
    "rank": "B"
  },
  {
    "name": "Reddragon",
    "type": "dragon",
    "rank": "D"
  },
  {
    "name": "Restlessarmour",
    "type": "undead",
    "rank": "C"
  },
  {
    "name": "Rhapthorne",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Rhapthorne 2",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "RigorMortex",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Riptide",
    "type": "nature",
    "rank": "A"
  },
  {
    "name": "Robbin'Hood",
    "type": "demon",
    "rank": "A"
  },
  {
    "name": "Robbin'Huddle",
    "type": "demon",
    "rank": "D"
  },
  {
    "name": "Robbin'sOldLady",
    "type": "beast",
    "rank": "X"
  },
  {
    "name": "Rockbomb",
    "type": "material",
    "rank": "E"
  },
  {
    "name": "Roseguardin",
    "type": "undead",
    "rank": "A"
  },
  {
    "name": "Rottenegg",
    "type": "slime",
    "rank": "B"
  },
  {
    "name": "Rubbleslime",
    "type": "slime",
    "rank": "D"
  },
  {
    "name": "Sagittar",
    "type": "material",
    "rank": "X"
  },
  {
    "name": "Satyr",
    "type": "beast",
    "rank": "F"
  },
  {
    "name": "Schleimantank",
    "type": "slime",
    "rank": "S"
  },
  {
    "name": "Schwarzmantank",
    "type": "material",
    "rank": "X"
  },
  {
    "name": "Scissorbeatle",
    "type": "nature",
    "rank": "F"
  },
  {
    "name": "Scorpion",
    "type": "nature",
    "rank": "D"
  },
  {
    "name": "Scytheborg",
    "type": "material",
    "rank": "A"
  },
  {
    "name": "Seadog",
    "type": "beast",
    "rank": "D"
  },
  {
    "name": "Seadragon",
    "type": "dragon",
    "rank": "C"
  },
  {
    "name": "Seasaur",
    "type": "dragon",
    "rank": "D"
  },
  {
    "name": "Seeurchin",
    "type": "demon",
    "rank": "F"
  },
  {
    "name": "Seedyweedie",
    "type": "slime",
    "rank": "B"
  },
  {
    "name": "Sentripede",
    "type": "nature",
    "rank": "D"
  },
  {
    "name": "Shadow",
    "type": "material",
    "rank": "D"
  },
  {
    "name": "She-slime",
    "type": "slime",
    "rank": "F"
  },
  {
    "name": "Shellslime",
    "type": "slime",
    "rank": "E"
  },
  {
    "name": "ShieldOgr",
    "type": "material",
    "rank": "S"
  },
  {
    "name": "Shogum",
    "type": "slime",
    "rank": "S"
  },
  {
    "name": "Silvapithecus",
    "type": "demon",
    "rank": "D"
  },
  {
    "name": "Skelegon",
    "type": "dragon",
    "rank": "D"
  },
  {
    "name": "Skeleton",
    "type": "undead",
    "rank": "D"
  },
  {
    "name": "Skeletonsoldier",
    "type": "undead",
    "rank": "B"
  },
  {
    "name": "Skipper",
    "type": "undead",
    "rank": "E"
  },
  {
    "name": "Slidergirl",
    "type": "slime",
    "rank": "S"
  },
  {
    "name": "Slimeblaster",
    "type": "slime",
    "rank": "S"
  },
  {
    "name": "Slimegang",
    "type": "slime",
    "rank": "A"
  },
  {
    "name": "Slimeknight",
    "type": "slime",
    "rank": "D"
  },
  {
    "name": "Slimestack",
    "type": "slime",
    "rank": "C"
  },
  {
    "name": "Slon",
    "type": "beast",
    "rank": "A"
  },
  {
    "name": "Smallfry",
    "type": "dragon",
    "rank": "F"
  },
  {
    "name": "Snailslime",
    "type": "slime",
    "rank": "E"
  },
  {
    "name": "Snapdragon",
    "type": "dragon",
    "rank": "E"
  },
  {
    "name": "Snowmangler",
    "type": "slime",
    "rank": "E"
  },
  {
    "name": "Soulspawn",
    "type": "undead",
    "rank": "B"
  },
  {
    "name": "Spikedhare",
    "type": "nature",
    "rank": "D"
  },
  {
    "name": "Spitnik",
    "type": "material",
    "rank": "F"
  },
  {
    "name": "Squign",
    "type": "beast",
    "rank": "B"
  },
  {
    "name": "Starkraven",
    "type": "nature",
    "rank": "B"
  },
  {
    "name": "Stella",
    "type": "incarnus",
    "rank": "A"
  },
  {
    "name": "StormsgateCitadel",
    "type": "material",
    "rank": "A"
  },
  {
    "name": "Stumpchump",
    "type": "undead",
    "rank": "F"
  },
  {
    "name": "Swarmtroop",
    "type": "nature",
    "rank": "F"
  },
  {
    "name": "Swingin'hipster",
    "type": "undead",
    "rank": "E"
  },
  {
    "name": "Tantamount",
    "type": "beast",
    "rank": "B"
  },
  {
    "name": "Taurus",
    "type": "beast",
    "rank": "A"
  },
  {
    "name": "Teenysanguini",
    "type": "beast",
    "rank": "E"
  },
  {
    "name": "Thornella",
    "type": "nature",
    "rank": "A"
  },
  {
    "name": "Tickingtimeburrm",
    "type": "material",
    "rank": "F"
  },
  {
    "name": "TimeSage",
    "type": "material",
    "rank": "S"
  },
  {
    "name": "Titanis",
    "type": "demon",
    "rank": "S"
  },
  {
    "name": "Trapbox",
    "type": "material",
    "rank": "S"
  },
  {
    "name": "Trauminator",
    "type": "material",
    "rank": "X"
  },
  {
    "name": "Treefeller",
    "type": "demon",
    "rank": "F"
  },
  {
    "name": "Treeface",
    "type": "nature",
    "rank": "C"
  },
  {
    "name": "Trigertaur",
    "type": "beast",
    "rank": "C"
  },
  {
    "name": "Triwinder",
    "type": "dragon",
    "rank": "S"
  },
  {
    "name": "Trode",
    "type": "nature",
    "rank": "X"
  },
  {
    "name": "Tyrantosaurus",
    "type": "dragon",
    "rank": "B"
  },
  {
    "name": "UberKillingmachine",
    "type": "material",
    "rank": "S"
  },
  {
    "name": "Ultraslime",
    "type": "slime",
    "rank": "A"
  },
  {
    "name": "Vampirecat",
    "type": "beast",
    "rank": "E"
  },
  {
    "name": "Wailin'weed",
    "type": "undead",
    "rank": "A"
  },
  {
    "name": "Walkingcorpse",
    "type": "undead",
    "rank": "C"
  },
  {
    "name": "Warubou",
    "type": "demon",
    "rank": "X"
  },
  {
    "name": "Waxmurderer",
    "type": "material",
    "rank": "F"
  },
  {
    "name": "Weakenbeakon",
    "type": "beast",
    "rank": "F"
  },
  {
    "name": "Weartiger",
    "type": "beast",
    "rank": "D"
  },
  {
    "name": "Weedie",
    "type": "slime",
    "rank": "F"
  },
  {
    "name": "Whackanape",
    "type": "nature",
    "rank": "C"
  },
  {
    "name": "Wightking",
    "type": "undead",
    "rank": "S"
  },
  {
    "name": "Wightknight",
    "type": "undead",
    "rank": "B"
  },
  {
    "name": "Wildboarfish",
    "type": "nature",
    "rank": "D"
  },
  {
    "name": "Wildslime",
    "type": "slime",
    "rank": "E"
  },
  {
    "name": "Wildcard",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Winky",
    "type": "demon",
    "rank": "F"
  },
  {
    "name": "Woopertrooper",
    "type": "nature",
    "rank": "A"
  },
  {
    "name": "Wormonger",
    "type": "(monster",
    "rank": "WIKI"
  },
  {
    "name": "Wrecktor",
    "type": "demon",
    "rank": "D"
  },
  {
    "name": "Wulfspade",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Wulfspadeace",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Xenlon",
    "type": "dragon",
    "rank": "X"
  },
  {
    "name": "Xiphos",
    "type": "dragon",
    "rank": "X"
  },
  {
    "name": "Yabby",
    "type": "nature",
    "rank": "C"
  },
  {
    "name": "Yggdrasil",
    "type": "nature",
    "rank": "X"
  },
  {
    "name": "Zenithdragon",
    "type": "dragon",
    "rank": "X"
  },
  {
    "name": "Zoma",
    "type": "incarnus",
    "rank": "X"
  },
  {
    "name": "Zoma'sdevil",
    "type": "incarnus",
    "rank": "A"
  },
  {
    "name": "Greatdracky Part 1",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "Greatdracky Part 2",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "Belial part 1",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "archdemon part",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "balhib part 1",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "balhib part 2",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "prism peacock 1",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "prism peacock 2",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "torai wanda",
    "type": "dragon",
    "rank": "S"
  },
  {
    "name": "rhapthorne part 1",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "rhapthorne part 2",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "time sage 1",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "time sage 2",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "trap box 1",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "trap box 2",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "metal kaiser slime 1",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "metal kaiser slime 2",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "Mumboh",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "Jumboe",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "Beetlebully",
    "type": "nature",
    "rank": "S"
  },
  {
    "name": "beetlebully 1",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "beetlebully 2",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "metal king slime 1",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "kap",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "darkonium slime 1",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "darkonium slime 2",
    "type": "na",
    "rank": "NA"
  },
  {
    "name": "Inopp",
    "type": "na",
    "rank": "NA"
  }
] as Monster[]
