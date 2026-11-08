# 연우파트너스 홈페이지

빌드 과정이 필요 없는 정적 사이트(HTML · CSS · JS)입니다. Vercel에 그대로 배포할 수 있습니다.

## 구조

```
homepage/
├─ index.html        메인
├─ about.html        회사소개 (인사말 · 비전 · 조직 · 운영체계 · 오시는 길)
├─ security.html     사업분야 - 경비
├─ cleaning.html     사업분야 - 미화
├─ recruit.html      사업분야 - 채용대행
├─ contact.html      고객문의 (상담 신청서)
├─ 404.html
├─ vercel.json       깔끔한 URL(/about), 캐시 헤더
└─ assets/           style.css · main.js · 로고 · 사진
```

## 로컬에서 보기

- `index.html`을 더블클릭하면 브라우저에서 바로 열립니다.
- 로컬 서버로 보려면: `npx serve .`

## Vercel 배포

### 방법 1. 웹에서 (GitHub 연동)
1. 이 `homepage` 폴더를 GitHub 저장소로 올립니다.
2. https://vercel.com/new 에서 저장소를 Import 합니다.
3. Framework Preset은 **Other**, Build Command와 Output Directory는 비워 두고 **Deploy**를 누릅니다.
4. 이후 GitHub에 push할 때마다 자동으로 다시 배포됩니다.

### 방법 2. CLI
```
cd homepage
npx vercel        # 미리보기 배포
npx vercel --prod # 운영 배포
```

### 도메인 연결
Vercel 프로젝트 → Settings → Domains 에서 보유한 도메인(예: yeonwoopartners.co.kr)을 추가하고 안내된 DNS 레코드를 등록하면 됩니다.

## 수정 안내

- 공통 메뉴와 푸터는 각 HTML 파일에 같은 내용으로 들어 있습니다. 메뉴를 바꿀 때는 6개 파일을 함께 수정하세요.
- 색상 · 글꼴은 `assets/style.css` 상단 `:root` 변수에서 바꿀 수 있습니다.
- 상담 신청서는 서버 없이 동작하도록 제출 시 메일 앱(0522joung@hanmail.net 수신)을 엽니다.
  메일 앱 없이 바로 접수되게 하려면 Formspree 같은 폼 서비스나 Vercel 서버 함수를 연결하면 됩니다.
