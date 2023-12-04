const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split('\n');

console.time('p1')
let sumP1 = 0

for (const line of lines) {
    const [others, numbersString] = line.split(' | ')
    const [_, winningString] = others.split(': ')

    const winning = winningString.split(' ').filter((v) => !isNaN(parseInt(v))).map((v) => parseInt(v))
    const numbers = numbersString.split(' ').filter((v) => !isNaN(parseInt(v))).map((v) => parseInt(v))

    const winningCount = numbers.filter((v) => winning.includes(v))

    if (winningCount.length === 0) {
        continue
    }

    sumP1 += Math.pow(2, winningCount.length - 1)
}
console.timeEnd('p1')
console.log({ sumP1 })

// part 2

console.time('p2')
const cardsWon = Array.from({ length: lines.length }).map((_, idx) => ({
    cardId: idx + 1,
    winCount: 1
}))

for (const line of lines) {
    const [others, numbersString] = line.split(' | ')
    const [gameLabel, winningString] = others.split(': ')
    const [id] = gameLabel.split(' ').reverse()

    const gameId = parseInt(id)

    const winning = winningString.split(' ').filter((v) => !isNaN(parseInt(v))).map((v) => parseInt(v))
    const numbers = numbersString.split(' ').filter((v) => !isNaN(parseInt(v))).map((v) => parseInt(v))

    const winningCount = numbers.filter((v) => winning.includes(v)).length

    const item = cardsWon.find((c) => c.cardId === gameId)

    for (let i = 0; i < item.winCount; i++) {
        for (let j = gameId + 1; j <= gameId + winningCount; j++) {
            cardsWon.find((c) => c.cardId === j).winCount++
        }
    }
}
console.timeEnd('p2')
console.log({ sumP2: cardsWon.reduce((acc, item) => acc += item.winCount, 0) })
