"use client";

import * as styles from "./HasNotification.css";
import Image from "next/image";
import scrollUpIcon from "@/public/icons/arrow-up.svg?url";
import Modal from "@/app/_components/Modal";
import { useModal } from "@/app/_hooks/useModal";
import Notification from "../Notification/Notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotifications, postNotifications } from "@/app/_api/notifications";
import { useEffect } from "react";
import { NotificationContentType } from "@/app/_types/notifications/types";

const HasNotification = ({ list }: { list: NotificationContentType[] }) => {
  const { isModalOpen, openModalFunc, closeModalFunc } = useModal();

  const newList = list?.filter((item) => !item.checked) ?? [];
  const pastList = list?.filter((item) => item.checked) ?? [];

  const queryClient = useQueryClient();

  const postNotificationsMutation = useMutation({
    mutationFn: () => postNotifications(),
  });

  const deleteNotificationsMutation = useMutation({
    // mutationKey: ["deleteNotificationsMutationKey"],
    mutationFn: () => deleteNotifications(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      closeModalFunc();
    },
  });

  useEffect(() => {
    postNotificationsMutation.mutate();
  }, []);

  return (
    <section className={styles.notificationPageContainer}>
      <div className={styles.notificationContainer}>
        <div className={styles.newNotificationTitleArea}>
          <h2 className={styles.title}>새 알림</h2>
          <button className={styles.deleteButton} onClick={openModalFunc}>
            전체 삭제
          </button>
        </div>
        {newList.length > 0 ? (
          <ul className={styles.newNotificationList}>
            {newList.map((item) => (
              <Notification key={item.id} type={"new"} item={item} />
            ))}
          </ul>
        ) : (
          <p className={styles.noNewNotification}>새 알림이 없습니다.</p>
        )}
      </div>

      {pastList.length > 0 && (
        <div className={styles.notificationContainer}>
          <h2 className={styles.title}>이전 알림</h2>
          <ul className={styles.pastNotificationList}>
            {pastList.map((item) => (
              <Notification key={item.id} type={"past"} item={item} />
            ))}
          </ul>
        </div>
      )}

      <p className={styles.days}>최근 30일 동안의 알림만 확인할 수 있습니다.</p>
      <button
        className={styles.scrollButton}
        onClick={() =>
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      >
        <Image src={scrollUpIcon} alt="스크롤 버튼 화살표 아이콘" width={19} height={19} />
      </button>
      {isModalOpen && (
        <Modal
          text="이전 알림을 모두 삭제하시겠습니까?"
          buttonText="확인"
          onClick={() => {
            deleteNotificationsMutation.mutate();
          }}
          onClose={closeModalFunc}
        />
      )}
    </section>
  );
};

export default HasNotification;
