# Todo App

A modern, responsive web-based todo application built with HTML, CSS, and JavaScript. Features a clean design with smooth animations and persistent storage.

## Features

- ✅ **Add New Todos** - Create new todo items with a simple form
- 🔄 **Toggle Completion** - Mark todos as complete or incomplete
- ✏️ **Edit Todos** - Click the edit button to modify existing todos
- 🗑️ **Delete Todos** - Remove todos you no longer need
- 🔍 **Filter Todos** - View all, active, or completed todos
- 🧹 **Clear Completed** - Remove all completed todos at once
- 💾 **Persistent Storage** - Your todos are saved in browser localStorage
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- ✨ **Smooth Animations** - Delightful transitions and micro-interactions

## How to Use

1. **Getting Started**
   - Open `index.html` in your web browser
   - The app will load with some sample todos on first visit

2. **Adding Todos**
   - Type your todo in the input field
   - Press Enter or click the "Add Todo" button

3. **Managing Todos**
   - Click the checkbox to mark a todo as complete/incomplete
   - Click the edit button (pencil icon) to modify a todo
   - Click the delete button (trash icon) to remove a todo

4. **Filtering**
   - Use the filter buttons to view:
     - **All**: Show all todos
     - **Active**: Show only incomplete todos
     - **Completed**: Show only completed todos

5. **Keyboard Shortcuts**
   - **Enter**: Save when editing a todo
   - **Escape**: Cancel editing

## Technical Details

### Files Structure
```
├── index.html      # Main HTML structure
├── styles.css      # CSS styles and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

### Technologies Used
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with flexbox, gradients, and animations
- **JavaScript ES6+** - Class-based architecture with modern features
- **Local Storage API** - Data persistence

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Changing Colors
Edit the CSS variables in `styles.css` to customize the color scheme:
- Modify the gradient backgrounds
- Change button colors
- Adjust text colors

### Adding Features
The JavaScript is modular and easy to extend. You can:
- Add due dates
- Implement categories/tags
- Add priority levels
- Include search functionality

## Local Development

Simply open `index.html` in your web browser. No build process or server required!

For development with live reload, you can use any static file server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

## License

This project is open source and available under the MIT License.