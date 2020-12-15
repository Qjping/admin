import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/case/list',
    method: 'get',
    params
  })
}
