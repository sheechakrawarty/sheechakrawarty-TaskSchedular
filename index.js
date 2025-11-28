const tasks = [];

const elements={
    title: document.getElementById('title'),
    dueDate: document.getElementById('dueDate'),
    effort: document.getElementById('effort'),
    importance: document.getElementById('importance'),
    description: document.getElementById('description'),
    startDate: document.getElementById('startDate'),
    addTask: document.getElementById('addTask'),
    addTaskJson: document.getElementById('addTaskJson'),
    data: document.getElementById('json-task'),
    added: document.getElementById('added'),
    analyzeBtn:document.getElementById('AnalyzeTasks'),
    allTasks: document.getElementById('tasks'),
    algo: document.getElementById('analysis-algo')


}

function validateTask(t){
      if(!t.title || t.title.trim().length===0) return 'Title is missing';
      if(!t.dueDate ) return 'Enter due date';
      if(t.effort==null|| t.effort<0) return 'Effort must be a non-negative number';
      if(t.importance<0 || t.importance>10) return 'Importance must be 1-10';
      return null;
    }

function showAction(action){
    document.getElementById('added').innerText = action;
    document.getElementById('added').className = 'task-item';
    
}

function clearForm(){
    elements.title.value=''; elements.dueDate.value='';
    elements.importance.value='';
    elements.description.value='';
    elements.effort.value='';
}

function addTaskFromForm(){

    const task = {
        title: elements.title.value.trim(),
        dueDate: elements.dueDate.value || null,
        effort: elements.effort.value ? Number(elements.effort.value) : 0,
        importance: elements.importance.value ? Number(elements.importance.value) : 5,
        description: elements.description.value.trim() || ''
      };

    const valid = validateTask(task);

    if(valid){
        showAction(valid);return;
    }
    tasks.push(task);
    showAction('Task added');
    clearForm();
    console.log(tasks);
}  

function addTaskFromJson(){
    const data = elements.data.value.trim();
    if(!data){
        showAction("please enter array of json tasks.."); return;
    }
    try{
        const tss = JSON.parse(data);
        if(!Array.isArray(tss)){
            throw new Error('please enter array');
        }  
        let t=0;      
        for(const ts of tss){
            const task = {
                title: ts.title,
                importance: ts.importance,
                dueDate: ts.dueDate,
                description:ts.description,
                effort: ts.effort
            }
            
            const msg = validateTask(task);
            console.log(msg);
            if(msg){
                showAction(msg);continue;
            }
            tasks.push(task);t++;
        }
        showAction(` ${t} tasks are added`);
    }catch(error){
        showAction("you entered wrong json ...");
        console.log(error);
    }
    
}
function analyzeTasks(){
    if(tasks.length == 0){
        elements.allTasks.innerHTML = 'No Task added..'
    }
    elements.allTasks.innerHTML = '';
    let algo = elements.algo.value;
    if(algo == 'imp')
    tasks.sort((a,b)=> a.importance - b.importance);
    else if(algo == 'eff')
    tasks.sort((a,b)=> a.effort - b.effort);
    else if(algo == 'deadline')
        tasks.sort((a,b)=> new Date(a.dueDate) - new Date(b.dueDate));
    else
    console.log(algo);
    for(const task of tasks){

        
       const t =  document.createElement('div');
       t.className = 'task-box';
       const tit = document.createElement('div');
       tit.className = 'task-title';
       const imp = document.createElement('div');
       imp.className = 'task-imp';
       const eff = document.createElement('div');
       eff.className = 'task-eff';
       const due = document.createElement('div');
       due.className = 'task-due';
       tit.innerHTML = task.title;
       const mid = document.createElement('div');
        
        imp.innerHTML ='importance: '+ task.importance;
        eff.innerHTML = 'Effort : '+ task.effort;
        due.innerHTML = 'Due Date : '+ task.dueDate;
        mid.appendChild(imp);
        mid.appendChild(eff);
        mid.appendChild(due);
        t.appendChild(tit);
        t.appendChild(mid);

        elements.allTasks.appendChild(t);
    }
}

elements.addTask.addEventListener('click', (e)=>{ e.preventDefault(); addTaskFromForm(); });
elements.addTaskJson.addEventListener('click',(e)=>{ e.preventDefault(); addTaskFromJson(); });
elements.analyzeBtn.addEventListener('click',(e)=>{e.preventDefault(); analyzeTasks();});




