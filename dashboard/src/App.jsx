import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Terminal as TerminalIcon, 
  TrendingUp, 
  Trophy, 
  Rocket, 
  Play, 
  Save, 
  Loader2, 
  Check, 
  FolderOpen, 
  ChevronRight, 
  ChevronDown, 
  FileCode, 
  Folder, 
  Menu, 
  X,
  Sparkles,
  Zap,
  Globe,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';

const GithubIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const FileTreeItem = ({ item, level = 0, onSelectFile }) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  
  if (item.isDir) {
    return (
      <div className="select-none">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 py-2 px-3 hover:bg-white/[0.05] rounded-xl cursor-pointer transition-all group"
          style={{ paddingLeft: `${level * 16 + 12}px` }}
        >
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
            <ChevronRight className="w-3 h-3 text-gray-500" />
          </motion.div>
          <Folder className={`w-4 h-4 ${isOpen ? 'text-indigo-400' : 'text-gray-500'} group-hover:text-indigo-300 transition-colors`} />
          <span className={`text-xs font-black uppercase tracking-widest ${isOpen ? 'text-white' : 'text-gray-400'} group-hover:text-white`}>{item.name}</span>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              {item.children.map((child, i) => <FileTreeItem key={i} item={child} level={level + 1} onSelectFile={onSelectFile} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onSelectFile(item.path)}
      className="flex items-center gap-2 py-2 px-3 hover:bg-indigo-500/10 rounded-xl cursor-pointer transition-all group border-l-2 border-transparent hover:border-indigo-500 ml-2"
      style={{ paddingLeft: `${level * 16 + 20}px` }}
    >
      <FileCode className="w-4 h-4 text-gray-600 group-hover:text-indigo-400" />
      <span className="text-sm font-medium text-gray-500 group-hover:text-gray-200 truncate">{item.name}</span>
    </div>
  );
};

const MotivationalMascot = ({ triggerError, triggerSuccess }) => {
  const [isMuted, setIsMuted] = useState(false);
  
  const errorMessages = [
    "Kay jhala bhava? Error ala? Don't worry, tu solve karu shakto!",
    "Are ha tar fakt ek chota bug aahe, tu yala sahaj kadhu shakto!",
    "Error mhanje shikanarya sathi ek sandhi aste. Kar prayatna!",
    "Chinta nako karu, logic check kar, tu naki solve karshil!",
    "Har nako manu bhava, pratek error madhe kahi tari naveen shikayla milta!"
  ];

  const successMessages = [
    "Lay bhari bhava! Ekdam kadak kam kela aahes!",
    "Shabbash! Code ekdam perfect run jhala!",
    "Manla re tula! Tu kharach coding cha king aahes!",
    "Keep it up! Ashach padhatine pratek challenge solve kar!",
    "Vijay aplach aahe! Code successful jhala!"
  ];

  const speakMessage = (text) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'mr-IN'; // Marathi language
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (triggerError) {
      const randomMsg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      speakMessage(randomMsg);
    }
  }, [triggerError]);

  useEffect(() => {
    if (triggerSuccess) {
      const randomMsg = successMessages[Math.floor(Math.random() * successMessages.length)];
      speakMessage(randomMsg);
    }
  }, [triggerSuccess]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-28 right-12 z-[60] flex flex-col items-end group"
    >
      <div className="relative">
        <motion.div
          animate={triggerError ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          } : triggerSuccess ? {
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          } : { 
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: triggerError ? 0.5 : triggerSuccess ? 0.4 : 4, 
            repeat: triggerError || triggerSuccess ? 2 : Infinity, 
            ease: "easeInOut" 
          }}
          className="w-40 h-40 relative cursor-pointer"
          onClick={() => {
            speakMessage("Bol bhava, me tula motivate karayla tayar aahe!");
          }}
        >
          <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-75 group-hover:scale-110 transition-transform" />
          <img 
            src="/mascot.png" 
            alt="Mascot" 
            className="w-full h-full object-contain relative z-10 drop-shadow-2xl" 
          />
        </motion.div>

        {/* Sound Toggle */}
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="absolute -top-2 -left-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg border border-white/20 z-20 hover:scale-110 transition-transform"
        >
          {isMuted ? <span className="text-[10px]">🔇</span> : <span className="text-[10px]">🔊</span>}
        </button>
      </div>
    </motion.div>
  );
};

const App = () => {
  const [code, setCode] = useState('// Start your practice...\nconsole.log("Ready to code?");');
  const [language, setLanguage] = useState('javascript');
  const [question, setQuestion] = useState('');
  const [folderName, setFolderName] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [viewMode, setViewMode] = useState('output');
  const [fileTree, setFileTree] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [errorCount, setErrorCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => { fetchFileTree(); }, []);

  const fetchFileTree = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/file-tree');
      const data = await res.json();
      setFileTree(data);
    } catch (err) { console.error('Explorer error'); }
  };

  const loadFile = async (filePath) => {
    try {
      const res = await fetch(`http://localhost:5000/api/get-file?filePath=${encodeURIComponent(filePath)}`);
      const data = await res.json();
      setCode(data.content);
      const ext = filePath.split('.').pop();
      setLanguage(ext === 'py' ? 'python' : ext === 'html' ? 'html' : 'javascript');
      const parts = filePath.split(/[\\/]/);
      setQuestion(parts.pop().split('.')[0]);
      setFolderName(parts.pop() || '');
    } catch (err) { alert('Load fail!'); }
  };

  const runCode = async () => {
    if (language === 'html') { setViewMode('preview'); return; }
    setLoading(true); setViewMode('output');
    try {
      const res = await fetch('http://localhost:5000/api/run-code', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      });
      const data = await res.json();
      const out = data.output || data.error || 'No output.';
      setOutput(out);
      
      // Check if it's an error
      if (out.toLowerCase().includes('error') || out.toLowerCase().includes('failed') || data.error) {
        setErrorCount(prev => prev + 1);
      } else {
        setSuccessCount(prev => prev + 1);
      }
    } catch (err) { 
      setOutput('Backend unreachable!'); 
      setErrorCount(prev => prev + 1);
    } finally { setLoading(false); }
  };

  const saveAndSync = async () => {
    if (!question || !folderName) return alert('Name & Folder missing!');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/save-log', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: new Date().toISOString().split('T')[0], question, answer: code, category: language, folderName })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setSaveStatus('success');
        fetchFileTree();
        setTimeout(() => setSaveStatus(null), 3000);
      }
    } catch (err) { alert('Save failed!'); } finally { setLoading(false); }
  };

  return (
    <div className="h-screen bg-[#020617] text-gray-100 font-sans flex overflow-hidden relative">
      {/* Background Decor */}
      <div className="floating-blob bg-indigo-600 top-[-10%] left-[-10%]" />
      <div className="floating-blob bg-purple-600 bottom-[-10%] right-[-10%] animation-delay-2000" />
      
      {/* Motivational Mascot */}
      <MotivationalMascot triggerError={errorCount} triggerSuccess={successCount} />

      {/* Sidebar */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 320 : 0 }} 
        className="bg-black/20 backdrop-blur-3xl border-r border-white/5 flex flex-col relative overflow-hidden z-20 shadow-2xl"
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <FolderOpen className="text-indigo-400 w-5 h-5" />
            </div>
            <span className="font-black text-xs uppercase tracking-[0.3em] text-gray-400">Explorer</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors"><X className="w-4 h-4 text-gray-500" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <AnimatePresence>
            {fileTree.length > 0 ? (
              fileTree.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <FileTreeItem item={item} onSelectFile={loadFile} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10 opacity-20"><Sparkles className="w-8 h-8 mx-auto mb-2" /><p className="text-xs font-bold uppercase tracking-widest">No practices yet</p></div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-20 border-b border-white/5 px-8 flex justify-between items-center bg-black/20 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl border border-indigo-500/20 transition-all text-indigo-400"><Menu className="w-5 h-5" /></button>
            )}
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform cursor-pointer">
                <Cpu className="text-white w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tighter uppercase italic leading-none">Practice <span className="text-indigo-400">Hub</span></span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Local Dev Environment</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
              {['javascript', 'python', 'html'].map(lang => (
                <button 
                  key={lang} 
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${language === lang ? 'bg-indigo-500 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {lang === 'javascript' ? 'JS' : lang}
                </button>
              ))}
            </div>
            <div className="w-px h-8 bg-white/5" />
            <a href="https://github.com/BalajiPatil1207" target="_blank" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all">
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>
        </header>

        <main className="flex-1 flex flex-col p-8 gap-8 min-h-0">
          {/* Top Control Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 flex gap-4 min-w-[400px]">
              <div className="flex-1 glass rounded-2xl flex items-center px-6 border border-white/5 focus-within:border-indigo-500/50 transition-all shadow-inner">
                <Folder className="w-4 h-4 text-indigo-400 mr-4" />
                <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="FOLDER NAME (e.g. day1)" className="bg-transparent border-none outline-none text-xs font-black uppercase tracking-widest text-white w-full py-4 placeholder:text-gray-600" />
              </div>
              <div className="flex-[1.5] glass rounded-2xl flex items-center px-6 border border-white/5 focus-within:border-indigo-500/50 transition-all shadow-inner">
                <Sparkles className="w-4 h-4 text-purple-400 mr-4" />
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="TASK NAME (e.g. login-form)" className="bg-transparent border-none outline-none text-xs font-black uppercase tracking-widest text-white w-full py-4 placeholder:text-gray-600" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={runCode} disabled={loading} className="group relative px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-500/20 active:scale-95 overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-3">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />} RUN CODE
                </span>
              </button>
              <button onClick={saveAndSync} disabled={loading} className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-95 border ${saveStatus === 'success' ? 'bg-emerald-500 border-emerald-400 shadow-emerald-500/20' : 'glass border-white/10 hover:bg-white/5 shadow-xl shadow-black/20'}`}>
                <span className="flex items-center gap-3">
                  {saveStatus === 'success' ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />} {saveStatus === 'success' ? 'SYNCED' : 'SAVE & SYNC'}
                </span>
              </button>
            </div>
          </motion.div>

          {/* IDE Content */}
          <div className="flex-1 flex gap-8 min-h-0">
            {/* Editor Area */}
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex-[1.5] flex flex-col glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative editor-container">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-50" />
              <div className="flex-1 bg-black/40">
                <Editor 
                  height="100%" 
                  theme="vs-dark" 
                  language={language} 
                  value={code} 
                  onChange={(val) => setCode(val)} 
                  options={{ 
                    fontSize: 16, 
                    minimap: { enabled: false }, 
                    scrollBeyondLastLine: false, 
                    cursorStyle: 'line', 
                    padding: { top: 30, left: 20 }, 
                    smoothScrolling: true,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    lineHeight: 1.6,
                    letterSpacing: 0.5,
                    backgroundColor: 'transparent',
                    fontWeight: '500'
                  }} 
                />
              </div>
            </motion.div>

            {/* Output Area */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl bg-black/40">
              <div className="px-8 py-5 border-b border-white/5 flex gap-8 bg-white/[0.01]">
                <button onClick={() => setViewMode('output')} className={`text-[10px] font-black tracking-[0.3em] uppercase pb-2 border-b-2 transition-all ${viewMode === 'output' ? 'border-indigo-500 text-white' : 'border-transparent text-gray-600 hover:text-gray-400'}`}>Terminal</button>
                {language === 'html' && <button onClick={() => setViewMode('preview')} className={`text-[10px] font-black tracking-[0.3em] uppercase pb-2 border-b-2 transition-all ${viewMode === 'preview' ? 'border-indigo-500 text-white' : 'border-transparent text-gray-600 hover:text-gray-400'}`}>Live Preview</button>}
              </div>
              <div className="flex-1 p-8 font-mono text-sm overflow-auto custom-scrollbar">
                {viewMode === 'output' ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" /> Local Console v1.0</span>
                    <pre className={`whitespace-pre-wrap leading-relaxed ${output.toLowerCase().includes('error') ? 'text-red-400' : 'text-indigo-400/80'}`}>
                      {output || '> Waiting for process execution...'}
                    </pre>
                  </div>
                ) : (
                  <div className="w-full h-full bg-white rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/10">
                    <iframe srcDoc={code} title="preview" className="w-full h-full border-none" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>

        {/* Stats Footer */}
        <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-10 py-5 rounded-[2rem] border border-white/10 flex gap-12 items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50">
          <div className="flex items-center gap-4 group cursor-help">
            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:scale-110 transition-transform"><TrendingUp className="text-emerald-500 w-5 h-5" /></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Consistency</span>
              <span className="text-sm font-black text-white leading-none">1 Day Streak 🔥</span>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex items-center gap-4 group cursor-help">
            <div className="p-2 bg-amber-500/10 rounded-lg group-hover:scale-110 transition-transform"><Trophy className="text-amber-500 w-5 h-5" /></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">XP Points</span>
              <span className="text-sm font-black text-white leading-none">1200 XP ✨</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
