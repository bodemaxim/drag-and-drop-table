<script lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { defineComponent } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'

import Navbar from '@/views/Navbar.vue'

import { getProducts, updateProducts } from '@/api/ProductsAPI'

import type { IProduct, IProductInTable } from '@/interfaces/IProduct'

export default defineComponent({
  components: {
    Navbar,
    draggable: VueDraggableNext
  },
  setup() {
    //#region Вымышленные данные.
    const sampleData: IProductInTable[] = [
      {
        unitName: 'бампер',
        price: '100',
        quantity: '2',
        productName: 'product1',
        total: '200',
        isPlaceholder: false
      },
      {
        unitName: 'крыло',
        price: '200',
        quantity: '3',
        productName: 'product2',
        total: '600',
        isPlaceholder: false
      },
      {
        unitName: 'колесо',
        price: '300',
        quantity: '4',
        productName: 'product3',
        total: '1200',
        isPlaceholder: false
      },
      {
        unitName: 'руль',
        price: '400',
        quantity: '5',
        productName: 'product4',
        total: '1000',
        isPlaceholder: false
      }
    ]
    //#endregion Вымышленные данные.

    //#region Данные.
    /**
     * Данные таблицы.
     */
    const tableData: Ref<IProductInTable[]> = ref<IProductInTable[]>(sampleData)
    //#endregion Данные.

    //#region Методы.
    /**
     * Загрузить таблицу.
     */
    const loadProducts = async () => {
      try {
        const data: IProduct[] = await getProducts()
        /* tableData.value = []
        tableData.value = data.map((item) => {
          return {
            ...item,
            isPlaceholder: false
          }
        }) */
      } catch (error) {
        console.log(error)
      } finally {
        addPseudoItem()
      }
    }

    /**
     * Сохранить таблицу.
     */
    const saveProducts = async () => {
      try {
        const data: IProduct[] = await updateProducts(tableData.value)
        /* tableData.value = []
        tableData.value = data.map((item) => {
          return {
            ...item,
            isPlaceholder: false
          }
        }) */
      } catch (error) {
        console.log(error)
      } finally {
        addPseudoItem()
      }
    }
    /**
     * Добавить невидимый элемент в начало списка продуктов
     * (нужно для правильной работы пунктирного плейсхолдера).
     */
    const addPseudoItem = () => {
      const pseudoItem: IProductInTable = {
        unitName: '',
        price: '',
        quantity: '',
        productName: '',
        total: '',
        isPlaceholder: false
      }

      tableData.value.splice(0, 0, pseudoItem)
    }

    /**
     * Добавить новый продукт в таблицу.
     */
    const addRow = () => {
      const newRow: IProductInTable = {
        unitName: '',
        price: '',
        quantity: '',
        productName: '',
        total: '',
        isPlaceholder: false
      }

      tableData.value = [...tableData.value, newRow]
    }

    /**
     * Сохранить таблицу.
     */
    const save = () => {
      console.log('Ajax запрос Сохранить данные')
    }
    //#endregion Методы.

    //#region Drag & Drop.
    let isPlaceholderCreated = false

    const onDragEnd = (e: any) => {
      for (const item of tableData.value) {
        if (item.isPlaceholder === true) {
          const index = tableData.value.indexOf(item)
          tableData.value.splice(index, 1)
        }
      }
      isPlaceholderCreated = false
    }

    const checkMove = (e: any) => {
      console.log(e)
      if (!isPlaceholderCreated) {
        if (e.draggedContext.index !== e.draggedContext.futureIndex) {
          isPlaceholderCreated = true

          const placeholderItem: IProductInTable = {
            unitName: '',
            price: '',
            quantity: '',
            productName: '',
            total: '',
            isPlaceholder: true
          }
          if (e.draggedContext.index > e.draggedContext.futureIndex) {
            tableData.value.splice(e.draggedContext.index + 1, 0, placeholderItem)
          } else {
            tableData.value.splice(0, 1, tableData.value[0])
            tableData.value.splice(e.draggedContext.index + 1, 0, placeholderItem)
          }
        }
      }
    }

    onMounted(() => {
      loadProducts()
    })
    //#endregion Drag & Drop.

    return {
      sampleData,
      tableData,
      addRow,
      onDragEnd,
      checkMove,
      save
    }
  }
})

/* <thead>
              <tr>
                <th><div class="head-cell col-1">&nbsp;</div></th>
                <th><div class="head-cell col-2">Действие</div></th>
                <th>
                  <div class="head-cell col-3">Наименование единицы</div>
                </th>
                <th><div class="head-cell col-4">Цена</div></th>
                <th><div class="head-cell col-5">Кол-во</div></th>
                <th>
                  <div class="head-cell col-6">Название товара</div>
                </th>
                <th><div class="head-cell col-7">Итого</div></th>
              </tr>
            </thead> */
</script>

<template>
  <main class="component">
    <div class="content-area">
      <h1 class="component-title">Проведение ТО и мелкий ремонт</h1>
      <Navbar :page="'products'" />

      <section class="section">
        <button class="blue-button" @click="addRow">+ Добавить строку</button>
        <button class="blue-button" @click="save">Сохранить</button>
      </section>

      <section class="section">
        <table class="product-table">
          <thead>
            <tr>
              <th><div class="head-cell col-1">&nbsp;</div></th>
              <th><div class="head-cell col-2">Действие</div></th>
              <th>
                <div class="head-cell col-3">Наименование единицы</div>
              </th>
              <th><div class="head-cell col-4">Цена</div></th>
              <th><div class="head-cell col-5">Кол-во</div></th>
              <th>
                <div class="head-cell col-6">Название товара</div>
              </th>
              <th><div class="head-cell col-7">Итого</div></th>
            </tr>
          </thead>
          <draggable
            v-model="tableData"
            tag="tbody"
            item-key="name"
            @end="onDragEnd"
            :move="checkMove"
            ghost-class="ghost-element"
          >
            <tr
              v-for="(item, index) in tableData"
              :class="{
                placeholder: item.isPlaceholder,
                zeroPositionPseudoItem: index === 0
              }"
            >
              <td class="cell">
                <button class="cell-content-btn">↕</button>
                <p class="cell-content-right-el">{{ index + 1 }}</p>
              </td>
              <td class="cell" colspan="2">
                <button class="cell-content-btn">X</button>
                <input
                  class="cell-content-right-el"
                  type="text"
                  name="price"
                  v-model="item.unitName"
                />
              </td>
              <td class="cell">
                <input class="cell-content" type="text" name="price" v-model="item.price" />
              </td>
              <td class="cell">
                <input class="cell-content" type="text" name="quantity" v-model="item.quantity" />
              </td>
              <td class="cell">
                <input
                  class="cell-content"
                  type="text"
                  name="productName"
                  v-model="item.productName"
                />
              </td>
              <td class="cell">
                <input class="cell-content" type="text" name="total" v-model="item.total" />
              </td>
            </tr>
          </draggable>
        </table>
        <div class="white-fade"></div>
      </section>
    </div>
    <h3 class="no-mobile-yet">Мобильная версия сайта находится в разработке.</h3>
  </main>
</template>
<style scoped>
/* Общее */
* {
  color: black;
}

.white-fade {
  content: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, white 100%);
  position: absolute;
  top: 0;
  right: 0px;
  width: 20px;
  height: 100%;
  z-index: 10;
}

.no-mobile-yet {
  visibility: hidden;
  margin: 10px;
}

/*Драг энд Дроп*/
.placeholder {
  border: 2px dashed black;
}

.placeholder > * {
  visibility: hidden;
}

.ghost-element {
  background-color: lightgray;
}

.zeroPositionPseudoItem {
  visibility: hidden;
  max-height: 0px;
  position: absolute;
}

.customCursor:hover,
.customCursor:hover * {
  cursor: url(@/assets/customCursor.png), auto !important;
}

/* Кнопка Создать */
.blue-button {
  margin: 10px 30px;
  background-color: #2f8cff;
  border: none;
  border-radius: 3px;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.blue-button:hover {
  background-color: black;
}

/* Таблица */
.product-table {
  border-collapse: collapse;
  border-spacing: 0px;
  margin: 10px 10px;
}

.product-table th {
  border: 1px solid lightgray;
  padding: 5px;
}

th {
  border: 2px solid black;
  padding: 0;
  margin: 0px;
  overflow: auto;
}

div.head-cell {
  resize: horizontal;
  display: block;
  overflow: hidden !important;
  padding: 0px 20px;
  white-space: nowrap;
  min-width: 10px;
}

/* Ячейки */
.cell {
  position: relative;
  height: 30px;
  overflow: hidden;
  margin: 5px;
  height: 35px;
}

.cell-content {
  position: absolute;
  top: 0px;
  left: 0px;
  width: calc(100% - 10px);
  margin: 5px;
  padding: 5px;
}

.cell-content-btn {
  position: absolute;
  top: 0px;
  left: 0px;
  margin: 5px;
  padding: 5px;
}

.cell-content-right-el {
  position: absolute;
  top: 0px;
  left: 30px;
  width: calc(100% - 40px);
  margin: 5px;
  padding: 5px;
}

.col-1 {
  width: 50px;
}

/*Медиазапросы*/
/* https://disk.yandex.ru/d/H4uidsXn9F9fhA */
/* XS */

/* XS & S */
@media (max-width: 767px) {
  .content-area {
    visibility: hidden;
  }
  .no-mobile-yet {
    visibility: visible;
  }
}

/* M */
@media (min-width: 768px) and (max-width: 991px) {
  .col-2 {
    width: 50px;
  }
  .col-3 {
    width: 100px;
  }
  .col-4,
  .col-5,
  .col-6,
  .col-7 {
    width: 70px;
  }
}

/* L */
@media (min-width: 992px) and (max-width: 1199px) {
  .col-2 {
    width: 80px;
  }
  .col-3 {
    width: 150px;
  }
  .col-4,
  .col-5,
  .col-6,
  .col-7 {
    width: 100px;
  }
}
/* XL */
@media (min-width: 1200px) and (max-width: 1399px) {
  .col-2 {
    width: 90px;
  }
  .col-3 {
    width: 250px;
  }
  .col-4,
  .col-5,
  .col-6,
  .col-7 {
    width: 130px;
  }
}

/* XXL */
@media (min-width: 1400px) {
  .col-2 {
    width: 100px;
  }
  .col-3 {
    width: 300px;
  }
  .col-4,
  .col-5,
  .col-6,
  .col-7 {
    width: 150px;
  }
}
</style>
