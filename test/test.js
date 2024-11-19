function ExecuteScript() {
  /*your code here, return something (optionally); */
  var items = document.querySelectorAll('.item-list .item') || []
  let arr = []
  items.forEach((i) => {
    arr.push({
      href: i.getAttribute('href'),
      title: i.innerText
    })
  })
  JSON.stringify(arr)
  return arr
}
