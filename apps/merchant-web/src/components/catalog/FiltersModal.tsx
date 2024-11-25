"use client"

import {useEffect, useState} from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  useDisclosure
} from "@nextui-org/react";
import {ListFilter} from "lucide-react";
import axiosInstance from "@/request/AxiosConfig";
import ComboBox from "@/components/combo-box";
import ModalStyle from "@/styles/store-catalog/Modal.module.css"
import {useFiltersContext} from "@/contexts/FiltersContext";
import {useProductsView} from "@/contexts/ProductsViewContext";

interface Subcategory {
  id: string,
  name: string,
}
interface CategoryMap {
  id: string,
  subcategories: Array<Subcategory>,
}

export default function FiltersModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {isApplied, priceRange, ratingRange,
    setIsApplied, setCategoryId, setSubcategoryId, setPriceRange, setRatingRange} = useFiltersContext();
  const {sendReloadSignal} = useProductsView();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoriesMap, setSubcategoriesMap] = useState<Array<CategoryMap>>([]);

  useEffect(() => {
    axiosInstance.get("/inventory/Category")
      .then(response => response.data)
      .then(data => {
        setCategories(data.data);
        setSubcategoriesMap(data.data.map(category => {
          return {
            id: category.id,
            subcategories: category.subCategories
          }
        }));
      })
  }, []);

  useEffect(() => {
    if (!category) return;
    let categoryId = categories.find(e => e.name == category).id;
    let subcategories = subcategoriesMap.find(item => item.id === categoryId);
    setCategoryId(categoryId);
    setSubcategories(subcategories?.subcategories ?? []);
  }, [category]);

  useEffect(() => {
    if (!subcategory) return;
    let id = subcategories.find(e => e.name === subcategory).id;
    setSubcategoryId(id);
  }, [subcategory]);

  const clearFilters = () => {
    setCategoryId("");
    setCategory("");
    setSubcategoryId("");
    setSubcategory("");
    setPriceRange([100, 500]);
    setRatingRange([1, 2.5]);
  }

  return (
    <>
      <button
        className={`${ModalStyle.modalButton} ${isApplied && ModalStyle.applied}`}
        onClick={onOpen}
      >
        <ListFilter></ListFilter>
        <span>Filter</span>
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
                  <div className={ModalStyle.row}>
                    <ComboBox
                      options={categories}
                      value={category}
                      handleChange={setCategory}
                      placeholder={"Category"}>
                    </ComboBox>
                    <ComboBox
                      options={subcategories}
                      value={subcategory}
                      handleChange={setSubcategory}
                      placeholder={"Subcategory"}>
                    </ComboBox>
                  </div>
                  <Slider
                    label="Price Range"
                    step={50}
                    minValue={0}
                    maxValue={1000}
                    defaultValue={priceRange}
                    formatOptions={{style: "currency", currency: "USD"}}
                    className="max-w-md"
                    onChange={(range) => setPriceRange(range)}
                  />
                  <Slider
                    label="Rating"
                    step={0.5}
                    minValue={0.0}
                    maxValue={5.0}
                    defaultValue={ratingRange}
                    formatOptions={{style: "decimal"}}
                    className="max-w-md"
                    onChange={(range) => setRatingRange(range)}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button className={ModalStyle.primaryButton} onPress={() => {
                  setIsApplied(true);
                  sendReloadSignal();
                  onClose();
                }}>
                  Apply
                </Button>
                <Button className={ModalStyle.secondaryButton} onPress={() => {
                  setIsApplied(false);
                  clearFilters();
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