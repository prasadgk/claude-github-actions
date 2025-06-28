import { Task, List, Tag } from '@/types';
import { sampleTasks } from '@/utils/sampleData';

const STORAGE_KEYS = {
  TASKS: 'todo_tasks',
  LISTS: 'todo_lists',
  TAGS: 'todo_tags',
};

class TodoService {
  private getFromStorage<T>(key: string): T[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage<T>(key: string, data: T[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Task operations
  getTasks(): Task[] {
    const tasks = this.getFromStorage<Task>(STORAGE_KEYS.TASKS);
    if (tasks.length === 0 && typeof window !== 'undefined') {
      // Initialize with sample data
      this.saveToStorage(STORAGE_KEYS.TASKS, sampleTasks);
      return sampleTasks;
    }
    return tasks;
  }

  getTasksByList(listId: string): Task[] {
    const tasks = this.getTasks();
    return tasks.filter(task => task.listId === listId);
  }

  getTaskById(id: string): Task | undefined {
    const tasks = this.getTasks();
    return tasks.find(task => task.id === id);
  }

  createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const tasks = this.getTasks();
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    this.saveToStorage(STORAGE_KEYS.TASKS, tasks);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Task>): Task | undefined {
    const tasks = this.getTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return undefined;

    tasks[index] = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.saveToStorage(STORAGE_KEYS.TASKS, tasks);
    return tasks[index];
  }

  deleteTask(id: string): boolean {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    if (filteredTasks.length === tasks.length) return false;
    
    this.saveToStorage(STORAGE_KEYS.TASKS, filteredTasks);
    return true;
  }

  // List operations
  getLists(): List[] {
    const lists = this.getFromStorage<List>(STORAGE_KEYS.LISTS);
    if (lists.length === 0) {
      // Initialize with default lists
      const defaultLists: List[] = [
        { id: '1', name: 'Personal', color: '#ef4444', count: 0 },
        { id: '2', name: 'Work', color: '#06b6d4', count: 0 },
        { id: '3', name: 'List 1', color: '#fbbf24', count: 0 },
      ];
      this.saveToStorage(STORAGE_KEYS.LISTS, defaultLists);
      return defaultLists;
    }
    
    // Update counts
    const tasks = this.getTasks();
    return lists.map(list => ({
      ...list,
      count: tasks.filter(task => task.listId === list.id && !task.completed).length,
    }));
  }

  createList(name: string, color: string): List {
    const lists = this.getLists();
    const newList: List = {
      id: Date.now().toString(),
      name,
      color,
      count: 0,
    };
    lists.push(newList);
    this.saveToStorage(STORAGE_KEYS.LISTS, lists);
    return newList;
  }

  // Tag operations
  getTags(): Tag[] {
    const tags = this.getFromStorage<Tag>(STORAGE_KEYS.TAGS);
    if (tags.length === 0) {
      // Initialize with default tags
      const defaultTags: Tag[] = [
        { id: '1', name: 'Tag 1', color: '#a8dadc' },
        { id: '2', name: 'Tag 2', color: '#f1e3d3' },
      ];
      this.saveToStorage(STORAGE_KEYS.TAGS, defaultTags);
      return defaultTags;
    }
    return tags;
  }

  createTag(name: string, color: string): Tag {
    const tags = this.getTags();
    const newTag: Tag = {
      id: Date.now().toString(),
      name,
      color,
    };
    tags.push(newTag);
    this.saveToStorage(STORAGE_KEYS.TAGS, tags);
    return newTag;
  }

  // Get today's tasks
  getTodayTasks(): Task[] {
    const tasks = this.getTasks();
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => 
      task.dueDate && 
      task.dueDate.startsWith(today)
    );
  }

  // Get upcoming tasks
  getUpcomingTasks(): Task[] {
    const tasks = this.getTasks();
    const today = new Date();
    return tasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) > today
    );
  }
}

export const todoService = new TodoService();