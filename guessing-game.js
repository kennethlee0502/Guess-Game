document.getElementById('');
class Game {
    constructor(){
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }
    difference(){
        return Math.abs(this.playersGuess - this.winningNumber)
    }
    isLower(){
        return (this.playersGuess < this.winningNumber)
    }
    playersGuessSubmission(num){
        let number = parseInt(num)
        if(number<1 || number>100 ||  isNaN(number)){
            throw 'That is an invalid guess.'
        }
        this.playersGuess = num;
        return this.checkGuess()
    }
    checkGuess(){
        let feedbackText = '';
          
        if(this.winningNumber === this.playersGuess){
            feedbackText = "You Win!"
        }else if (this.pastGuesses.includes(this.playersGuess)) {
            feedbackText = 'You have already guessed that number.';
        }else if(this.pastGuesses.length === 5){
            feedbackText = 'You Lose.'
        }else {
            this.pastGuesses.push(this.playersGuess);
            let diff = this.difference();
            if (diff < 10) feedbackText = "less than 10!";
            else if (diff < 25) feedbackText = "less than 25!";
            else if (diff < 50) feedbackText = "less than 50!";
            else feedbackText = "less than 100!";
          }
          document.querySelector('#guess-feedback > h4').innerHTML = feedbackText;
          console.log(this.pastGuesses.length)
          document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess
    
          return feedbackText;
        }
    
    highOrlow(){
        let feedback = ''
        if(this.playersGuess < this.winningNumber){
        feedback = "Too Low, Guess Higher!"
         }else if(this.playersGuess > this.winningNumber){
        feedback = "Too High, Guess Lower!"
    }
        document.querySelector('#highlow-feedback > h4').innerHTML = feedback;
    return feedback;
    };
        
    provideHint(){
     const hintArray = [this.winningNumber,generateWinningNumber(),generateWinningNumber()]
     let shuffled = shuffle(hintArray)
     document.querySelector('#hint-feedback > h4').innerHTML = shuffled
        return shuffled
    }
}


const generateWinningNumber = () => {
    return Math.floor(Math.random() * (100 - 1 + 1) + 1)
}


const shuffle =(arr)=>{
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
}

function newGame() {
    return new Game(); 
  }

  function playGame() {
    const game = newGame();
   
    document.getElementById('submit').addEventListener('click', function() {
      const playersGuess = +document.querySelector('input').value;
      document.querySelector('input').value = '';
      game.playersGuessSubmission(playersGuess);
      game.highOrlow();
    });

    document.getElementById('hint').addEventListener('click', function() {
        game.provideHint()
        
  });

};

  
  playGame();