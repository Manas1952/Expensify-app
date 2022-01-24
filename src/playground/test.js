const geeks_inner = (value) => {
  return 'hi ' + value
}
const geeks_outer = (func) => {
  console.log(func)
}
const done = () => {
  console.log('hey')
}

geeks_outer((done) => {
  console.log('Hello')
  done()
})