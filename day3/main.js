const fs = require('fs')

const [firstWire, secondWire] = fs
  .readFileSync('./input.txt', 'utf8')
  .trim()
  .split('\n')
  .map(line => line.split(','))

const updateCoords = (coords, direction) => {
  switch (direction) {
    case 'L':
      return { ...coords, x: coords.x - 1 }
    case 'R':
      return { ...coords, x: coords.x + 1 }
    case 'U':
      return { ...coords, y: coords.y + 1 }
    case 'D':
      return { ...coords, y: coords.y - 1 }
  }
}

const stepMapOne = new Map()
const stepMapTwo = new Map()

const track = (wire, stepMap) => {
  let step = 1
  const coords = { x: 0, y: 0 }
  const trackPath = new Set()
  for (const path of wire) {
    let count = 0
    const direction = path[0],
      distance = Number(path.substring(1))
    while (count < distance) {
      const result = updateCoords(coords, direction)
      Object.assign(coords, result)
      const str = JSON.stringify({ ...coords })
      trackPath.add(str)
      if (!stepMap.has(str)) stepMap.set(str, step)
      count++
      step++
    }
  }
  return trackPath
}

const [firstWireTrack, secondWireTrack] = [
  track(firstWire, stepMapOne),
  track(secondWire, stepMapTwo)
]

const intersections = [...firstWireTrack].filter(a => secondWireTrack.has(a))

const distances = intersections
  .map(JSON.parse)
  .map(({ x, y }) => Math.abs(x) + Math.abs(y))

// part 1
console.log(distances.sort((a, b) => a - b)[0]) // 3229

const partTwo = intersections.map(intersect => {
  return stepMapOne.get(intersect) + stepMapTwo.get(intersect)
})

// part 2
console.log(partTwo.sort((a, b) => a - b)[0])
