const fs = require('fs')

const calcFuel = mass => Math.floor(mass / 3) - 2

const totalFuelRequired = arr =>
  arr.reduce((acc, mass) => acc + calcFuel(Number(mass)), 0)

const fuelForFuel = (currentFuel, totalFuel = 0) => {
  const fuel = calcFuel(currentFuel)
  return fuel <= 0 ? totalFuel : fuelForFuel(fuel, totalFuel + fuel)
}

// Part One
fs.readFile('./input1.txt', 'utf8', (err, raw) =>
  console.log(totalFuelRequired(raw.split('\n')))
)

// part Two
fs.readFile('./input1.txt', 'utf8', (err, raw) => {
  console.log(
    raw
      .split('\n')
      .map(module => calcFuel(module))
      .map(fuel => fuel + fuelForFuel(fuel))
      .reduce((acc, fuel) => acc + fuel, 0)
  )
})
