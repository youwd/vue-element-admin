import request from '@/utils/request'

export function taskList(params) {
    return request({
        url: '/projectTaskArrange/page',
        method: 'post',
        data: JSON.stringify(params),
        headers: { 'Authorization': 'token=86kyri36t0swsp2fxcvzdmaivmaczjemebbm', 'Content-Type': 'application/json;;charset=UTF-8' }
    })
}

export function taskDetail(params) {
    return request({
        url: '/projectTaskArrange/taskDetail',
        method: 'get',
        params: params,
        headers: { 'Authorization': 'token=86kyri36t0swsp2fxcvzdmaivmaczjemebbm', 'Content-Type': 'application/json;;charset=UTF-8' }
    
    })
}
