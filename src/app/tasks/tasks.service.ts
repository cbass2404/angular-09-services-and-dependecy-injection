import { Injectable } from '@angular/core';
import type { Task, TaskStatus } from './task.model';
import { LoggingService } from './logging.service';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Array<Task> = [];

  constructor(private loggingService: LoggingService) {}

  addTask(taskData: { title: string; description: string }) {
    this.tasks.push({
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    });
    this.loggingService.log(`ADDED TASK WITH TITLE' ${taskData.title}`);
  }

  removeTask(id: string) {
    const filteredTasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = filteredTasks;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const newTasks = this.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status };
      } else {
        return task;
      }
    });
    this.tasks = newTasks;
    this.loggingService.log(`CHANGE TASK STATUS TO' ${status}`);
  }

  getTasks() {
    return this.tasks;
  }

  getTask(id: string) {
    return this.tasks.find((task) => task.id === id);
  }
}
