import axios from 'axios'
import type { AxiosResponse } from 'axios'
import axiosInstance from '@//api/apiInstance'

import type { IProduct } from '@/interfaces/IProduct'
import type { IResultModel } from '@/interfaces/IResultModel'

/**
 * Загрузить список продуктов.
 * @returns Промис с результатом.
 * @throws Ошибка при выполнении запроса.
 */
export const getProducts = async (): Promise<IProduct[]> => {
  return await axiosInstance
    .get<IProduct[]>('../api/products/getProducts')
    .then((response: AxiosResponse<IProduct[]>) => response.data)
    .catch((error: Error) => Promise.reject(error))
}

/**
 * Обновить список продуктов.
 * @param request - запрос.
 * @returns Промис с результатом.
 * @throws Ошибка при выполнении запроса.
 */
export const updateProducts = async (request: IProduct[]): Promise<IProduct[]> => {
  return await axiosInstance
    .post<IProduct[]>('../api/products/updateProducts', request)
    .then((response: AxiosResponse<IProduct[]>) => response.data)
    .catch((error: Error) => Promise.reject(error))
}
