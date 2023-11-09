import Image from "next/image";

function LandingImage() {
    return (
        <div className="w-full h-full">
            <Image src="/SmartCollectLogo.png" width={400} height={400} alt="Logo" className="w-full h-full" />
        </div>);
}

export default LandingImage;