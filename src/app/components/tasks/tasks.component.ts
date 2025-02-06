import { Component, Input, OnInit } from '@angular/core';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() text: string = '';

  tasks: Task[] = []

  constructor() { }

  ngOnInit(): void {
  }

  addTask() {
    this.tasks.push({
      id: new Date().getTime(),
      text: this.text,
      completed: false
    });
    this.text = '';
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  completeTask(id: number) {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
  }
}
