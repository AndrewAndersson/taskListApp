import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonplaceholderService } from '../../services/jsonplaceholder.service';
import { Task } from '../../models/Task';
import { FlashMessagesService } from 'angular2-flash-messages';
import { error } from 'util';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  title: string;
  isEdit: boolean;
  currentTaskId: number;
  @ViewChild('form') form;

  constructor(
    public server: JsonplaceholderService,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.server.editingTask.subscribe((task: Task) => {
      if (task.title) {
        this.isEdit = true;
        this.title = task.title;
        this.currentTaskId = task.id;
      }
    });
  }
  addTask() {
    const newTask = {
      userId: 1,
      completed: false,
      title: this.title
    };
    this.server.addTask(newTask).subscribe((data: Task) => {
      console.log('add task', data);
      this.form.reset();
      this.server.emitNewTask(data);
      this.flashMessage.show('Success!', {
        cssClass: 'alert-success',
        showCloseBtn: true,
        closeOnClick: true,
        timeout: 10000
      });
    }, error => {
      this.flashMessage.show(error.message, {
        cssClass: 'alert-danger',
        showCloseBtn: true,
        closeOnClick: true,
        timeout: 10000
      });
    });
  }
  editTask() {
    const updateTask = {
      id: this.currentTaskId,
      userId: 1,
      completed: false,
      title: this.title
    };
    this.server.editTask(updateTask).subscribe((task: Task) => {
      console.log('edit Task ', task);
      this.form.reset();
      this.isEdit = false;
      this.server.emitUpdateTask(task);
      this.server.emitIsEditForm(this.isEdit);
      this.flashMessage.show('edit success!', {
        cssClass: 'alert-success',
        showCloseBtn: true,
        closeOnClick: true,
        timeout: 10000
      });
    }, error => {
      this.flashMessage.show(error.message, {
        cssClass: 'alert-danger',
        showCloseBtn: true,
        closeOnClick: true,
        timeout: 10000
      });
    });
  }
  closeTask() {
    this.form.reset();
    this.isEdit = false;
    this.server.emitIsEditForm(this.isEdit);
  }

}
