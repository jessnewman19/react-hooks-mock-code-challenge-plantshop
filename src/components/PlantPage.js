import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [query, setQuery] = useState("")

  /*
  Renders data on the page as soon as the page loads/is refreshed
  */
  useEffect(() => { 
    fetch("http://localhost:6001/plants")
    .then(response=> response.json())
    .then(data => setPlants(data))
  }, [])

  /*
  Callback function for the form component
  */
  function updatePlantList(newPlant) {
    setPlants([...plants, newPlant])
}

  /* SEARCH COMPONENT 
  1. Set query state in the Plant Page component. 
  2. Passed query state into the Search Component to create value. 
  3. onChange event was added and passed into the Search Component to set the state of the query. 
  4. Create a new variable, filteredPlants, to create new array based on the content of the query. If nothing is entered into the query, everything on the page loads. If something is typed in as a query, the plants are filtered to represent only these plants. 
  5. filteredPlants is passed into Plant List, and further into Plant Card, to render new plant data on the screen
  */
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
