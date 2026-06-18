# Simple Todos - MergerWare Technical Assessment

This is a Meteor.js application built with Blaze templates, based on the official Meteor Blaze Tutorial (Simple Todos), with additional enhancements as required for the MergerWare Software Engineering Intern technical assessment.

## Features

### Base Features (from Simple Todos Tutorial)
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Persistent storage using MongoDB

### Required Enhancements

#### 1. Task Categories
- Tasks can be categorized as: Work, Personal, or Urgent
- Filter tasks by category using the category filter buttons
- Category badges are displayed next to each task with color coding:
  - **Work**: Blue
  - **Personal**: Green
  - **Urgent**: Red

#### 2. Drag-and-Drop Reordering
- Tasks can be reordered by dragging and dropping them within the list
- Drag a task by clicking and holding on any task item
- Drop it onto another task to swap their positions
- Visual feedback is provided during dragging (opacity change and background color)

## Technology Stack

- **Framework**: Meteor.js 2.12
- **Template Engine**: Blaze
- **Database**: MongoDB
- **Language**: JavaScript (ES6+)

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- Meteor.js (install from https://www.meteor.com/developers/install)

### Installation Steps

1. Clone this repository:
```bash
git clone <your-repository-url>
cd mer
```

2. Install dependencies:
```bash
meteor npm install
```

3. Start the application:
```bash
meteor
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### Adding a Task
1. Enter the task text in the input field
2. Select a category from the dropdown (Work, Personal, or Urgent)
3. Click "Add Task"

### Managing Tasks
- **Mark as complete**: Click the checkbox next to a task
- **Delete**: Click the × button on a task
- **Filter by category**: Click the category filter buttons at the top
- **Reorder tasks**: Drag a task and drop it onto another task to swap positions

## Project Structure

```
mer/
├── .meteor/
│   ├── packages          # Meteor packages
│   ├── release           # Meteor release version
│   └── version           # Meteor version
├── simple-todos.js       # Main application logic
├── simple-todos.html     # Blaze templates
├── simple-todos.css      # Styling
├── package.json          # Node dependencies
└── README.md            # This file
```

## Implementation Details

### Task Categories
- Categories are stored in the MongoDB document as a `category` field
- Reactive variable `selectedCategory` filters the displayed tasks
- Category badges use CSS data attributes for color coding

### Drag-and-Drop Reordering
- Uses HTML5 Drag and Drop API
- Each task has an `order` field for position tracking
- Drag events: `dragstart`, `dragend`, `dragover`, `drop`
- Order values are swapped when tasks are dropped on each other

## Notes

This is a basic implementation that meets the assessment requirements. The application demonstrates:
- Meteor.js framework usage
- Blaze template integration
- MongoDB for data persistence
- JavaScript event handling
- HTML5 Drag and Drop API
- Reactive data updates

---

**Submitted for**: MergerWare Software Engineering Intern Technical Assessment
