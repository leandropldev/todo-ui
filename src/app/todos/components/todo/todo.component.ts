import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todos-service.service';

@Component({
  selector: 'app-todos-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit, OnChanges{
  @Input({required: true}) todo!: TodoInterface;
  @Input({required: true}) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();

  @ViewChild('descriptionInput') descriptionInput?: ElementRef;

  todosService = inject(TodosService);
  editingDescription: string = '';

  ngOnInit(): void {
    this.editingDescription = this.todo.description;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isEditing'].currentValue){
      setTimeout(() => {
        this.descriptionInput?.nativeElement.focus();
      }, 0)
    }
  }

  changeDescription(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingDescription = value;
  }

  changeTodo(): void {
    this.todosService.updateTodo(this.todo.id, this.editingDescription);
    this.setEditingId.emit(null);
  }

  setTodoInEditingMode(): void {
    this.setEditingId.emit(this.todo.id);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todo.id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todo.id);
  }
}
