import { Component, input, output } from '@angular/core';
import { Todo } from '../../model/todo.types';
import { HighlightCompletedTodoDirective } from '../../directives/highlight-completed-todo';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-todo-items',
  imports: [HighlightCompletedTodoDirective, UpperCasePipe],
  templateUrl: './todo-items.html',
  styleUrl: './todo-items.scss',
})
export class TodoItems {
  todo = input.required<Todo>();
  todoToggled = output<Todo>();
  todoClicked() {
    this.todoToggled.emit(this.todo())
  } 
}
