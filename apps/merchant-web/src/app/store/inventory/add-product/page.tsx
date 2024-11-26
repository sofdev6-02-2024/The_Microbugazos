"use client";
import ComboBox from "@/components/combo-box";
import Dropzone from "@/components/image-selector";
import TextField from "@/components/text-field";
import { useEffect, useState } from "react";
import ProductOptionsModal from "@/components/admin-panel/product-options-modal";
import OptionRow from "@/components/admin-panel/option-row";
import { useOptions } from "@/commons/providers/add-product-provider";
import VariantModal from "@/components/admin-panel/variant-modal";
import { useVariants } from "@/commons/providers/variant-provider";
import { ValidateName } from "@/commons/validations/string";
import { ValidateLongText } from "@/commons/validations/string";
import { ValidateNumberWithDecimals } from "@/commons/validations/number";
import Notification from "@/components/notification";
import AddProductStyle from "../../../../styles/admin-panel/add-products.module.css";
import TextFieldStyle from "../../../../styles/components/TextField.module.css";

export default function AddProducts() {
  const [errors, setErrors] = useState<[{ textField: string; error: string }]>(
    []
  );
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productBrand, setProductBrand] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [productSubCategory, setProductSubCategory] = useState<string>("");
  const { options } = useOptions();
  const { variants } = useVariants();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [combinationVariants, setCombinationVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setCombinationVariants(getVariants());
  }, [options]);

  const validators = [
    {
      field: "productCategory",
      message: "Categories are required",
      validate: () => productCategory !== "" && productSubCategory !== "",
    },
    {
      field: "productName",
      message: "Name is required",
      validate: () => productName !== "",
    },
    {
      field: "productBrand",
      message: "Brand is required",
      validate: () => productBrand !== "",
    },
    {
      field: "productPrice",
      message: "Price is required",
      validate: () => productPrice !== "",
    },
    {
      field: "productImages",
      message: "At least one image is required",
      validate: () => selectedImages.length !== 0,
    },
  ];

  const touchAllFields = () => {
    const newErrors = [...errors];

    validators.forEach(({ field, message, validate }) => {
      const errorIndex = newErrors.findIndex(
        (error) => error.textField === field
      );

      if (!validate()) {
        if (errorIndex === -1) {
          newErrors.push({ textField: field, error: message });
        }
      } else if (errorIndex !== -1) {
        newErrors.splice(errorIndex, 1);
      }
    });

    setErrors(newErrors);
  };

  const getVariants = () => {
    const optionsList = options.map((item) => item.options);
    return optionsList.reduce(
      (acc, list) => {
        const newAcc = [];
        for (let itemAcc of acc) {
          for (let item of list) {
            newAcc.push([...itemAcc, item]);
          }
        }
        return newAcc;
      },
      options.length > 0 ? [[]] : [["Default"]]
    );
  };

  const handleFloatNumberChange = (
    value: string,
    setter: (value: string) => void
  ) => {
    if (/^-?\d*\.?\d{0,2}$/.test(value)) {
      setter(value);
    }
  };

  const handleComboBoxChange = (
    value: string,
    setter: (value: string) => void
  ) => {
    setter(value);
  };

  const parseToCreateProductDTO = () => {
    return {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      brand: productBrand,
      categoryIds: [subCategories.find((i) => i.name == productSubCategory).id],
      images: selectedImages.map((item) => {
        return {
          altText: `${productName} image (${productDescription})`,
          url: item,
        };
      }),
      productVariants: combinationVariants.map((item) => {
        let index;
        if (item == "Default")
          index = variants.findIndex((i) => i.name == item);
        else index = variants.findIndex((i) => i.name == item.join("/"));

        if (index !== -1) {
          const variant = variants[index];
          return {
            image: {
              altText: variant?.image?.altText ?? "",
              url: variant?.image?.url ?? "",
            },
            priceAdjustment: variant?.priceAdjustment ?? 0.0,
            stockQuantity: variant?.stockQuantity ?? 0,
            attributes: options.map((i, index) => {
              return {
                name: i.name,
                value: item[index],
              };
            }),
          };
        } else {
          return {
            image: {
              altText: "no image",
              url: "",
            },
            priceAdjustment: 0,
            stockQuantity: 0,
            attributes: options.map((i, index) => {
              return {
                name: i.name,
                value: item[index],
              };
            }),
          };
        }
      }),
    };
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/inventory/Category")
      .then((response) =>
        response.json().then((data) => {
          const categories = data.data.map((item) => {
            return {
              name: item.name,
              id: item.id,
              subCategories: item.subCategories,
            };
          });
          setCategories(categories);
        })
      )
      .catch((e) => console.error(e));
  }, []);

  const sendProduct = () => {
    const body = parseToCreateProductDTO();
    fetch("http://localhost:5001/api/inventory/Product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          setIsSuccess(true);
        }
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    let mapSubcategories = categories
      .filter((item) => item.name == productCategory)
      .map((item) => {
        return item.subCategories;
      });

    setSubCategories(mapSubcategories[0]);
  }, [productCategory]);

  return (
    <div className={AddProductStyle.addProductForm}>
      <label className={AddProductStyle.heading1}>Add Product</label>
      <TextField
        label="Name"
        placeholder="Write the name of the product"
        errors={errors}
        setErrors={setErrors}
        value={productName}
        validator={ValidateName}
        onChange={(value: string) => setProductName(value)}
        required={true}
      />
      {errors.find((item) => item.textField == "productName") && (
        <label style={{ fontSize: "14px", color: "#FB5012" }}>
          {errors.find((item) => item.textField == "productName")?.error}
        </label>
      )}
      <TextField
        label="Description"
        placeholder="Insert description for the product"
        errors={errors}
        setErrors={setErrors}
        value={productDescription}
        validator={ValidateLongText}
        onChange={(value: string) => setProductDescription(value)}
      />
      <TextField
        label="Brand"
        placeholder="Insert brand of the product"
        errors={errors}
        setErrors={setErrors}
        value={productBrand}
        validator={ValidateName}
        onChange={(value: string) => setProductBrand(value)}
      />
      {errors.find((item) => item.textField == "productBrand") && (
        <label style={{ fontSize: "14px", color: "#FB5012" }}>
          {errors.find((item) => item.textField == "productBrand")?.error}
        </label>
      )}
      <TextField
        label="Price"
        placeholder="100.00 $"
        errors={errors}
        setErrors={setErrors}
        value={productPrice}
        validator={ValidateNumberWithDecimals}
        onChange={(value: string) =>
          handleFloatNumberChange(value, setProductPrice)
        }
        required={true}
      />
      {errors.find((item) => item.textField == "productPrice") && (
        <label style={{ fontSize: "14px", color: "#FB5012" }}>
          {errors.find((item) => item.textField == "productPrice")?.error}
        </label>
      )}
      <br />
      <label className={TextFieldStyle.formLabel}>
        Categories<sup>*</sup>
      </label>
      <div className={AddProductStyle.categorySection}>
        <ComboBox
          value={productCategory}
          options={categories}
          handleChange={(value) => {
            handleComboBoxChange(value, setProductCategory);
            setProductSubCategory("");
          }}
        />
        <ComboBox
          value={productSubCategory}
          options={subCategories}
          handleChange={(value) =>
            handleComboBoxChange(value, setProductSubCategory)
          }
        />
      </div>
      {errors.find((item) => item.textField == "productCategory") && (
        <label style={{ fontSize: "14px", color: "#FB5012" }}>
          {errors.find((item) => item.textField == "productCategory")?.error}
        </label>
      )}
      <br />
      <label className={TextFieldStyle.formLabel}>
        Images<sup>*</sup>
      </label>
      <Dropzone
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />
      {errors.find((item) => item.textField == "productImages") && (
        <label style={{ fontSize: "14px", color: "#FB5012" }}>
          {errors.find((item) => item.textField == "productImages")?.error}
        </label>
      )}
      <br />
      <label className={TextFieldStyle.formLabel}>Other Specifications</label>
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>Options</label>
          <ProductOptionsModal></ProductOptionsModal>
        </div>
        {options && options.length > 0 ? (
          options.map((item) => (
            <OptionRow key={item.name} hasInfo={true} option={item} />
          ))
        ) : (
          <OptionRow hasInfo={false} />
        )}
      </div>
      <label className={TextFieldStyle.formLabel}>Variants</label>
      {combinationVariants.map((item) =>
        item.length === 0 ? (
          <div></div>
        ) : (
          <VariantModal key={item} item={item} />
        )
      )}
      {errors.find((item) => item.textField == "productVariant") && (
        <label style={{ fontSize: "14px", color: "#FB5012" }}>
          {errors.find((item) => item.textField == "productVariant")?.error}
        </label>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "20px",
        }}
      >
        <button className={AddProductStyle.merchantButtonSecondary}>
          Cancel
        </button>
        <button
          className={AddProductStyle.merchantButton}
          onClick={() => {
            touchAllFields();
            if (errors.length == 0) {
              sendProduct();
            }
          }}
        >
          Confirm
        </button>
      </div>
      {isSuccess && (
        <Notification
          isOpen={isSuccess}
          setIsOpen={setIsSuccess}
          title="Product created successfully"
          description="Your product was added to your store, add more and enjoy."
          duration={5000}
        />
      )}
    </div>
  );
}
