import React from 'react';
import { Sparkles, Shield, ChevronLeft, Home } from 'lucide-react';

interface HeaderProps {
  currentScreen: 'intro' | 'grade' | 'class' | 'studentNum' | 'challenges' | 'teacher';
  grade?: number | null;
  classNum?: number | null;
  studentNum?: number | null;
  onGoHome: () => void;
  onGoBack?: () => void;
  onOpenTeacher: () => void;
  isTeacherMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  grade,
  classNum,
  studentNum,
  onGoHome,
  onGoBack,
  onOpenTeacher,
  isTeacherMode = false
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFCF9]/95 backdrop-blur-md border-b-2 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Left: Brand or Back Button */}
        <div className="flex items-center gap-3">
          {currentScreen !== 'intro' && !isTeacherMode && (
            <button
              id="header-back-btn"
              onClick={onGoBack}
              className="px-2.5 py-1.5 border border-black bg-white hover:bg-black hover:text-white transition-colors flex items-center gap-1 font-sans font-bold text-xs uppercase tracking-wider cursor-pointer"
              title="이전 화면으로"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">이전</span>
            </button>
          )}

          <button
            id="header-home-btn"
            onClick={onGoHome}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 border-2 border-black bg-[#2D5A27] text-white flex items-center justify-center text-lg shadow-xs group-hover:bg-black transition-colors">
              🍀
            </div>
            <div>
              <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-black/60 leading-none">
                Dangsu Elementary × Gyeonggi
              </p>
              <h1 className="text-base sm:text-lg font-serif font-black tracking-tight leading-tight mt-0.5">
                CLOVER <span className="text-[#2D5A27]">CHALLENGE</span>
              </h1>
            </div>
          </button>
        </div>

        {/* Center: Current student status indicator if inside student flow */}
        {grade && classNum && studentNum && currentScreen === 'challenges' && (
          <div className="hidden md:flex items-center gap-1.5 font-sans font-bold text-xs">
            <span className="text-[10px] uppercase tracking-widest text-black/40 mr-1">Current:</span>
            <span className="bg-black text-white px-2 py-0.5">{grade}학년</span>
            <span className="bg-black text-white px-2 py-0.5">{classNum}반</span>
            <span className="border-2 border-black px-2 py-0.5 bg-white text-black">{studentNum}번 학생</span>
          </div>
        )}

        {/* Right Action: Teacher Entrance or Home */}
        <div className="flex items-center gap-2">
          {isTeacherMode ? (
            <button
              id="teacher-exit-btn"
              onClick={onGoHome}
              className="px-3.5 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-xs font-sans font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>학생 화면</span>
            </button>
          ) : (
            <button
              id="teacher-portal-btn"
              onClick={onOpenTeacher}
              className="px-3.5 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-xs font-sans font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#2D5A27]" />
              <span>교사용 화면</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
