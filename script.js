class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.editingId = null;
        
        this.initializeElements();
        this.bindEvents();
        this.render();
    }

    initializeElements() {
        this.todoForm = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.emptyState = document.getElementById('emptyState');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
    }

    bindEvents() {
        // Form submission
        this.todoForm.addEventListener('submit', (e) => this.handleAddTodo(e));
        
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e));
        });
        
        // Clear completed button
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    handleAddTodo(e) {
        e.preventDefault();
        const text = this.todoInput.value.trim();
        
        if (text) {
            this.addTodo(text);
            this.todoInput.value = '';
            this.todoInput.focus();
        }
    }

    handleFilterChange(e) {
        const filter = e.target.dataset.filter;
        this.setFilter(filter);
    }

    handleKeydown(e) {
        // Escape key to cancel editing
        if (e.key === 'Escape' && this.editingId) {
            this.cancelEdit();
        }
    }

    addTodo(text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.todos.unshift(todo);
        this.saveTodos();
        this.render();
        
        // Add animation class
        setTimeout(() => {
            const todoElement = document.querySelector(`[data-id="${todo.id}"]`);
            if (todoElement) {
                todoElement.style.animation = 'slideIn 0.3s ease-out';
            }
        }, 10);
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        if (todoElement) {
            todoElement.classList.add('removing');
            setTimeout(() => {
                this.todos = this.todos.filter(t => t.id !== id);
                this.saveTodos();
                this.render();
            }, 300);
        }
    }

    editTodo(id) {
        if (this.editingId) {
            this.cancelEdit();
        }
        
        this.editingId = id;
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        const todoText = todoElement.querySelector('.todo-text');
        const todo = this.todos.find(t => t.id === id);
        
        todoElement.classList.add('editing');
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'todo-edit-input';
        input.value = todo.text;
        
        input.addEventListener('blur', () => this.saveEdit(id, input.value));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.saveEdit(id, input.value);
            } else if (e.key === 'Escape') {
                this.cancelEdit();
            }
        });
        
        todoText.insertAdjacentElement('afterend', input);
        input.focus();
        input.select();
    }

    saveEdit(id, newText) {
        const text = newText.trim();
        if (text) {
            const todo = this.todos.find(t => t.id === id);
            if (todo) {
                todo.text = text;
                this.saveTodos();
            }
        }
        
        this.editingId = null;
        this.render();
    }

    cancelEdit() {
        this.editingId = null;
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.render();
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        
        if (completedCount > 0) {
            // Add removing animation to completed items
            const completedElements = document.querySelectorAll('.todo-item.completed');
            completedElements.forEach(el => el.classList.add('removing'));
            
            setTimeout(() => {
                this.todos = this.todos.filter(t => !t.completed);
                this.saveTodos();
                this.render();
            }, 300);
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        const activeTodos = this.todos.filter(t => !t.completed);
        const completedTodos = this.todos.filter(t => t.completed);
        
        // Update todo count
        const count = activeTodos.length;
        this.todoCount.textContent = `${count} ${count === 1 ? 'item' : 'items'} left`;
        
        // Show/hide clear completed button
        this.clearCompletedBtn.style.display = completedTodos.length > 0 ? 'block' : 'none';
        
        // Show/hide empty state
        this.emptyState.style.display = filteredTodos.length === 0 ? 'block' : 'none';
        this.todoList.style.display = filteredTodos.length === 0 ? 'none' : 'block';
        
        // Render todo items
        this.todoList.innerHTML = filteredTodos.map(todo => this.createTodoHTML(todo)).join('');
        
        // Bind events for todo items
        this.bindTodoEvents();
    }

    createTodoHTML(todo) {
        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" data-action="toggle"></div>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="edit-btn" data-action="edit" title="Edit todo">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="m18.5 2.5 3 3L13 14l-4 1 1-4 8.5-8.5z"></path>
                        </svg>
                    </button>
                    <button class="delete-btn" data-action="delete" title="Delete todo">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </li>
        `;
    }

    bindTodoEvents() {
        this.todoList.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            const todoItem = e.target.closest('.todo-item');
            
            if (!todoItem || !action) return;
            
            const id = parseInt(todoItem.dataset.id);
            
            switch (action) {
                case 'toggle':
                    this.toggleTodo(id);
                    break;
                case 'edit':
                    this.editTodo(id);
                    break;
                case 'delete':
                    this.deleteTodo(id);
                    break;
            }
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    loadTodos() {
        try {
            const stored = localStorage.getItem('todos');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading todos from localStorage:', error);
            return [];
        }
    }

    saveTodos() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Error saving todos to localStorage:', error);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

// Add some sample todos on first visit
if (!localStorage.getItem('todos')) {
    const sampleTodos = [
        { id: 1, text: 'Welcome to your Todo App! 🎉', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: 'Click on a todo to mark it as complete', completed: false, createdAt: new Date().toISOString() },
        { id: 3, text: 'Double-click the edit button to modify a todo', completed: false, createdAt: new Date().toISOString() },
        { id: 4, text: 'This is a completed todo', completed: true, createdAt: new Date().toISOString() },
    ];
    
    localStorage.setItem('todos', JSON.stringify(sampleTodos));
}