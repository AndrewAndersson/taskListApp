import { Component, OnInit, ViewChild } from '@angular/core';
import { JasonplaceholderService } from '../../services/jasonplaceholder.service';
import { Task } from '../../models/Task';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  title: string;
  @ViewChild('form') form;
  isEdit: boolean;
  taskId: number;

  constructor(
    private server: JasonplaceholderService,
    private flashmessageses: FlashMessagesService
  ) { }

  ngOnInit() {
    this.server.editingTask.subscribe((data: Task) => {
      if (data.title) {
        this.isEdit = true;
        this.title = data.title;
        this.taskId = data.id;
        this.server.emitChangeTask(this.isEdit);
      }
    });
  }

  addTask() {
    const newTask: Task = {
      userId: 1,
      title: this.title,
      completed: false
    };
    this.server.addTask(newTask).subscribe((data: Task) => {
      this.form.reset();
      this.server.emitNewTask(data);
      this.flashmessageses.show('Success!!!', {
        cssClass: 'alert-success',
        showCloseBtn: true,
        closeOnClick: true,
        timeout: 10000
      });
    }, error => {
      this.flashmessageses.show(error.message, {
        cssClass: 'alert-danger',
        showCloseBtn: true,
        closeOnClick: true,
        timeout: 10000
      });
    });
  }

  editTask() {
    const newTask = {
      id: this.taskId,
      title: this.title,
      userId: 1,
      completed: false
    };
    this.server.editTask(newTask).subscribe((data: Task) => {
      if (data['body']) {
        this.server.emitUpdateTask(data['body']);
        this.form.reset();
        this.isEdit = false;
        this.server.emitChangeTask(this.isEdit);
        this.flashmessageses.show('Update success!!!', {
          cssClass: 'alert-success',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });
      }
    }, error => {
      this.flashmessageses.show(error.message, {
        cssClass: 'alert-danger',
        showCloseBtn: true,
        closeOnClick: true,
        timeout: 10000
      });
    });
  }
  cancelEdit() {
    this.form.reset();
    this.isEdit = false;
    this.server.emitChangeTask(false);
  }

}
