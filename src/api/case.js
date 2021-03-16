import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/case/search',
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
    url: '/case-group/search',
    method: 'get',
  })
}

  export function excuteGroup(data) {
    return request({
      url: '/case-group/execute',
      method: 'post',
      data

    })
  }

  export function excuteCase(data) {
    return request({
      url: '/case-group/execute',
      method: 'post',
      data
    })
  }

  export function save(from){
    return request({
      url:  '/case/add',
      method: 'post',
      data: from
    })
  }

  export function deleteCase(caseId){
    return request({
      url:  '/case/delete',
      method: 'post',
      data: {
        case_id: caseId
      }
    })
  }


