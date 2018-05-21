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
  @Output() edit = new EventEmitter();
  editButtonClicked: number;
  isEdit: boolean;

  constructor(
    public server: JsonplaceholderService
  ) { }

  ngOnInit() {
    this.server.editButtonClick.subscribe(id => this.editButtonClicked = id);
    this.server.isEditForm.subscribe(value => this.isEdit = value);
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
  editTask() {
    const updateTask = Object.assign({}, this.task);
    this.edit.emit(updateTask);
  }
}
