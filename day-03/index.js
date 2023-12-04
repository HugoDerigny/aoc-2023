const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split('\n');
const matrix = lines.map((lines) => lines.split(''))

const isNumber = (char) => !isNaN(parseInt(char))

function hasAdjacentCharacter(lineIdx, colIdx) {
    const testChar = (line, column) => {
        try {
            const char = matrix[line][column]

            return char !== '.' && char !== undefined && !isNumber(char)
        } catch {
            return false
        }
    }

    for (let l = -1; l <= 1; l++) {
        for (let c = -1; c <= 1; c++) {
            if (testChar(lineIdx + l, colIdx + c)) {
                return true
            }
        }
    }

    return false
}

let sum = 0
let tempNumber = ''
let canAddNumber = false

for (let line = 0; line < matrix.length; line++) {
    for (let column = 0; column < matrix[line].length; column++) {
        if (isNumber(matrix[line][column])) {
            tempNumber += matrix[line][column]

            canAddNumber ||= hasAdjacentCharacter(line, column)
        } else {
            if (canAddNumber) {
                sum += parseInt(tempNumber)
                canAddNumber = false
            }
            tempNumber = ''
        }
    }
}

console.log({ part1: sum})

// part2

let sumPart2 = 0

const isGearMultiplier = (lineIdx, colIdx) => matrix[lineIdx][colIdx] === '*'

function getGearParts(lineIdx, colIdx) {
    const parts = []
    let canAddNumber = true

    function getPart(lineIdx, colIdx) {
        let part = ''
        let i = colIdx

        // get digits before

        while (isNumber(matrix[lineIdx][i - 1])) {
            i--
        }

        // get digits after
        while (isNumber(matrix[lineIdx][i])) {
            part += matrix[lineIdx][i]
            i++
        }

        parts.push(parseInt(part))
    }

    const isValidNumber = (line, column) => {
        try {
            return isNumber(matrix[line][column])
        } catch (e) {
            return false
        }
    }

    for (let l = -1; l <= 1; l++) {
        for (let c = -1; c <= 1; c++) {
            if (isValidNumber(lineIdx + l, colIdx + c)) {
                if (canAddNumber) {
                    canAddNumber = false
                    getPart(lineIdx + l, colIdx + c)
                }
            } else {
                canAddNumber = true
            }
        }
        canAddNumber = true
    }

    if (parts.length !== 2) {
        return 0
    }

    return parts.reduce((value, acc) => value *= acc, 1)
}

for (let line = 0; line < matrix.length; line++) {
    for (let column = 0; column < matrix[line].length; column++) {
        if (isGearMultiplier(line, column)) {
            sumPart2 += getGearParts(line, column)
        }
    }
}

console.log({ part2: sumPart2 })