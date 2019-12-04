const start = 136760
const end = 595730

const isIncreasing = num => {
  const arr = [...`${num}`].map(Number)
  let pre = arr[0]
  for (const n of arr) {
    if (n < pre) return false
    pre = n
  }
  return true
}

const hasAdjacent = num => {
  const str = `${num}`
  let pre = str[0]
  for (const char of str.substring(1)) {
    if (char === pre) return true
    pre = char
  }
  return false
}

const validate = num => isIncreasing(num) && hasAdjacent(num)

const getPasswords = (start, end) => {
  let result = new Set()
  while (start < end) {
    if (validate(start)) result.add(start)
    start++
  }
  return result
}

// part one
// console.log(getPasswords(start, end, validate).size)

// part two
const results = [...getPasswords(start, end)].filter(num => {
  const duplicates = `${num}`.match(/(.)\1+/g) // borrowed regex
  const twos = duplicates.filter(match => match.length === 2)
  return twos.length > 0 ? true : false
})

console.log(results.length) // 1264
