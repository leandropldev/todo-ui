import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos-service.service';

@Component({
  selector: 'app-todos-header',
  standalone: true,
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {
  todosService = inject(TodosService);

  description: string = '';

  changeDescription(event: Event): void{
    const target = event.target as HTMLInputElement;
    this.description = target.value;
  }

  addTodo(): void{
    this.todosService.addTodo(this.description);
    this.description = ''
  }
}
