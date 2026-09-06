import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award, CheckCircle2, Leaf, Globe2, Trees } from 'lucide-react';
import { CLOVER_CHALLENGES } from '../data/challenges';

interface IntroScreenProps {
  onStart: () => void;
  onOpenTeacher: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart, onOpenTeacher }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto w-full space-y-8 sm:space-y-10">
        {/* Collaboration Banner & Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black bg-white text-[#1A1A1A] text-xs font-sans font-bold uppercase tracking-widest shadow-xs">
            <span>🤝</span>
            <span>당수초등학교 × 경기도교육청 클로버 환경실천 13 챌린지</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1A1A] tracking-tight leading-tight">
            지구를 구하는 초록빛 약속 <br className="hidden sm:inline" />
            <span className="text-[#2D5A27] italic">
              13가지 환경실천 챌린지
            </span>
          </h2>

          <p className="text-base sm:text-lg text-black/75 max-w-2xl mx-auto leading-relaxed font-sans">
            당수초등학교 어린이들이 경기도 교육청 클로버 앱과 손잡고 일상 속에서 지구를 지키는 13가지 실천에 도전합니다.
            실천 사진을 업로드하고 13개의 인증 도장을 모두 모아 당수초 환경 영웅이 되어보세요.
          </p>
        </motion.div>

        {/* Promotion Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white border-2 border-black p-6 sm:p-8 relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-4 border border-black bg-[#FDFCF9] hover:bg-[#F0F2EE] transition-colors">
              <div className="w-11 h-11 border-2 border-black bg-[#2D5A27] text-white flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#2D5A27] mb-0.5">Section 01</p>
                <h3 className="font-serif font-bold text-[#1A1A1A] text-base">13가지 초록 실천</h3>
                <p className="text-xs text-black/70 mt-1 leading-relaxed">
                  잔반 제로, 텀블러, 분리배출 등 초등학생 눈높이에 맞춘 13가지 환경 과제
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-black bg-[#FDFCF9] hover:bg-[#F0F2EE] transition-colors">
              <div className="w-11 h-11 border-2 border-black bg-black text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-black/50 mb-0.5">Section 02</p>
                <h3 className="font-serif font-bold text-[#1A1A1A] text-base">사진 인증 도장</h3>
                <p className="text-xs text-black/70 mt-1 leading-relaxed">
                  실천 사진을 찍어 올리면 선명한 실천 완료 인증 도장이 쾅! 찍힙니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-black bg-[#FDFCF9] hover:bg-[#F0F2EE] transition-colors">
              <div className="w-11 h-11 border-2 border-black bg-white text-[#2D5A27] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#2D5A27] mb-0.5">Section 03</p>
                <h3 className="font-serif font-bold text-[#1A1A1A] text-base">환경영웅 인증서 수여</h3>
                <p className="text-xs text-black/70 mt-1 leading-relaxed">
                  13개 과제를 모두 완주하면 교장선생님·교육청 인증서와 격려 메시지 증정!
                </p>
              </div>
            </div>
          </div>

          {/* Collaborative Schools & Organizations info bar */}
          <div className="mt-6 pt-5 border-t border-black/15 flex flex-wrap items-center justify-between gap-4 text-xs text-black/60 font-medium font-sans">
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-[#2D5A27]" /> 수원 당수초등학교
              </span>
              <span>•</span>
              <span className="font-bold text-[#2D5A27] flex items-center gap-1.5">
                <Trees className="w-4 h-4" /> 경기도교육청 생태전환 클로버
              </span>
            </div>
            <div className="border border-black px-2.5 py-0.5 font-sans font-bold text-[11px] uppercase tracking-wider bg-white">
              대상: 1~6학년 전교생 참여
            </div>
          </div>
        </motion.div>

        {/* 13 Challenges Quick Glance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-sans font-black uppercase tracking-widest text-[#1A1A1A] flex items-center gap-2">
              <span>📋 13가지 환경실천 과제 일람</span>
            </h3>
            <span className="text-xs font-sans font-bold text-black/50 uppercase tracking-wider">Total 13 Missions</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
            {CLOVER_CHALLENGES.slice(0, 10).map((c) => (
              <div
                key={c.id}
                className="p-3 border border-black bg-white text-left flex items-center gap-2 hover:bg-[#F0F2EE] transition-colors"
              >
                <span className="font-serif font-black text-sm text-[#2D5A27] opacity-60 w-5">
                  {c.id < 10 ? `0${c.id}` : c.id}
                </span>
                <span className="text-xs font-bold text-[#1A1A1A] truncate font-sans">
                  {c.shortTitle}
                </span>
              </div>
            ))}
            <div className="p-3 border border-black bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-bold font-sans flex items-center justify-center col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-3 uppercase tracking-wider">
              + 그 외 3가지 알찬 환경 실천 과제 수록
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <button
            id="intro-start-btn"
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 border-2 border-black bg-[#2D5A27] hover:bg-black text-white font-sans font-black text-sm sm:text-base uppercase tracking-widest shadow-xs flex items-center justify-center gap-3 transition-colors cursor-pointer"
          >
            <span>도전 시작하기 (학년·반·번호 선택)</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            id="intro-teacher-btn"
            onClick={onOpenTeacher}
            className="w-full sm:w-auto px-8 py-4 border-2 border-black bg-white hover:bg-black hover:text-white text-black font-sans font-black text-sm sm:text-base uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5 text-[#2D5A27]" />
            <span>교사용 관리 포털</span>
          </button>
        </motion.div>
      </div>

      {/* Footer Info */}
      <footer className="text-center font-sans text-xs font-bold uppercase tracking-wider text-black/50 mt-10">
        Dangsu Elementary School Ecology Curriculum × Gyeonggi Clover Platform • 2024 Campaign
      </footer>
    </div>
  );
};
