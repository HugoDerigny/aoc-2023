const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split('\n');

const MAX_CUBES = {
    red: 12,
    green: 13,
    blue: 14,
}

let sumOfIds = 0

for (const line of lines) {
    const [game, sets] = line.split(':')
    const [_, gameId] = game.split(' ')

    const maxCount = {
        red: 0,
        green: 0,
        blue: 0,
    }

    console.log(game, sets)

    for (const set of sets.split(';')) {
        const cubes = set.split(',')

        for (const cube of cubes) {
            const [_, cubeCount, cubeColor] = cube.split(' ')


            if (cubeCount > maxCount[cubeColor]) {
                maxCount[cubeColor] = Number.parseInt(cubeCount)
            }
        }
    }

    sumOfIds += maxCount.red * maxCount.green * maxCount.blue
}

console.log(sumOfIds)