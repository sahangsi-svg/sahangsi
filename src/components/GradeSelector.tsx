import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight, School } from 'lucide-react';

interface GradeSelectorProps {
  onSelectGrade: (grade: number) => void;
  onBack: () => void;
}

const GRADES = [
  { grade: 1, label: '1학년', tag: '신나는 첫걸음 🌱', desc: '초록 세상을 만나요' },
  { grade: 2, label: '2학년', tag: '새싹 지킴이 🌿', desc: '지구랑 친해져요' },
  { grade: 3, label: '3학년', tag: '초록 탐험대 🍀', desc: '환경을 실천해요' },
  { grade: 4, label: '4학년', tag: '푸른 꿈나무 🌳', desc: '탄소를 줄여보아요' },
  { grade: 5, label: '5학년', tag: '생태 수호대 🌍', desc: '지구를 아껴요' },
  { grade: 6, label: '6학년', tag: '환경 리더즈 🌟', desc: '모두의 본보기가 돼요' },
];

export const GradeSelector: React.FC<GradeSelectorProps> = ({ onSelectGrade, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Progress Step Indicator */}
      <div className="flex items-center justify-between text-xs font-bold font-sans uppercase tracking-wider text-[#1A1A1A] bg-white px-4 py-2.5 border-2 border-black">
        <span className="flex items-center gap-1.5">
          <School className="w-4 h-4 text-[#2D5A27]" />
          <span>Dangsu Clover Campaign • Grade Selection</span>
        </span>
        <span className="bg-black text-white px-2.5 py-0.5 text-xs font-bold">
          Step 1 / 3
        </span>
      </div>

      <div className="text-center space-y-2">
        <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#2D5A27]">
          Step 01 • Grade
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1A1A1A] tracking-tight">
          몇 학년인가요?
        </h2>
        <p className="text-sm text-black/60 font-sans">
          자신의 학년을 선택해주세요. 다음 단계에서 반을 선택할 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
        {GRADES.map((item, idx) => (
          <motion.button
            key={item.grade}
            id={`select-grade-${item.grade}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
            onClick={() => onSelectGrade(item.grade)}
            className="group p-5 bg-white border-2 border-black hover:bg-[#F0F2EE] hover:border-[#2D5A27] transition-colors text-left flex flex-col justify-between h-36 cursor-pointer relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-sans font-bold px-2 py-0.5 border border-black bg-[#2D5A27] text-white">
                {item.tag}
              </span>
              <div className="w-7 h-7 border border-black bg-white group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div>
              <span className="text-3xl font-serif font-black text-[#1A1A1A] group-hover:text-[#2D5A27] transition-colors">
                {item.label}
              </span>
              <p className="text-xs text-black/50 font-sans mt-0.5">{item.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="pt-4 text-center">
        <button
          onClick={onBack}
          className="text-xs sm:text-sm text-black/60 hover:text-black underline font-sans font-bold uppercase tracking-wider cursor-pointer"
        >
          처음 화면으로 돌아가기
        </button>
      </div>
    </div>
  );
};
