const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'Manas',
      age: 19
    })
    // resolve('This is my another resolve data') // this is not gonna run cause resolve can be passed only once
    // reject('Something went wrong...')
  }, 5000)
})

console.log('before')

promise.then((data) => {
  console.log('1', data)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is my other promise')
    }, 5000)
  })
}).then((str) => {
  console.log('does this run?', str)
}).catch((error) => {
  console.log('error:', error)
})

console.log('after')