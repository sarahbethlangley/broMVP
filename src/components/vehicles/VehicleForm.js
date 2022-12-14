import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LocationFilter } from "./LocationFilter"


export const VehicleForm = () => {
  const [vehicles, setVehicles] = useState([])
  const [userChoices, setUserChoices] = useState({
    stockNumber: "",
    make: "",
    model: "",
    locationName: "",
    locationId: 0,
    imageURL: ""
  })


  const navigate = useNavigate()
  const handleSelectLocation = (loc) => {
    const copy = { ...userChoices }
    copy.locationId = parseInt(loc.id)
    copy.locationName = loc.name
    setUserChoices(copy)
  }

  const handleSaveVehicle = (event) => {
    event.preventDefault()
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userChoices),
    }
    fetch("http://localhost:8088/vehicles", requestOptions)
      .then((response) => response.json())
      .then((data) => setVehicles(data.id))
      .then(() => {
        navigate("/vehicles")
      })
  }

  return (
    <>
      <div className="vehicle-form-container">
        <form className="vehicle-form">
          <h2 className="vehicle-form-title">Vehicle Entry Form</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="stockNumber">Stock Number : </label>
              <input
                required
                id="stockNumber"
                type="text"
                className="form-control"
                placeholder="Stock Number"
                value={userChoices.stockNumber}
                onChange={(event) => {
                  const copy = { ...userChoices }
                  copy.stockNumber = event.target.value
                  setUserChoices(copy)
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="make">Make : </label>
              <input
                required
                id="make"
                type="text"
                className="form-control"
                placeholder="Make"
                value={userChoices.make}
                onChange={(event) => {
                  const copy = { ...userChoices }
                  copy.make = event.target.value
                  setUserChoices(copy)
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="model">Model : </label>
              <input
                required
                id="model"
                type="text"
                className="form-control"
                value={userChoices.model}
                placeholder="Model"
                onChange={(event) => {
                  const copy = { ...userChoices }
                  copy.model = event.target.value
                  setUserChoices(copy)
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
            <label htmlFor="model">Image URL </label>
            <input
                id="image"
                type="text"
                className="form-control"
                placeholder="image url"
                value={userChoices.imageURL}
                onChange={(event) => {
                  const copy = { ...userChoices }
                  copy.imageURL = event.target.value
                  setUserChoices(copy)
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="make">Locations : </label>
              <LocationFilter id="locationId" handleSelectLocation={handleSelectLocation} />
            </div>
          </fieldset>
      
        </form>
      </div>
      <button
        className="button"
        onClick={(event) => {
          handleSaveVehicle(event)
        }}
      >
        Add Vehicle
      </button>
    </>
  )
}




