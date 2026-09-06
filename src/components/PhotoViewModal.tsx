import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, MessageSquare, CheckCircle2, Download } from 'lucide-react';
import { Submission } from '../types';
import { CLOVER_CHALLENGES } from '../data/challenges';

interface PhotoViewModalProps {
  submission: Submission;
  grade: number;
  classNum: number;
  studentNum: number;
  studentName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoViewModal: React.FC<PhotoViewModalProps> = ({
  submission,
  grade,
  classNum,
  studentNum,
  studentName,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const challenge = CLOVER_CHALLENGES.find((c) => c.id === submission.challengeId);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = submission.photoUrl;
    link.download = `당수초_${grade}학년_${classNum}반_${studentNum}번_${challenge?.shortTitle || '환경실천'}.jpg`;
    link.click();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white border-2 border-black max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:px-6 border-b-2 border-black flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 border border-black bg-black text-white font-serif font-black text-sm flex items-center justify-center">
                {submission.challengeId}
              </span>
              <div>
                <h3 className="font-serif font-black text-[#1A1A1A] text-sm sm:text-base">
                  {challenge?.title || `챌린지 ${submission.challengeId}번`}
                </h3>
                <div className="flex items-center gap-2 text-xs font-sans text-black/60">
                  <span>{grade}학년 {classNum}반 {studentNum}번 {studentName ? `(${studentName})` : '학생'}</span>
                  <span>•</span>
                  <span>{submission.submittedAt}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 border border-black flex items-center justify-center text-[#1A1A1A] hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Photo Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
            <div className="relative border-2 border-black overflow-hidden bg-black max-h-[55vh] flex items-center justify-center">
              <img
                src={submission.photoUrl}
                alt="실천 인증 사진"
                referrerPolicy="no-referrer"
                className="max-h-[55vh] w-auto object-contain"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 border border-white bg-black/80 text-white text-xs font-sans font-bold flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A27]" />
                <span>당수초 실천 인증</span>
              </div>
            </div>

            {/* Memo / Reflection */}
            {submission.memo ? (
              <div className="p-4 bg-[#2D5A27]/5 border-l-4 border-[#2D5A27] text-xs sm:text-sm text-black/80 font-sans flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#2D5A27] block mb-0.5 uppercase tracking-wider text-xs">학생 실천 한 줄 소감</span>
                  <p className="leading-relaxed font-serif">"{submission.memo}"</p>
                </div>
              </div>
            ) : (
              <div className="text-xs font-sans text-black/40 italic">등록된 학생 소감이 없습니다.</div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t-2 border-black flex items-center justify-between bg-[#FDFCF9] font-sans">
            <button
              onClick={handleDownload}
              className="px-4 py-2 border border-black hover:bg-[#F0F2EE] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>사진 다운로드</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 border-2 border-black bg-black hover:bg-[#2D5A27] text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
