"use client"


import Select from "react-select";

interface SelectMembersProps{
    label:string,
    value?:Record<string, any>,
    onChange:(value:Record<string, any>) => void,
    options:Record<string, any>[],
    disabled?:boolean
}

const SelectMembers = ({label,value,onChange,options,disabled}:SelectMembersProps) =>{
    return(
        <div className={"z-[100]"}>
            <label className="block text-sm font-medium text-gray-900 leading-6">
                {label}
            </label>
            <div className="mt-2">
               <Select isDisabled={disabled} value={value} onChange={onChange} isMulti options={options}
                       menuPortalTarget={document.body} styles={{
                           menuPortal:(base) => ({
                               ...base,
                               zIndex:9999
                           })
               }}
                       classNames={{
                           control:() => "text-sm"
                       }}
               />
            </div>
        </div>
    )
}
export default SelectMembers