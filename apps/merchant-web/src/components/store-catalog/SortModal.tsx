import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import {ArrowDownUp} from "lucide-react";
import ModalStyle from "@/styles/store-catalog/Modal.module.css"
import ChipSelector from "@/components/ChipSelector";
import {useSortContext} from "@/contexts/SortContext";

export default function SortModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {isApplied, nameAscending, priceAscending, ratingAscending,
    setIsApplied, setNameAscending, setPriceAscending, setRatingAscending} = useSortContext();

  return (
    <>
      <button
        className={`${ModalStyle.modalButton} ${isApplied && ModalStyle.applied}`}
        onClick={onOpen}
      >
        <ArrowDownUp></ArrowDownUp>
        <span>Sort</span>
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filters</ModalHeader>
              <ModalBody className={ModalStyle.body}>
                <form className={ModalStyle.form}>
                  <span>Name</span>
                  <ChipSelector
                    name={"Name"}
                    options={["Ascending", "Descending"]}
                    handleChange={(name, index) => {setNameAscending(index === -1 ? null : index === 0)}}
                    defaultValue={isApplied ? (nameAscending !== null ? (nameAscending ? 0 : 1) : -1) : -1}
                  ></ChipSelector>
                  <span>Price</span>
                  <ChipSelector
                    name={"Price"}
                    options={["Ascending", "Descending"]}
                    handleChange={(name, index) => {setPriceAscending(index === -1 ? null : index === 0)}}
                    defaultValue={isApplied ? (priceAscending !== null ? (priceAscending ? 0 : 1) : -1) : -1}
                  ></ChipSelector>
                  <span>Rating</span>
                  <ChipSelector
                    name={"Rating"}
                    options={["Ascending", "Descending"]}
                    handleChange={(name, index) => {setRatingAscending(index === -1 ? null : index === 0)}}
                    defaultValue={isApplied ? (ratingAscending !== null ? (ratingAscending ? 0 : 1) : -1) : -1}
                  ></ChipSelector>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button className={ModalStyle.primaryButton} onPress={() => {
                  setIsApplied(true);
                  onClose();
                }}>
                  Apply
                </Button>
                <Button className={ModalStyle.secondaryButton} onPress={() => {
                  setIsApplied(false);
                  setNameAscending(null);
                  setPriceAscending(null);
                  setRatingAscending(null);
                  onClose();
                }}>
                  Clear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}