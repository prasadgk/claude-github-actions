'use client';

import { useState } from 'react';
import { Task, Subtask } from '@/types';
import { CloseIcon, PlusIcon } from '@/components/icons';

interface TaskPanelProps {
  task: Task;
  onClose: () => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
  lists: { id: string; name: string }[];
  tags: { id: string; name: string; color: string }[];
}

export default function TaskPanel({ 
  task, 
  onClose, 
  onUpdate, 
  onDelete,
  lists,
  tags
}: TaskPanelProps) {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(task.description || '');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const handleDescriptionSave = () => {
    onUpdate(task.id, { description });
    setIsEditingDescription(false);
  };

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      const newSubtask: Subtask = {
        id: Date.now().toString(),
        title: newSubtaskTitle,
        completed: false
      };
      onUpdate(task.id, { 
        subtasks: [...task.subtasks, newSubtask] 
      });
      setNewSubtaskTitle('');
    }
  };

  const handleToggleSubtask = (subtaskId: string) => {
    const updatedSubtasks = task.subtasks.map(st =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    onUpdate(task.id, { subtasks: updatedSubtasks });
  };

  const handleAddTag = (tagId: string) => {
    if (!task.tags.includes(tagId)) {
      onUpdate(task.id, { tags: [...task.tags, tagId] });
    }
  };

  const handleRemoveTag = (tagId: string) => {
    onUpdate(task.id, { tags: task.tags.filter(id => id !== tagId) });
  };

  return (
    <div className="w-96 bg-white h-screen border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold">Task:</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <CloseIcon />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Title */}
        <input
          type="text"
          value={task.title}
          onChange={(e) => onUpdate(task.id, { title: e.target.value })}
          className="w-full text-lg font-medium mb-4 border-b border-gray-200 pb-2 focus:outline-none focus:border-gray-400"
        />

        {/* Description */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-2 block">Description</label>
          {isEditingDescription ? (
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md resize-none h-24 focus:outline-none focus:border-gray-400"
                placeholder="Add description..."
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleDescriptionSave}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setDescription(task.description || '');
                    setIsEditingDescription(false);
                  }}
                  className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setIsEditingDescription(true)}
              className="p-2 border border-gray-200 rounded-md min-h-[60px] cursor-pointer hover:bg-gray-50"
            >
              {task.description || <span className="text-gray-400">Add description...</span>}
            </div>
          )}
        </div>

        {/* List */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-2 block">List</label>
          <select
            value={task.listId}
            onChange={(e) => onUpdate(task.id, { listId: e.target.value })}
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
          >
            {lists.map(list => (
              <option key={list.id} value={list.id}>{list.name}</option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-2 block">Due date</label>
          <input
            type="date"
            value={task.dueDate?.split('T')[0] || ''}
            onChange={(e) => onUpdate(task.id, { 
              dueDate: e.target.value ? new Date(e.target.value).toISOString() : undefined 
            })}
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-2 block">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {task.tags.map(tagId => {
              const tag = tags.find(t => t.id === tagId);
              if (!tag) return null;
              return (
                <span
                  key={tag.id}
                  className="px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer"
                  style={{ backgroundColor: tag.color }}
                  onClick={() => handleRemoveTag(tag.id)}
                >
                  {tag.name}
                  <CloseIcon className="w-3 h-3" />
                </span>
              );
            })}
            <select
              value=""
              onChange={(e) => handleAddTag(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-gray-400"
            >
              <option value="">+ Add Tag</option>
              {tags.filter(tag => !task.tags.includes(tag.id)).map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Subtasks */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Subtasks:</h3>
          <div className="space-y-2 mb-3">
            {task.subtasks.map(subtask => (
              <div key={subtask.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={() => handleToggleSubtask(subtask.id)}
                  className="w-4 h-4"
                />
                <span className={subtask.completed ? 'line-through text-gray-400' : ''}>
                  {subtask.title}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
              placeholder="Add New Subtask"
              className="flex-1 py-1 text-sm focus:outline-none"
            />
          </div>
          
          {task.subtasks.length > 0 && (
            <div className="mt-3 p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Subtask</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 flex gap-3">
        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Delete Task
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}