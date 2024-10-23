import React from 'react';
import { BookOpen, Zap, Terminal, MessageSquare } from 'lucide-react';

const Sidebar: React.FC = () => {
  const features = [
    {
      icon: <BookOpen size={20} />,
      title: 'Learning Resources',
      description: 'Access tutorials and documentation'
    },
    {
      icon: <Zap size={20} />,
      title: 'Smart Suggestions',
      description: 'Get real-time coding tips'
    },
    {
      icon: <Terminal size={20} />,
      title: 'Code Examples',
      description: 'Browse example snippets'
    },
    {
      icon: <MessageSquare size={20} />,
      title: 'Community Help',
      description: 'Connect with other developers'
    }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Features</h2>
      
      <div className="space-y-4">
        {features.map((feature, index) => (
          <button
            key={index}
            className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="text-indigo-600 dark:text-indigo-400">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;