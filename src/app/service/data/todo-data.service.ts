import { TODO_JPA_API_URL } from './../../app.constants';
import { Todo } from './../../list-todo/list-todo.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllTodos(username){
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/users/${username}/todos`)
  }

  deleteTodos(username,id){
    return this.http.delete<Todo>(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`)
  }

  retrieveTodos(username,id){
    return this.http.get<Todo>(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`)
  }

  updateTodos(username,id,todo){
    return this.http.put(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`,todo)
  }

  createTodos(username,todo){
    return this.http.post(`${TODO_JPA_API_URL}/users/${username}/todos`,todo)
  }

}
