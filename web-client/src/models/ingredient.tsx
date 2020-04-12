export class Ingredient {
  name: string
  amount: number

  constructor(ingredient?: Partial<Ingredient>) {
    if (ingredient) {
      this.name = ingredient.name!
      this.amount = ingredient.amount!
    }
  }
}
