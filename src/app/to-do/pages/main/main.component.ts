import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { ToDoListComponent } from '../../components/to-do-list/to-do-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, ToDoListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class ToDoMainComponent { 

  //* Services
  public _task: TaskService = inject(TaskService);
 
  /**
   * Agregamos la nueva tarea a la lista
   * @param {string} task - Titulo Tarea
   * @returns {void}
   */
  public addNewTask(task: string): void {
    if(task === '') return;
    this._task.addTask(task);
  }
}
