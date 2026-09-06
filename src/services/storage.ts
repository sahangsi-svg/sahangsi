import { StorageState, StudentRecord, Submission } from '../types';
import { CLOVER_CHALLENGES } from '../data/challenges';

const STORAGE_KEY = 'dangsu_clover_eco_challenges_v1';

// Seed initial realistic data including 3학년 1반 1번 학생 mentioned in the prompt
const INITIAL_DEMO_RECORDS: StorageState = {
  '3-1-1': {
    grade: 3,
    classNum: 1,
    studentNum: 1,
    studentName: '김초록',
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    submissions: {
      1: {
        challengeId: 1,
        photoUrl: CLOVER_CHALLENGES[0].defaultSampleImage,
        memo: '오늘 반찬까지 하나도 남김없이 깨끗하게 먹었어요!',
        submittedAt: '2026-09-04 12:45',
        verified: true
      },
      2: {
        challengeId: 2,
        photoUrl: CLOVER_CHALLENGES[1].defaultSampleImage,
        memo: '종이컵 대신 제 귀여운 초록 텀블러로 시원한 물 마셨어요.',
        submittedAt: '2026-09-04 14:10',
        verified: true
      },
      3: {
        challengeId: 3,
        photoUrl: CLOVER_CHALLENGES[2].defaultSampleImage,
        memo: '생수병 비닐 라벨을 깨끗이 뜯어서 분리배출함에 넣었습니다.',
        submittedAt: '2026-09-05 09:30',
        verified: true
      },
      5: {
        challengeId: 5,
        photoUrl: CLOVER_CHALLENGES[4].defaultSampleImage,
        memo: '양치할 때 수도꼭지 잠그고 양치컵에 물 받아 썼어요.',
        submittedAt: '2026-09-05 13:20',
        verified: true
      }
    }
  },
  '3-1-2': {
    grade: 3,
    classNum: 1,
    studentNum: 2,
    studentName: '이지구',
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    submissions: {
      1: {
        challengeId: 1,
        photoUrl: CLOVER_CHALLENGES[0].defaultSampleImage,
        memo: '골고루 다 먹고 잔반 제로 실천!',
        submittedAt: '2026-09-04 12:50',
        verified: true
      },
      4: {
        challengeId: 4,
        photoUrl: CLOVER_CHALLENGES[3].defaultSampleImage,
        memo: '컴퓨터 다 쓰고 멀티탭 전원을 껐어요.',
        submittedAt: '2026-09-05 10:15',
        verified: true
      }
    }
  },
  '3-1-7': {
    grade: 3,
    classNum: 1,
    studentNum: 7,
    studentName: '박새싹',
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    completedAllAt: '2026-09-05 15:00',
    submissions: Array.from({ length: 13 }).reduce<Record<number, Submission>>((acc, _, idx) => {
      const id = idx + 1;
      acc[id] = {
        challengeId: id,
        photoUrl: CLOVER_CHALLENGES[idx].defaultSampleImage,
        memo: `챌린지 ${id}번 실천 완료했습니다! 지구를 지켜요.`,
        submittedAt: `2026-09-05 14:${10 + idx}`,
        verified: true
      };
      return acc;
    }, {})
  },
  '4-2-3': {
    grade: 4,
    classNum: 2,
    studentNum: 3,
    studentName: '최하늘',
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    submissions: {
      7: {
        challengeId: 7,
        photoUrl: CLOVER_CHALLENGES[6].defaultSampleImage,
        memo: '등굣길에 길가에 떨어진 과자 봉지를 주워 분리수거했어요.',
        submittedAt: '2026-09-05 08:35',
        verified: true
      },
      11: {
        challengeId: 11,
        photoUrl: CLOVER_CHALLENGES[10].defaultSampleImage,
        memo: '교실 창가에 있는 스킨답서스 식물에 물을 주었습니다.',
        submittedAt: '2026-09-05 11:20',
        verified: true
      }
    }
  }
};

export function getStorageKey(grade: number, classNum: number, studentNum: number): string {
  return `${grade}-${classNum}-${studentNum}`;
}

export function loadAllRecords(): StorageState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_RECORDS));
      return INITIAL_DEMO_RECORDS;
    }
    const parsed = JSON.parse(raw);
    return parsed || INITIAL_DEMO_RECORDS;
  } catch (e) {
    console.error('Failed to load records from localStorage', e);
    return INITIAL_DEMO_RECORDS;
  }
}

export function saveAllRecords(state: StorageState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save records to localStorage', e);
  }
}

export function getStudentRecord(grade: number, classNum: number, studentNum: number): StudentRecord {
  const records = loadAllRecords();
  const key = getStorageKey(grade, classNum, studentNum);
  if (records[key]) {
    return records[key];
  }
  return {
    grade,
    classNum,
    studentNum,
    submissions: {},
    updatedAt: new Date().toISOString()
  };
}

export function saveStudentSubmission(
  grade: number,
  classNum: number,
  studentNum: number,
  challengeId: number,
  photoUrl: string,
  memo: string = ''
): { record: StudentRecord; isNewlyCompletedAll: boolean } {
  const records = loadAllRecords();
  const key = getStorageKey(grade, classNum, studentNum);
  const existing = records[key] || {
    grade,
    classNum,
    studentNum,
    submissions: {},
    updatedAt: new Date().toISOString()
  };

  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  existing.submissions[challengeId] = {
    challengeId,
    photoUrl,
    memo: memo.trim(),
    submittedAt: formattedDate,
    verified: true
  };
  existing.updatedAt = now.toISOString();

  const totalCompleted = Object.keys(existing.submissions).length;
  let isNewlyCompletedAll = false;
  if (totalCompleted === 13 && !existing.completedAllAt) {
    existing.completedAllAt = formattedDate;
    isNewlyCompletedAll = true;
  }

  records[key] = existing;
  saveAllRecords(records);

  return { record: existing, isNewlyCompletedAll };
}

export function removeStudentSubmission(
  grade: number,
  classNum: number,
  studentNum: number,
  challengeId: number
): StudentRecord {
  const records = loadAllRecords();
  const key = getStorageKey(grade, classNum, studentNum);
  const existing = records[key];
  if (existing && existing.submissions[challengeId]) {
    delete existing.submissions[challengeId];
    if (Object.keys(existing.submissions).length < 13) {
      delete existing.completedAllAt;
    }
    existing.updatedAt = new Date().toISOString();
    records[key] = existing;
    saveAllRecords(records);
  }
  return existing || {
    grade,
    classNum,
    studentNum,
    submissions: {},
    updatedAt: new Date().toISOString()
  };
}

// Build folder hierarchy representation for the Teacher view
export interface FolderHierarchy {
  [grade: number]: {
    [classNum: number]: {
      [studentNum: number]: StudentRecord;
    };
  };
}

export function getFolderHierarchy(): FolderHierarchy {
  const records = loadAllRecords();
  const hierarchy: FolderHierarchy = {};

  Object.values(records).forEach((record) => {
    // Only show folders for students who have at least 1 submission (or active record)
    if (Object.keys(record.submissions).length > 0) {
      if (!hierarchy[record.grade]) {
        hierarchy[record.grade] = {};
      }
      if (!hierarchy[record.grade][record.classNum]) {
        hierarchy[record.grade][record.classNum] = {};
      }
      hierarchy[record.grade][record.classNum][record.studentNum] = record;
    }
  });

  return hierarchy;
}

export function resetDemoData(): void {
  saveAllRecords(INITIAL_DEMO_RECORDS);
}
