import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { GradeSelector } from './components/GradeSelector';
import { ClassSelector } from './components/ClassSelector';
import { StudentNumSelector } from './components/StudentNumSelector';
import { ChallengeBoard } from './components/ChallengeBoard';
import { CompletionCertificate } from './components/CompletionCertificate';
import { TeacherDashboard } from './components/TeacherDashboard';
import {
  loadAllRecords,
  getStudentRecord,
  saveStudentSubmission,
  removeStudentSubmission,
  resetDemoData
} from './services/storage';
import { StorageState } from './types';

type ScreenType = 'intro' | 'grade' | 'class' | 'studentNum' | 'challenges' | 'teacher';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('intro');
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedStudentNum, setSelectedStudentNum] = useState<number | null>(null);

  const [records, setRecords] = useState<StorageState>(loadAllRecords);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Sync state from storage
  useEffect(() => {
    setRecords(loadAllRecords());
  }, []);

  // Handlers for Navigation
  const handleStart = () => {
    setCurrentScreen('grade');
  };

  const handleSelectGrade = (grade: number) => {
    setSelectedGrade(grade);
    setCurrentScreen('class');
  };

  const handleSelectClass = (classNum: number) => {
    setSelectedClass(classNum);
    setCurrentScreen('studentNum');
  };

  const handleSelectStudentNum = (studentNum: number) => {
    setSelectedStudentNum(studentNum);
    setCurrentScreen('challenges');
  };

  const handleGoHome = () => {
    setCurrentScreen('intro');
  };

  const handleGoBack = () => {
    if (currentScreen === 'grade') {
      setCurrentScreen('intro');
    } else if (currentScreen === 'class') {
      setCurrentScreen('grade');
    } else if (currentScreen === 'studentNum') {
      setCurrentScreen('class');
    } else if (currentScreen === 'challenges') {
      setCurrentScreen('studentNum');
    } else if (currentScreen === 'teacher') {
      setCurrentScreen('intro');
    }
  };

  // Teacher portal handler (Password removed as requested)
  const handleOpenTeacher = () => {
    setCurrentScreen('teacher');
  };

  // Submission handler
  const handleSaveSubmission = (challengeId: number, photoUrl: string, memo: string) => {
    if (!selectedGrade || !selectedClass || !selectedStudentNum) return;

    const { isNewlyCompletedAll } = saveStudentSubmission(
      selectedGrade,
      selectedClass,
      selectedStudentNum,
      challengeId,
      photoUrl,
      memo
    );

    // Refresh state
    const updated = loadAllRecords();
    setRecords(updated);

    // If student just completed all 13 challenges, immediately trigger the praise and certificate modal!
    if (isNewlyCompletedAll) {
      setShowCertificateModal(true);
    }
  };

  const handleDeleteSubmission = (challengeId: number) => {
    if (!selectedGrade || !selectedClass || !selectedStudentNum) return;

    removeStudentSubmission(selectedGrade, selectedClass, selectedStudentNum, challengeId);
    setRecords(loadAllRecords());
  };

  const handleResetData = () => {
    resetDemoData();
    setRecords(loadAllRecords());
  };

  // Active student record
  const currentStudentRecord =
    selectedGrade && selectedClass && selectedStudentNum
      ? getStudentRecord(selectedGrade, selectedClass, selectedStudentNum)
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-slate-50 to-white text-slate-800 flex flex-col font-sans">
      <Header
        currentScreen={currentScreen}
        grade={selectedGrade}
        classNum={selectedClass}
        studentNum={selectedStudentNum}
        onGoHome={handleGoHome}
        onGoBack={handleGoBack}
        onOpenTeacher={handleOpenTeacher}
        isTeacherMode={currentScreen === 'teacher'}
      />

      <main className="flex-1">
        {/* Screen 1: Intro Screen with collaboration promo */}
        {currentScreen === 'intro' && (
          <IntroScreen onStart={handleStart} onOpenTeacher={handleOpenTeacher} />
        )}

        {/* Screen 2: Select Grade */}
        {currentScreen === 'grade' && (
          <GradeSelector
            onSelectGrade={handleSelectGrade}
            onBack={() => setCurrentScreen('intro')}
          />
        )}

        {/* Screen 3: Select Class */}
        {currentScreen === 'class' && selectedGrade !== null && (
          <ClassSelector
            grade={selectedGrade}
            onSelectClass={handleSelectClass}
            onBack={() => setCurrentScreen('grade')}
          />
        )}

        {/* Screen 4: Select Student Number */}
        {currentScreen === 'studentNum' && selectedGrade !== null && selectedClass !== null && (
          <StudentNumSelector
            grade={selectedGrade}
            classNum={selectedClass}
            onSelectStudentNum={handleSelectStudentNum}
            onBack={() => setCurrentScreen('class')}
          />
        )}

        {/* Screen 5: 13 Challenges Board for student */}
        {currentScreen === 'challenges' &&
          selectedGrade !== null &&
          selectedClass !== null &&
          selectedStudentNum !== null &&
          currentStudentRecord && (
            <ChallengeBoard
              grade={selectedGrade}
              classNum={selectedClass}
              studentNum={selectedStudentNum}
              studentRecord={currentStudentRecord}
              onSaveSubmission={handleSaveSubmission}
              onDeleteSubmission={handleDeleteSubmission}
              onViewCertificate={() => setShowCertificateModal(true)}
              onBackToNumSelect={() => setCurrentScreen('studentNum')}
            />
          )}

        {/* Teacher Screen: Folder Explorer and Class Matrix Board */}
        {currentScreen === 'teacher' && (
          <TeacherDashboard
            records={records}
            onExit={handleGoHome}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Completion Ceremony Certificate Modal */}
      {showCertificateModal &&
        selectedGrade !== null &&
        selectedClass !== null &&
        selectedStudentNum !== null &&
        currentStudentRecord && (
          <CompletionCertificate
            grade={selectedGrade}
            classNum={selectedClass}
            studentNum={selectedStudentNum}
            studentRecord={currentStudentRecord}
            onClose={() => setShowCertificateModal(false)}
          />
        )}
    </div>
  );
}

