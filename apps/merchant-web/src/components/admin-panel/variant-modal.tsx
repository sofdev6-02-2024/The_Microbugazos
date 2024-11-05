import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {useEffect, useState} from "react";
import TextField from "@/components/text-field";
import {MdImageSearch} from "react-icons/md";
import Dropzone from "@/components/image-selector";
import {useVariants} from "@/commons/providers/variant-provider";
import {ValidateLongText} from "@/commons/validations/string";
import {ValidateIntegerNumber, ValidateNumberWithDecimals} from "@/commons/validations/number";

export default function VariantModal({item}) {
    const [errors, setErrors] = useState<[{textField: string, error: string}]>([]);
    const [variantOnMemory, setVariantOnMemory] = useState(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [altText, setAltText] = useState("");
    const [priceAdjustment, setPriceAdjustment] = useState("0");
    const [productQty, setProductQty] = useState<string>("");
    const {variants, addVariant, removeVariant, getByName} = useVariants();
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    useEffect(() => {
        const updatedVariant = getByName(item.join("/"));
        setVariantOnMemory(updatedVariant);
    }, [item, getByName, variants]);

    const handleFloatNumberChange = (value: string, setter: (value: string) => void) => {
        if (/^-?\d*\.?\d{0,2}$/.test(value)) {
            setter(value);
        }
    };

    const handleIntegerNumberChange = (value: string, setter: (value: string) => void) => {
        if (/^\d*$/.test(value)) {
            setter(value);
        }
    };

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
                    <label>Qty: {productQty ===  "" ? "0" : productQty } U.</label>
                </div>
                <div style={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: variantOnMemory?.image?.url ? "0px" : "2px dashed #7790ED",
                    padding: variantOnMemory?.image?.url ? "0px" : "10px",
                    borderRadius: "6px",
                    color: "#7790ED",
                }}>
                    {variantOnMemory?.image?.url
                        ? <img
                            src={variantOnMemory.image.url} alt={variantOnMemory.image.altText}
                            style={{
                                objectFit: "cover"
                            }}
                        />
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
                                    errors={errors}
                                    setErrors={setErrors}
                                    value={altText}
                                    validator={ValidateLongText}
                                    onChange={(value) => setAltText(value)}>
                                </TextField>
                                <TextField
                                    label="Price"
                                    placeholder="00.00 $"
                                    errors={errors}
                                    setErrors={setErrors}
                                    value={priceAdjustment}
                                    validator={ValidateNumberWithDecimals}
                                    onChange={(value) => handleFloatNumberChange(value, setPriceAdjustment)}>
                                </TextField>
                                <TextField
                                    label="Quantity"
                                    placeholder="000"
                                    errors={errors}
                                    setErrors={setErrors}
                                    value={productQty}
                                    validator={ValidateIntegerNumber}
                                    onChange={(value: string) => handleIntegerNumberChange(value, setProductQty)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={() => {
                                    if (errors.length == 0) {
                                        addVariant({
                                            name: item.join("/"),
                                            priceAdjustment: parseFloat(priceAdjustment),
                                            stockQuantity: parseInt(productQty),
                                            image: {
                                                url: selectedImages[0],
                                                altText: `Image for product variant: ${item.join("/")}`
                                            }
                                        })
                                        onClose();
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