import { Component, inject, signal } from '@angular/core';
import { Todos as TodosService } from '../services/todos';
import { Todo } from '../model/todo.types';
import { catchError, single } from 'rxjs';
import { TodoItems } from '../components/todo-items/todo-items';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos-pipe';

@Component({
  selector: 'app-todos',
  imports: [TodoItems, FormsModule, FilterTodosPipe],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos {
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal('');

  ngOnInit(): void {
    this.todoService
      .getTodosFromAPI()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((todos) => this.todoItems.set(todos));
  }

  updateTodoItem(todoItem: Todo) {
    this.todoItems.update((todos) => {
      return todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    });
  }
}
