# Project - Romance.js

 For this project you will be building a poem generator with JavaScript. The generator will:

 1. Train itself to write poetry using a Markov Chain
 2. Generate complete poems based on a word corpus (no fill-in-the-blanks)

 Below is an example of a poem generator in action. In this case, the generator was fed the critically acclaimed song Hotline Bling as the word corpus.

```
 writePoem(6);
 /*
 you need my love and me on
 me we just dont need my cell phone late night
 need my love call me on the city
 used to always stay at
 that can only mean
 just dont need my love call me
 */
 ```

## GETTING STARTED
 To start with, let's introduce the concept of a Markov Chain:

 *A Markov Chain is a stochastic process that satisfies the Markov property.* -[Wikipedia](https://en.wikipedia.org/wiki/Markov_chain)

 Let's unpack that a little. Essentially, a process satisfies the Markov property if you can predict the future of the process solely on its present state (the full history is not necessary, the process is "memoryless").

 A [stochastic](https://en.wikipedia.org/wiki/Stochastic) process is one that is unpredictable because of a random variable. Such a process can be analyzed statistically, but may not be predicted precisely.

## EXAMINING THE POETRY GENERATOR
 The poetry generator above works like this:

 First, a word corpus is analyzed to produce a Markov Chain. In this case, the lyrics for Hotline Bling are analyzed, and the Markov Chain takes the form of an object, with a property for each word in the song.

 Each key is a word from the song, and the corresponding value is an array with all the words that ever follow that word in the corpus (song). So for example, the word 'hotline' is associated with an array of eight words (all 'bling'). The word 'feel' is associated with the array `["left", "like"]`.

## USING OUR MARKOV CHAIN
 Now this object can be used to generate a poem. We start with a single word and ask: "what word should come next?". The Markov Chain provides a list of every possible subsequent word. If our word was "hotline" the only possible word to follow would be "bling". If the word was "feel", there would be two possibilities, "left" and "like". We randomly choose one to be the subsequent word.

 So our current word forms our process's "present state" and that state can be used to predict what the subsequent word is, not necessarily precisely, but certainly statistically.

## BUILDING OUR OWN GENERATOR
 Let's get down to work building our own poetry generator.

 We know that the first step is building a Markov Chain out of a word corpus. So to start, write a function that accepts a string and returns an array of the words in the string, uniformly formatted with no numbers or punctuation.

 ```
 let text = "Ever since I left the city, you, you, you You and me we just don't get along";

 parseText(text);
 // -> [ 'ever', 'since', 'i', 'left', 'the', 'city', 'you', 'you', 'you', 'you', 'and', 'me', 'we', 'just', 'dont', 'get', 'along' ]
 ```

 Now we need to write a function that uses that array of words to generate a Markov Chain. Remember, for our project the Markov Chain will be a dictionary of all the unique words in our corpus, and an array of all the words that follow it.

 ```
 let text = "Ever since I left the city, you, you, you You and me we just don't get along";

 let wordPairs = generateWordPairs(text);
console.log(wordPairs);
 /* ->
 { ever: [ 'since' ],
   since: [ 'i' ],
   i: [ 'left' ],
   left: [ 'the' ],
   the: [ 'city' ],
   city: [ 'you' ],
   you: [ 'you', 'you', 'you', 'and' ],
   and: [ 'me' ],
   me: [ 'we' ],
   we: [ 'just' ],
   just: [ 'dont' ],
   dont: [ 'get' ],
   get: [ 'along' ] }
 */
 ```

 Now when we access `wordPairs['you']` we'll get all the words following 'you' in the corpus.

 We now have two valuable pieces of data: the corpus text and a Markov Chain representation of it.

 Create a function `writeLine` that takes a Markov Chain (object) and a length of words n and returns a line of poetry.

 `writeLine` will need a helper function that takes a word and randomly chooses a word from its Markov Chain array. The JS methods [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) and [Math.floor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) will be quite helpful here. When a word has no entries in it's Markov Chain, the program should choose a new word and continue the line until it meets the word count.

## PUTTING IT ALL TOGETHER
 With our `writeLine` function, we can now write our broader `generatePoem` function. Set up the function to accept two parameters: a word corpus and a number of lines. Inside the function, use the functions we've written to generate a poem with the number of lines specified.

## FURTHER IMPROVEMENTS
 As it is, you've probably "hardcoded" a number of words for each line. Refactor your code to be more dynamic. Two possible approaches:

 1. Set up `generatePoem` to accept a third parameter that specifies the number of words in each line.
 2. Set up `generatePoem` to pass a random number (within a reasonable range) into `writeLine`.