export interface ICategory {
    name: string,
    id: number|number,
    routeUrl: string,
    categoryImage?: string,
    subCategories: Array<Partial<ICategory>>
}