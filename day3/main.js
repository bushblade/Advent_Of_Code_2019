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

const track = wire => {
  const coords = { x: 0, y: 0 }
  const trackPath = new Set()
  for (const path of wire) {
    let count = 0
    const direction = path[0],
      distance = Number(path.substring(1))
    while (count < distance) {
      const result = updateCoords(coords, direction)
      Object.assign(coords, result)
      trackPath.add(JSON.stringify({ ...coords }))
      count++
    }
  }
  return trackPath
}

const [firstWireTrack, secondWireTrack] = [track(firstWire), track(secondWire)]

const crossPositions = [...firstWireTrack].filter(a => secondWireTrack.has(a))

const distances = crossPositions
  .map(JSON.parse)
  .map(({ x, y }) => Math.abs(x) + Math.abs(y))

console.log(distances.sort((a, b) => a - b))
