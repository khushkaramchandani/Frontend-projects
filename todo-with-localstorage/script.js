document.addEventListener('DOMContentLoaded',() => {
    

const todoinput=document.getElementById('todo-input');
const addbtn=document.getElementById('add-task-btn');
const list=document.getElementById('todo-list');

let tasks=JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task=> renderTasks(task));

addbtn.addEventListener('click',()=>{
   const tasktext= todoinput.value.trim();
   if(tasktext === "")
    return;
const newTask={
    id: Date.now(),
    text: tasktext,
    completed: false,
}
tasks.push(newTask);
saveTask();
renderTasks(newTask);
todoinput.value=''; //clears the input field
console.log(tasks);
})

function renderTasks(task){
    const li=document.createElement('li');
    li.setAttribute('data-id',task.id);
    if(task.completed){
        li.classList.add('completed');
    }
    li.innerHTML=`
    <span>${task.text}</span>
    <button>delete</button>`;
    li.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON')return;
      task.completed = !task.completed;
      li.classList.toggle('completed');
      saveTask();

    });

    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation(); //stops the event from bubbling up to the li click event
        tasks=tasks.filter(t=>t.id!==task.id);
        li.remove();
        saveTask();
    })
    
    list.appendChild(li);
}

function saveTask(){
    //used to add tasks to local storage
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

})