"use client"
import AddProducts from "@/app/store/add-product/page";
import {useParams} from "next/navigation";

export default function UpdateProduct() {
  const params = useParams();
  const id = params?.id as string;

  if (id == null) {
    return <p>Page Not Found</p>
  }

  return (
    <AddProducts id={id}></AddProducts>
  );
}
