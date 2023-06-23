console.log('Hello World!');

let form=document.querySelector(".form");
let text=document.querySelector("#text");
let btn=document.querySelector("#btn");
let ul=document.querySelector("#list");
let alerm=document.querySelector("#alert");
const showM=(text,status)=>{
  alerm.textContent=text;
  alerm.classList.add(`bg-${status}`);
  
  setTimeout(()=>{
    alerm.textContent="";
    alerm.classList.remove(`bg-${status}`)
  },400)
  
}

 const deletTodo=(e)=>{
   const stodo=e.target.parentElement.parentElement.parentElement;
   console.log(stodo)
   ul.removeChild(stodo);
   
   showM("todo deleted","d")
   
   let todos=local();
   
   todos=todos.filter((e)=>e.id !== stodo.id)
   
     localStorage.setItem("mytodos",JSON.stringify(todos));

   
   
 }



const creatTodo=(id,inpvalue)=>{
 const element=document.createElement("li");
  element.id=id;
  element.innerHTML=`<span>${inpvalue}</span>
  <span><button class="btnn" id="delete"><i class="fa-regular fa-trash-can"></i></button></span>`;
  
 // ul.appendChild(element);
  ul.appendChild(element);
  
 const delet=element.querySelector("#delete");
 
 delet.addEventListener("click",deletTodo)
  
}


const local=()=>{
  return localStorage.getItem("mytodos")? JSON.parse(localStorage.getItem("mytodos")):[];
}




const addTodo=(e)=>{
  e.preventDefault();
  const inpvalue=text.value;
  const id=Date.now().toString();
  
  
  creatTodo(id,inpvalue);
  showM("todo added","s");
  
  
  const todos= local();
  
  
  todos.push({id,inpvalue});
  
  localStorage.setItem("mytodos",JSON.stringify(todos));
  
  
  text.value="";
  
  
  
  
}

const loadtodos=()=>{
  
  const todos=local();
  todos.map((todo)=>creatTodo(todo.id,todo.inpvalue))
}



form.addEventListener("submit",addTodo);
window.addEventListener('DOMContentLoaded',loadtodos)