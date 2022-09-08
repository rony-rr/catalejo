import dynamic from "next/dynamic";

const SpinLoader = dynamic(() => import("./Spin"), { ssr: false });

export default SpinLoader;
