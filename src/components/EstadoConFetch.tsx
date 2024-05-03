import { useState, useEffect } from 'react'

function EstadoConFetch() {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", {mode: "cors"})
      .then((response) => response.json())
      .then((response) => setImageURL(response[0].url))
      .catch((error) => console.error(error));
  }, []);

  return (
    imageURL && (
      <>
        <h1>An image using a state with Fetch</h1>
        <img src={imageURL} alt={"placeholder text"}></img>
      </>
    ) 
  )
}

export default  EstadoConFetch;