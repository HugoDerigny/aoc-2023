const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split('\n');

const indexOfInstructions = ['L', 'R']
const instructions = lines.at(0).split('')
const map = lines.slice(2).reduce((acc, line) => {
    const [startingPoint, destinations] = line.split(' = (')
    const [x, y] = destinations.split(', ')

    acc.set(startingPoint, [x, y.slice(0, -1)])

    return acc
}, new Map())

console.time('p1')

let pos = 'AAA'
let i = 0

while (pos !== 'ZZZ') {
    pos = map.get(pos)[indexOfInstructions.indexOf(instructions[i % instructions.length])]
    i++
}

console.log({steps: i})
console.timeEnd('p1')

// part 2

console.time('p2')

const pos2 = Array.from(map.keys()).filter((pos) => pos.charAt(2) === 'A')
const i2 = Array.from({length: pos2.length}, () => 0)

for (let idx = 0; idx < pos2.length; idx++) {
    while (pos2[idx].charAt(2) !== 'Z') {
        pos2[idx] = map.get(pos2[idx])[indexOfInstructions.indexOf(instructions[i2[idx] % instructions.length])]
        i2[idx]++
    }
}

console?.timeLog('p2', { i2 })

function lcm(numbers) {
    function gcd(a, b) {
        if (b === 0) {
            return a;
        }
        return gcd(b, a % b);
    }

    return numbers.reduce((a, b) => a * b / gcd(a, b));
}



console.log({steps2: lcm(i2) })
console.timeEnd('p2')