import { categories } from '@/schemas/transaction-schema'

type Category = typeof categories[number]

export interface budget {
    id: string
    category: Category
    limit: number
    spent: number
    remaining: number
    percentage: number
}
