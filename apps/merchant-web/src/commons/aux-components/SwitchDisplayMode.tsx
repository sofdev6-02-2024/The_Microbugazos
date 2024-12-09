import { Button } from "@nextui-org/react";
import { FC } from "react";
import styles from "@/styles/SwitchDisplayMode.module.css";

interface SwitchModeProps {
  selectedGridMode: boolean;
  setSelectedMode: (mode: boolean) => void;
}

export const SwitchDisplayMode: FC<SwitchModeProps> = ({
                                                         selectedGridMode,
                                                         setSelectedMode,
                                                       }) => {
  const cardPressedOptionIcon: string = "https://res.cloudinary.com/playhardimages/image/upload/v1733506382/cwsmt80gmuqkm8sxavxw.png";
  const cardNonPressedOptionIcon: string = "https://res.cloudinary.com/playhardimages/image/upload/v1733506331/zbkwb66gew8hbvpirerq.png";
  const gridPressedOptionIcon: string = "https://res.cloudinary.com/playhardimages/image/upload/v1733506281/km1ngalha6nandjqa8en.png";
  const gridNonPressedOptionIcon: string = "https://res.cloudinary.com/playhardimages/image/upload/v1733506181/e5myg0wnggchzn4hlljq.png";

  return (
    <div className={styles["switch-display-mode"]}>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        onClick={() => setSelectedMode(false)}
        className={`${styles["switch-display-mode__button"]} ${
          !selectedGridMode ? styles["switch-display-mode__button--active"] : ""
        }`}
      >
        <img
          src={!selectedGridMode ? cardPressedOptionIcon : cardNonPressedOptionIcon}
          alt="Card View"
          className={styles["switch-display-mode__icon"]}
        />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant="light"
        onClick={() => setSelectedMode(true)}
        className={`${styles["switch-display-mode__button"]} ${
          selectedGridMode ? styles["switch-display-mode__button--active"] : ""
        }`}
      >
        <img
          src={selectedGridMode ? gridPressedOptionIcon : gridNonPressedOptionIcon}
          alt="Grid View"
          className={styles["switch-display-mode__icon"]}
        />
      </Button>
    </div>
  );
};