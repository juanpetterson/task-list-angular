import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  @Input() text = '';
  tasks: Task[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.subscription.add(this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addTask() {
    if (!this.text) {
      return;
    }

    const newTask: Task = {
      id: new Date().getTime(),
      name: this.text,
      completed: false
    };

    this.taskService.addTask(newTask);

    this.text = '';
  }

  removeTask(id: number) {
    this.taskService.removeTask(id);
  }

  toggleTask(id: number) {
    this.taskService.toggleTask(id);
  }

  trackByTaskId(_index: number, task: Task): number {
    return task.id;
  }
}
