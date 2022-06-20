let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let addTask = document.getElementById("add");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    formValidation();
});

let formValidation = ()=>{
    if (textInput.value === "") {
        console.log("Task Name cannot be blank");
        msg.innerHTML = "Task Name cannot be blank"
    }
    else{
        console.log("Success")
        msg.innerHTML = ""
        acceptData()
        add.setAttribute("data-bs-dismiss", "modal")
        add.click();

        (()=>{
             add.setAttribute("data-bs-dismiss", "")
        })()
    }
}

let data = [];

let acceptData = ()=>{
    data.push({
        text: textInput.value,
        date: dateInput.value,
       description: textarea.value,
    })

    localStorage.setItem("data",JSON.stringify(data));
    createTask()
    console.log(data)
}


let createTask = ()=>{
    tasks.innerHTML = ""
    data.map((x,y)=>{
        return (tasks.innerHTML += `
        <div id=${y}>
                    <span class="fw-bold">${x.text}</span>
                    <span class="small text-secondary">${x.date}</span>
                    <p>${x.description}</p>
                    <span class="options">
                        <span onCLick="updateTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="material-symbols-outlined">
                            edit_note
                        </span>
                        <span onClick="deleteTask(this);createTask()" class="material-symbols-outlined">
                            delete_forever
                        </span>
                    </span>
                </div>
        `)
    })
    
    resetForm()
}

let deleteTask = (e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data",JSON.stringify(data));
}

let resetForm = ()=>{
    textarea.value = ""
    textInput.value = ""
    dateInput.value = ""
}

let updateTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    deleteTask(e)

    // if(e.clicked === true){
    //     console.log("click")
    //     e.parentElement.parentElement.remove();
    // }
}


(()=>{
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTask()
})();