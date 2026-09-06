import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Award,
  CheckCircle2,
  Filter,
  Eye,
  TrendingUp,
  Image as ImageIcon,
  Check,
  ChevronDown
} from 'lucide-react';
import { StorageState, Submission, StudentRecord } from '../types';
import { CLOVER_CHALLENGES } from '../data/challenges';
import { PhotoViewModal } from './PhotoViewModal';

interface ClassStatusBoardProps {
  records: StorageState;
}

export const ClassStatusBoard: React.FC<ClassStatusBoardProps> = ({ records }) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(3); // Default 3학년
  const [selectedClass, setSelectedClass] = useState<number>(1); // Default 1반
  const [filterMode, setFilterMode] = useState<'all' | 'completed' | 'active' | 'empty'>('all');
  const [previewSubmission, setPreviewSubmission] = useState<{
    submission: Submission;
    grade: number;
    classNum: number;
    studentNum: number;
    studentName?: string;
  } | null>(null);

  // Class student numbers 1~30
  const studentNumbers = Array.from({ length: 30 }, (_, i) => i + 1);

  // Compute student data for selected grade & class
  const classStudentsData = useMemo(() => {
    return studentNumbers.map((num) => {
      const key = `${selectedGrade}-${selectedClass}-${num}`;
      const record = records[key] || {
        grade: selectedGrade,
        classNum: selectedClass,
        studentNum: num,
        submissions: {},
        updatedAt: ''
      };
      const completedCount = Object.keys(record.submissions || {}).length;
      return {
        studentNum: num,
        record,
        completedCount,
        isCompletedAll: completedCount === 13,
        hasStarted: completedCount > 0
      };
    });
  }, [records, selectedGrade, selectedClass]);

  // KPIs
  const participatingStudents = classStudentsData.filter((s) => s.hasStarted).length;
  const completedAllStudents = classStudentsData.filter((s) => s.isCompletedAll).length;
  const totalSubmissionsInClass = classStudentsData.reduce(
    (acc, s) => acc + s.completedCount,
    0
  );
  const classAvgPercentage = Math.round((totalSubmissionsInClass / (30 * 13)) * 100);

  // Filtered student list
  const filteredStudents = useMemo(() => {
    return classStudentsData.filter((s) => {
      if (filterMode === 'completed') return s.isCompletedAll;
      if (filterMode === 'active') return s.hasStarted && !s.isCompletedAll;
      if (filterMode === 'empty') return !s.hasStarted;
      return true;
    });
  }, [classStudentsData, filterMode]);

  return (
    <div className="space-y-6 font-sans">
      {/* Grade & Class Selector Header Bar */}
      <div className="bg-white border-2 border-black p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 border border-black bg-[#2D5A27] text-white text-[10px] font-bold uppercase tracking-wider">
              학급 실천 현황 매트릭스
            </span>
            <span className="text-xs text-black/60 font-medium">당수초등학교 생태환경 콜라보</span>
          </div>
          <h3 className="text-2xl font-serif font-black text-[#1A1A1A]">
            {selectedGrade}학년 {selectedClass}반 전체 챌린지 현황판
          </h3>
        </div>

        {/* Grade & Class Pickers */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 border-2 border-black bg-[#FDFCF9] p-1 px-2">
            <label className="text-xs font-bold text-black uppercase tracking-wider">학년</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(Number(e.target.value))}
              className="bg-transparent font-serif font-bold text-sm text-black py-1 px-2 border-none focus:outline-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <option key={g} value={g}>
                  {g}학년
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 border-2 border-black bg-[#FDFCF9] p-1 px-2">
            <label className="text-xs font-bold text-black uppercase tracking-wider">학급</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(Number(e.target.value))}
              className="bg-transparent font-serif font-bold text-sm text-black py-1 px-2 border-none focus:outline-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
                <option key={c} value={c}>
                  {c}반
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Class Metric Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 bg-white border-2 border-black shadow-xs">
          <div className="text-[11px] text-black/60 font-bold uppercase tracking-wider">참여 학생 수</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-3xl font-serif font-black text-[#1A1A1A]">{participatingStudents}</span>
            <span className="text-xs text-black/50">/ 30명 ({Math.round((participatingStudents / 30) * 100)}%)</span>
          </div>
        </div>

        <div className="p-4 bg-white border-2 border-black shadow-xs">
          <div className="text-[11px] text-black/60 font-bold uppercase tracking-wider">13개 완주 학생</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-3xl font-serif font-black text-[#2D5A27]">{completedAllStudents}</span>
            <span className="text-xs text-black/50">명 완주</span>
          </div>
        </div>

        <div className="p-4 bg-white border-2 border-black shadow-xs">
          <div className="text-[11px] text-black/60 font-bold uppercase tracking-wider">학급 총 실천 사진</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-3xl font-serif font-black text-[#1A1A1A]">{totalSubmissionsInClass}</span>
            <span className="text-xs text-black/50">장 보관</span>
          </div>
        </div>

        <div className="p-4 bg-white border-2 border-black shadow-xs">
          <div className="text-[11px] text-black/60 font-bold uppercase tracking-wider">학급 전체 달성률</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-3xl font-serif font-black text-[#2D5A27]">{classAvgPercentage}%</span>
            <span className="text-xs text-black/50">달성</span>
          </div>
        </div>
      </div>

      {/* Table Filters & Guidance */}
      <div className="bg-white border-2 border-black p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-serif font-black text-[#1A1A1A] text-base">
              📋 {selectedGrade}학년 {selectedClass}반 학생별 13개 챌린지 실천 매트릭스
            </h4>
            <p className="text-xs text-black/60 mt-0.5">
              체크 아이콘을 누르면 학생이 제출한 실천 사진과 소감을 바로 확인할 수 있습니다.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 border border-black uppercase tracking-wider transition-colors cursor-pointer ${
                filterMode === 'all' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#F0F2EE]'
              }`}
            >
              전체 (30명)
            </button>
            <button
              onClick={() => setFilterMode('completed')}
              className={`px-3 py-1 border border-black uppercase tracking-wider transition-colors cursor-pointer ${
                filterMode === 'completed' ? 'bg-[#2D5A27] text-white' : 'bg-white text-black hover:bg-[#F0F2EE]'
              }`}
            >
              완주 ({completedAllStudents})
            </button>
            <button
              onClick={() => setFilterMode('active')}
              className={`px-3 py-1 border border-black uppercase tracking-wider transition-colors cursor-pointer ${
                filterMode === 'active' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#F0F2EE]'
              }`}
            >
              진행 중 ({participatingStudents - completedAllStudents})
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto border-2 border-black">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F0F2EE] text-black border-b-2 border-black">
                <th className="py-3 px-3.5 font-serif font-bold sticky left-0 bg-[#F0F2EE] z-10 w-24 border-r-2 border-black">
                  학생 번호
                </th>
                <th className="py-3 px-2 font-serif font-bold text-center w-20 border-r-2 border-black">
                  진행 현황
                </th>
                {CLOVER_CHALLENGES.map((c) => (
                  <th
                    key={c.id}
                    className="py-3 px-1 font-serif font-bold text-center w-12 min-w-[44px] border-r border-black/20 last:border-none"
                    title={`${c.id}번: ${c.title}`}
                  >
                    <span className="block">{c.id}번</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {filteredStudents.map(({ studentNum, record, completedCount, isCompletedAll, hasStarted }) => (
                <tr
                  key={studentNum}
                  className={`hover:bg-[#F0F2EE]/50 transition-colors ${
                    isCompletedAll ? 'bg-[#2D5A27]/5' : ''
                  }`}
                >
                  {/* Student Number Header */}
                  <td className="py-2.5 px-3.5 font-serif font-bold text-[#1A1A1A] sticky left-0 bg-white border-r-2 border-black whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span>{studentNum}번</span>
                      {isCompletedAll && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 border border-[#2D5A27] bg-[#2D5A27] text-white">
                          완주 🏆
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Progress Badge */}
                  <td className="py-2.5 px-2 text-center border-r-2 border-black whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 border text-[11px] font-mono font-bold ${
                        isCompletedAll
                          ? 'border-[#2D5A27] bg-[#2D5A27] text-white'
                          : hasStarted
                          ? 'border-black bg-black text-white'
                          : 'border-black/20 text-black/40'
                      }`}
                    >
                      {completedCount} / 13
                    </span>
                  </td>

                  {/* 13 Challenge Cells */}
                  {CLOVER_CHALLENGES.map((c) => {
                    const sub = record.submissions[c.id];
                    return (
                      <td
                        key={c.id}
                        className="py-2 px-1 text-center border-r border-black/10 last:border-none"
                      >
                        {sub ? (
                          <button
                            onClick={() =>
                              setPreviewSubmission({
                                submission: sub,
                                grade: selectedGrade,
                                classNum: selectedClass,
                                studentNum: studentNum,
                                studentName: record.studentName
                              })
                            }
                            title={`${studentNum}번 학생의 ${c.id}번 [${c.shortTitle}] 사진 보기`}
                            className="w-7 h-7 mx-auto border border-black bg-[#2D5A27] hover:bg-black text-white flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                          >
                            <span className="text-[11px]">✓</span>
                          </button>
                        ) : (
                          <span className="text-black/20 font-normal">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
