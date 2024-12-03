import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {useState} from "react";
import TextField from "@/components/text-field";
import { MdClose } from "react-icons/md";
import {isNullOrEmpty} from "@/commons/validators";
import {useOptions} from "@/commons/providers/add-product-provider";
import {ValidateName, ValidateShortText} from "@/commons/validations/string";

export default function ProductOptionsModal() {
    const [errors, setErrors] = useState<[{textField: string, error: string}]>([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [name, setName] = useState("");
    const [currentOption, setCurrentOption] = useState("");
    const [options, setOptions] = useState([]);
    const [error, setError] = useState("");
    const {addOption} = useOptions();

    const handleDeleteOptionFromList = (value: string) => {
        setOptions(options.filter((item) => item != value));
    }

    const addOptionToList = (value: string) => {
        const contain = options.includes(value)
        if (contain
            || isNullOrEmpty(value)
            || errors.filter((i) => i.textField == "Properties").length > 0
        ) {
            setError("Duplicated, empty values and bad format doesn't allow.")
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
                                    errors={errors}
                                    setErrors={setErrors}
                                    value={name}
                                    validator={ValidateName}
                                    onChange={(value) => setName(value)}>
                                </TextField>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "start",
                                }}>
                                    <TextField
                                        label="Properties"
                                        placeholder="Add here..."
                                        errors={errors}
                                        setErrors={setErrors}
                                        value={currentOption}
                                        validator={ValidateShortText}
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
                                        marginTop: "28px",
                                        marginBottom: "8px",
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
                                    {options.map((item, index) => <div
                                        key={item+index}
                                        style={{
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
                                    if (name == "") setError("Name required");
                                    else if (options.length == 0) setError("At least one option is required");
                                    else if (errors.length == 0) {
                                        onClose();
                                        addOption({
                                            name: name,
                                            options: options
                                        });
                                        setName("");
                                        setOptions([]);
                                        setCurrentOption("");
                                        setError("");
                                    }
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
