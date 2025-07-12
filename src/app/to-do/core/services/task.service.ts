import { effect, Injectable, signal } from '@angular/core';
import * as UUID from 'uuid'
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  //? Signals
  public TaskList = signal<Task[]>(this.loadFromLocalStorage);
  private saveToLocalStorage = effect(() => {
    localStorage.setItem('task', JSON.stringify(this.TaskList()));
  });

  /**
   * Carga la lista de tareas desde el localStorage
   * @returns {Array<Task>}
   */
  private get loadFromLocalStorage(): Array<Task> {
    const TaskList = localStorage.getItem('task');
    return (TaskList ? JSON.parse(TaskList) : []);
  }

  /**
   * Agrega una nueva tarea a 'TaskList'
   * @param {string} task - Titulo Tarea
   * @returns {void}
   */
  public addTask(task: string): void {
    const Uuid: string = UUID.v4();
    this.TaskList.update((items: Task[]) => ([...items, { id: Uuid, title: task, status: false }]));
  }

  /**
   * Elimina una nueva tarea en 'TaskList', según su ID
   * @param {string} id - ID Tarea
   * @returns {void}
   */
  public deleteTask(id: string): void {
    this.TaskList.update((items: Task[]) => {
      return items.filter((item: Task) => (item.id !== id));
    });
  }

  /**
   * Cambia el estado de una tarea según el ID proporcionado
   * @param {string} id - ID Tarea
   * @param {boolean} status - Estado
   * @returns {void}
   */
  public changeTaskStatus(id: string, status: boolean): void {
    this.TaskList.update((items: Task[]) => {
      return items.map((item: Task) => ((item.id === id) ? {...item, status } : item));
    })
  }
}
