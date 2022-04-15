let round = 0;
let tries = 0;
let score = 0;

function roundUp() {
    round++;
   document.getElementById('round').textContent = round.toString();

}

function triesUp() {
    tries++;

}

const game = async () => {
    //https://opentdb.com/api.php?amount=10&category=25&difficulty=easy&type=multiple
    //https://opentdb.com/api_category.php
    let categories = [];
    const data = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')
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
        pTag.innerHTML = cat.category;
        categories.push(cat.category);
        console.log(data.results[0]);
        // console.log(cat);
    })


     do {
         let question = document.createElement('p')
         question.innerHTML = `${data.results[0].question}`
         let answerOneButton = document.createElement('input');
         div.appendChild(question)
         answerOneButton.type = 'radio'
         answerOneButton.value = `${data.results[0].correct_answer}`
         div.appendChild(answerOneButton);



     }while (tries >= 3 || round >= 15)


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