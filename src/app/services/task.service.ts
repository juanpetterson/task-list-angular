import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Task } from '../models/Task';
import { FILTER_OPTIONS } from '../constants/filter';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private filterSubject = new BehaviorSubject<string>(FILTER_OPTIONS.ALL);
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor() { }

  getTasks(): Observable<Task[]> {
    return this.filterSubject.pipe(
      switchMap(filter => this.tasksSubject.pipe(
        map(tasks => {
          if (filter === FILTER_OPTIONS.ALL) {
            return tasks;
          } else if (filter === FILTER_OPTIONS.COMPLETED) {
            return tasks.filter(task => task.completed);
          } else if (filter === FILTER_OPTIONS.INCOMPLETE) {
            return tasks.filter(task => !task.completed);
          }
          return tasks;
        })
      ))
    );
  }

  setFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }

  toggleTask(id: number): void {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
      }

      return task;
    });
    this.tasksSubject.next(this.tasks);
  }
}
