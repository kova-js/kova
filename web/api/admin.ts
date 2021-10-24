import { request } from '@/utils/request'
export const AdminApiPrefix = '/api/admin'

export const statistics = () => request.get(`${AdminApiPrefix}/statistics`)