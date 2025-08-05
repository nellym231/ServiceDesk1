import React, { useState } from 'react';
import { MessageSquare, Bot, Send, Lightbulb, Search, Zap, Clock, CheckCircle } from 'lucide-react';

interface CopilotMessage {
  id: string;
  type: 'user' | 'copilot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actions?: CopilotAction[];
}

interface CopilotAction {
  id: string;
  title: string;
  description: string;
  type: 'create_ticket' | 'search_kb' | 'assign_ticket' | 'escalate';
}

const CopilotAssistant: React.FC = () => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: '1',
      type: 'copilot',
      content: 'Hello! I\'m your Microsoft 365 Copilot assistant. I can help you with ticket management, knowledge base searches, and incident resolution. How can I assist you today?',
      timestamp: new Date(),
      suggestions: [
        'Create a new incident ticket',
        'Search for email server issues',
        'Show me critical tickets',
        'Find resolution for VPN problems'
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: CopilotMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate Copilot response
    setTimeout(() => {
      const copilotResponse: CopilotMessage = {
        id: (Date.now() + 1).toString(),
        type: 'copilot',
        content: generateCopilotResponse(inputMessage),
        timestamp: new Date(),
        actions: generateCopilotActions(inputMessage)
      };
      
      setMessages(prev => [...prev, copilotResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateCopilotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('email') || lowerInput.includes('outlook')) {
      return 'I found several solutions for email issues. Based on recent tickets, the most common resolution is to restart Outlook and clear the cache. I can also check if there are any ongoing email server incidents. Would you like me to create a ticket or search for more specific solutions?';
    }
    
    if (lowerInput.includes('vpn') || lowerInput.includes('connection')) {
      return 'VPN connection issues are often related to network configuration or certificate problems. I found 3 knowledge base articles that might help. The quickest solution is usually to disconnect and reconnect the VPN, or try a different server location. Should I create a ticket for this issue?';
    }
    
    if (lowerInput.includes('create') || lowerInput.includes('ticket')) {
      return 'I can help you create a new ticket. Based on your description, I suggest categorizing this as an incident with medium priority. I\'ll pre-fill the form with relevant information. What type of issue are you experiencing?';
    }
    
    return 'I understand you need assistance. Let me search our knowledge base and recent tickets for relevant solutions. I can also help you create a ticket, assign it to the right technician, or escalate if needed. What specific action would you like me to take?';
  };

  const generateCopilotActions = (input: string): CopilotAction[] => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('email') || lowerInput.includes('outlook')) {
      return [
        {
          id: '1',
          title: 'Create Email Incident',
          description: 'Create a new incident ticket for email issues',
          type: 'create_ticket'
        },
        {
          id: '2',
          title: 'Search Email Solutions',
          description: 'Search knowledge base for email troubleshooting',
          type: 'search_kb'
        }
      ];
    }
    
    return [
      {
        id: '1',
        title: 'Create New Ticket',
        description: 'Create a ticket based on this conversation',
        type: 'create_ticket'
      },
      {
        id: '2',
        title: 'Search Knowledge Base',
        description: 'Find relevant articles and solutions',
        type: 'search_kb'
      }
    ];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleActionClick = (action: CopilotAction) => {
    const actionMessage: CopilotMessage = {
      id: Date.now().toString(),
      type: 'copilot',
      content: `I'm executing the action: ${action.title}. ${action.description}`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, actionMessage]);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Microsoft 365 Copilot</h2>
            <p className="text-gray-600">AI-powered assistance for ServiceDesk Plus Cloud</p>
          </div>
        </div>
      </div>

      {/* Copilot Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Smart Suggestions</p>
              <p className="text-xs text-gray-600">AI-powered recommendations</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Knowledge Search</p>
              <p className="text-xs text-gray-600">Instant article lookup</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Auto Actions</p>
              <p className="text-xs text-gray-600">Automated workflows</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">24/7 Support</p>
              <p className="text-xs text-gray-600">Always available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex flex-col">
        {/* Chat Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Copilot Assistant</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
                
                {/* Suggestions */}
                {message.suggestions && (
                  <div className="mt-3 space-y-1">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left px-2 py-1 text-xs bg-white text-gray-700 rounded border hover:bg-gray-50 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Actions */}
                {message.actions && (
                  <div className="mt-3 space-y-2">
                    {message.actions.map(action => (
                      <button
                        key={action.id}
                        onClick={() => handleActionClick(action)}
                        className="flex items-center space-x-2 w-full px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <div className="text-left">
                          <p className="text-sm font-medium">{action.title}</p>
                          <p className="text-xs">{action.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Copilot anything about tickets, solutions, or processes..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopilotAssistant;