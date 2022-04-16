let round = 0;
let tries = 0;
let score = 0;

let difficulty = 'easy'

function roundUp() {
    round++;
   document.getElementById('round').textContent = round.toString();

}

function triesUp() {
    tries++;

}

const setQuestion = async () => {
    //https://opentdb.com/api.php?amount=1&category=25&difficulty=easy&type=multiple
    //https://opentdb.com/api_category.php
    let categories = [];
    let answers = [];

    const data = await fetch(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple`)
        .then((response) => {
            console.log('response: ', response);
            if (response.status !== 200) {
                console.log('Something went wrong');
            }
            return response.json();
        });




    data.results.forEach((cat) =>{
        const div = document.getElementById('div');
        const pTag = document.createElement('p');
        div.appendChild(pTag);
        pTag.innerHTML = 'Category: ' +  cat.category;
        categories.push(cat.category);
        console.log(cat.correct_answer);
        answers.push(cat.correct_answer);
        cat.incorrect_answers.forEach((inAnswer) => {
            answers.push(inAnswer)
        });
        shuffleAnswers(answers)
        //console.log(data.results[0]);
        console.log(answers);
        // console.log(cat);

        let question = document.createElement('p')
        question.id = 'question';
        question.innerHTML = `${data.results[0].question}`
        div.appendChild(question)

        let answerOneButton = document.createElement('input');
        answerOneButton.type = 'radio'
        let answerOneLabel = document.createElement('label')
        answerOneLabel.innerText = `${answers[0]}`
        answerOneButton.value = `${answers[0]}`
        answerOneButton.id = 'answerOneButton';

        let answerTwoButton = document.createElement('input');
        answerTwoButton.type = 'radio';
        let answerTwoLabel = document.createElement('label')
        answerTwoLabel.innerText = `${answers[1]}`
        answerTwoButton.value = `${answers[1]}`

        let answerThreeButton = document.createElement('input');
        answerThreeButton.type = 'radio'
        let answerThreeLabel = document.createElement('label')
        answerThreeLabel.innerText = `${answers[2]}`
        answerThreeButton.value = `${answers[2]}`

        let answerFourButton = document.createElement('input');
        answerFourButton.type = 'radio'
        let answerFourLabel = document.createElement('label')
        answerFourLabel.innerText = `${answers[3]}`
        answerFourButton.value = `${answers[3]}`




        div.appendChild(answerOneButton);
        div.appendChild(answerOneLabel);

        div.appendChild(answerTwoButton);
        div.appendChild(answerTwoLabel);

        div.appendChild(answerThreeButton);
        div.appendChild(answerThreeLabel);

        div.appendChild(answerFourButton);
        div.appendChild(answerFourLabel);






    });



}





function game(){

    setQuestion()




    do {
        

    } while (round >= 15)







}

const Menu = async () => {

    const container = document.createElement('div');
    container.className = 'menuContainer';
    const select = document.createElement('select');
    const data = await fetch('https://opentdb.com/api_category.php')
        .then((response) => {
            console.log('response: ', response);
            if (response.status !== 200) {
                console.log('Something went wrong');
            }
            return response.json();
        });


    const waste = document.createElement('option');
    select.appendChild(waste);
    console.log('data: ', data);
    data.trivia_categories.forEach((cat) => {
        console.log('cat: ', cat);
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        select.appendChild(option);
    });
    container.appendChild(select);
    return container;
}


function scoreUp(round, score){
    let calcScore = score * round;
    return calcScore
}

function checkAnswer(guess, answer){

    if(guess === answer){
        scoreUp()
        roundUp()
        setQuestion()
    } else {
        tries++;
        setQuestion()
    }



}

function shuffleAnswers(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
