import { Injectable } from '@angular/core';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private name = '@task_list';

  constructor() { }

  public set(key: string, data: Task[]) {
    const newKey = this.name.concat('_').concat(key);
    localStorage.setItem(newKey, JSON.stringify(data));
  }

  public get(key: string) {
    const newKey = this.name.concat('_').concat(key);
    return JSON.parse(localStorage.getItem(newKey));
  }

  public remove(key: string) {
    const newKey = this.name.concat('_').concat(key);
    return localStorage.removeItem(newKey);
  }
}
