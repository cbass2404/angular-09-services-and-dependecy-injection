import { Component, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');
  public tasks() {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService
          .getTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService
          .getTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService
          .getTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.getTasks();
    }
  }

  constructor(private tasksService: TasksService) {}

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
