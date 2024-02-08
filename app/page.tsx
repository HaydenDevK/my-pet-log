import * as styles from "@/app/page.css";
import EditIcon from "@/public/icons/edit.svg";
import EditIconUrl from "@/public/icons/edit.svg?url";
import PetRegister from "@/app/_components/PetRegister";
import Image from "next/image";

const Home = () => {
  return (
    <div className={styles.container}>
      homee
      <EditIcon color={"gold"} width={30} height={30} />
      <Image src={EditIconUrl} alt="edit icon" width={20} height={20} />
      <PetRegister />
    </div>
  );
};

export default Home;
