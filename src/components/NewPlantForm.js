import React, {useState} from "react";

function NewPlantForm({updatePlantList}) {
  const [formItem, setFormItem] = useState({ 
    name: "", 
    image: "",
    price: 0,
  })

  function handleChange(e) { 
    const {name, value} = e.target
    setFormItem(previousState => ({...previousState, [name]: value}))
  }

  function handleSubmit (e) { 
    e.preventDefault()
    fetch("http://localhost:6001/plants", { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(formItem)
    })
    .then(response => response.json())
    .then(newData => updatePlantList(newData))
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={formItem.name} onChange={handleChange}/>
        <input type="text" name="image" placeholder="Image URL" value={formItem.image} onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={formItem.price} onChange={handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
