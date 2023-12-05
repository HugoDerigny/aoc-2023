const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split('\n');

console.time('p1')
let lowestP1 = Infinity

const seeds = lines[0].split(': ')[1].split(' ').map((v) => parseInt(v))
const mappers = []

let isInMap = false
let currentMapIndex

// create mapper
for (const line of lines) {
    if (line.includes('map')) {
        isInMap = true
        const [label] = line.split(' ')
        const [to, from] = label.split('-to-')
        currentMapIndex = mappers.length
        mappers.push({
            from,
            to,
            fromValues: [],
            toValues: [],
            rangeValues: []
        })
        continue
    }

    if (isInMap) {
        const [to, from, range] = line.split(' ').map((v) => parseInt(v))

        mappers.at(currentMapIndex).fromValues.push(from)
        mappers.at(currentMapIndex).toValues.push(to)
        mappers.at(currentMapIndex).rangeValues.push(range)
    }

    if (line === '') {
        isInMap = false
    }
}

for (const seed of seeds) {
    let currentValue = seed
    for (const mapper of mappers) {
        const index = mapper.fromValues.findIndex((sourceStart, index) => currentValue >= sourceStart && currentValue < sourceStart + mapper.rangeValues[index])

        if (index === -1) {
            continue
        }

        const sourceValue = mapper.fromValues[index]
        const destinationValue = mapper.toValues[index]

        currentValue = currentValue - (sourceValue - destinationValue)
    }

    if (currentValue < lowestP1) {
        lowestP1 = currentValue
    }
}

console.log({lowestP1})
console.timeEnd('p1')

// p2

console.time('p2')
// let lowestP2 = Infinity
//
// const chunk = (arr, size) =>
//     arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);
// const seedsPair = chunk(lines[0].split(': ')[1].split(' ').map((v) => parseInt(v)), 2)
//
// for (const [seed, range] of seedsPair) {
//     let currentValue = seed + i
//     for (const mapper of mappers) {
//         const index = mapper.fromValues.findIndex((sourceStart, index) => currentValue >= sourceStart && currentValue < sourceStart + mapper.rangeValues[index])
//
//         if (index === -1) {
//             continue
//         }
//
//         const sourceValue = mapper.fromValues[index]
//         const destinationValue = mapper.toValues[index]
//
//         currentValue = currentValue - (sourceValue - destinationValue)
//     }
//
//     if (currentValue < lowestP1) {
//         lowestP1 = currentValue
//     }
// }

const [seedsLine, ...mappingLines] = input.split("\n\n");
const seedsPair = seedsLine.split(":")[1].trim().split(" ").map(Number);
const mapMatrix = mappingLines.map((line) =>
    line
        .split("\n")
        .slice(1)
        .map((s) => s.split(" ").map(Number))
        .map(([dStart, sStart, length]) => ({
            dStart,
            dEnd: dStart + length - 1,
            sStart,
            sEnd: sStart + length - 1,
        }))
);

const candidateSeeds = mapMatrix
    .flatMap((mappings, i) =>
        mappings.map((m) =>
            mapMatrix.slice(0, i + 1).reduceRight((curr, mm) => {
                const n = mm.find((n) => curr >= n.dStart && curr <= n.dEnd);
                return n ? n.sStart + (curr - n.dStart) : curr;
            }, m.dStart)
        )
    )
    .filter((seed) =>
        seedsPair.some(
            (s, i) => i % 2 === 0 && seed >= s && seed < s + seedsPair[i + 1]
        )
    );

lowestP2 = Math.min(
    ...candidateSeeds.map((val) =>
        mapMatrix.reduce((curr, mappings) => {
            const m = mappings.find((m) => curr >= m.sStart && curr <= m.sEnd);
            return m ? m.dStart + (curr - m.sStart) : curr;
        }, val)
    )
);

console.log({lowestP2})
console.timeEnd('p2')