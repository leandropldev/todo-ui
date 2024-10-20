import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos-service.service';
import { FilterEnum } from '../../types/filterEnum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  todosService = inject(TodosService);
  filterSignal = this.todosService.filterSignal;
  filterEnum = FilterEnum;
  activeCount = computed(() => {
    return this.todosService.todosSignal().filter(
      (todo) => !todo.isCompleted
    ).length;
  });
  noTodos = computed(() => this.todosService.todosSignal().length === 0);
  itemsText = computed(() => `todo${this.activeCount() !== 1 ? 's' : ''} on going!`);

  changeFilter(event : Event, filter: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filter);
  }
}
