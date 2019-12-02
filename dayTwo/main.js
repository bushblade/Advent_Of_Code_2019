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
    return runProgram(opCode(arr, index), index + 4)
  }
  return runProgram(arr, ++index)
}

// first problem
// console.log(runProgram(program)[0]) // 3760627

const nounAndVerb = arr => {
  const allIndexes = arr.map((_, i) => i)
  const programCopy = [...arr]
  for (const noun of allIndexes) {
    for (const verb of allIndexes) {
      programCopy[1] = noun
      programCopy[2] = verb
      if (runProgram(programCopy)[0] === 19690720) {
        return 100 * noun + verb
      }
    }
  }
}

// second problem
console.log(nounAndVerb(input)) // 7195
