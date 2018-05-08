import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JsonplaceholderService {

  configUrl = 'https://jsonplaceholder.typicode.com/todos/';

  constructor(
    public http: HttpClient
  ) { }
  getTasks() {
    return this.http.get(this.configUrl);
  }
  addTask(task: Task) {
    return this.http.post(this.configUrl, {
      body: task
    });
  }
  updateTask(task: Task) {
    return this.http.put(this.configUrl + task.id, {
      body: task
    });
  }
  deleteTask(id: number) {
    return this.http.delete(this.configUrl + id);
  }

}
