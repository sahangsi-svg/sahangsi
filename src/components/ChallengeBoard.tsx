import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ArrowLeft, Sparkles, CheckCircle2, Calendar, MessageSquare, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Challenge, StudentRecord, Submission } from '../types';
import { CLOVER_CHALLENGES } from '../data/challenges';
import { ChallengeIcon } from './ChallengeIcon';
import { ChallengeModal } from './ChallengeModal';

interface ChallengeBoardProps {
  grade: number;
  classNum: number;
  studentNum: number;
  studentRecord: StudentRecord;
  onSaveSubmission: (challengeId: number, photoUrl: string, memo: string) => void;
  onDeleteSubmission: (challengeId: number) => void;
  onViewCertificate: () => void;
  onBackToNumSelect: () => void;
}

export const ChallengeBoard: React.FC<ChallengeBoardProps> = ({
  grade,
  classNum,
  studentNum,
  studentRecord,
  onSaveSubmission,
  onDeleteSubmission,
  onViewCertificate,
  onBackToNumSelect
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const completedCount = Object.keys(studentRecord.submissions || {}).length;
  const isAllDone = completedCount === 13;
  const progressPercent = Math.round((completedCount / 13) * 100);

  const handleCardClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleModalSubmit = (photoUrl: string, memo: string) => {
    if (!selectedChallenge) return;
    onSaveSubmission(selectedChallenge.id, photoUrl, memo);
    setSelectedChallenge(null);
  };

  const handleModalDelete = () => {
    if (!selectedChallenge) return;
    onDeleteSubmission(selectedChallenge.id);
    setSelectedChallenge(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Student Top Bar */}
      <div className="bg-white border-2 border-black p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#2D5A27] bg-[#2D5A27]/10 px-2 py-0.5 border border-black">
              Dangsu × Gyeonggi Clover
            </span>
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-black/50">Status</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-black text-white px-2.5 py-1 text-sm sm:text-base font-sans font-black">{grade}학년</span>
            <span className="bg-black text-white px-2.5 py-1 text-sm sm:text-base font-sans font-black">{classNum}반</span>
            <span className="border-2 border-black px-2.5 py-1 text-sm sm:text-base font-sans font-black">{studentNum}번</span>
            <span className="text-sm font-serif font-bold text-[#1A1A1A] ml-1">학생 환경 실천 카드</span>
          </div>
        </div>

        {/* Progress Display */}
        <div className="w-full md:w-80 p-4 bg-[#2D5A27]/5 border-l-4 border-[#2D5A27]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-sans font-bold text-[#2D5A27] uppercase tracking-wider">Progress</p>
            <span className="text-xs font-sans font-bold text-black/60">{progressPercent}% Completed</span>
          </div>
          <div className="text-3xl font-serif font-black text-[#1A1A1A] mt-1">
            {completedCount} <span className="text-base font-sans font-medium opacity-40">/ 13 Missions</span>
          </div>
          <div className="w-full bg-black/10 h-1.5 mt-3">
            <div className="bg-[#2D5A27] h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Completion Celebration Hero Banner (If all 13 are done) */}
      {isAllDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border-2 border-black bg-[#2D5A27] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center sm:text-left">
            <p className="font-sans text-xs uppercase tracking-widest opacity-80 font-bold">Environmental Hero Award</p>
            <h2 className="text-2xl sm:text-3xl font-serif font-black">모든 13개 챌린지 완주 달성!</h2>
            <p className="font-sans text-sm opacity-90 leading-relaxed max-w-xl">
              지구를 지키는 13가지 약속, 당수초등학교 학생이 완주했습니다. 칭찬 메시지와 공식 인증서를 확인해보세요.
            </p>
          </div>

          <button
            id="view-certificate-btn"
            onClick={onViewCertificate}
            className="shrink-0 px-6 py-3.5 border-2 border-white bg-white hover:bg-black hover:text-white text-black font-sans font-black text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <Award className="w-4 h-4 text-[#2D5A27]" />
            <span>인증서 및 칭찬 메시지 보기</span>
          </button>
        </motion.div>
      )}

      {/* 13 Challenges Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-sans font-black uppercase tracking-widest text-[#1A1A1A] flex items-center gap-2">
            <span>🍀 13개 환경실천 챌린지 판</span>
          </h3>
          <button
            onClick={onBackToNumSelect}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A] px-3 py-1.5 border border-black bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>번호 다시 선택</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLOVER_CHALLENGES.map((challenge) => {
            const submission = studentRecord.submissions[challenge.id];
            const isCompleted = !!submission;

            return (
              <motion.div
                key={challenge.id}
                id={`challenge-card-${challenge.id}`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                onClick={() => handleCardClick(challenge)}
                className={`relative p-5 border-2 border-black transition-colors cursor-pointer flex flex-col justify-between min-h-[240px] ${
                  isCompleted
                    ? 'bg-[#F0F2EE]'
                    : 'bg-white hover:bg-[#FDFCF9]'
                }`}
              >
                {/* Top Row: Number & Category */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-3xl font-black opacity-30 text-[#1A1A1A]">
                      {challenge.id < 10 ? `0${challenge.id}` : challenge.id}
                    </span>
                    <span className="text-[10px] font-sans font-bold px-2 py-0.5 border border-black bg-white text-[#1A1A1A] uppercase tracking-wider">
                      {challenge.category}
                    </span>
                  </div>

                  <div className="w-8 h-8 border border-black bg-white text-[#2D5A27] flex items-center justify-center">
                    <ChallengeIcon name={challenge.iconName} className="w-4 h-4" />
                  </div>
                </div>

                {/* Challenge Title & Info */}
                <div className="my-3 space-y-1.5">
                  <h4 className="font-serif font-bold text-[#1A1A1A] text-lg leading-snug">
                    {challenge.title}
                  </h4>
                  <p className="text-xs font-sans text-black/65 line-clamp-2 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                {/* Stamp & Status Bottom Section */}
                <div className="pt-3 border-t border-black/15 flex items-center justify-between">
                  {isCompleted ? (
                    <div className="flex items-center gap-2.5 w-full justify-between">
                      <div className="flex items-center gap-2">
                        {submission.photoUrl && (
                          <img
                            src={submission.photoUrl}
                            alt="인증"
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover border border-black"
                          />
                        )}
                        <div className="text-[11px] font-sans leading-tight">
                          <span className="font-bold text-[#2D5A27] block">인증 완료</span>
                          <span className="text-[10px] text-black/45">{submission.submittedAt.split(' ')[0]}</span>
                        </div>
                      </div>

                      {/* Editorial Circular Certified Stamp */}
                      <div className="w-12 h-12 rounded-full border-2 border-[#2D5A27] flex flex-col items-center justify-center text-[#2D5A27] bg-white transform rotate-[-6deg] shadow-2xs">
                        <span className="font-sans font-black text-[9px] tracking-wider leading-none uppercase">DONE</span>
                        <span className="font-sans font-bold text-[8px] leading-none mt-0.5">완료도장</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-sans text-black/50">실천 사진 등록</span>
                      <button className="px-3 py-1.5 bg-black text-white text-[10px] font-sans uppercase font-bold tracking-wider hover:bg-[#2D5A27] transition-colors">
                        Upload Photo
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Challenge Detail & Upload Modal */}
      {selectedChallenge && (
        <ChallengeModal
          challenge={selectedChallenge}
          submission={studentRecord.submissions[selectedChallenge.id]}
          grade={grade}
          classNum={classNum}
          studentNum={studentNum}
          isOpen={!!selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
          onSubmit={handleModalSubmit}
          onDelete={
            studentRecord.submissions[selectedChallenge.id]
              ? handleModalDelete
              : undefined
          }
        />
      )}
    </div>
  );
};
