import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos-service.service';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../../types/filterEnum';

@Component({
  selector: 'app-todos-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  todosService = inject(TodosService);

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
}
