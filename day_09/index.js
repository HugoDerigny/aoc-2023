const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split('\n');

console.time('p1')

const p1 = lines.reduce((acc, line) => {
    let i = 0

    const currentDigits = line.split(' ').map(Number)
    const rows = [currentDigits]

    while (!rows[i].every((v) => v === 0)) {
        const interpolation = rows[i].reduce((acc, v, idx) => {
            idx !== rows[i].length - 1 && acc.push(rows[i][idx + 1] - v)

            return acc
        }, [])

        rows.push(interpolation)

        i++
    }

    for (let i = rows.length - 1; i > 0; i--) {
        const currentLine = rows[i]
        const previousLine = rows[i - 1]

        previousLine.push(previousLine.at(-1) + currentLine.at(-1))
    }

    return acc + rows[0].at(-1)
}, 0)

console.log({ p1 })

console.timeEnd('p1')

// p2

console.time('p2')

const p2 = lines.reduce((acc, line) => {
    let i = 0

    const currentDigits = line.split(' ').map(Number)
    const rows = [currentDigits.reverse()]

    while (!rows[i].every((v) => v === 0)) {
        const interpolation = rows[i].reduce((acc, v, idx) => {
            idx !== rows[i].length - 1 && acc.push(rows[i][idx + 1] - v)

            return acc
        }, [])

        rows.push(interpolation)

        i++
    }

    for (let i = rows.length - 1; i > 0; i--) {
        const currentLine = rows[i]
        const previousLine = rows[i - 1]

        previousLine.push(previousLine.at(-1) + currentLine.at(-1))
    }

    return acc + rows[0].at(-1)
}, 0)

console.log({ p2 })

console.timeEnd('p2')