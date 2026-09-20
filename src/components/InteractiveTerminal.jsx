import React, { useState, useRef, useEffect } from 'react';
import { terminalCommands } from '../data/portfolioData';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Sparkles, Send } from 'lucide-react';

export default function InteractiveTerminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `Ahsan Raza Enterprise OS [Version 4.2.0]\n(c) 2026 Ahsan Raza. Type "help" to list available commands.`
    }
  ]);
  const [input, setInput] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `ahsan@net-terminal:~$ ${input}` }];

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cmd.startsWith('ping')) {
      const target = input.split(' ')[1] || '8.8.8.8';
      newHistory.push({
        type: 'output',
        text: `PING ${target} (56 data bytes)\n64 bytes from ${target}: icmp_seq=1 ttl=64 time=4.12 ms\n64 bytes from ${target}: icmp_seq=2 ttl=64 time=3.95 ms\n64 bytes from ${target}: icmp_seq=3 ttl=64 time=4.01 ms\n--- ${target} ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss`
      });
    } else if (cmd.startsWith('subnet')) {
      newHistory.push({
        type: 'output',
        text: `Subnet Diagnostic: /24 -> 255.255.255.0 | 254 usable host IPs | Broadcast .255\nFor full calculator, explore the Network Lab section below!`
      });
    } else if (terminalCommands[cmd]) {
      newHistory.push({ type: 'output', text: terminalCommands[cmd] });
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not found: "${input}". Type "help" to see valid commands.`
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 dark:bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className={`relative w-full rounded-3xl bg-slate-950 dark:bg-black border border-cyan-500/40 dark:border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col transition-all duration-300 ${
          isMaximized ? 'h-[94vh] max-w-[98vw]' : 'h-[580px] max-w-3xl'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 dark:bg-neutral-950 border-b border-slate-800 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-amber-500/90" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90" />
            <span className="ml-3 text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>ahsan@enterprise-terminal:~ (bash)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Console Log Area */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-200 space-y-3 bg-slate-950/90 dark:bg-black">
          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {item.type === 'user' ? (
                <span className="text-cyan-400 font-bold">{item.text}</span>
              ) : item.type === 'error' ? (
                <span className="text-rose-400">{item.text}</span>
              ) : item.type === 'system' ? (
                <span className="text-slate-400">{item.text}</span>
              ) : (
                <span className="text-emerald-300">{item.text}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleCommand}
          className="flex items-center gap-2 px-5 py-3 bg-slate-900 dark:bg-neutral-950 border-t border-slate-800 dark:border-neutral-800"
        >
          <span className="text-cyan-400 font-mono text-xs font-bold">
            ahsan@net-terminal:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'whoami', 'skills', 'experience', 'certs', 'ping'..."
            className="flex-1 bg-transparent border-none text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

