import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { X, Award, Printer, CheckCircle, Sparkles, Heart, Trees } from 'lucide-react';
import { StudentRecord } from '../types';
import { CLOVER_CHALLENGES } from '../data/challenges';

interface CompletionCertificateProps {
  grade: number;
  classNum: number;
  studentNum: number;
  studentRecord: StudentRecord;
  onClose: () => void;
}

export const CompletionCertificate: React.FC<CompletionCertificateProps> = ({
  grade,
  classNum,
  studentNum,
  studentRecord,
  onClose
}) => {
  useEffect(() => {
    // Fire festive celebratory confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      const timer = setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 350);
      return () => clearTimeout(timer);
    } catch (e) {
      console.log('Confetti trigger', e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const todayStr = studentRecord.completedAllAt
    ? studentRecord.completedAllAt.split(' ')[0]
    : new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#FDFCF9] border-4 border-black max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative my-auto print:border-none print:shadow-none print:p-2"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 border border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors print:hidden cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Outer Framing */}
        <div className="border border-black p-6 sm:p-8 relative bg-white">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-[#2D5A27] font-serif text-sm">✦</div>
          <div className="absolute top-2 right-2 text-[#2D5A27] font-serif text-sm">✦</div>
          <div className="absolute bottom-2 left-2 text-[#2D5A27] font-serif text-sm">✦</div>
          <div className="absolute bottom-2 right-2 text-[#2D5A27] font-serif text-sm">✦</div>

          <div className="text-center space-y-6">
            {/* Top Emblem & Collaboration Banner */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-black bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-sans font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>당수초등학교 × 경기도교육청 클로버 환경실천 13 챌린지</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#1A1A1A] tracking-tight">
                환경실천 챌린지 완주 인증서
              </h2>
              <p className="text-xs font-sans text-black/60 font-bold uppercase tracking-widest">
                Certificate of Environmental Action Excellence
              </p>
            </div>

            {/* Recipient */}
            <div className="py-3 border-y-2 border-black inline-block px-10 my-2">
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-[#2D5A27]">Awarded To</div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-[#1A1A1A] mt-1">
                {grade}학년 {classNum}반 {studentNum}번 어린이
              </div>
            </div>

            {/* Praise Message ("칭찬의 메시지") */}
            <div className="p-5 bg-[#2D5A27]/5 border-l-4 border-[#2D5A27] text-left space-y-2.5">
              <div className="flex items-center gap-2 text-[#2D5A27] font-sans font-black text-xs uppercase tracking-wider">
                <Heart className="w-4 h-4 text-[#2D5A27] fill-[#2D5A27]" />
                <span>칭찬과 격려의 말씀</span>
              </div>
              <p className="text-xs sm:text-sm text-black/80 font-serif leading-relaxed">
                축하합니다! 위 어린이는 당수초등학교와 경기도 교육청 클로버 앱이 함께한
                <strong className="text-[#2D5A27]"> 13가지 환경실천 챌린지</strong>를 하나도 빠짐없이 모두 성실하게 완수하였습니다.
              </p>
              <p className="text-xs sm:text-sm text-black/80 font-serif leading-relaxed">
                급식 잔반 남기지 않기부터 텀블러 사용, 분리배출, 에너지 절약까지 일상에서 보여준 작은 실천들이 모여 우리의 푸른 지구를 만드는 큰 힘이 되었습니다.
                앞으로도 지구를 아끼고 사랑하는 멋진 당수초 환경 영웅이 되어주기를 응원합니다.
              </p>
            </div>

            {/* 13 Stamps Summary Display */}
            <div className="pt-2">
              <div className="text-xs font-sans font-bold uppercase tracking-wider text-black/60 mb-2 flex items-center justify-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D5A27]" />
                <span>13 Missions All Completed</span>
              </div>
              <div className="grid grid-cols-7 sm:grid-cols-13 gap-1.5 justify-center">
                {CLOVER_CHALLENGES.map((c) => (
                  <div
                    key={c.id}
                    className="w-7 h-7 sm:w-8 sm:h-8 border border-black bg-[#2D5A27] text-white flex items-center justify-center text-[10px] sm:text-xs font-sans font-black"
                    title={`${c.id}번. ${c.shortTitle} 완료`}
                  >
                    ✓
                  </div>
                ))}
              </div>
            </div>

            {/* Issuer & Stamp Seal */}
            <div className="pt-5 flex items-center justify-between px-2 sm:px-6 border-t border-black/15 font-sans">
              <div className="text-left text-xs text-black/60">
                <div className="font-bold">발급일: {todayStr}</div>
                <div className="font-bold text-[#1A1A1A] mt-0.5">경기도교육청 클로버 생태환경교육</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs font-black font-serif text-[#1A1A1A]">
                  당수초등학교장
                </div>
                {/* School Seal */}
                <div className="w-13 h-13 rounded-full border-2 border-red-700 bg-red-50 text-red-700 flex items-center justify-center text-[9px] font-black leading-tight text-center rotate-[-4deg] shadow-2xs">
                  당수초<br />직인
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons for actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3 print:hidden font-sans">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-3 border-2 border-black bg-white hover:bg-black hover:text-white text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>인증서 인쇄 / PDF 저장</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 border-2 border-black bg-[#2D5A27] hover:bg-black text-white font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            확인 및 챌린지판 보기
          </button>
        </div>
      </motion.div>
    </div>
  );
};
