const input = require('./input')

const program = [...input]
program[1] = 12
program[2] = 2

const opCode = ([...arr], codeIndex) => {
  const [first, last] = [arr[arr[codeIndex + 1]], arr[arr[codeIndex + 2]]]
  arr[arr[codeIndex + 3]] = arr[codeIndex] === 1 ? first + last : first * last
  return arr
}

const runProgram = ([...arr], index = 0) => {
  if (arr[index] === 99) return arr
  else if (arr[index] === 1 || arr[index] === 2) {
    let current = index
    return runProgram(opCode(arr, current), index + 4)
  }
  return runProgram(arr, ++index)
}

console.log(runProgram(program)[0])
