'use client';

import { Task, List } from '@/types';
import { ChevronRightIcon } from '@/components/icons';

interface TodoListProps {
  tasks: Task[];
  selectedTaskId?: string;
  onTaskSelect: (taskId: string) => void;
  onTaskToggle: (taskId: string) => void;
  lists: List[];
}

export default function TodoList({ 
  tasks, 
  selectedTaskId, 
  onTaskSelect, 
  onTaskToggle,
  lists
}: TodoListProps) {
  const getListColor = (listId: string) => {
    const list = lists.find(l => l.id === listId);
    return list?.color || '#gray';
  };

  const formatDueDate = (dueDate?: string) => {
    if (!dueDate) return '';
    const date = new Date(dueDate);
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: '2-digit', 
      year: '2-digit' 
    });
  };

  return (
    <div className="divide-y divide-gray-200">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer ${
            selectedTaskId === task.id ? 'bg-gray-50' : ''
          }`}
          onClick={() => onTaskSelect(task.id)}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => {
              e.stopPropagation();
              onTaskToggle(task.id);
            }}
            className="mr-3 w-4 h-4 cursor-pointer"
          />
          
          <div className="flex-1 min-w-0">
            <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </p>
            
            {(task.dueDate || task.subtasks.length > 0 || task.tags.length > 0) && (
              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" />
                    <span>{formatDueDate(task.dueDate)}</span>
                  </div>
                )}
                
                {task.subtasks.length > 0 && (
                  <span>{task.subtasks.filter(st => st.completed).length} / {task.subtasks.length} Subtasks</span>
                )}
                
                {task.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getListColor(task.listId) }}
                    />
                    <span className="capitalize">{lists.find(l => l.id === task.listId)?.name}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </div>
      ))}
    </div>
  );
}

const CalendarIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);