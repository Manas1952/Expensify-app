// const person = {
//   name: 'Manas',
//   age: 20,
//   location: {
//     city: 'Dungarpur',
//     temp: 40
//   }
// }

// const { name: Anonymous, age } = person
// const { city, temp = 30 } = person.location // we can also do renaming and default value together

// console.log(`${Anonymous} is ${age}`)
// console.log(`${city} is ${temp} C hot`)

const array = ['Coffee(hot)', '2', '2.5', '2.75']
const [,small ,medium, large] = array

console.log(`A medium size coffee is ${medium}`)
