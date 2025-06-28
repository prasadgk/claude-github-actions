'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TodoList from '@/components/todo/TodoList';
import TaskPanel from '@/components/task/TaskPanel';
import { PlusIcon } from '@/components/icons';
import { todoService } from '@/services/todoService';
import { Task, List, Tag } from '@/types';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedView, setSelectedView] = useState('today');
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setTasks(todoService.getTasks());
    setLists(todoService.getLists());
    setTags(todoService.getTags());
  };

  const getFilteredTasks = () => {
    if (selectedView === 'today') {
      return todoService.getTodayTasks();
    } else if (selectedView === 'upcoming') {
      return todoService.getUpcomingTasks();
    } else if (selectedView.startsWith('list-')) {
      const listId = selectedView.replace('list-', '');
      return todoService.getTasksByList(listId);
    }
    return tasks;
  };

  const getViewTitle = () => {
    if (selectedView === 'today') return 'Today';
    if (selectedView === 'upcoming') return 'Upcoming';
    if (selectedView === 'calendar') return 'Calendar';
    if (selectedView === 'sticky') return 'Sticky Wall';
    if (selectedView.startsWith('list-')) {
      const listId = selectedView.replace('list-', '');
      const list = lists.find(l => l.id === listId);
      return list?.name || 'List';
    }
    return 'Tasks';
  };

  const handleTaskToggle = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      todoService.updateTask(taskId, { completed: !task.completed });
      loadData();
    }
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    todoService.updateTask(taskId, updates);
    loadData();
  };

  const handleTaskDelete = (taskId: string) => {
    todoService.deleteTask(taskId);
    setSelectedTaskId(undefined);
    loadData();
  };

  const handleCreateTask = () => {
    const defaultListId = selectedView.startsWith('list-') 
      ? selectedView.replace('list-', '') 
      : lists[0]?.id || '1';
    
    const newTask = todoService.createTask({
      title: 'New Task',
      description: '',
      completed: false,
      listId: defaultListId,
      tags: [],
      subtasks: [],
      dueDate: selectedView === 'today' ? new Date().toISOString() : undefined
    });
    
    setSelectedTaskId(newTask.id);
    loadData();
  };

  const selectedTask = selectedTaskId ? tasks.find(t => t.id === selectedTaskId) : undefined;
  const filteredTasks = getFilteredTasks();
  const taskCount = filteredTasks.filter(t => !t.completed).length;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        lists={lists}
        tags={tags}
        selectedView={selectedView}
        onViewChange={setSelectedView}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-semibold">{getViewTitle()}</h1>
              <span className="text-2xl text-gray-400">{taskCount}</span>
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="px-6 py-3 border-b border-gray-200">
          <button
            onClick={handleCreateTask}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 py-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add New Task</span>
          </button>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto">
          <TodoList
            tasks={filteredTasks}
            selectedTaskId={selectedTaskId}
            onTaskSelect={setSelectedTaskId}
            onTaskToggle={handleTaskToggle}
            lists={lists}
          />
        </div>
      </div>

      {/* Task Panel */}
      {selectedTask && (
        <TaskPanel
          task={selectedTask}
          onClose={() => setSelectedTaskId(undefined)}
          onUpdate={handleTaskUpdate}
          onDelete={handleTaskDelete}
          lists={lists}
          tags={tags}
        />
      )}
    </div>
  );
}
