"use client"

import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {Button} from "@/components/ui/button";
import {IoClose, IoDownload} from "react-icons/io5";

interface ImageModalProps{
    isOpen?:boolean,
    onClose:() => void,
    src?:string | undefined,
    children:React.ReactNode
}

const ImagesModal = ({isOpen,src,onClose,children}:ImageModalProps) => {
    return(
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300"
                enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="ease-in duration-400"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                    </div>
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <Transition.Child as={Fragment} enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                                  leave="ease-in duration-400"
                                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left
                        shadow-xsl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                            <div className="absolute top-0 right-0  hidden pr-4 pt-4 sm:block z-10 space-x-3">
                                <Button variant={"outline"} size="sm" className="rounded-md cursor-pointer bg-white text-gray-500 hover:text-gray-500
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" onClick={onClose}>
                                    <span className="sr-only">Close</span>
                                    <IoClose className="h-6 w-6"/>
                                </Button>
                                <Button variant={"default"} size="sm" className="rounded-md cursor-pointer bg-white text-gray-500 hover:text-gray-500
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" onClick={onClose}>
                                    <span className="sr-only">Download</span>
                                    <a href={src} download>
                                        <IoDownload className="h-6 w-6"/>
                                    </a>
                                    </Button>
                            </div>
                            {children}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
                    </div>
            </Dialog>
        </Transition.Root>
    )
}
export default ImagesModal