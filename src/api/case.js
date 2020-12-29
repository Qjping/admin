import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/case/list',
    method: 'get',
    params: query
  })
}

export function getGroup(params) {
  return request({
    url: '/case-group/index',
    method: 'get',
    params
  })
}

  export function excuteGroup(groupId) {
    return request({
      url: '/case-group/excute',
      method: 'post',
      data: {
        groupId
      }
    })
}
