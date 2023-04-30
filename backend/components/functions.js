const fs = require('fs');

function initWordList(wordListPath) {
    const wordList = fs.readFileSync(wordListPath).toString().split("\r\n");
    return wordList
}

function charCounter(words) {
    var chars = [];
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < 5; j++) {
            chars.push(words[i][j]);
        }
    }

    var charCount = {};
    chars.forEach(char => {
        if (charCount[char]) {
            charCount[char]++;
        } else {
            charCount[char] = 1;
        }
    });
    var charsObj = Object.entries(charCount).map(([char, count]) => ({ char, count })).sort((a, b) => b.count - a.count)
    return charsObj;
}

function validate(guess, result) {
    var validity = true;
    if (!/^[a-z]+$/.test(guess) || guess.length != 5) {
        validity = false;
    }
    if (!/^[bgy]+$/.test(result) || result.length != 5) {
        validity = false;
    }
    return validity;
}

function checkWord(word, guess, result) {
    var addWord = true;
    for (let i = 0; i < 5; i++) {
        switch (result[i]) {
            case 'b':
                for (let j = 0; j < 5; j++) {
                    if (result[j] != 'g' && (word[j] == guess[i])) {
                        addWord = false;
                    }
                }
                break;
            case 'y':
                if (word[i] == guess[i]) {
                    addWord = false;
                }
                var contains = false;
                for (let j = 0; j < 5; j++) {
                    if (result[j] != 'g' && (word[j] == guess[i])) {
                        contains = true;
                    }
                }
                if (!contains) {
                    addWord = false;
                }
                break;
            case 'g':
                if (word[i] != guess[i]) {
                    addWord = false;
                }
                break;
            default:
                console.error();
        }
    }
    return addWord;
}

function wordlSolver(guess, result, words) {
    var newWordList=[];

    for (let i = 0; i < words.length; i++) {
        var addWord = checkWord(words[i], guess, result);
        if (addWord) {newWordList.push(words[i]);}
    }

    return newWordList
}

module.exports = { initWordList, wordlSolver, validate, charCounter };

