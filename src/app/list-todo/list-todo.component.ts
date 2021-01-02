import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})

export class ListTodoComponent implements OnInit {

  todos: Todo[]

  message:string
  // = [

    // new Todo(1, 'learn to dance',false, new Date()),
    // new Todo(2, 'Become an Expert at Angular', false, new Date()),
    // new Todo(3,'visit Norway',false,new Date())
    // {id: 1, description: 'Learn to Dance'},
    // {id: 2, description: 'Become an expert'},
    // {id: 3, description: 'Visit NOrway'}
  // ]

  // todo = {
  //   id: 1,
  //   description: 'learn to code'
  // }

  constructor(
    private todoService: TodoDataService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('dj').subscribe(
      response => {
        console.log(response)
        this.todos = response;
      }
    )
  }

  deleteTodo(id){
    console.log(`delete pressed ${id}`);

    this.todoService.deleteTodos('dj',id).subscribe(
      response=>{
        console.log(response+' deleted')
        this.message=`todo ${id} deleted successfully!`
        this.refreshTodos();
      }
    )
    

  }


  updateTodo(id){
    console.log(`update ${id}`);
    this.router.navigate(['todos',id])
  }

  addTodo(){
    this.router.navigate(['todos',-1])
  }

 

}

export class Todo{
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){

  }
}
