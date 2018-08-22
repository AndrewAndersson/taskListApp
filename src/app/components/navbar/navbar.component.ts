import { Component, OnInit } from '@angular/core';
import { JasonplaceholderService } from '../../services/jasonplaceholder.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  todoLength: number;
  todoText: string;

  constructor(
    private server: JasonplaceholderService
  ) { }

  ngOnInit() {
    this.server.taskCount.subscribe(length => {
      this.todoLength = length;
    });
    this.server.newTask.subscribe(data => {
      if (data['body']) {
        this.todoText = data['body'].title;
      }
    });
  }

}
