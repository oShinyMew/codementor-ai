import React, { useState } from 'react';
import { Code2, Settings, Share2, MessageSquare, BookOpen, Zap, Terminal } from 'lucide-react';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="container mx-auto px-4 py-6 flex gap-4 h-[calc(100vh-4rem)]">
        <div className="flex flex-col flex-grow">
          <div className="flex items-center gap-4 mb-4">
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <MessageSquare size={20} />
              AI Chat
            </button>
          </div>
          
          <div className="flex-grow relative">
            <Editor 
              code={code} 
              setCode={setCode} 
              language={language}
            />
          </div>
        </div>

        <Sidebar />
        
        {isChatOpen && (
          <ChatPanel onClose={() => setIsChatOpen(false)} />
        )}
      </main>
    </div>
  );
}

export default App;