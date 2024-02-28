import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
  fontFamily:
    "var(--Pretendard), serif, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif", // TODO 폰트 정상 적용 확인 후 serif 제거
  margin: 0,
  padding: 0,
});

globalStyle("*::-webkit-scrollbar", {
  display: "none",
});

globalStyle("html, body", {
  fontSize: "62.5%",
  maxWidth: "100vw",
  maxHeight: "100vh",
});

globalStyle("a", {
  textDecoration: "none",

  outline: "none",

  color: "inherit",
});

globalStyle("button", {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
});

globalStyle("li, dt, dd", {
  listStyle: "none",
});

globalStyle("input", {
  WebkitAppearance: "none",
  MozAppearance: "none",
  appearance: "none",
  border: "none",
  outline: "none",
});

globalStyle("fieldset", {
  border: "0",
  padding: "0",
  margin: "0",
  minWidth: "0",
});
