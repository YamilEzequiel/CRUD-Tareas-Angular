import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<any>{
    return this.httpClient.get(environment.baseUrl+'task')
  }

  createTask(task: any): Observable<any>{
    return this.httpClient.post(environment.baseUrl+'task', task);
  }

  editTask(task: any): Observable<any>{
    return this.httpClient.put(environment.baseUrl+'task/'+task.id, task);
  }

  deleteTask(id: any): Observable<any>{
    return this.httpClient.delete(environment.baseUrl+'task/'+id);
  }

}
