const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const lines = input.split('\n');

console.time('p1')

const strengths = [
    'high card', // 0
    'one pair', // 1
    'two pairs', // 2
    'three of a kind', // 3
    'full house', // 4
    'four of a kind', // 5
    'five of a kind', // 6
]
let cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse()

function getHandStrength(hand) {
    const cards = hand.split('')
    const cardsCount = cards.reduce((acc, card) => {
        if (acc[card]) {
            return { ...acc, [card]: acc[card] + 1 }
        }

        return { ...acc, [card]: 1 }
    }, {})

    if (Object.keys(cardsCount).length === cards.length) {
        return { strength: strengths.indexOf('high card'), cards }
    }

    if (Object.keys(cardsCount).length === 4) {
        return { strength: strengths.indexOf('one pair'), cards }
    }

    if (Object.keys(cardsCount).length === 3) {
        if (Object.values(cardsCount).some((x) => x === 3)) {
            return { strength: strengths.indexOf('three of a kind'), cards }
        }
        return { strength: strengths.indexOf('two pairs'), cards }
    }

    if (Object.keys(cardsCount).length === 2) {
        if (Object.values(cardsCount).some((x) => x === 3)) {
            return { strength: strengths.indexOf('full house'), cards }
        }
        return { strength: strengths.indexOf('four of a kind'), cards }
    }

    if (Object.keys(cardsCount).length === 1) {
        return { strength: strengths.indexOf('five of a kind'), cards }
    }
}

function compareHands({ hand: handA }, { hand: handB }) {
    // lowest got first
    const aStrength = getHandStrength(handA)
    const bStrength = getHandStrength(handB)

    if (aStrength.strength > bStrength.strength) {
        return 1
    }

    if (aStrength.strength === bStrength.strength) {
        for (let i = 0; i < aStrength.cards.length; i++) {
            const cardStrengthA = cards.indexOf(aStrength.cards[i])
            const cardStrengthB = cards.indexOf(bStrength.cards[i])

            if (cardStrengthA > cardStrengthB) {
                return 1
            } else if (cardStrengthA < cardStrengthB) {
                return -1
            }
        }
        return 0
    }

    return -1
}

const data = lines.map((line) => ({
    hand: line.split(' ').at(0),
    bid: parseInt(line.split(' ').at(1)),
}))

console.log('p1', data.sort(compareHands).reduce((acc, { bid }, index) => acc += bid * (index + 1), 0))

console.timeEnd('p1')

/// part 2

console.time('p2')

const cards2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reverse()

function getHandStrength2(hand) {
    const cards = hand.split('')
    const cardsCount = cards.reduce((acc, card) => {
        if (acc[card]) {
            return { ...acc, [card]: acc[card] + 1 }
        }

        return { ...acc, [card]: 1 }
    }, {})
    const maxCards= Object.keys(cardsCount).length
    const jokersInHand = cardsCount['J'] ?? 0

    hand === 'JKJ5J' && console.log(maxCards, cardsCount)

    const strength = (v) => Math.min(strengths.indexOf(v) + jokersInHand, strengths.length - 1)

    if (maxCards === cards.length) {
        return { strength: strength('high card'), cards }
    }

    if (maxCards === 4) {
        return { strength: strength('one pair'), cards }
    }

    if (maxCards === 3) {
        if (Object.entries(cardsCount).some(([k,  v]) => v === 3 && k !== 'J')) {
            return { strength: strength('three of a kind'), cards }
        }
        return { strength: strength('two pairs'), cards }
    }

    if (maxCards === 2) {
        if (Object.entries(cardsCount).some(([k,  v]) => v === 3 && k !== 'J')) {
            hand === 'JKJ5J' && console.log('is full house')
            return { strength: strength('full house'), cards }
        }
        hand === 'JKJ5J' && console.log('is four of a kind')
        return { strength: strength('four of a kind'), cards }
    }

    if (maxCards === 1) {
        return { strength: strengths.indexOf('five of a kind'), cards }
    }

    return { strength: strength('five of a kind'), cards }
}

function compareHands2({ hand: handA }, { hand: handB }) {
    // lowest got first
    const aStrength = getHandStrength2(handA)
    const bStrength = getHandStrength2(handB)

    handA === 'JKJ5J' &&console.log(handA, aStrength, handB, bStrength)
    if (aStrength.strength > bStrength.strength) {
        return 1
    }

    if (aStrength.strength === bStrength.strength) {
        for (let i = 0; i < aStrength.cards.length; i++) {
            const cardStrengthA = cards2.indexOf(aStrength.cards[i])
            const cardStrengthB = cards2.indexOf(bStrength.cards[i])

            if (cardStrengthA > cardStrengthB) {
                return 1
            } else if (cardStrengthA < cardStrengthB) {
                return -1
            }
        }
        return 0
    }

    return -1
}

const data2 = lines.map((line) => ({
    hand: line.split(' ').at(0),
    bid: parseInt(line.split(' ').at(1)),
}))

console.log('p2', data2.sort(compareHands2).slice(-25), data2.sort(compareHands2).reduce((acc, { bid }, index) => acc += bid * (index + 1), 0))

console.timeEnd('p2')