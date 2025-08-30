export interface IBadge {
  id?: number
  name: string
  color: string
}

export class Badge implements IBadge {
  id?: number
  name!: string
  color!: string

  static tableName = "badge"

  static columns: (keyof Badge)[] = [
    "id",
    "name",
    "color"
  ]
}