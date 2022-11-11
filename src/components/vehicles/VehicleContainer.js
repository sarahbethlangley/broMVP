import { useState } from "react"
import { FoundVehicles } from "./FoundVehicles"
import { VehicleSearch } from "./VehicleSearch"



export const VehicleContainer =() => {

    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <VehicleSearch setterFunction={setSearchTerms}/>
		<FoundVehicles searchTermState={searchTerms}/> 
    </>
}