const chavy = init()
// $.KEY_mobile = 'wxread_cary'

const KEY_signheader = 'wxread_signheader_cary'
const KEY_signbody = 'wxread_signbody_cary'
const KEY_mobile = 'wxread_mobile_cary'

!(async () => {
  await showmsg()
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())

function showmsg() {
  return new Promise((resolve) => {
    // if (this.$request && this.$request.headers && this.$request.body) {
    //console.log(this)
    if (this.$request) {
      const VAL_signheader = JSON.stringify($request.headers)
      // const VAL_signbody = this.$request.body
      if (VAL_signheader) chavy.setdata(VAL_signheader, KEY_signheader)
      // if (VAL_signbody) chavy.setdata(VAL_signbody, KEY_signbody)
      // console.log(this.$request)
      chavy.msg("cookieName", `获取Cookie: 成功`, ``)
    } else {
      chavy.msg("cookieName", `获取Cookie: 失败`, ``)
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