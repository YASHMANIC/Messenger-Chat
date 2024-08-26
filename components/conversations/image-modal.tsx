"use client"

import Image from "next/image";
import ImagesModal from "@/components/image-modal";

interface ImageModalProps{
    isOpen?:boolean,
    onClose:() => void
    src?:string | null
}

const ImageModal = ({isOpen,onClose,src}:ImageModalProps) => {
    if(!src){
            return null;
        }
    return(
        <ImagesModal src={src} onClose={onClose} isOpen={isOpen}>
            <div className="h-80 w-80">
                <Image src={src} fill alt={"Image"} className={"object-fill"}/>
            </div>
        </ImagesModal>
    )
}
export default ImageModal