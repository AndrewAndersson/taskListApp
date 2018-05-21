import { Component, OnInit } from '@angular/core';
import { JsonplaceholderService } from '../../services/jsonplaceholder.service';
import { Task } from '../../models/Task';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tasks: Task[];
  editButtonClick: number;

  constructor(
    private server: JsonplaceholderService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.server.getTasks().subscribe((data: Task[]) => {

      if (data) {
        this.tasks = data;
      }
    }, error => {
      console.log(error);
    });
    this.server.newTask.subscribe((data: Task) => {
      if (data['body']) {
        const newTask = Object.assign({}, data['body'], {id: data.id});
        this.tasks.unshift(newTask);
        this.server.updateCount(this.tasks.length);
      }
    });
    this.server.updatingTask.subscribe((task: Task) => {
      if (task['body']) {
        this.tasks = this.tasks.map(item => {
          if (item.id === task.id) {
            item.title = task['body'].title;
          }
          return item;
        });
      }
    });
  }
  deleteTask(id) {
    this.server.deleteTask(id).subscribe((data: Task[]) => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.server.updateCount(this.tasks.length);
      this.flashMessage.show('Delete success!', {
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

  updateTask(task) {
    const updateTask = {
      id: task.id,
      title: task.title,
      completed: !task.completed,
      userId: task.id
    };
    this.server.updateTask(updateTask).subscribe((data: Task[]) => {
      this.tasks = this.tasks.map(item => {
        if (item.id === updateTask.id) {
          item = updateTask;
        } else {
          item = item;
        }
        return item;
      });
    });
  }

  editTask(task: Task) {
    this.server.emitEditTask(task);
    this.server.emitEditButton(task.id);
    this.server.emitIsEditForm(true);
  }

  identify(index) {
    return index;
  }

}
