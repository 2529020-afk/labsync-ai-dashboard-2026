import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Sliders, 
  ShieldAlert, 
  Box, 
  Activity, 
  RotateCcw,
  Zap
} from 'lucide-react';
import { ChatMessage } from '../types';
import { COPILOT_KNOWLEDGE_BASE } from '../mockData';

export const AssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `**Standard Operations Diagnostic Link Active.**

I have ingested the full specification manuals, maintenance procedures, and emergency response guides for all active campus instruments. Select a prompt chip below or type any troubleshooting request.`,
      timestamp: 'Online'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Match response from knowledge base
    const q = text.toLowerCase();
    let reply = `Telemetry acknowledged for query: *"**${text}**"*. \n\nAll campus sensor networks report normal operational parameters. You can reserve available instruments in the **Smart Inventory** tab, file recalibration alerts in **Maintenance & QA**, or access ISO certified lab operating guidelines.`;

    for (const item of COPILOT_KNOWLEDGE_BASE) {
      if (item.triggers.some((t) => q.includes(t))) {
        reply = item.reply;
        break;
      }
    }

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'msg-reset',
        sender: 'assistant',
        text: `**Session Context Reset.**

How else can I assist with laboratory resources, calibration routines, or safety protocols?`,
        timestamp: 'Online'
      }
    ]);
  };

  return (
    <div className="w-full h-[calc(100vh-8.5rem)] flex flex-col glass-card rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl">
      {/* Copilot Header */}
      <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20">
            <Bot className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              LabSync Autonomous Copilot
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                ENGINEERING-LLM
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Contextual awareness of ISO 17025, equipment manuals, and campus inventory
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select className="bg-slate-900 border border-slate-700 text-[11px] text-cyan-300 rounded-lg px-2.5 py-1.5 focus:outline-none">
            <option>Model: LabSync v4.2 Turbo</option>
            <option>Model: DeepBio Diagnostics</option>
          </select>
          <button
            onClick={handleReset}
            title="Reset Session"
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((m) => {
          const isAi = m.sender === 'assistant';

          return (
            <div
              key={m.id}
              className={`flex gap-3.5 max-w-2xl ${isAi ? '' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                  isAi
                    ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-400'
                    : 'bg-violet-500/20 border border-violet-400/40 text-violet-300'
                }`}
              >
                {isAi ? 'AI' : 'YOU'}
              </div>

              {/* Message text */}
              <div
                className={`rounded-2xl p-4 text-xs leading-relaxed shadow-lg ${
                  isAi
                    ? 'glass-card text-slate-200 rounded-tl-sm'
                    : 'btn-gradient text-slate-950 font-medium rounded-tr-sm'
                }`}
              >
                <div
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: m.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>')
                  }}
                />
                <span className={`block text-[9px] font-mono mt-2 opacity-60 ${isAi ? 'text-slate-400' : 'text-slate-900'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3.5 max-w-xs">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-xs font-mono font-bold">
              AI
            </div>
            <div className="glass-card rounded-2xl p-3.5 text-xs flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-4 py-2.5 border-t border-slate-800/80 bg-slate-950/70 flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap shrink-0">
        <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
          <Zap className="w-3 h-3" /> Prompts:
        </span>
        <button
          onClick={() => handleSend('How do I calibrate the Rigol Oscilloscope?')}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-700 hover:border-cyan-500/50 transition text-[11px] flex items-center gap-1.5"
        >
          <Sliders className="w-3 h-3 text-cyan-400" /> Calibrate Rigol Scope
        </button>
        <button
          onClick={() => handleSend('What is the emergency safety protocol for Lab 2?')}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-700 hover:border-cyan-500/50 transition text-[11px] flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3 h-3 text-rose-400" /> Cleanroom Safety SOP
        </button>
        <button
          onClick={() => handleSend('Which 3D printers are currently available?')}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-700 hover:border-cyan-500/50 transition text-[11px] flex items-center gap-1.5"
        >
          <Box className="w-3 h-3 text-purple-400" /> Available 3D Printers
        </button>
        <button
          onClick={() => handleSend('How do I handle a Bio-Rad PCR thermal sensor failure?')}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-700 hover:border-cyan-500/50 transition text-[11px] flex items-center gap-1.5"
        >
          <Activity className="w-3 h-3 text-emerald-400" /> PCR Sensor Jitter Guide
        </button>
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputVal);
        }}
        className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask about calibration steps, equipment availability, or SOPs..."
          className="flex-1 bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500 shadow-inner"
        />
        <button
          type="submit"
          className="btn-gradient text-slate-950 font-bold px-5 py-3.5 rounded-xl transition flex items-center justify-center shadow-lg"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
