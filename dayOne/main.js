const fs = require('fs')

const calcFuel = mass => Math.floor(mass / 3) - 2

const totalFuelRequired = arr =>
  arr.reduce((acc, mass) => acc + calcFuel(Number(mass)), 0)

// Part One
fs.readFile('./input1.txt', 'utf8', (err, raw) =>
  console.log(totalFuelRequired(raw.split('\n')))
)

const fuelForFuel = (currentFuel, totalFuel = 0) => {
  if (calcFuel(currentFuel) <= 0) return totalFuel
  const fuel = calcFuel(currentFuel)
  return fuelForFuel(fuel, totalFuel + fuel)
}

// part 2
fs.readFile('./input1.txt', 'utf8', (err, raw) => {
  console.log(
    raw
      .split('\n')
      .map(module => calcFuel(module))
      .map(fuel => fuel + fuelForFuel(fuel))
      .reduce((acc, fuel) => acc + fuel, 0)
  )
})
