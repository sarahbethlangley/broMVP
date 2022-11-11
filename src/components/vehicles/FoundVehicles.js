// import "./Products.css"
import { useEffect, useState } from "react"

export const FoundVehicles = ({ searchTermState }) => {
    const [filteredVehicles, setFiltered] = useState([])
    const [vehicles, setVehicles] = useState([])
  

    useEffect(
        ()=>{
            const searchedVehicles = vehicles.filter(vehicle => {
                if(
                    vehicle.stockNumber.toLowerCase().startsWith(searchTermState.toLowerCase()) && searchTermState.replace(" ", "") !== ""
                ){
                    return true 
                }    
            })
            setFiltered(searchedVehicles)
        },[ searchTermState ]    
    )

    useEffect(() => {
        fetch('http://localhost:8088/vehicles')
        .then((response) => response.json())
        .then((data) => { 
            setVehicles(data)
        })
    }, []

    )

   

    return (
    <>
   
        <div className="search-items-container">
            <h4>This vehicle is located in:</h4>
           
            <article className="returned-vehicles">
            {
               filteredVehicles.map(
                (vehicle) => {
                    return(
                    <section 
                    key= {vehicle.id}  
                    className="product-item">
                        <div> {vehicle.locationName} </div>       
                    </section>)
                }
                )
                 
            }
            </article>
        </div>  
       
    </>
    )
} 