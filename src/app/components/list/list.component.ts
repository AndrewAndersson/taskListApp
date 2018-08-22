import { Component, OnInit} from '@angular/core';
import { JasonplaceholderService } from '../../services/jasonplaceholder.service';
import { Task } from '../../models/Task';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tasks: Task[];
  constructor(
    private server: JasonplaceholderService,
    private flashmessageses: FlashMessagesService
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
        this.server.updateLength(this.tasks.length);
      }
    }, error => {
      console.log(error);
    });
      // Update task
    this.server.updatingTask.subscribe((data: Task) => {
      if (data.title) {
        this.tasks = this.tasks.map( task => {
          if (task.id === data.id) {
            task.title = data.title;
          }
          return task;
        });
      }
    });
  }

  // Edit Task
  editTask(task: Task) {
    this.server.emitEditTask(task);
    this.server.emitButtonclick(task.id);
  }

  // Delete task
  deleteTask(id) {
    this.server.deleteTask(id).subscribe(data => {
      if (data) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.server.updateLength(this.tasks.length);
        this.flashmessageses.show('Delete saccess!!!', {
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

  // Done Undone Task
  doneUndoneTask(todo) {
    this.server.doneUndoneTask(todo.id, !todo.completed).subscribe(data => {
      this.tasks.forEach( task => {
        if (task.id === todo.id) {
          task.completed = !todo.completed;
          this.flashmessageses.show('Change status success', {
            cssClass: 'alert-success',
            showCloseBtn: true,
            closeOnClick: true,
            timeout: 10000
          });
        }
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

  // Track By
  identify(index) {
    return index;
  }

}
