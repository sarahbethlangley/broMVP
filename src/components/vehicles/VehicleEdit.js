import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LocationFilter } from "./LocationFilter";


export const VehicleEdit = (evt) => {
  const [vehicle, setVehicle] = useState({
    stockNumber: "",
    make: "",
    model: "",
    locationName: "",
    locationId: 0,
  });

  const localBroUser = localStorage.getItem("bro_user");
  const broUserObject = JSON.parse(localBroUser);

  const navigate = useNavigate();

  const vehicleEditId = localStorage.getItem("editVehicleId");

  const handleSelectLocation = (loc) => {
    const copy = { ...vehicle };
    copy.locationId = parseInt(loc.id);
    copy.locationName = loc.name;
    setVehicle(copy);
  };

  const getVehicleById = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:8088/vehicles/${vehicleEditId}`, requestOptions)
      .then((response) => response.json())
      .then((vehicle) => setVehicle(vehicle));
  };
 
  useEffect(() => {
    getVehicleById();
  }, []);

  const handleEditVehicle = (evt) => {
    evt.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicle),
    };
    fetch(`http://localhost:8088/vehicles/${vehicleEditId}`, requestOptions)
      .then((response) => response.json())
      .then(() => {
        navigate("/vehicles");
      });
  };
  const handleUserInput = (event) => {
    const copy = { ...vehicle };
    copy[event.target.name] = event.target.value;
    setVehicle(copy);
  };

  return (
    <>
      <div className="vehicle-form-container">
        <form className="vehicle-form">
          <h2 className="vehicle-form-title">Edit Vehicle Entry Form</h2>

          <fieldset>
            {broUserObject.sales ? (
              <div className="form-group">
                <label htmlFor="stockNumber">Stock Number : </label>
                <input
                  className="form-control"
                  id="stockNumber"
                  type="text"
                  name="stockNumber"
                  // the value is only allowed because it IS a controlled field, and that allows you to edit it, otherwise the value would not be editable.  point of controlled input is ot fight against attack
                  value={vehicle.stockNumber}
                  onChange={handleUserInput}
                />
              </div>
            ) : (
              ""
            )}
          </fieldset>
          <fieldset>
            {broUserObject.sales ? (
              <div className="form-group">
                <label htmlFor="make">Make : </label>
                <input
                  className="form-control"
                  id="make"
                  type="text"
                  name="make"
                  value={vehicle.make}
                  onChange={handleUserInput}
                />
              </div>
            ) : (
              ""
            )}
          </fieldset>
          <fieldset>
          {broUserObject.sales ? (
            <div className="form-group">
              <label htmlFor="model">Model : </label>
              <input
                className="form-control"
                id="model"
                type="text"
                name="model"
                value={vehicle.model}
                onChange={handleUserInput}
              />
            </div>
             ) : (
              ""
            )}
          </fieldset>
          <fieldset>
          {broUserObject.sales ? (
            <div className="form-group">
            <label htmlFor="model">Image URL </label>
            <input
                id="image"
                type="text"
                className="form-control"
                placeholder="image url"
                value={vehicle.imageURL}
                onChange={handleUserInput}
              />
            </div>
             ) : (
              ""
            )}
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="locationName">Locations : </label>
              <LocationFilter
                className="form-control"
                key={vehicle.locationName}
                id="locationId"
                name="locationName"
                value={vehicle.locationName}
                handleSelectLocation={handleSelectLocation}
                onChange={handleUserInput}
              />
            </div>
          </fieldset>
        </form>
      </div>
      <button
        className="button"
        onClick={(event) => {
          handleEditVehicle(event);
        }}
      >
        Update Vehicle
      </button>
    </>
  );
};
