var index = 0;
var todo = function(config) {
  this.msg = config.msg; // input message
  this.check();
  this.initEvents();
};

todo.prototype.check = function() {
  if(typeof(Storage) !== "undefined") {
    this.build();
    if (localStorage.getItem("todo") !== '') {
      document.getElementById("tasksContainer").innerHTML = localStorage.getItem("todo");
      this.localStorageID();
    }
  } else {
    alert('Your list will not be stored !!');
    this.build();
  }
};

todo.prototype.localStorageID = function() {
  element = document.getElementById("tasksContainer");
  contains = element.getElementsByClassName('task');
  if (JSON.stringify(contains) !== '{}') {
    index = element.lastChild.id;
  }
  return index;
};

todo.prototype.localStorageSet = function() {
  localStorage.setItem('todo', document.getElementById('tasksContainer').innerHTML);
};

todo.prototype.build = function() {
  var body = document.createElement('div');

  if (this.msg === '') { //checking msg
    this.msg = 'What needs to be done?';
  }

  body.className = 'todo';
  body.innerHTML = '<form id="todoForm" onsubmit="event.preventDefault();todo.create();"><input type="text" id="inputTask" name="task" size="40" placeholder="'+this.msg+'"></form><div id="tasksContainer"></div>';
  document.body.appendChild(body);
};

todo.prototype.create = function() {
  ++index;
  var taskvalue = document.getElementsByName('task')[0].value,
  taskplace = document.getElementsByName('task')[0],
  task = '<div class="task" id="'+index+'"><div id="taskMain" class="todoNormal" contenteditable="false" onKeydown="todo.edit(event)">'+taskvalue+'</div><button class="ok">ok</button><button class="close">&times;</button></div>';

  taskplace.value = '';
  taskplace.placeholder='Add your next task';
  if (taskvalue !== '') {
    document.getElementById('tasksContainer').innerHTML += task;
    todo.localStorageSet();
  }else{
    alert("You wrote nothing :P");
  }
};

todo.prototype.edit = function(e) {
  var thisTask = document.getElementById(id).childNodes[0];

  if (thisTask.classList.contains('finished')) {
  } else {
    thisTask.setAttribute("contenteditable","true"); //Edit on
    thisTask.className = 'todoEdit';
  }

  if (thisTask.getAttribute("contenteditable")) { //on enter event
      if (e.keyCode === 13) {
        thisTask.setAttribute("contenteditable","false");
        thisTask.className = 'todoNormal';
        todo.localStorageSet();
     } else {
        document.body.onclick = function(e) { //on click event
            if(e.target !== thisTask) {
              thisTask.setAttribute("contenteditable","false");
              thisTask.className = 'todoNormal';
              todo.localStorageSet();
            }
        };
     }
  }

};

todo.prototype.del = function(e) {
  var thisTask = document.getElementById(id);

  thisTask.remove();
  todo.localStorageSet();
};

todo.prototype.finished = function(e) {
  var thisTask = document.getElementById(id).childNodes[0];

  if (thisTask.classList.contains('todoNormal')) {
    thisTask.className = 'finished';
    todo.localStorageSet();
  } else {
    thisTask.className = 'todoNormal';
    todo.localStorageSet();
  }
};

todo.prototype.initEvents = function() {
  var ul = document.getElementById('tasksContainer');

  ul.addEventListener('dblclick', function(e) {
      if (e.target.id === 'taskMain'){
        id = e.target.parentNode.id;
        todo.edit(id);
      }
  });

  ul.addEventListener('click', function(e) {
      if (e.target.className === 'close'){
        id = e.target.parentNode.id;
        todo.del(id);
      }
  });

  ul.addEventListener('click', function(e) {
      if (e.target.className === 'ok'){
        id = e.target.parentNode.id;
        todo.finished(id);
      }
  });
};