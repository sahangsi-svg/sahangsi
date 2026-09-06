import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowLeft, Plus } from 'lucide-react';

interface ClassSelectorProps {
  grade: number;
  onSelectClass: (classNum: number) => void;
  onBack: () => void;
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({ grade, onSelectClass, onBack }) => {
  const [maxClass, setMaxClass] = useState<number>(6); // 기본 1~6반
  const classList = Array.from({ length: maxClass }, (_, i) => i + 1);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between text-xs font-bold font-sans uppercase tracking-wider text-[#1A1A1A] bg-white px-4 py-2.5 border-2 border-black">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white px-2 py-0.5 font-bold">
            {grade}학년
          </span>
          <span className="text-black/60">Class Selection</span>
        </div>
        <span className="bg-black text-white px-2.5 py-0.5 text-xs font-bold">
          Step 2 / 3
        </span>
      </div>

      <div className="text-center space-y-2">
        <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#2D5A27]">
          Step 02 • Class
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1A1A1A] tracking-tight">
          {grade}학년 몇 반인가요?
        </h2>
        <p className="text-sm text-black/60 font-sans">
          자신의 학급(반)을 선택해주세요.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
        {classList.map((cNum, idx) => (
          <motion.button
            key={cNum}
            id={`select-class-${cNum}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: idx * 0.03 }}
            onClick={() => onSelectClass(cNum)}
            className="group p-5 bg-white border-2 border-black hover:bg-[#F0F2EE] hover:border-[#2D5A27] transition-colors text-center flex flex-col items-center justify-center gap-1.5 h-28 cursor-pointer"
          >
            <span className="text-3xl sm:text-4xl font-serif font-black text-[#1A1A1A] group-hover:text-[#2D5A27] transition-colors">
              {cNum}반
            </span>
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-black/50 group-hover:text-[#2D5A27]">
              Class {cNum} &rarr;
            </span>
          </motion.button>
        ))}
      </div>

      {maxClass < 10 && (
        <div className="text-center pt-2">
          <button
            onClick={() => setMaxClass(10)}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-black/70 hover:text-black py-1.5 px-3.5 border border-black bg-white hover:bg-[#F0F2EE] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>반 번호 더 보기 (7~10반)</span>
          </button>
        </div>
      )}

      <div className="pt-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A] px-3.5 py-2 border border-black bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>다른 학년 선택하기</span>
        </button>
      </div>
    </div>
  );
};
