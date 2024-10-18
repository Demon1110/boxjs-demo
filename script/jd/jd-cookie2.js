const chavy = init()

const KEY_signheader = 'JD_signheader_cary'
const KEY_mobile = 'JD_mobile_cary'

!(async () => {
  await showmsg()
})()
  .catch((e) => KEY_mobile.log(e))
  .finally(() => KEY_mobile.done())

function showmsg() {
  return new Promise((resolve) => {
    if (this.$request && this.$request.headers) {
      const VAL_signheader = JSON.stringify($request.headers)
      if (VAL_signheader) {
        chavy.setdata(KEY_signheader, VAL_signheader)
        chavy.msg('VAL_signheader', `获取Header: 成功`, VAL_signheader)
      }
      const cookies = $request.headers['Cookie']
      chavy.msg('cookieName', `获取Cookie: 成功`, JSON.stringify(cookies))
    } else {
      chavy.msg('cookieName', `获取Cookie: 失败`, ``)
    }
    resolve()
  })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
chavy.done()
