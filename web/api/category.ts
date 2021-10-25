import { request } from '@/utils/request'
export const AdminApiPrefix = '/api/admin'

export const query = (params: unknown) => request.get(`${AdminApiPrefix}/categories`, { params })
// export const show = (id: number) => request.get(`${AdminApiPrefix}/posts/${id}`)
