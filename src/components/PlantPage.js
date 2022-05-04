import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => { 
    fetch("http://localhost:6001/plants")
    .then(response=> response.json())
    .then(data => setPlants(data))
  }, [])

  function updatePlantList(newPlant) {
    setPlants([...plants, newPlant])
}

  function changeSearch (searchedItem) {
    setQuery(searchedItem)
  }
  
  const filteredPlants = !query ? plants : plants.filter(plant => plant.name.includes(query))

  return (
    <main>
      <NewPlantForm updatePlantList={updatePlantList}/>
      <Search plants={plants} query={query} changeSearch={changeSearch}/>
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
