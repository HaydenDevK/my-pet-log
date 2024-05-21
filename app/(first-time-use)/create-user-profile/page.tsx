"use client";

import { NextPage } from "next";
import * as styles from "./page.css";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import userProfileDefaultNoCameraImageSrc from "@/public/icons/user-profile-default-no-camera.svg?url";
import cameraIconSrc from "@/public/icons/camera.svg?url";
import { ERROR_MESSAGE, NICKNAME_RULES, PLACEHOLDER } from "@/app/_constants/inputConstant";
import removeSpaces from "@/app/_utils/removeSpaces";
import { getNicknameHintState } from "@/app/_components/getNicknameHintState/getNicknameHintState";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getMe, postCheckNickname, postUserProfile } from "@/app/_api/users";
import { UserType } from "@/app/_types/users/types";
import { useRouter } from "next/navigation";
import { showToast } from "@/app/_components/Toast";

interface IForm {
  nickname: string;
  profileImage: File | null;
  profileImagePreviewUrl: string | null;
  isNicknameConfirmed: boolean;
}

const CreateUserProfilePage: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IForm>({ mode: "onTouched" });

  const { data: user } = useQuery<UserType>({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });

  const { mutate: postCheckNicknameMutation } = useMutation({
    mutationKey: ["postCheckNicknameKey"],
    mutationFn: postCheckNickname,
    onError: () => {
      setError("nickname", { type: "duplicated", message: ERROR_MESSAGE.nicknameDuplicate });
    },
    onSuccess: (data) => {
      if (data) {
        setValue("isNicknameConfirmed", true);
      } else {
        setError("nickname", { type: "duplicated", message: ERROR_MESSAGE.nicknameDuplicate });
      }
    },
  });

  const { mutate: postUserProfileMutation } = useMutation({
    mutationKey: ["postUserProfileKey"],
    mutationFn: (formData: FormData) => postUserProfile({ formData }),
    onError: () => {
      showToast("등록 실패했습니다. 잠시 후 다시 시도해주세요.", false);
    },
    onSuccess: async (data) => {
      if (data) {
        await queryClient.invalidateQueries({
          queryKey: ["me"],
        });
        showToast("등록되었습니다!", true);
        router.push("/no-pet-group");
      } else {
        showToast("등록 실패했습니다. 잠시 후 다시 시도해주세요.", false);
      }
    },
  });

  const onChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setValue("profileImage", file);
      const profileImagePreviewUrl = URL.createObjectURL(file);
      setValue("profileImagePreviewUrl", profileImagePreviewUrl);
      return () => URL.revokeObjectURL(profileImagePreviewUrl);
    }
  };

  const onClickCheckNickname = async () => {
    const removeSpacesNickname = removeSpaces(watch("nickname"));
    setValue("nickname", removeSpacesNickname);

    if (removeSpacesNickname.length > 10) {
      return;
    }

    if (removeSpacesNickname === "") {
      // 공백만 입력했을 때
      setError("nickname", { type: "required", message: ERROR_MESSAGE.nicknameRequired });
      return;
    }

    // 닉네임 중복 검사
    postCheckNicknameMutation(removeSpacesNickname);
  };

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const removeSpacesNickname = removeSpaces(data.nickname);
    const isNicknameConfirmed = watch("isNicknameConfirmed");
    setValue("nickname", removeSpacesNickname);

    if (removeSpacesNickname === "") {
      setError("nickname", { type: "required", message: ERROR_MESSAGE.nicknameRequired });
    } else if (!isNicknameConfirmed) {
      setError("nickname", { type: "isNotConfirmed", message: ERROR_MESSAGE.nicknameNotConfirmed });
    } else {
      const formData = new FormData();
      formData.append("nickname", removeSpacesNickname);
      if (data?.profileImage) {
        formData.append("profileImage", data.profileImage);
      }
      postUserProfileMutation(formData);
    }
  };

  const { hintStyle, hintComponent } = getNicknameHintState({
    isNicknameConfirmed: watch("isNicknameConfirmed"),
    nicknameErrorMessage: errors?.nickname?.message ?? null,
    textLength: watch("nickname")?.length,
  });

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.userProfileImageContainer}>
          <label className={styles.userProfileLabel} htmlFor="profileImage">
            <Image
              className={`${styles.userProfileImageDefault} ${watch("profileImagePreviewUrl") && styles.userProfileImage}`}
              src={watch("profileImagePreviewUrl") ?? userProfileDefaultNoCameraImageSrc}
              alt="유저 프로필 이미지"
              width={126}
              height={124}
            />
            <Image className={styles.cameraIcon} src={cameraIconSrc} alt="camera icon" width={40} height={40} />
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            {...register("profileImage", {
              onChange: onChangeProfileImage,
            })}
          />
        </fieldset>
        <button
          type="button"
          className={styles.buttonProfileImageDefault}
          onClick={() => {
            setValue("profileImagePreviewUrl", null);
            setValue("profileImage", null);
          }}
        >
          기본 프로필로 변경
        </button>

        <fieldset className={styles.idFieldset}>
          <label className={styles.label}>이메일</label>
        </fieldset>

        <fieldset className={styles.nicknameFieldset}>
          <label className={styles.label}>닉네임*</label>
          <div className={styles.nicknameContainer}>
            <input
              className={`${styles.nicknameInput} ${hintStyle}`}
              type="text"
              placeholder={PLACEHOLDER.nickname}
              {...register("nickname", {
                required: ERROR_MESSAGE.nicknameRequired,
                maxLength: NICKNAME_RULES.maxLength,
                onChange() {
                  setValue("isNicknameConfirmed", false);
                },
              })}
            />
            <button className={styles.checkNicknameButton} type="button" onClick={onClickCheckNickname}>
              중복확인
            </button>
          </div>
          {hintComponent}
        </fieldset>

        <button className={styles.submitButton} type="submit">
          저장
        </button>
      </form>
    </main>
  );
};
export default CreateUserProfilePage;
