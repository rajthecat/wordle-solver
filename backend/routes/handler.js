const express = require('express');
const functions = require('../components/functions');
const router = express.Router();
var cors = require('cors')

router.use(cors())

const wordListPath = './data/wordlist.txt';

router.post('/wordl', (req, res) => {
    const json = req.body;
    //console.log(json);
    var message = "";
    
    if (json.guess && json.result && json.words) {
        if (functions.validate(json.guess, json.result)) {
            message = "";
            var newWordList = functions.wordlSolver(json.guess, json.result, json.words);
        } else {
            message = "guess must be letters only. result must be _b_lack, _y_ello, _g_reen";
            newWordList = json.words
        }
    } else if (json.words) {
        message = "no change";
        newWordList = json.words
    } else {
        message = "reset";
        newWordList = functions.initWordList(wordListPath);
    }
    var letters = functions.charCounter(newWordList);

    console.log(message)
    const str = {
        "words": newWordList,
        "message": message,
        "letters": letters
    };
    console.log(JSON.stringify(str));
    res.end(JSON.stringify(str));
});

router.get('/wordl', (req, res) => {
    var wordList = functions.initWordList(wordListPath);
    var message = "initialized";
    console.log(message)
    var letters = functions.charCounter(wordList);
    const str = {
        "words": wordList,
        "message": message,
        "letters": letters
    };
    res.end(JSON.stringify(str));
});

module.exports = router;