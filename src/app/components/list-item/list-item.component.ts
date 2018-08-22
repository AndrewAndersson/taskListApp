import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../../models/Task';
import { JasonplaceholderService } from '../../services/jasonplaceholder.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() task: Task;
  @Output() delete = new EventEmitter();
  @Output() changeComplete = new EventEmitter();
  @Output() edit = new EventEmitter();
  isEdit: boolean;
  taskId: number;

  constructor(
    public server: JasonplaceholderService
  ) { }

  ngOnInit() {
    this.server.changingTask.subscribe((isEdit: boolean) => {
        this.isEdit = isEdit;
    });
    this.server.clickingTask.subscribe(id => {
      this.taskId = id;
    });
  }

  editTask() {
    const newTask = Object.assign({}, this.task);
    this.edit.emit(newTask);
    this.taskId = this.task.id;
  }

  deleteOneTask() {
    this.delete.emit(this.task.id);
  }

  doneUndoneOneTask() {
    this.changeComplete.emit({'id': this.task.id, 'completed': this.task.completed});
  }

}
