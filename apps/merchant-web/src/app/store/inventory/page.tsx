"use client"

import styles from "@/styles/members-store/members-component.module.css";
import {IoAdd} from "react-icons/io5";
import {useRouter} from "next/navigation";

export default function InventoryPage() {
  const router = useRouter();
  return <div style={{height: "88vh"}}>
    <button
      className={styles['add-seller-button']}
      onClick={() => router.push('/store/inventory/add-product')}
    >
      <IoAdd/>
      Add Product
    </button>
  </div>;
}
