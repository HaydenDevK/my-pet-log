import { Z_INDEX } from "@/styles/zindex.css";
import { style, keyframes } from "@vanilla-extract/css";

const slideInFromRight = keyframes({
  from: {
    transform: "translateX(100%)",
  },
  to: {
    transform: "translateX(0)",
  },
});

const slideOutToRight = keyframes({
  from: {
    transform: "translateX(0)",
  },
  to: {
    transform: "translateX(100%)",
  },
});

export const container = style({
  position: "fixed",
  right: 0,
  top: 0,
  width: "300px",
  height: "100%",
  background: "white",
  overflow: "auto",
  zIndex: Z_INDEX.LikeList_container,
  selectors: {
    '&[data-closing="true"]': {
      animation: `${slideOutToRight} 0.5s forwards`,
    },
    '&[data-closing="false"]': {
      animation: `${slideInFromRight} 0.5s forwards`,
    },
  },
});

export const header = style({
  padding: "1.55rem 1.6rem",

  position: "fixed",

  width: "100%",

  backgroundColor: "var(--White)",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  borderBottom: "1px solid var(--GrayE2)",

  zIndex: Z_INDEX.Header,
});

export const title = style({
  fontSize: "1.6rem",
  fontWeight: "500",
  lineHeight: "2.4rem",
});

export const backIcon = style({
  position: "absolute",
  top: "50%",
  left: "1.6rem",
  transform: "translateY(-50%)",

  cursor: "pointer",
});

export const likeEntry = style({
  display: "flex",
  alignItems: "center",
  padding: "0.5rem",
  borderBottom: "1px solid var(--GrayCC)",
});

export const profileImageWrapper = style({
  width: "5rem",
  height: "5rem",
  borderRadius: "50%",
  overflow: "hidden",
  marginRight: "1rem",
});

export const userInfo = style({
  display: "flex",
  flexDirection: "column",
});

export const userId = style({
  fontWeight: "bold",
  marginBottom: "0.25rem",
});

export const userNickname = style({
  color: "var(--Gray55)",
});
