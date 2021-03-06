import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from './../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../list-todo/list-todo.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todaysDate = new Date();
  time = new Date();


  id:number
  todo:Todo

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.todo = new Todo(this.id,"",false,new Date());

    if(this.id !=-1){
      this.todoService.retrieveTodos('dj',this.id).subscribe(
        data => this.todo = data
      )
    }

    setInterval(() => {
      this.time = new Date();
   }, 1000);

  }

  saveTodo() {
    if(this.id == -1) {
      //Create todo
      this.todoService.createTodos('dj', this.todo).subscribe(
        data=> {
          console.log(data)
          this.router.navigate(['todos'])
        }
      )

    }else {
      this.todoService.updateTodos('dj', this.id,this.todo).subscribe(
        data=> {
          console.log(data)
          this.router.navigate(['todos'])
        }
      )
    }
  }

  trueFunc(){
    this.todo.done = true
  }
  falseFunc(){
    this.todo.done = false;
  }

}
