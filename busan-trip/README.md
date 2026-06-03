# 부산 2박 3일 여행 플랜 (Next.js)

모바일 우선으로 만든 인터랙티브 여행 플랜 사이트. Next.js(App Router) 기반이며 Vercel에 바로 배포할 수 있습니다.

## 주요 기능
- 상단 스크롤 진행바 + 고정 내비게이션(현재 섹션 자동 표시) + 모바일 햄버거 메뉴
- 대표 코스 카드 → 일정으로 바로 이동
- 하루별 일정: **Day 탭 전환** + 항목을 누르면 펼쳐지는 **아코디언** (지도 링크 포함)
- 예산: **인원수 카운터**로 합계 자동 계산
- 준비물: 체크 시 **진행률 표시 + 자동 저장**(초기화 버튼)
- '맨 위로' 플로팅 버튼, 화면 크기별 반응형

## 내용 수정하기
모든 내용은 **`app/data.js` 한 파일**에 있습니다. (trip / facts / highlights / days / checklist / tips / nav)
일정 항목의 `place`는 클릭 시 구글 지도로 연결됩니다.

## 디자인 미리보기 (도구 설치 없이)
`preview.html`을 더블클릭해 브라우저로 열면 배포될 화면과 거의 동일한 모습을 바로 볼 수 있습니다. (탭·아코디언·카운터·체크리스트 모두 동작)
> 내용을 바꾼 뒤 미리보기 갱신: `node generate-preview.mjs` (배포에는 불필요)

## Vercel 배포
1. 이 폴더 전체를 GitHub 새 저장소에 올립니다.
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/<내아이디>/<저장소이름>.git
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com) 에 GitHub 계정으로 로그인 → **Add New → Project** → 저장소 선택.
3. 설정 그대로 **Deploy**. 잠시 후 `https://<프로젝트이름>.vercel.app` 생성. 끝!

이후 `git push` 할 때마다 자동으로 재배포됩니다.

## 로컬 실행 (선택, Node.js 필요)
```bash
npm install
npm run dev   # http://localhost:3000
```
