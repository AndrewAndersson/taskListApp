import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/Task';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class JasonplaceholderService {
  configUrl = 'https://jsonplaceholder.typicode.com/todos/';
  private taskSource = new BehaviorSubject<Task>({id: 0, title: '', userId: 0, completed: false});
  newTask  = this.taskSource.asObservable();
  private todoLengthSource = new BehaviorSubject(200);
  taskCount = this.todoLengthSource.asObservable();
  private editTaskSource =  new BehaviorSubject<Task>({id: 0, title: '', userId: 0, completed: false});
  editingTask = this.editTaskSource.asObservable();
  private updateTaskSource = new BehaviorSubject<Task>({id: 0, title: '', userId: 0, completed: false});
  updatingTask = this.updateTaskSource.asObservable();
  private changeTaskSource = new BehaviorSubject(false);
  changingTask = this.changeTaskSource.asObservable();
  private buttonClickSource = new BehaviorSubject(0);
  clickingTask = this.buttonClickSource.asObservable();


  constructor(
    private http: HttpClient
  ) { }
  emitNewTask(task: Task) {
    this.taskSource.next(task);
  }
  updateLength (length: number) {
    this.todoLengthSource.next(length);
  }
  emitEditTask(task: Task) {
    this.editTaskSource.next(task);
  }
  emitUpdateTask(task: Task) {
    this.updateTaskSource.next(task);
  }
  emitChangeTask(isEdit: boolean) {
    this.changeTaskSource.next(isEdit);
  }
  emitButtonclick(id: number) {
    this.buttonClickSource.next(id);
  }
  getTasks() {
    return this.http.get(this.configUrl);
  }
  deleteTask (id: number) {
    return this.http.delete(this.configUrl + id);
  }
  addTask(task: Task) {
    return this.http.post(this.configUrl, {
      body: task
    });
  }
  doneUndoneTask(id: number, completed: boolean) {
    return this.http.patch(this.configUrl + id, {'completed': completed});
  }
  editTask(task: Task) {
    return this.http.put(this.configUrl + task.id, {
      body: task
    });
  }

}
