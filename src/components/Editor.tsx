import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface EditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
}

const Editor: React.FC<EditorProps> = ({ code, setCode, language }) => {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    validateCode(code);
  }, [code, language]);

  const validateCode = (code: string) => {
    const newErrors: string[] = [];

    try {
      if (language === 'javascript' || language === 'typescript') {
        // Basic JS/TS validation
        new Function(code);
      } else if (language === 'python') {
        // Basic Python syntax check (incomplete brackets, parentheses)
        const brackets = {'(': ')', '[': ']', '{': '}'};
        const stack = [];
        for (const char of code) {
          if ('([{'.includes(char)) {
            stack.push(char);
          } else if (')]}'.includes(char)) {
            const last = stack.pop();
            if (!last || brackets[last] !== char) {
              throw new Error('Mismatched brackets');
            }
          }
        }
        if (stack.length > 0) {
          throw new Error('Unclosed brackets');
        }
      }
    } catch (error) {
      newErrors.push(error instanceof Error ? error.message : 'Syntax error');
    }

    // Check for common issues
    if (code.includes('console.log') && !code.includes('console.log(')) {
      newErrors.push('Incomplete console.log statement');
    }
    
    if (code.includes('function') && !code.includes('{')) {
      newErrors.push('Function body missing');
    }

    setErrors(newErrors);
  };

  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </div>
        <div className="flex items-center gap-4">
          {errors.length > 0 ? (
            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
              <AlertCircle size={16} />
              <span>{errors.length} error{errors.length > 1 ? 's' : ''}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircle size={16} />
              <span>No errors</span>
            </div>
          )}
        </div>
      </div>
      
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-grow w-full p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:outline-none"
        placeholder={`Start coding in ${language}...`}
        spellCheck="false"
      />
      
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        {errors.length > 0 ? (
          <div className="space-y-1">
            {errors.map((error, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <AlertCircle size={14} />
            <span>AI suggestions will appear here</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Editor;