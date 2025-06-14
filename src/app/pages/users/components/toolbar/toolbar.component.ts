import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.search.emit(searchTerm);
  }

  alertTodo() {
    alert('No desarrollado');
  }
}
