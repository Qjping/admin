import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/case/list',
    method: 'get',
    params: query
  })
}

export function getDetail(id) {
  return request({
    url: '/case/detail',
    method: 'get',
    params: {id}
  })
}

export function getGroup(params) {
  return request({
    url: '/case-group/index',
    method: 'get',
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

  export function save(from){
    return request({
      url:  '/save',
      method: 'post',
      data: from
    })
  }


