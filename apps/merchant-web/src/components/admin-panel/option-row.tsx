import {useOptions} from "@/commons/providers/add-product-provider";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function OptionRow({ hasInfo, option }) {
    const {removeOption} = useOptions();

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingTop: "8px",
            paddingBottom: "8px",
            borderBottom: "0.1px solid #ACACAC"
        }}>
            <div
                style={{width: "16px", height: "16px", border: "1px solid #000", borderRadius: "100%", marginLeft: "4px", marginRight: "8px"}}
            ></div>
            {hasInfo
                ? <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center"
                    }}>
                    <div>
                        <label>{option.name} ({option.options.length})</label>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "4px"
                        }}>
                            {option.options.map((item, index) => <div style={{
                                backgroundColor: "#ffdfe9",
                                textAlign: "center",
                                borderRadius: "4px",
                                marginRight: "4px",
                                paddingRight: "16px",
                                paddingLeft: "16px",}}
                              key={item + index}
                            >
                                {item}
                            </div>)}
                        </div>
                    </div>
                    <MdOutlineDeleteOutline size={24} style={{cursor: "pointer"}} onClick={() => {
                        removeOption(option)
                    }}></MdOutlineDeleteOutline>
                </div>
                : <label>No options yet...</label>}
        </div>
    )
}