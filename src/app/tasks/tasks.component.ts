import {Component, OnInit} from '@angular/core';
import {TasksService} from "../tasks.service";
import {Task} from "../task";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public tasks: Task[] = [];
  public newTask: Task = {};
  public isProcessing = false;

  constructor(
    private tasksService: TasksService
  ) {
  }

  ngOnInit() {
    this.isProcessing = true;
    this.tasksService.index().subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.isProcessing = false;
  }

  addTask() {
    if (this.canAddTask()) {
      return;
    }
    this.newTask.completed = false;
    this.newTask.archived = false;
    this.tasks.unshift(this.newTask);

    this.tasksService.post(this.newTask).subscribe(() => {
      this.newTask = {};
      this.ngOnInit();
    });
  }

  handleChange(task: Task) {
    this.tasksService.put(task).subscribe({
      error: err => {
        alert(err);
        this.ngOnInit();
      }
    });
  }

  archiveCompleted() {
    const observables: Observable<any>[] = [];
    for (const task of this.tasks) {
      if (!task.completed) {
        continue;
      }

      task.archived = true;
      observables.push(this.tasksService.put(task));
    }

    forkJoin(observables).subscribe(() => {
      this.ngOnInit();
    });
  }

  canArchiveCompleted() {
    for (const task of this.tasks) {
      if (task.completed) {
        return true;
      }
    }

    return false;
  }

  canAddTask() {
    return this.newTask.title !== undefined && this.newTask.title !== '';
  }
}
