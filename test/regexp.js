const regex = /^https:\/\/mars\.jd\.com\/log\/sdk\/v2/;

const url = "https://mars.jd.com/log/sdk/v2?a=1&b=2";

const match = regex.test(url);

console.log(match); // true

const parseArgs = () => {
  let args = {}
  let argStr = $argument || ''
  argStr = argStr.replace(/&/g, ',')
  argStr = argStr.replace(/;/g, ',')
  let argArr = argStr.split(',')
  argArr.forEach((arg) => {
    let [key, value] = arg.split('=')
    args[key] = value
  })
  return args
}
let $argument = "a=1&b=2"
const args = parseArgs()
console.log(args) // {a: "1", b: "2"}`