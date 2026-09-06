import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Folder,
  FolderOpen,
  ChevronRight,
  FileImage,
  ArrowLeft,
  Calendar,
  Eye,
  Award,
  Info,
  CheckCircle,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';
import { StorageState, StudentRecord, Submission } from '../types';
import { CLOVER_CHALLENGES } from '../data/challenges';
import { PhotoViewModal } from './PhotoViewModal';

interface FolderExplorerProps {
  records: StorageState;
}

type NavigationLevel = 'root' | 'grade' | 'class' | 'student';

export const FolderExplorer: React.FC<FolderExplorerProps> = ({ records }) => {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(3); // Default to 3학년 to show the prompt sample
  const [selectedClass, setSelectedClass] = useState<number | null>(1); // Default to 1반
  const [selectedStudent, setSelectedStudent] = useState<number | null>(1); // Default to 1번
  const [previewSubmission, setPreviewSubmission] = useState<{
    submission: Submission;
    grade: number;
    classNum: number;
    studentNum: number;
    studentName?: string;
  } | null>(null);

  // Compute active hierarchy from records
  const allRecordsList: StudentRecord[] = Object.values(records);

  const activeGrades = Array.from(
    new Set(
      allRecordsList
        .filter((r: StudentRecord) => Object.keys(r.submissions || {}).length > 0)
        .map((r: StudentRecord) => r.grade)
    )
  ).sort((a, b) => a - b);

  const getClassesForGrade = (g: number) => {
    return Array.from(
      new Set(
        allRecordsList
          .filter((r: StudentRecord) => r.grade === g && Object.keys(r.submissions || {}).length > 0)
          .map((r: StudentRecord) => r.classNum)
      )
    ).sort((a, b) => a - b);
  };

  const getStudentsForClass = (g: number, c: number): StudentRecord[] => {
    return allRecordsList
      .filter((r: StudentRecord) => r.grade === g && r.classNum === c && Object.keys(r.submissions || {}).length > 0)
      .sort((a, b) => a.studentNum - b.studentNum);
  };

  // Determine current navigation view level
  let currentLevel: NavigationLevel = 'root';
  if (selectedGrade !== null) {
    if (selectedClass !== null) {
      if (selectedStudent !== null) {
        currentLevel = 'student';
      } else {
        currentLevel = 'class';
      }
    } else {
      currentLevel = 'grade';
    }
  }

  // Active student record if at student level
  const currentStudentRecord =
    selectedGrade && selectedClass && selectedStudent
      ? records[`${selectedGrade}-${selectedClass}-${selectedStudent}`]
      : null;

  return (
    <div className="space-y-6">
      {/* Information Helper Box */}
      <div className="p-4 bg-[#2D5A27]/5 border-l-4 border-[#2D5A27] text-xs sm:text-sm text-black/80 font-sans flex items-start gap-3">
        <Info className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-[#2D5A27] uppercase tracking-wider block text-xs">
            자동 계층 폴더 아카이브 시스템
          </span>
          <p className="text-black/75 leading-relaxed text-xs">
            학생이 사진을 제출하면 <strong>[학년 폴더]</strong>가 자동 생성되고, 그 안에 <strong>[반 폴더]</strong>가 생기며, 그 하위에 <strong>[번호 폴더]</strong>가 생성되어 제출 사진들이 체계적으로 보관됩니다.
            (예: 3학년 1반 1번 학생 제출 시 &rarr; 3학년 폴더 &rarr; 1반 폴더 &rarr; 1번 폴더에 자동 분류)
          </p>
        </div>
      </div>

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-2 border-black p-2.5 sm:px-4 flex items-center flex-wrap gap-2 text-xs font-sans">
        <button
          onClick={() => {
            setSelectedGrade(null);
            setSelectedClass(null);
            setSelectedStudent(null);
          }}
          className={`flex items-center gap-1.5 px-3 py-1 font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            currentLevel === 'root'
              ? 'bg-black text-white'
              : 'text-black hover:bg-[#F0F2EE]'
          }`}
        >
          <Folder className="w-4 h-4" />
          <span>전체 아카이브</span>
        </button>

        {selectedGrade !== null && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-black/30" />
            <button
              onClick={() => {
                setSelectedClass(null);
                setSelectedStudent(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                currentLevel === 'grade'
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-[#F0F2EE]'
              }`}
            >
              <Folder className="w-4 h-4" />
              <span>{selectedGrade}학년 폴더</span>
            </button>
          </>
        )}

        {selectedClass !== null && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-black/30" />
            <button
              onClick={() => {
                setSelectedStudent(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                currentLevel === 'class'
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-[#F0F2EE]'
              }`}
            >
              <Folder className="w-4 h-4" />
              <span>{selectedClass}반 폴더</span>
            </button>
          </>
        )}

        {selectedStudent !== null && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-black/30" />
            <span className="flex items-center gap-1.5 px-3 py-1 font-bold uppercase tracking-wider bg-black text-white">
              <FolderOpen className="w-4 h-4" />
              <span>{selectedStudent}번 학생 폴더</span>
            </span>
          </>
        )}
      </div>

      {/* Main Folder Explorer Area */}
      <div className="bg-white border-2 border-black p-6 min-h-[420px]">
        {/* LEVEL 1: ROOT (Shows Grade Folders) */}
        {currentLevel === 'root' && (
          <div className="space-y-4 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <h4 className="text-base font-serif font-black text-[#1A1A1A] flex items-center gap-2">
                <span>📁 학년별 보관함 폴더</span>
                <span className="text-xs font-normal text-black/50 font-sans">
                  (사진이 제출된 학년의 폴더가 표시됩니다)
                </span>
              </h4>
              <span className="text-xs text-black/50 font-bold uppercase tracking-wider">
                총 {activeGrades.length}개 학년
              </span>
            </div>

            {activeGrades.length === 0 ? (
              <div className="py-16 text-center text-black/40 space-y-2 font-sans">
                <Folder className="w-12 h-12 mx-auto text-black/20" />
                <p className="text-sm font-bold">아직 제출된 환경실천 사진이 없습니다.</p>
                <p className="text-xs">학생들이 사진을 등록하면 자동으로 학년 폴더가 생성됩니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {activeGrades.map((g) => {
                  const classes = getClassesForGrade(g);
                  const totalSubmissions = allRecordsList
                    .filter((r: StudentRecord) => r.grade === g)
                    .reduce((acc: number, r: StudentRecord) => acc + Object.keys(r.submissions || {}).length, 0);

                  return (
                    <motion.button
                      key={g}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedGrade(g)}
                      className="p-5 bg-[#FDFCF9] hover:bg-[#F0F2EE] border-2 border-black transition-colors text-left flex flex-col justify-between h-36 group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 border border-black bg-white text-[#2D5A27] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                          <Folder className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold font-sans uppercase tracking-wider text-black/60 group-hover:text-black">
                          OPEN &rarr;
                        </span>
                      </div>
                      <div>
                        <h5 className="text-lg font-serif font-black text-[#1A1A1A]">
                          {g}학년 폴더
                        </h5>
                        <p className="text-xs text-black/50 font-sans mt-0.5">
                          {classes.length}개 반 • 사진 {totalSubmissions}장
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* LEVEL 2: GRADE SELECTED (Shows Class Folders) */}
        {currentLevel === 'grade' && selectedGrade !== null && (
          <div className="space-y-4 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedGrade(null)}
                  className="w-7 h-7 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                  title="상위 폴더로"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h4 className="text-base font-serif font-black text-[#1A1A1A]">
                  📁 {selectedGrade}학년 하위 학급(반) 폴더
                </h4>
              </div>
              <span className="text-xs text-black/50 font-bold uppercase tracking-wider">
                {getClassesForGrade(selectedGrade).length}개 학급
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {getClassesForGrade(selectedGrade).map((c) => {
                const students = getStudentsForClass(selectedGrade, c);
                const classPhotoCount = students.reduce(
                  (acc: number, s: StudentRecord) => acc + Object.keys(s.submissions || {}).length,
                  0
                );

                return (
                  <motion.button
                    key={c}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedClass(c)}
                    className="p-5 bg-[#FDFCF9] hover:bg-[#F0F2EE] border-2 border-black transition-colors text-left flex flex-col justify-between h-36 group cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 border border-black bg-white text-[#2D5A27] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        <Folder className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold font-sans uppercase tracking-wider text-black/60 group-hover:text-black">
                        OPEN &rarr;
                      </span>
                    </div>
                    <div>
                      <h5 className="text-lg font-serif font-black text-[#1A1A1A]">
                        {c}반 폴더
                      </h5>
                      <p className="text-xs text-black/50 font-sans mt-0.5">
                        학생 {students.length}명 • 사진 {classPhotoCount}장
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* LEVEL 3: CLASS SELECTED (Shows Student Number Folders) */}
        {currentLevel === 'class' && selectedGrade !== null && selectedClass !== null && (
          <div className="space-y-4 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedClass(null)}
                  className="w-7 h-7 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                  title="상위 반 폴더로"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h4 className="text-base font-serif font-black text-[#1A1A1A]">
                  📁 {selectedGrade}학년 {selectedClass}반 학생 번호 폴더
                </h4>
              </div>
              <span className="text-xs text-black/50 font-bold uppercase tracking-wider">
                제출 학생 {getStudentsForClass(selectedGrade, selectedClass).length}명
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {getStudentsForClass(selectedGrade, selectedClass).map((student) => {
                const count = Object.keys(student.submissions || {}).length;
                const isAllDone = count === 13;

                return (
                  <motion.button
                    key={student.studentNum}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedStudent(student.studentNum)}
                    className={`p-5 border-2 transition-colors text-left flex flex-col justify-between h-36 group cursor-pointer shadow-xs ${
                      isAllDone
                        ? 'bg-[#2D5A27]/10 border-[#2D5A27] hover:bg-[#2D5A27]/20'
                        : 'bg-[#FDFCF9] hover:bg-[#F0F2EE] border-black'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 border border-black flex items-center justify-center transition-colors ${
                          isAllDone
                            ? 'bg-[#2D5A27] text-white'
                            : 'bg-white text-[#2D5A27] group-hover:bg-black group-hover:text-white'
                        }`}
                      >
                        <Folder className="w-5 h-5" />
                      </div>
                      {isAllDone ? (
                        <span className="text-[10px] font-black px-2 py-0.5 border border-[#2D5A27] bg-[#2D5A27] text-white flex items-center gap-0.5 uppercase tracking-wider">
                          <Award className="w-3 h-3" /> 13 완주
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-black/60 group-hover:text-black uppercase tracking-wider">
                          OPEN &rarr;
                        </span>
                      )}
                    </div>
                    <div>
                      <h5 className="text-lg font-serif font-black text-[#1A1A1A]">
                        {student.studentNum}번 폴더
                      </h5>
                      <p className="text-xs text-black/50 mt-0.5">
                        {count}/13 완료 ({count}장 보관)
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* LEVEL 4: STUDENT SELECTED (Shows submitted photos for this student) */}
        {currentLevel === 'student' &&
          selectedGrade !== null &&
          selectedClass !== null &&
          selectedStudent !== null &&
          currentStudentRecord && (
            <div className="space-y-5 font-sans">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-black/10">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="w-7 h-7 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                    title="상위 반 폴더로"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="w-9 h-9 border border-black bg-black text-white flex items-center justify-center">
                    <FolderOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-black text-[#1A1A1A]">
                      {selectedGrade}학년 {selectedClass}반 {selectedStudent}번 학생 보관함
                    </h4>
                    <p className="text-xs text-black/60">
                      총 {Object.keys(currentStudentRecord.submissions).length}개의 환경실천 사진이 보관되어 있습니다.
                    </p>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 border border-black bg-[#2D5A27] text-white text-xs font-bold uppercase tracking-wider">
                    달성률: {Object.keys(currentStudentRecord.submissions).length} / 13개 (
                    {Math.round(
                      (Object.keys(currentStudentRecord.submissions).length / 13) * 100
                    )}
                    %)
                  </span>
                </div>
              </div>

              {/* Photos Grid */}
              {Object.keys(currentStudentRecord.submissions).length === 0 ? (
                <div className="py-12 text-center text-black/40 space-y-2 font-sans">
                  <FileImage className="w-10 h-10 mx-auto text-black/20" />
                  <p className="text-sm font-bold">제출된 사진이 없습니다.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(Object.values(currentStudentRecord.submissions) as Submission[]).map((sub: Submission) => {
                    const challenge = CLOVER_CHALLENGES.find((c) => c.id === sub.challengeId);

                    return (
                      <div
                        key={sub.challengeId}
                        className="border-2 border-black bg-white overflow-hidden flex flex-col justify-between"
                      >
                        {/* File Thumbnail */}
                        <div
                          onClick={() =>
                            setPreviewSubmission({
                              submission: sub,
                              grade: selectedGrade,
                              classNum: selectedClass,
                              studentNum: selectedStudent,
                              studentName: currentStudentRecord.studentName
                            })
                          }
                          className="relative h-44 bg-black cursor-pointer overflow-hidden group"
                        >
                          <img
                            src={sub.photoUrl}
                            alt={challenge?.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-3 py-1.5 border border-black bg-white text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              <span>사진 크게 보기</span>
                            </span>
                          </div>
                          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black text-white text-[11px] font-mono border border-white">
                            챌린지 {sub.challengeId}번
                          </div>
                        </div>

                        {/* File details */}
                        <div className="p-4 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-serif font-black text-[#1A1A1A] text-sm leading-snug line-clamp-1">
                              {challenge?.title || `챌린지 ${sub.challengeId}번`}
                            </h5>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 border border-black bg-[#2D5A27] text-white shrink-0 uppercase">
                              {challenge?.category}
                            </span>
                          </div>

                          {sub.memo && (
                            <p className="text-xs text-black/80 line-clamp-2 bg-[#F0F2EE] p-2 font-serif italic">
                              "{sub.memo}"
                            </p>
                          )}

                          <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[11px] text-black/50">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{sub.submittedAt}</span>
                            </span>

                            <button
                              onClick={() =>
                                setPreviewSubmission({
                                  submission: sub,
                                  grade: selectedGrade,
                                  classNum: selectedClass,
                                  studentNum: selectedStudent,
                                  studentName: currentStudentRecord.studentName
                                })
                              }
                              className="text-[#2D5A27] hover:underline font-bold uppercase tracking-wider cursor-pointer"
                            >
                              상세 보기
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
      </div>

      {/* Photo View Modal */}
      {previewSubmission && (
        <PhotoViewModal
          submission={previewSubmission.submission}
          grade={previewSubmission.grade}
          classNum={previewSubmission.classNum}
          studentNum={previewSubmission.studentNum}
          studentName={previewSubmission.studentName}
          isOpen={!!previewSubmission}
          onClose={() => setPreviewSubmission(null)}
        />
      )}
    </div>
  );
};
