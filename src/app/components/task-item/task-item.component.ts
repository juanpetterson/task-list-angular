import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() removeTask = new EventEmitter<number>();
  @Output() toggleTask = new EventEmitter<number>();

  constructor() { }

  handleRemoveTask(id: number): void {
    this.removeTask.emit(id);
  }

  handleToggleTask(id: number): void {
    this.toggleTask.emit(id);
  }
}
