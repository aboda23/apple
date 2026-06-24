import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
// import {useMacbookStore} from "../Store/index.js";

import { Box, OrbitControls } from "@react-three/drei";
import MacbookModel14 from "../../../components/models/Macbook-14.jsx";
import StudioLights from "../../../components/three/StudioLights.jsx";
import ModelSwitcher from "../../../components/three/ModelSwitcher.jsx";
import { useMediaQuery } from "react-responsive";
import { useMacbookStore } from "../../../Store/index.js";

const ProductViewer = () => {
    const { color, setColor, scale, setScale } = useMacbookStore();
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    return (
        <section id="product-viewer">
            <h2 className="flex items-center justify-center">Take a closer look.</h2>{" "}
            <div className="controls">
                <p className="info">
                    Macbook pro available in 14" & 16" in space gray and dark colors{" "}
                </p>
                <div className="flex-center gap-5 mt-5">
                    <div className="color-control flex gap-2">
                        <div onClick={() => setColor("#adb5bd")} className={clsx("bg-neutral-300", color == "#adb5bd" && "active")}></div>{" "}
                        <div onClick={() => setColor("#2c2e2c")} className={clsx("bg-neutral-900", color == "#2c2e2c" && "active")}></div>{" "}
                    </div>
                    <div className="size-control ">
                        <div onClick={() => setScale(0.06)} className={clsx(scale == 0.06 ? "bg-white text-black" : "text-white bg-transparent")}>
                            <p>14"</p>
                        </div>
                        <div onClick={() => setScale(0.08)} className={clsx(scale == 0.08 ? "bg-white text-black" : "text-white bg-transparent")}>
                            <p>16"</p>
                        </div>
                    </div>
                </div>
            </div>
            <Canvas id="canvas" camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}>
                <StudioLights />

                <ModelSwitcher
                    scale={isMobile ? scale - 0.03 : scale} isMobile={isMobile}/>
            </Canvas>
        </section>
    );
};
export default ProductViewer;
