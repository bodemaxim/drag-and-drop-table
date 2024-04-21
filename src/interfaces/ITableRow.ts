export interface ITableRow {
  unitName: string
  price: string
  quantity: string
  productName: string
  total: string
  /**
   * Плейсхолдер, отображающийся на месте, откуда перетаскивается элемент.
   */
  isPlaceholder: boolean
}
