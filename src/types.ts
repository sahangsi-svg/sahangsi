export interface Challenge {
  id: number;
  title: string;
  shortTitle: string;
  category: '식생활' | '자원순환' | '에너지' | '생활실천' | '생태보호';
  description: string;
  tip: string;
  iconName: string;
  defaultSampleImage: string;
}

export interface Submission {
  challengeId: number;
  photoUrl: string;
  memo: string;
  submittedAt: string; // ISO string or formatted date
  verified?: boolean;
}

export interface StudentKey {
  grade: number;     // 1 ~ 6
  classNum: number;  // 1 ~ 10
  studentNum: number;// 1 ~ 35
}

export interface StudentRecord {
  grade: number;
  classNum: number;
  studentNum: number;
  studentName?: string;
  submissions: Record<number, Submission>;
  updatedAt: string;
  completedAllAt?: string;
}

export type StorageState = Record<string, StudentRecord>;
