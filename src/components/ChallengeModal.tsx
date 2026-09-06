import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Camera, Image as ImageIcon, CheckCircle2, Trash2, Sparkles, Lightbulb } from 'lucide-react';
import { Challenge, Submission } from '../types';
import { ChallengeIcon } from './ChallengeIcon';
import { compressImage } from '../utils/imageCompressor';

interface ChallengeModalProps {
  challenge: Challenge;
  submission?: Submission;
  grade: number;
  classNum: number;
  studentNum: number;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (photoUrl: string, memo: string) => void;
  onDelete?: () => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  challenge,
  submission,
  grade,
  classNum,
  studentNum,
  isOpen,
  onClose,
  onSubmit,
  onDelete
}) => {
  const [photoPreview, setPhotoPreview] = useState<string>(submission?.photoUrl || '');
  const [memo, setMemo] = useState<string>(submission?.memo || '');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const compressed = await compressImage(file);
      setPhotoPreview(compressed);
    } catch (err) {
      console.error('Failed to process image', err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleUseSamplePhoto = () => {
    setPhotoPreview(challenge.defaultSampleImage);
    if (!memo) {
      setMemo(`${challenge.shortTitle} 실천 완료했습니다!`);
    }
  };

  const handleSave = () => {
    if (!photoPreview) {
      alert('실천 사진을 업로드하거나 예시 사진을 선택해주세요!');
      return;
    }
    onSubmit(photoPreview, memo);
  };

  const isCompleted = !!submission;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white border-2 border-black max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white px-6 py-4 border-b-2 border-black flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 border border-black bg-black text-white font-serif font-black flex items-center justify-center text-sm">
                {challenge.id}
              </span>
              <span className="text-[10px] font-sans font-bold px-2 py-0.5 border border-black bg-[#2D5A27] text-white uppercase tracking-wider">
                {challenge.category}
              </span>
            </div>

            <button
              id="close-challenge-modal-btn"
              onClick={onClose}
              className="w-8 h-8 border border-black flex items-center justify-center text-[#1A1A1A] hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Title & Description */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 border border-black bg-[#F0F2EE] text-[#2D5A27] flex items-center justify-center shrink-0">
                  <ChallengeIcon name={challenge.iconName} className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-[#1A1A1A] leading-tight">
                  {challenge.title}
                </h3>
              </div>
              <p className="text-sm text-black/75 font-sans leading-relaxed pl-12">
                {challenge.description}
              </p>
            </div>

            {/* Practical Tip */}
            <div className="p-3.5 bg-[#2D5A27]/5 border-l-4 border-[#2D5A27] flex items-start gap-2.5 text-xs text-black/80 font-sans">
              <Lightbulb className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#2D5A27]">인증 꿀팁: </span>
                <span>{challenge.tip}</span>
              </div>
            </div>

            {/* Photo Upload Area */}
            <div className="space-y-2">
              <label className="block text-xs font-sans font-black uppercase tracking-wider text-[#1A1A1A]">
                실천 사진 인증 <span className="text-[#2D5A27]">*필수</span>
              </label>

              {photoPreview ? (
                <div className="relative border-2 border-black overflow-hidden bg-slate-50 group">
                  <img
                    src={photoPreview}
                    alt="실천 인증 사진"
                    referrerPolicy="no-referrer"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 border border-black bg-white text-black text-xs font-sans font-bold hover:bg-[#F0F2EE] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>사진 변경</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoPreview('')}
                      className="px-3 py-1.5 border border-black bg-black text-white text-xs font-sans font-bold hover:bg-rose-700 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>삭제</span>
                    </button>
                  </div>
                  {isCompleted && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 border-2 border-[#2D5A27] bg-white text-[#2D5A27] text-xs font-sans font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>인증 완료 도장</span>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-black hover:bg-[#F0F2EE] p-6 text-center transition-colors cursor-pointer space-y-3"
                >
                  <div className="w-12 h-12 mx-auto border-2 border-black bg-white text-[#2D5A27] flex items-center justify-center">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-serif font-bold text-[#1A1A1A]">
                      실천 사진을 찍거나 올려주세요
                    </p>
                    <p className="text-xs font-sans text-black/50 mt-1">
                      JPG, PNG 사진 파일 또는 카메라 촬영 지원
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1 px-3.5 py-1.5 border border-black bg-black text-white text-xs font-sans font-bold uppercase tracking-wider">
                      <Upload className="w-3.5 h-3.5" /> 사진 선택하기
                    </span>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Sample Photo Helper */}
              {!photoPreview && (
                <div className="flex items-center justify-between text-xs pt-1 font-sans">
                  <span className="text-black/50">사진이 지금 없나요?</span>
                  <button
                    type="button"
                    onClick={handleUseSamplePhoto}
                    className="text-[#2D5A27] hover:underline font-bold uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> 예시 실천 사진으로 테스트
                  </button>
                </div>
              )}
            </div>

            {/* Reflection / Memo */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans font-black uppercase tracking-wider text-[#1A1A1A]">
                나의 실천 한 줄 소감 (선택)
              </label>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="예: 오늘은 급식을 남기지 않고 식판을 깨끗이 비웠어요!"
                rows={2}
                className="w-full text-sm font-sans p-3 border-2 border-black focus:outline-none focus:bg-[#F0F2EE] resize-none"
              />
            </div>
          </div>

          {/* Footer Action */}
          <div className="sticky bottom-0 bg-[#FDFCF9] px-6 py-4 border-t-2 border-black flex items-center justify-between gap-3">
            {isCompleted && onDelete ? (
              <button
                type="button"
                onClick={onDelete}
                className="px-3.5 py-2.5 border border-rose-600 text-rose-700 hover:bg-rose-50 text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                도장 취소
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-black bg-white hover:bg-[#F0F2EE] text-[#1A1A1A] text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                닫기
              </button>
            )}

            <button
              id="submit-challenge-btn"
              type="button"
              disabled={isCompressing}
              onClick={handleSave}
              className="px-6 py-2.5 border-2 border-black bg-[#2D5A27] hover:bg-black text-white text-xs sm:text-sm font-sans font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? '수정하여 도장 찍기' : '실천 사진 등록 & 도장 쾅!'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
