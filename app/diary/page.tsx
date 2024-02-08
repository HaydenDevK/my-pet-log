"use client";

import DiaryList from "@/app/diary/_components/DiaryList";
import { currentPetAtom } from "@/app/_states/atom";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";

const DiaryPgae = () => {
  const [currentPet, setCurrentPet] = useAtom(currentPetAtom); //추후에 localStorage로 바꿔야할듯
  if (!currentPet) return redirect("/diary/select");
  return <DiaryList />;
};

export default DiaryPgae;
