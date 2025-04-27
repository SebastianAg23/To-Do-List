import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class ToDoMainComponent { 

  //* Services
  public _task: TaskService = inject(TaskService);
  //? Properties
  public lastRow!: HTMLTableRowElement;

  /**
   * Agregamos la nueva tarea a la lista
   * @param {string} task - Titulo Tarea
   * @returns {void}
   */
  public addNewTask(task: string): void {
    if(task === '') return;
    this._task.addTask(task);
  }

  /**
   * Eliminamos la tarea según el ID
   * @param {string} id - ID Tarea
   * @returns {void}
   */
  public deleteTask(id: string): void {
    this._task.deleteTask(id);
  }
  
  /**
   * Marcamos la tarea como 'Finalizado' según el ID.
   * @param {string} id - ID Tarea
   * @returns {void}
   */
  public checkTask(id: string): void {
    this._task.finishTask(id);
  }

  /**
   * Marcamos como 'Seleccionado' una fila de la tabla
   * @param {HTMLTableRowElement} element 
   * @returns {void}
   */
  public selectRow(element: HTMLTableRowElement): void {
    if(this.lastRow !== undefined) this.lastRow.className = '';
    if(this.lastRow !== element) element.className = 'table-active';
    this.lastRow = element;
  }
}
