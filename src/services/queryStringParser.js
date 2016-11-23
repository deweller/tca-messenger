
export default {

  parse (qstr) {
    let query = {}
    let a = qstr.substr(1).split('&')
    for (let i = 0; i < a.length; i++) {
      let b = a[i].split('=')
      query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '')
    }
    return query
  }

}
