'use client';

import { useState } from 'react';
import { 
  MenuIcon, 
  SearchIcon, 
  ChevronRightIcon, 
  ChevronDownIcon, 
  CalendarIcon,
  StickyNoteIcon,
  PlusIcon,
  SettingsIcon,
  LogoutIcon
} from '@/components/icons';
import { List, Tag } from '@/types';

interface SidebarProps {
  lists: List[];
  tags: Tag[];
  selectedView: string;
  onViewChange: (view: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ 
  lists, 
  tags, 
  selectedView, 
  onViewChange,
  isCollapsed,
  onToggleCollapse
}: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    tasks: true,
    lists: true,
    tags: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-gray-50 h-screen flex flex-col border-r border-gray-200">
        <div className="p-3 border-b border-gray-200">
          <button onClick={onToggleCollapse} className="p-2 hover:bg-gray-200 rounded">
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-50 h-screen flex flex-col border-r border-gray-200">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <h1 className="text-xl font-semibold">oToDo</h1>
        <button onClick={onToggleCollapse} className="p-1 hover:bg-gray-200 rounded">
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Tasks Section */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('tasks')}
            className="w-full px-4 py-2 flex items-center justify-between text-xs font-semibold text-gray-600 hover:bg-gray-100"
          >
            <span className="uppercase tracking-wider">Tasks</span>
            {expandedSections.tasks ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
          </button>
          
          {expandedSections.tasks && (
            <div className="mt-1">
              <button
                onClick={() => onViewChange('upcoming')}
                className={`w-full px-4 py-2 flex items-center justify-between hover:bg-gray-100 text-sm ${
                  selectedView === 'upcoming' ? 'bg-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                  <span>Upcoming</span>
                </div>
                <span className="text-sm text-gray-500">12</span>
              </button>
              
              <button
                onClick={() => onViewChange('today')}
                className={`w-full px-4 py-2 flex items-center justify-between hover:bg-gray-100 text-sm ${
                  selectedView === 'today' ? 'bg-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <span>Today</span>
                </div>
                <span className="text-sm text-gray-500">5</span>
              </button>
              
              <button
                onClick={() => onViewChange('calendar')}
                className={`w-full px-4 py-2 flex items-center justify-between hover:bg-gray-100 text-sm ${
                  selectedView === 'calendar' ? 'bg-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <span>Calendar</span>
                </div>
              </button>
              
              <button
                onClick={() => onViewChange('sticky')}
                className={`w-full px-4 py-2 flex items-center justify-between hover:bg-gray-100 text-sm ${
                  selectedView === 'sticky' ? 'bg-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <StickyNoteIcon className="w-4 h-4 text-gray-400" />
                  <span>Sticky Wall</span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Lists Section */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('lists')}
            className="w-full px-4 py-2 flex items-center justify-between text-xs font-semibold text-gray-600 hover:bg-gray-100"
          >
            <span className="uppercase tracking-wider">Lists</span>
            {expandedSections.lists ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
          </button>
          
          {expandedSections.lists && (
            <div className="mt-1">
              {lists.map(list => (
                <button
                  key={list.id}
                  onClick={() => onViewChange(`list-${list.id}`)}
                  className={`w-full px-4 py-2 flex items-center justify-between hover:bg-gray-100 text-sm ${
                    selectedView === `list-${list.id}` ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0`} style={{ backgroundColor: list.color }} />
                    <span>{list.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{list.count}</span>
                </button>
              ))}
              
              <button className="w-full px-4 py-2 flex items-center gap-2 text-gray-500 hover:bg-gray-100 text-sm">
                <PlusIcon className="w-4 h-4" />
                <span>Add New List</span>
              </button>
            </div>
          )}
        </div>

        {/* Tags Section */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('tags')}
            className="w-full px-4 py-2 flex items-center justify-between text-xs font-semibold text-gray-600 hover:bg-gray-100"
          >
            <span className="uppercase tracking-wider">Tags</span>
            {expandedSections.tags ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
          </button>
          
          {expandedSections.tags && (
            <div className="mt-1 px-4 py-2">
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag.id}
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: tag.color, color: '#000' }}
                  >
                    {tag.name}
                  </span>
                ))}
                <button className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 rounded-full">
                  + Add Tag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200">
        <button className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-100 text-sm">
          <SettingsIcon className="w-5 h-5 text-gray-600" />
          <span>Settings</span>
        </button>
        <button className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-100 text-sm">
          <LogoutIcon className="w-5 h-5 text-gray-600" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}