import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FolderTree,
  LayoutDashboard,
  LogOut,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  School,
  ShieldCheck
} from 'lucide-react';
import { StorageState } from '../types';
import { FolderExplorer } from './FolderExplorer';
import { ClassStatusBoard } from './ClassStatusBoard';

interface TeacherDashboardProps {
  records: StorageState;
  onExit: () => void;
  onResetData: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  records,
  onExit,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState<'folders' | 'matrix'>('folders');

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Teacher Top Bar */}
      <div className="bg-white border-2 border-black p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#2D5A27] bg-[#2D5A27]/10 px-2 py-0.5 border border-black flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>교사용 관리 포털</span>
            </span>
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-black/50">Dangsu × Clover</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#1A1A1A]">
            환경실천 챌린지 학생 인증 관리
          </h2>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end font-sans">
          <button
            onClick={() => {
              if (window.confirm('예시 데이터를 초기 상태로 복원하시겠습니까? (3학년 1반 1번 학생 등의 데이터가 재설정됩니다)')) {
                onResetData();
              }
            }}
            className="px-3.5 py-2 border border-black bg-white hover:bg-[#F0F2EE] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            title="초기 예시 데이터로 복원"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>샘플 데이터 복원</span>
          </button>

          <button
            id="teacher-logout-btn"
            onClick={onExit}
            className="px-4 py-2 border-2 border-black bg-black hover:bg-[#2D5A27] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>관리자 나가기</span>
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-1.5 border-2 border-black bg-white p-1 max-w-md font-sans">
        <button
          id="tab-folder-explorer"
          onClick={() => setActiveTab('folders')}
          className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'folders'
              ? 'bg-black text-white'
              : 'text-black/60 hover:text-black hover:bg-[#F0F2EE]'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>📁 폴더 탐색기</span>
        </button>

        <button
          id="tab-class-matrix"
          onClick={() => setActiveTab('matrix')}
          className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'matrix'
              ? 'bg-black text-white'
              : 'text-black/60 hover:text-black hover:bg-[#F0F2EE]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>📊 반별 현황판</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'folders' ? (
        <FolderExplorer records={records} />
      ) : (
        <ClassStatusBoard records={records} />
      )}
    </div>
  );
};
