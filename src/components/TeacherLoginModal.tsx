import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, X, ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';

interface TeacherLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const TeacherLoginModal: React.FC<TeacherLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setErrorMsg('');
      onSuccess();
    } else {
      setErrorMsg('비밀번호가 올바르지 않습니다. (안내된 비밀번호: 1234)');
    }
  };

  const handleAutoFill = () => {
    setPassword('1234');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white border-2 border-black max-w-sm w-full p-6 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 border border-black flex items-center justify-center text-[#1A1A1A] hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-12 h-12 mx-auto border-2 border-black bg-[#2D5A27] text-white flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#2D5A27] mb-0.5">Teacher Authentication</p>
            <h3 className="text-xl font-serif font-black text-[#1A1A1A]">선생님 관리자 로그인</h3>
            <p className="text-xs text-black/60 font-sans mt-1">
              학년·반·번호별 실천 사진 폴더와 제출 현황을 확인합니다.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-sans">
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-black uppercase tracking-wider text-[#1A1A1A]">
              비밀번호 입력 <span className="text-black/40 font-normal">(기본: 1234)</span>
            </label>
            <div className="relative">
              <input
                id="teacher-password-input"
                type="password"
                maxLength={10}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="비밀번호 4자리 입력"
                className="w-full text-center text-lg tracking-widest font-mono py-2.5 px-4 border-2 border-black focus:outline-none focus:bg-[#F0F2EE]"
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-black/40 absolute left-3 top-3.5" />
            </div>
            {errorMsg && (
              <p className="text-xs font-bold text-rose-600 flex items-center gap-1 mt-1">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <button
              type="button"
              onClick={handleAutoFill}
              className="text-[#2D5A27] hover:underline font-bold uppercase tracking-wider cursor-pointer"
            >
              '1234' 자동 입력
            </button>
            <span className="text-black/40 uppercase text-[10px] font-bold tracking-wider">Teacher Mode</span>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-black bg-white hover:bg-black hover:text-white text-[#1A1A1A] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              id="teacher-login-submit-btn"
              type="submit"
              className="flex-1 py-2.5 border-2 border-black bg-[#2D5A27] hover:bg-black text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>입장하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
