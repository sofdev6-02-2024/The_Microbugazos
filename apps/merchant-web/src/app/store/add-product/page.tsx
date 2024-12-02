"use client";
import {useEffect, useState} from "react";
import axiosInstance from "@/request/AxiosConfig";
import ComboBox from "@/components/combo-box";
import Dropzone from "@/components/image-selector";
import TextField from "@/components/text-field";
import ProductOptionsModal from "@/components/admin-panel/product-options-modal";
import OptionRow from "@/components/admin-panel/option-row";
import {Option, useOptions} from "@/commons/providers/add-product-provider";
import VariantModal from "@/components/admin-panel/variant-modal";
import {useVariants, Variant} from "@/commons/providers/variant-provider";
import {ValidateLongText, ValidateName} from "@/commons/validations/string";
import {ValidateNumberWithDecimals} from "@/commons/validations/number";
import Notification from "@/components/notification";
import {useStore} from "@/commons/context/StoreContext";
import AddProductStyle from "../../../styles/admin-panel/add-products.module.css";
import TextFieldStyle from "../../../styles/components/TextField.module.css";
import {toast} from "sonner";
import Category from "@/commons/entities/concretes/Category";

interface Props {
  id?: string;
}

export default function AddProducts({id}: Readonly<Props>) {
  const [errors, setErrors] = useState<[{ textField: string; error: string }]>([]);
  const [editMode, setEditMode] = useState(false);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productBrand, setProductBrand] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [productSubCategory, setProductSubCategory] = useState<string>("");
  const { options, setOptions } = useOptions();
  const { variants, setVariants } = useVariants();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [combinationVariants, setCombinationVariants] = useState([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const { store } = useStore();

  useEffect(() => {
    loadCategoriesInfo();
  }, []);

  useEffect(() => {
    if (id != null && categories.length != 0) {
      setEditMode(true);
      loadEditInfo();
    }
  }, [categories]);

  useEffect(() => {
    setCombinationVariants(getVariants());
  }, [options]);

  useEffect(() => {
    let mapSubcategories = categories
      .filter((item) => item.name == productCategory)
      .map((item) => item.subCategories);

    setSubCategories(mapSubcategories[0] ?? []);
  }, [productCategory]);

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

  const parseToProductDTO = () => {
    return {
      storeId: store?.id,
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
          return editMode ? GetUpdateVariantDto(variant, item) : GetCreateVariantDto(variant, item);
        } else {
          return {
            image: null,
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

  const GetCreateVariantDto = (variant: Variant, item) => {
    return {
      image: variant?.image?.url != null ? {
        altText: variant?.image?.altText ?? "",
        url: variant?.image?.url ?? "",
      } : null,
      priceAdjustment: variant?.priceAdjustment ?? 0.0,
      stockQuantity: variant?.stockQuantity ?? 0,
      attributes: options.map((i, index) => {
        return {
          name: i.name,
          value: item[index],
        };
      }),
    };
  }

  const GetUpdateVariantDto = (variant: Variant, item) => {
    if (variant.id != null) {
      return {
        id: variant.id,
        image: variant?.image?.url != null ? {
          altText: variant?.image?.altText ?? "",
          url: variant?.image?.url ?? "",
        } : null,
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
        image: variant?.image?.url != null ? {
          altText: variant?.image?.altText ?? "",
          url: variant?.image?.url ?? "",
        } : null,
        priceAdjustment: variant?.priceAdjustment ?? 0.0,
        stockQuantity: variant?.stockQuantity ?? 0,
        attributes: options.map((i, index) => {
          return {
            name: i.name,
            value: item[index],
          };
        }),
      };
    }
  }

  const loadCategoriesInfo = () => {
    axiosInstance.get("/inventory/Category")
      .then(response => response.data)
      .then(data => setCategories(data.data.map(item => new Category(
        item.id, item.name, item.subCategories
      ))));
  }

  const loadEditInfo = () => {
    axiosInstance.get(`/inventory/Product/${id}`)
      .then(response => response.data)
      .then(data => {
        setProductName(data.data.name);
        setProductDescription(data.data.description);
        setProductBrand(data.data.brand);
        setProductPrice(data.data.price);
        setProductCategory(getParentCategory(data.data.categories[0].id)?.name ?? "");
        setProductSubCategory(data.data.categories[0].name);
        setSelectedImages(data.data.images.map(i => i.url));
        setOptions(getOptions(data.data.productVariants));
        setVariants(getVariantsFromResponse(data.data.productVariants));
      })
      .catch(e => toast.error(e));
  }

  const getParentCategory = (id) => {
    if (!categories.length) {
      console.log("Categories don't have data");
      return null;
    }

    return categories.find(i => i.subCategories.some(sc => sc.id == id)) ?? null;
  }

  const getOptions = (variants: any[]): Option[] => {
    const groupedAttributes = variants.reduce((result, variant) => {
      variant.attributes.forEach((attribute: { name: string; value: string }) => {
        if (!result[attribute.name]) {
          result[attribute.name] = new Set<string>();
        }
        result[attribute.name].add(attribute.value);
      });
      return result;
    }, {} as Record<string, Set<string>>);

    return Object.entries(groupedAttributes).map(([name, valueSet]) => ({
      name,
      options: Array.from(valueSet as Array<string>),
    }));
  };

  const getVariantsFromResponse = (variants: any[]): Variant[] => {
    return variants.map(v => {
      return {
        id: v.productVariantId,
        name: v.attributes.map(attr => attr.value).join("/"),
        priceAdjustment: v.priceAdjustment,
        stockQuantity: v.stockQuantity,
        image: v.productVariantImage,
      };
    });
  }

  const sendProduct = () => {
    const body = parseToProductDTO();
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

  const updateProduct = async () => {
    try {
      const body = parseToProductDTO();
      const response = await axiosInstance.put(`inventory/Product/${id}`, body);
      console.log(response);
      toast.success("Product updated");
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleSubmit = () => {
    touchAllFields();
    if (errors.length == 0) {
      if (editMode) {
        updateProduct();
      } else {
        sendProduct();
      }
    }
  }

  return (
    <div className={AddProductStyle.addProductForm}>
      <h3 className={AddProductStyle.heading1}>{editMode ? "Update Product" : "Add Product"}</h3>
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
      <h3 className={TextFieldStyle.formLabel}>
        Categories<sup>*</sup>
      </h3>
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
      <h3 className={TextFieldStyle.formLabel}>
        Images<sup>*</sup>
      </h3>
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
      <h3 className={TextFieldStyle.formLabel}>Other Specifications</h3>
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Options</h4>
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
      <h3 className={TextFieldStyle.formLabel}>Variants</h3>
      {combinationVariants.map((item) =>
        item.length === 0 ? (
          <div key={"id"}></div>
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
          onClick={handleSubmit}
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
