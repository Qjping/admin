import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/case/list',
    method: 'get',
    params
  })
}

export function getGroup(params) {
  return request({
    url: '/case/group',
    method: 'get',
    params
  })
}
