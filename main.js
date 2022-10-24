let text = "Ever since I left the city, you, you, you You and me we just don't get along";

// write function parseText that
  // lowercases everything
  // removes all punctuation (regex, take a look at the replace function)
  // splits the text into an array of words

function parseText(text){
    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    text = text.toLowerCase();
    let arr = text.split(" ");
    return arr;
}

// console.log(parseText(text));

// write function generate word pair that will use parseText

function generateWordPairs(text){
    let obj = {};
    let arr = parseText(text);
    for(let i = 0; i < arr.length - 1; i++){
        let currentWord = arr[i];
        let nextWord = arr[i+1];
        if(obj[currentWord]){
            obj[currentWord].push(nextWord);  
        } else {
            obj[currentWord] = [nextWord]; 
        }
    }
    return obj;
}

let wordPairs = generateWordPairs(text);
// console.log(wordPairs);

// Create a function writeLine that takes a Markov Chain (object) and a length of words n and returns a line of poetry.
  // writeLine will need a helper function that takes a word and randomly chooses a word from its Markov Chain array.
  // The JS methods Math.random() and Math.floor() will be quite helpful here. When a word has no entries in it's Markov Chain, the program should choose a new word and continue the line until it meets the word count

function randomWord(wordArr){
    if(wordArr === undefined){
        return undefined;
    }
    let index = Math.floor(Math.random() * wordArr.length);
    return wordArr[index];
}

function writeLine(obj, n){
    let string = "";

    // if(n === 0){
    //     return string;
    // }

    let words = Object.keys(obj);
    let wordPick = randomWord(words);
    string += wordPick;

    for(let i = 0; i < n - 1; i++){
        let nextWord = randomWord(obj[wordPick]);

        if(nextWord === undefined){
            wordPick = randomWord(words);
            continue;
        } else {
            wordPick = nextWord;
        }
        string += " " + nextWord;
    }
    return string
}

// console.log(writeLine(wordPairs, 10));

function generatePoem(text, lines){
    let obj = generateWordPairs(text);
    for(i = 0; i < lines; i++){
        num = Math.floor(Math.random() * 6 + 4);
        console.log(writeLine(obj, num)); 
    }
}

generatePoem(text, 6);