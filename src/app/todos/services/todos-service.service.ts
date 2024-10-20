import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filterEnum';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todosSignal = signal<TodoInterface[]>([]);
  filterSignal = signal<FilterEnum>(FilterEnum.all)
  constructor() { }

  addTodo(description: string): void {
    const newTodo: TodoInterface = {
      description,
      isCompleted: false,
      id: Math.random().toString(16)
    };

    this.todosSignal.update((todos) => [...todos, newTodo]);
  }

  changeFilter(filterName: FilterEnum): void {
    this.filterSignal.set(filterName);
  }

  updateTodo(id: string, description: string): void {
    this.todosSignal.update((todosList) => 
      todosList.map((todo) =>
        (todo.id === id ? { ...todo, description } : todo)
      )
    )
  } 

  removeTodo(id: string): void {
    this.todosSignal.update((todosList) =>
      todosList.filter((todo) => todo.id !== id)
    );
  }

  toggleTodo(id: string): void {
    this.todosSignal.update((todosList) =>
      todosList.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    )
  }

  toggleAllTodos(isCompleted: boolean): void {
    this.todosSignal.update((todosList) =>
      todosList.map((todo) => ({ ...todo, isCompleted: isCompleted }))
    )
  }
}
