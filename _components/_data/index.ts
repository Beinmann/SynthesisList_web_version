import { monsters } from './monsters'
import { recipes } from './recipes'

export type { Monster, Rank, MonsterType } from './monsters'
export type { Recipe } from './recipes'
export { monsters, recipes }

export const monsterByName = new Map(monsters.map(m => [m.name.toLowerCase(), m]))
export const recipesByResult = new Map<string, (typeof recipes)>()

for (const r of recipes) {
  const key = r.result.toLowerCase()
  const list = recipesByResult.get(key) ?? []
  list.push(r)
  recipesByResult.set(key, list)
}
