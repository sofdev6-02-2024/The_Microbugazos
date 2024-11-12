

export default function ProductDetails() {
    return (
        <div style={{
            padding: "24px 48px 24px 48px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            fontFamily: "Montserrat, serif",
        }}>
            <section style={{
                display: "flex",
                flexDirection: "row",
                gap: "12px"
            }}>
                <div style={{
                    width: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                }}>
                    <img style={{width: "15vw", borderRadius: "12px"}}
                         src="https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"/>
                    <img style={{width: "15vw", borderRadius: "12px"}}
                         src="https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"/>
                    <img style={{width: "15vw", borderRadius: "12px"}}
                         src="https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"/>
                </div>
                <img style={{width: "40vw", borderRadius: "12px"}} src="https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"/>
            </section>
            <section style={{
                paddingTop: "12px"
            }}>
                <h1 style={{color: "#000"}}>Product Name</h1>
            </section>
        </div>
    )
}