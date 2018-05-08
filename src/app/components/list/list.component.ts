import { Component, OnInit } from '@angular/core';
import { JsonplaceholderService } from '../../services/jsonplaceholder.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tasks: Task[];

  constructor(
    private server: JsonplaceholderService
  ) { }

  ngOnInit() {
    this.server.getTasks().subscribe((data: Task[]) => {

      if (data) {
        this.tasks = data;
      }
    }, error => {
      console.log(error);
    });
  }
  deleteTask(id) {
    this.server.deleteTask(id).subscribe((data: Task[]) => {
      this.tasks = this.tasks.filter(task => task.id !== id);
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

  identify(index) {
    return index;
  }

}
