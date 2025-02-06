import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';
import { FILTER_OPTIONS } from '../../constants/filter';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  @Input() text = '';
  @Input() filter = FILTER_OPTIONS.ALL;
  tasks: Task[] = [];
  confirmationModalOpen: boolean = false;

  private subscription: Subscription = new Subscription();
  private confirmationModalEvent = new EventEmitter<boolean>();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.subscription.add(this.taskService.getTasks().subscribe((tasks: Task[]) => {
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

  openConfirmationModal(id: number) {
    this.confirmationModalOpen = true;

    const modalSubscription = this.confirmationModalEvent.pipe(take(1)).subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.removeTask(id);
      } 
      
      this.closeConfirmationModal();
    })

    this.subscription.add(modalSubscription);
  }

  confirmModal() {
    this.confirmationModalEvent.emit(true);
  }

  cancelModal() {
    this.confirmationModalEvent.emit(false);
  }

  closeConfirmationModal() {
    this.confirmationModalOpen = false;
  }

  removeTask(id: number) {
    this.taskService.removeTask(id);
  }

  toggleTask(id: number) {
    this.taskService.toggleTask(id);
  }

  filterTasks(): void {
    this.taskService.setFilter(this.filter);
  }

  trackByTaskId(_index: number, task: Task): number {
    return task.id;
  }
}
