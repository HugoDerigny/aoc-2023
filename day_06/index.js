const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split('\n');

console.time('p1')

const races = lines[0].split(':')[1].split(' ').filter((x) => x !== '').map((x) => parseInt(x))
const distances = lines[1].split(':')[1].split(' ').filter((x) => x !== '').map((x) => parseInt(x))

const waysToWin = Array.from({ length: races.length }).fill(-2)

for (let i = 0; i < races.length; i++) {
    const startValue = Math.round(races[i] / 2)

    let holdTime = startValue

    do {
        distanceTime = races[i] - holdTime
        boatDistance = holdTime * distanceTime

        holdTime += 1
        waysToWin[i] += 1
    } while (boatDistance > distances[i])

    holdTime = startValue - 1

    do {
        distanceTime = races[i] - holdTime
        boatDistance = holdTime * distanceTime

        holdTime -= 1
        waysToWin[i] += 1
    } while (boatDistance > distances[i])
}

console.log('p1', waysToWin.reduce((a, b) => a * b, 1), waysToWin.reduce((a, b) => a * b, 1) === 275724)
console.timeEnd('p1')

// P2

console.time('p2')
const race = parseInt(lines[0].split(':')[1].split(' ').filter((x) => x !== '').join(''))
const distance = parseInt(lines[1].split(':')[1].split(' ').filter((x) => x !== '').join(''))
let waysToWinP2 = -2

const startValue = Math.round(race / 2)

let holdTime = startValue

do {
    distanceTime = race - holdTime
    boatDistance = holdTime * distanceTime

    holdTime += 1
    waysToWinP2 += 1
} while (boatDistance > distance)


waysToWinP2 *= 2

if (waysToWinP2 % 2 === 0) {
    waysToWinP2 += 1
}

// holdTime = startValue - 1

// do {
//     distanceTime = race - holdTime
//     boatDistance = holdTime * distanceTime
//
//     holdTime -= 1
//     waysToWinP2 += 1
// } while (boatDistance > distance)

console.log('p2', waysToWinP2, waysToWinP2 === 37286485)
console.timeEnd('p2')