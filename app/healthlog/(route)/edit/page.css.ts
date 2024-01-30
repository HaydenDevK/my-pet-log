import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",

  padding: "10.4rem 1.6rem 8.3rem",

  display: "flex",
  flexDirection: "column",
});

export const title = style({
  margin: "2.2rem auto",

  fontSize: "1.6rem",
  fontWeight: "700",
});

export const formItems = style({
  display: "flex",
  flexDirection: "column",

  gap: "1rem",

  fontSize: "1.4rem",
  fontWeight: "700",
});

export const item = style({
  display: "flex",
  flexDirection: "column",

  gap: "1rem",
});

export const typeButton = style({
  width: "11.4rem",
  height: "8rem",

  margin: "0 0.5rem",

  borderRadius: "10px",
  backgroundColor: "lightgray",
});

export const typeButtonSelected = style({
  backgroundColor: "orange",
});

export const inputBox = style({
  width: "100%",
  height: "4rem",

  padding: "1rem",

  borderRadius: "10px",
  border: "1px solid #818181",
});

export const textBox = style({
  width: "100%",
  height: "8rem",

  padding: "1rem",

  borderRadius: "10px",
  border: "1px solid #818181",
});

export const checkBox = style({
  width: "2rem",
  height: "2rem",

  border: "1px solid #818181",
});

export const postcodeFinder = style({
  width: "100%",
  height: "30rem",

  display: "none",
  border: "1px solid",

  margin: "0.5rem 0",
  position: "relative",
});

export const submitButton = style({
  width: "23.6rem",
  height: "3.6rem",

  borderRadius: "50px",
  backgroundColor: "orange",
});
