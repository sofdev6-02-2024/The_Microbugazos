import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {useEffect, useState} from "react";
import TextField from "@/components/text-field";
import {MdImageSearch} from "react-icons/md";
import Dropzone from "@/components/image-selector";
import {useVariants} from "@/commons/providers/variant-provider";
import {util} from "protobufjs";
import float = util.float;

export default function VariantModal({item}) {
    const [variantOnMemory, setVariantOnMemory] = useState(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [altText, setAltText] = useState("");
    const [priceAdjustment, setPriceAdjustment] = useState("0");
    const {variants, addVariant, removeVariant, getByName} = useVariants();
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    useEffect(() => {
        const updatedVariant = getByName(item.join("/"));
        setVariantOnMemory(updatedVariant);
    }, [item, getByName, variants]);

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "12px",
                borderBottom: "0.1px solid #ACACAC"
            }}
                 onClick={onOpen}
            >
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <label>{item.join("/")}</label>
                    <label>Price adjustment: {parseFloat(priceAdjustment).toFixed(2)} $</label>
                </div>
                <div style={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px dashed #7790ED",
                    padding: variantOnMemory?.image?.url ? "0px" : "10px",
                    borderRadius: "6px",
                    color: "#7790ED"
                }}>
                    {variantOnMemory?.image?.url
                        ? <img src={variantOnMemory.image.url} alt={variantOnMemory.image.altText} />
                        : <MdImageSearch size={32} />
                    }
                </div>
            </div>
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
                                    Set image and price adjustment for the variant
                                </p>
                                <Dropzone
                                    maxImages={1}
                                    selectedImages={selectedImages}
                                    setSelectedImages={setSelectedImages}
                                    afterDelete={() => {
                                        removeVariant(item.join("/"));
                                    }}
                                />
                                <TextField
                                    label="AltText"
                                    placeholder="Describe your images for upgrade accessibility..."
                                    value={altText}
                                    onChange={(value) => setAltText(value)}>
                                </TextField>
                                <TextField
                                    label="Price"
                                    placeholder="00.00 $"
                                    type="number"
                                    value={priceAdjustment}
                                    onChange={(value) => setPriceAdjustment(value)}>
                                </TextField>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={() => {
                                    addVariant({
                                        name: item.join("/"),
                                        priceAdjustment: 10.00,
                                        image: {
                                            name: item.join("/"),
                                            url: selectedImages[0],
                                            altText: "Some alt text"
                                        }
                                    })
                                    onClose();
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