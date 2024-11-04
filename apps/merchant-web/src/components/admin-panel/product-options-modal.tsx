import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {useState} from "react";
import TextField from "@/components/text-field";
import { MdClose } from "react-icons/md";
import {isNullOrEmpty} from "@/commons/validators";
import {useOptions} from "@/commons/providers/add-product-provider";

export default function ProductOptionsModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [name, setName] = useState("");
    const [currentOption, setCurrentOption] = useState("");
    const [options, setOptions] = useState([]);
    const [error, setError] = useState("");
    const {addOption} = useOptions();

    const handleOptionChange = (value: string) => {
        setCurrentOption(value);
    }

    const handleDeleteOptionFromList = (value: string) => {
        setOptions(options.filter((item) => item != value));
    }

    const addOptionToList = (value: string) => {
        const contain = options.includes(value)
        if (contain || isNullOrEmpty(value)) {
            setError("Duplicate and empty values doesn't allow.")
        } else {
            setError("")
            setOptions([...options, value]);
            setCurrentOption("");
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addOptionToList(currentOption);
        }
    };

    return (
        <>
            <label
                style={{cursor: "pointer", color: "#7790ED"}}
                onClick={onOpen}
            >Add</label>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                closeButton
                portal
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Options</ModalHeader>
                            <ModalBody>
                                <p>
                                    Add properties that your customer could select.
                                </p>
                                <TextField
                                    label="Name"
                                    placeholder="e.g. Color"
                                    value={name}
                                    onChange={(value) => setName(value)}>
                                </TextField>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                    <TextField
                                        label="Properties"
                                        placeholder="Add here..."
                                        value={currentOption}
                                        onChange={(value) => setCurrentOption(value)}
                                        onKeyDown={handleKeyDown}
                                        showIcon={false}
                                    >
                                    </TextField>
                                    <button style={{
                                        width: "42px",
                                        height: "42px",
                                        color: "#FFF",
                                        backgroundColor: "#7790ED",
                                        textAlign: "center",
                                        borderRadius: "4px",
                                        marginLeft: "4px",
                                        marginTop: "12px",
                                        paddingRight: "16px",
                                        paddingLeft: "16px"
                                    }}
                                        onClick={() => {
                                            addOptionToList(currentOption)
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "8px"}}>
                                    {options.map((item, index) => <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        backgroundColor: "#ffdfe9",
                                        textAlign: "center",
                                        borderRadius: "4px",
                                        paddingLeft: "16px",
                                    }}>
                                        <label>{item}</label>
                                        <MdClose
                                            size={16}
                                            style={{
                                                marginRight: "8px",
                                                marginLeft: "8px",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => handleDeleteOptionFromList(item)}
                                        ></MdClose>
                                    </div>)}
                                </div>
                                <label style={{color: "#FB5012"}}>{error}</label>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={() => {
                                    onClose();
                                    addOption({
                                        name: name,
                                        options: options
                                    });
                                    setName("");
                                    setOptions([]);
                                    setCurrentOption("");
                                    setError("");
                                }}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}