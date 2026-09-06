import { Challenge } from '../types';

export const CLOVER_CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: '급식 잔반 남기지 않기',
    shortTitle: '잔반 제로 식판',
    category: '식생활',
    description: '맛있게 밥을 먹고 음식물 쓰레기를 줄이기 위해 식판을 깨끗하게 비워보아요.',
    tip: '다 먹은 깨끗한 식판 사진을 찍어 올려주세요!',
    iconName: 'UtensilsCrossed',
    defaultSampleImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: '개인 텀블러·물병 사용하기',
    shortTitle: '텀블러 사용',
    category: '생활실천',
    description: '일회용 종이컵과 플라스틱 컵 대신 나만의 텀블러나 물병을 사용해요.',
    tip: '내가 사용하는 물병이나 텀블러 사진을 올려주세요.',
    iconName: 'Coffee',
    defaultSampleImage: 'https://images.unsplash.com/photo-1570857502809-08184874388e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: '투명 페트병 라벨 떼고 분리배출하기',
    shortTitle: '라벨 뗀 페트병',
    category: '자원순환',
    description: '비닐 라벨을 깨끗이 떼어내고 압착하여 투명 페트병 전용 수거함에 쏙 넣어요.',
    tip: '라벨을 뗀 투명 페트병 사진을 찍어주세요.',
    iconName: 'Recycle',
    defaultSampleImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    title: '사용하지 않는 플러그 뽑기 & 빈 방 소등',
    shortTitle: '대기전력 끄기',
    category: '에너지',
    description: '쓰지 않는 전자제품의 플러그를 뽑고, 아무도 없는 방의 전등을 꺼서 에너지를 아껴요.',
    tip: '뽑혀진 콘센트 플러그나 스위치를 끈 사진을 찍어주세요.',
    iconName: 'ZapOff',
    defaultSampleImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    title: '양치할 때 양치컵 사용하기',
    shortTitle: '양치컵 사용',
    category: '생활실천',
    description: '물을 틀어놓지 않고 양치컵에 물을 받아 양치하면 하루에 많은 물을 절약할 수 있어요.',
    tip: '양치컵에 물을 담아 준비한 모습을 찍어보세요.',
    iconName: 'Droplets',
    defaultSampleImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    title: '휴지 대신 나만의 손수건 챙겨 다니기',
    shortTitle: '손수건 습관',
    category: '자원순환',
    description: '손을 씻은 후 종이타월 대신 나만의 예쁜 손수건으로 손을 닦아 나무를 지켜요.',
    tip: '가방이나 주머니에 챙긴 손수건을 보여주세요.',
    iconName: 'Sparkles',
    defaultSampleImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 7,
    title: '우리 학교·동네 쓰레기 줍기 (플로깅)',
    shortTitle: '우리 동네 줍깅',
    category: '생태보호',
    description: '등하굣길이나 놀이터 주변의 떨어진 쓰레기를 주워 쓰레기통에 바르게 버려요.',
    tip: '집게나 장갑을 끼고 쓰레기를 줍는 멋진 모습을 찍어주세요.',
    iconName: 'Trash2',
    defaultSampleImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 8,
    title: '가까운 거리는 걸어 다니거나 자전거 타기',
    shortTitle: '친환경 걷기',
    category: '에너지',
    description: '자동차 대신 두 발로 걸어서 등교하거나 자전거를 타면 탄소 배출을 줄일 수 있어요.',
    tip: '걸어가는 발걸음이나 자전거를 탄 인증 사진을 올려주세요.',
    iconName: 'Footprints',
    defaultSampleImage: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 9,
    title: '비닐봉지 대신 장바구니·에코백 쓰기',
    shortTitle: '장바구니 챙기기',
    category: '자원순환',
    description: '문구점이나 마트에 갈 때 비닐봉지를 받지 않고 튼튼한 장바구니나 에코백을 써요.',
    tip: '물건을 담은 에코백이나 장바구니 사진을 올려주세요.',
    iconName: 'ShoppingBag',
    defaultSampleImage: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 10,
    title: '이면지 모아 연습장으로 재활용하기',
    shortTitle: '이면지 연습장',
    category: '자원순환',
    description: '한쪽 면만 쓴 종이를 버리지 않고 모아서 수학 문제 풀이나 그림 연습장으로 써요.',
    tip: '이면지로 만든 연습장이나 메모지 사진을 인증해주세요.',
    iconName: 'FileText',
    defaultSampleImage: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 11,
    title: '식물 돌보기 또는 화단에 물주기',
    shortTitle: '초록 식물 돌보기',
    category: '생태보호',
    description: '교실 식물이나 집 화분, 학교 화단의 꽃과 나무에 정성껏 물을 주고 사랑을 전해요.',
    tip: '초록 식물에 물을 주거나 함께 찍은 사진을 올려주세요.',
    iconName: 'Sprout',
    defaultSampleImage: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 12,
    title: '실내 적정온도 지키기 (여름 26℃, 겨울 20℃)',
    shortTitle: '적정 실내온도',
    category: '에너지',
    description: '지나친 냉난방을 줄이고 계절에 맞는 옷차림과 적정 온도를 지켜 지구를 쉬게 해요.',
    tip: '온도계 화면이나 겉옷을 챙겨 입은 실천 사진을 올려주세요.',
    iconName: 'ThermometerSun',
    defaultSampleImage: 'https://images.unsplash.com/photo-1563461660947-507ef49e9c47?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 13,
    title: '나와 지구를 위한 환경 실천 한 줄 다짐 쓰기',
    shortTitle: '환경 실천 다짐',
    category: '생활실천',
    description: '내가 지구를 위해 계속해서 실천할 수 있는 멋진 다짐 한 문장을 쓰고 실천을 약속해요.',
    tip: '종이에 적은 나의 환경 다짐 글을 사진으로 찍어 남겨보아요.',
    iconName: 'HeartHandshake',
    defaultSampleImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80'
  }
];
