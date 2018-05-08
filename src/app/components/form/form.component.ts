import { Component, OnInit } from '@angular/core';
import { JsonplaceholderService } from '../../services/jsonplaceholder.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  title: string;

  constructor(
    public server: JsonplaceholderService
  ) { }

  ngOnInit() {
  }
  addTask() {
    const newTask = {
      userId: 1,
      completed: false,
      title: this.title
    };
    this.server.addTask(newTask).subscribe(data => {
      console.log('add task', data);
    });
  }

}
