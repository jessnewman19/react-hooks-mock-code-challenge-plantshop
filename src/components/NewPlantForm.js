import React, {useState} from "react";

function NewPlantForm({updatePlantList}) {
  /*
  1. Set state for the form item. Keys are equal to the names
  on the three inputs.
  2. Add value to the inputs that are equal to the form state
  3. Add onChange events to the inputs that handle the form change. 
  4. Add onSubmit event to the form. When fired, a POST request is issued and the new form object passed into callback function that was declared in Plant Page.
  5. In Plant Page, the new form item is passed into the callback function (updatePlantList) and the new data set of plants is rendered.
  6. Form state is set back to initial state once submit button is clicked.
  */
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
    .then(newData => { 
      updatePlantList(newData)
      setFormItem({ 
        name: "", 
        image: "",
        price: 0,
      })
    })
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
