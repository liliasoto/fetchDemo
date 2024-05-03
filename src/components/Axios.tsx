import { useState, useEffect } from 'react';
import axios from 'axios';

function Axios() {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setImageURL(response.data[0].url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    imageURL && (
      <>
        <h1>An image using Axios</h1>
        <img src={imageURL} alt={"placeholder text"}></img>
      </>
    )
  );
}

export default Axios;