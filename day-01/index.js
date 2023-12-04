const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split('\n');

var sum = lines.reduce((acc, line, idx) => {
    const chars = line.split('')

    let number = ''

    for (const char of chars) {
        if (!Number.isNaN(Number.parseInt(char))) {
            number += char
            break
        }
    }

    for (const char of chars.reverse()) {
        if (!Number.isNaN(Number.parseInt(char))) {
            number += char
            break
        }
    }

    return acc + Number.parseInt(number)
}, 0);

console.log('Part1:', sum)

// part 2

const validDigits = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
}

var sum = lines.reduce((acc, line, idx) => {
    let number = ''

    const isValidNumberAsString = (line, index) => {
        for (const digit of Object.keys(validDigits)) {
            if (index + digit.length > line.length) continue

            if (line.slice(index, index + digit.length) === digit) {
                return validDigits[digit]
            }
        }
        return false
    }

    for (let i = 0; i < line.length; i++) {
        if (!Number.isNaN(Number.parseInt(line[i]))) {
            number += line[i]
            break
        }
        if (isValidNumberAsString(line, i)) {
            number += isValidNumberAsString(line, i)
            break
        }
    }

    for (let i = line.length - 1; i >= 0; i--) {
        if (!Number.isNaN(Number.parseInt(line[i]))) {
            number += line[i]
            break
        }
        if (isValidNumberAsString(line, i)) {
            number += isValidNumberAsString(line, i)
            break
        }
    }

    console.log('Adding', number, 'to', acc, 'for line', idx + 1)

    return acc + Number.parseInt(number)
}, 0);

console.log('Part2:', sum)
