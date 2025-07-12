import { Component, inject } from '@angular/core';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'to-do-list',
  standalone: true,
  imports: [],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent { 
  //* Services
  public _task: TaskService = inject(TaskService);
  //? Properties
  public lastRow!: HTMLTableRowElement;

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
  public checkTask(id: string, status: boolean): void {
    this._task.changeTaskStatus(id, status);
  }


}
