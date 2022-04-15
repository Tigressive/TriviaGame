let round = 0;
let tries = 0;

function roundUp() {
    round++;
   document.getElementById('round').textContent = round.toString();

}

function triesUp() {
    tries++;

}

function game(){

    roundUp();

}



const Menu = async () =>
{
    const container = document.createElement('div');
    container.className = 'menuContainer';
    const select = document.createElement('select');
    const data = await fetch('https://opentdb.com/api_category.php')
        .then((response) => {
            console.log('response: ', response);
            if (response.status !== 200)
            {
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
