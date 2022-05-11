/* ******* MODEL ******* */
let todos;

const savedTodos = JSON.parse(localStorage.getItem('todos'));

if(Array.isArray(savedTodos)) {
    todos = savedTodos;
} else {
    todos = [{
        title: 'GET GROCERIES',
        dueDate: '10-5-2022',
        id: 'id1'
    },
    {
        title: 'WASH CARS',
        dueDate: '11-5-2022',
        id: 'id2'
    },
    {
        title: 'DRIVE',
        dueDate: '12-5-2022',
        id: '1d3'
    }];
}

/* ******* VIEW ******* */

const listSection = document.getElementById('list-section')

function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function render(){
    listSection.innerHTML = '';

    todos.forEach(todo => {
        // Creating the main Div
        let divElement = document.createElement('div');
        divElement.setAttribute("class","list-row");
        listSection.appendChild(divElement)

        // Creating the properties of the main Div
        let titleDiv = document.createElement('div');
        let dateDiv = document.createElement('div');
        let deleteButton = document.createElement('button');

        titleDiv.innerText = todo.title;
        dateDiv.innerText = todo.dueDate;
        deleteButton.innerText = 'DELETE';

        deleteButton.onclick = onDelete(todo);

        divElement.appendChild(titleDiv);
        divElement.appendChild(dateDiv);
        divElement.appendChild(deleteButton);

    });
}

setInterval(() => {
    let headerText = document.getElementById('header-text');
    let colors = ['red', 'green', 'blue'];
    let random = Math.floor(Math.random() * colors.length);
    headerText.style.color = colors[random];
    // console.log(random + ' ' + colors[random])
}, 150);

render();

/* ******* CONTROLLER ******* */

function addToDo(title, dueDate) {
    const id = '' + new Date().getTime();

    todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    })

    saveTodo();
}

function deleteToDo(idOfToDo){
    todos = todos.filter(todo => {
        if(todo.id === idOfToDo) {
            return false;
        } else {
            return true;
        }
    })
    saveTodo();
}

function deleteAll(all) {
    if(confirm("Are You Sure You Want To Delete All The TODOs")){
        localStorage.clear();
        render();
    }
}

function onDelete(todoToDelete) {
    return () => {
        deleteToDo(todoToDelete.id);
        render();
      };
}

function getToDO() {
    const title = document.getElementById('title').value.toUpperCase();
    const dueDate = document.getElementById('dueDate').value.toUpperCase();

    if(title == '' && dueDate == ''){
        return;
    } else {
        addToDo(title, dueDate);
        render();
    }
}

// Add To Cart Button
let addToCart = document.getElementById('add-to-cart');
addToCart.addEventListener('click', () => {
    getToDO();
    title.value = '';
    dueDate.value = '';
});
