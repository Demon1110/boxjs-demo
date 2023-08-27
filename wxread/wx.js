!(async () => {
  await signapp()
  await gethomeinfo()
  await showmsg()
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())