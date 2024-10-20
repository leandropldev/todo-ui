import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos-service.service';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../../types/filterEnum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  todosService = inject(TodosService);
  editingId: string | null = null;

  visibleTodos = computed(() => {
    const todosList = this.todosService.todosSignal();
    const filter = this.todosService.filterSignal();
    if(filter === FilterEnum.ongoing){
      return todosList.filter(todo => !todo.isCompleted)
    } else if(filter === FilterEnum.completed) {
      return todosList.filter(todo => todo.isCompleted)
    }
    return todosList;
  })

  noTodos = computed(() => this.todosService.todosSignal().length === 0);
  
  isAllTodosSelected = computed(() => 
    this.todosService.todosSignal().every(todo => todo.isCompleted)
  )

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAllTodos(target.checked);
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
}
