import { style } from "@vanilla-extract/css";

export const formContainer = style({
  padding: "5rem 1.5rem",

  display: "flex",
  flexDirection: "column",
});

export const profile = style({
  marginBottom: "1.2rem",

  position: "relative",

  display: "flex",
  justifyContent: "center",
});

export const image = style({
  position: "relative",
  overflow: "hidden",
  objectFit: "cover",

  borderRadius: "50%",

  cursor: "pointer",
});

export const cameraIcon = style({
  position: "absolute",
  transform: "translateX(5rem)",
  bottom: "0.5rem",

  padding: "0.4rem",

  borderRadius: "50%",
  border: "3px solid var(--White)",
  backgroundColor: "var(--LightOrange)",
});

export const label = style({
  margin: "0.6rem 0",

  fontSize: "1.6rem",
  fontWeight: "600",
});

export const input = style({
  width: "100%",

  padding: "1.3rem 1.8rem",

  borderRadius: "10px",
  border: "1.5px solid var(--GrayE2)",

  fontSize: "1.6rem",
  fontWeight: "600",

  ":focus": {
    outline: "none",
  },
});

export const nickname = style([
  input,
  {
    ":focus": {
      border: "1.5px solid  var(--MainOrange)",
    },
  },
]);

export const nicknameContainer = style({
  width: "100%",

  position: "relative",
});

export const inputErrorStyle = style({
  borderColor: "var(--Red)",
});

export const inputConfirmStyle = style({
  borderColor: "var(--Green)",
});

export const checkNicknameButton = style({
  width: "6.3rem",
  height: "2.9rem",

  padding: "0.8rem 0.9rem",

  position: "absolute",
  right: "0.9rem",
  top: "1rem",

  borderRadius: "5px",

  fontSize: "1.2rem",
  backgroundColor: "var(--LightOrange)",
  color: "var(--MainOrange)",
  fontWeight: "600",
});

export const email = style([
  input,
  {
    color: "var(--Gray81)",
    cursor: "not-allowed",
  },
]);

export const length = style({
  position: "absolute",
  top: "5.2rem",
  right: 0,

  fontSize: "1.4rem",
  fontWeight: "600",
  color: "var(--Gray81)",
});

export const button = style({
  padding: "1.3rem 0",
  marginTop: "2rem",

  borderRadius: "30px",

  color: "var(--White)",
  backgroundColor: "var(--MainOrange)",
});

export const inputError = style({
  border: "1.5px solid var(--Red)",
});

export const inputSuccess = style({
  border: "1.5px solid var(--Green)",
});

export const nicknameText = style({
  height: "1.9rem",

  display: "flex",
  justifyContent: "space-between",
});
