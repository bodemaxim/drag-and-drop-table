export interface IProduct {
  unitName: string
  price: string
  quantity: string
  productName: string
  total: string
}

export interface IProductInTable extends IProduct {
  /**
   * Плейсхолдер, отображающийся на месте, откуда перетаскивается элемент.
   */
  isPlaceholder: boolean
}
