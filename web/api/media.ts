import { request } from '@/utils/request'
export const AdminApiPrefix = '/api/admin'

export const query = (params: unknown) => request.get(`${AdminApiPrefix}/medias`, { params })
