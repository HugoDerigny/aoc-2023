const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split('\n');

console.time('p1')

const matrix = lines.map((line) => line.split(''))

const startingPosition = matrix.reduce((acc, row) => {
    if (row.includes('S')) {
        return [matrix.indexOf(row), row.indexOf('S')]
    }

    return acc
}, [0, 0])

const validNextPositions = {
    'S': {
        UP: '|7FS',
        DOWN: '|JLS',
        LEFT: '-FLS',
        RIGHT: '-J7S'
    },
    '-': {
        UP: '',
        DOWN: '',
        LEFT: '-FLS',
        RIGHT: '-7JS'
    },
    '|': {
        UP: '|F7S',
        DOWN: '|JLS',
        LEFT: '',
        RIGHT: ''
    },
    'L': {
        UP: '|7FS',
        DOWN: '',
        LEFT: '',
        RIGHT: '-J7S'
    },
    'J': {
        UP: '|F7S',
        DOWN: '',
        LEFT: '-LFS',
        RIGHT: '',
    },
    '7': {
        UP: '',
        DOWN: '|JLS',
        LEFT: '-FLS',
        RIGHT: '',
    },
    'F': {
        UP: '',
        DOWN: '|LJS',
        LEFT: '',
        RIGHT: '-7JS'
    }
}
const directions = [
    {
        direction: 'UP',
        coordinates: [-1, 0],
        opposite: 'DOWN'
    },
    {
        direction: 'DOWN',
        coordinates: [1, 0],
        opposite: 'UP'
    },
    {
        direction: 'LEFT',
        coordinates: [0, -1],
        opposite: 'RIGHT'
    },
    {
        direction: 'RIGHT',
        coordinates: [0, 1],
        opposite: 'LEFT'
    }
]


function getNextPosition(currentPosition, previousDirection) {
    const [x, y] = currentPosition
    const pipe = matrix[x][y]

    for (const {coordinates: [i, j], direction} of directions
        .filter((direction) => direction.opposite !== previousDirection)) {

        try {
            const nextPipe = matrix[x + i][y + j]

            if (nextPipe === '.') {
                continue
            }

            if (validNextPositions[pipe][direction].includes(nextPipe)) {
                return [[x + i, y + j], direction]
            }
        } catch {
        }
    }
}

let previousDirection, currentPipe = startingPosition
let loopLength = 1

while (true) {
    const [nextPipe, fromDirection] = getNextPosition(currentPipe, previousDirection)

    if (nextPipe[0] === startingPosition[0] && nextPipe[1] === startingPosition[1]) {
        break
    }

    previousDirection = fromDirection
    currentPipe = nextPipe
    loopLength++
}

console.log({p1: loopLength / 2})
console.timeEnd('p1')