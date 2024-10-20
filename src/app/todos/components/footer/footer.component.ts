import { Component, inject } from '@angular/core';
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

  changeFilter(event : Event, filter: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filter);
  }
}
