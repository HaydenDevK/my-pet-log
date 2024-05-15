export interface UserType {
  id: string;
  email: string;
  nickname: string;
  profilePath: string | null;
  loginType: "EMAIL" | "KAKAO" | "GOOGLE";
}
