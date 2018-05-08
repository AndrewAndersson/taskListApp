import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../../models/Task';
import { JsonplaceholderService } from '../../services/jsonplaceholder.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() task: Task;
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(
    public server: JsonplaceholderService
  ) { }

  ngOnInit() {
  }

  deleteOneTask() {
   this.delete.emit(this.task.id);
  }
  updateOneTask() {
    this.update.emit({
      completed: this.task.completed,
      id: this.task.id,
      title: this.task.title,
      userId: this.task.userId
    });
  }

}
