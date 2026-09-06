import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Award, Plus } from 'lucide-react';
import { loadAllRecords, getStorageKey } from '../services/storage';

interface StudentNumSelectorProps {
  grade: number;
  classNum: number;
  onSelectStudentNum: (studentNum: number) => void;
  onBack: () => void;
}

export const StudentNumSelector: React.FC<StudentNumSelectorProps> = ({
  grade,
  classNum,
  onSelectStudentNum,
  onBack
}) => {
  const [maxNum, setMaxNum] = useState<number>(30); // 1~30번
  const allRecords = useMemo(() => loadAllRecords(), [grade, classNum]);

  const numList = Array.from({ length: maxNum }, (_, i) => i + 1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between text-xs font-bold font-sans uppercase tracking-wider text-[#1A1A1A] bg-white px-4 py-2.5 border-2 border-black">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white px-2 py-0.5 font-bold">
            {grade}학년 {classNum}반
          </span>
          <span className="text-black/60">Student Number</span>
        </div>
        <span className="bg-black text-white px-2.5 py-0.5 text-xs font-bold">
          Step 3 / 3 (Final)
        </span>
      </div>

      <div className="text-center space-y-2">
        <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#2D5A27]">
          Step 03 • Student Number
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1A1A1A] tracking-tight">
          몇 번 학생인가요?
        </h2>
        <p className="text-sm text-black/60 font-sans">
          자신의 번호를 누르면 13개의 환경실천 챌린지 판으로 이동합니다.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2.5 sm:gap-3 pt-2">
        {numList.map((num, idx) => {
          const key = getStorageKey(grade, classNum, num);
          const studentRecord = allRecords[key];
          const completedCount = studentRecord ? Object.keys(studentRecord.submissions || {}).length : 0;
          const isAllDone = completedCount === 13;

          return (
            <motion.button
              key={num}
              id={`select-num-${num}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15, delay: Math.min(idx * 0.015, 0.3) }}
              onClick={() => onSelectStudentNum(num)}
              className={`p-3 sm:p-3.5 border-2 transition-colors flex flex-col items-center justify-between text-center relative cursor-pointer min-h-[105px] ${
                isAllDone
                  ? 'bg-[#2D5A27] text-white border-black hover:bg-black'
                  : completedCount > 0
                  ? 'bg-[#F0F2EE] text-[#1A1A1A] border-black hover:bg-[#E2E6DF]'
                  : 'bg-white text-[#1A1A1A] border-black hover:bg-[#F0F2EE]'
              }`}
            >
              {/* Badge for progress */}
              <div className="w-full flex justify-end">
                {isAllDone ? (
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-sans font-black tracking-wider uppercase bg-white text-[#2D5A27] px-1.5 py-0.5 border border-black">
                    <Award className="w-2.5 h-2.5" /> 완주
                  </span>
                ) : completedCount > 0 ? (
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-sans font-bold tracking-wider uppercase bg-black text-white px-1.5 py-0.5">
                    {completedCount}/13
                  </span>
                ) : (
                  <span className="text-[9px] font-sans uppercase text-black/40">대기</span>
                )}
              </div>

              {/* Number */}
              <div className="my-1">
                <span className="text-2xl sm:text-3xl font-serif font-black leading-none">
                  {num}
                  <span className="text-xs font-sans font-normal ml-0.5 opacity-70">번</span>
                </span>
              </div>

              {/* Status text */}
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider opacity-80">
                {isAllDone ? '13개 완주' : completedCount > 0 ? `${completedCount}개 실천` : '도전하기'}
              </span>
            </motion.button>
          );
        })}
      </div>

      {maxNum < 35 && (
        <div className="text-center pt-2">
          <button
            onClick={() => setMaxNum(35)}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-black/70 hover:text-black py-1.5 px-3.5 border border-black bg-white hover:bg-[#F0F2EE] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>번호 더 보기 (31~35번)</span>
          </button>
        </div>
      )}

      <div className="pt-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A] px-3.5 py-2 border border-black bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>반 다시 선택하기</span>
        </button>
      </div>
    </div>
  );
};
