import { useState, useEffect } from 'react'
import './App.css'

const useImageURL = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const responses = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/photos/1", { mode: "cors" }),
          fetch("https://jsonplaceholder.typicode.com/photos/2", { mode: "cors" })
        ]);

        const data = await Promise.all(responses.map(async response => {
          if (!response.ok) {
            throw new Error("Server error!!");
          }
          return response.json();
        }));

        // Actualiza las imágenes secuencialmente después de Promise.all
        for (const imageData of data) {
          setImageURL(imageData.url);
          // Espera un segundo antes de cargar la siguiente imagen
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { imageURL, error, loading };
};

function App() {
  const { imageURL, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>
  if (error) return <p>A network error was encountered!</p>

  return (
    imageURL && (
      <>
        <h1>An image</h1>
        <img src={imageURL} alt={"placeholder text"} />
      </>
    )
  )
}

export default App


{/*
import './App.css'
import EstadoConFetch from './components/EstadoConFetch'
import { useEffect, useState } from 'react'

const useImageURL = ()=>{
  const [imageURL, setImageURL] = useState(null);
  const [error, SetError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", {mode: "cors"})
      .then((response) => {
        if (response.status >= 400){
          throw new Error("Error!!!")
        }
        return response.json()
      })
      .then((response) => setImageURL(response[0].url))
      .catch((error) => SetError(error))
      .finally(()=>setLoading(false));
  }, []);

  return {imageURL, error, isLoading}
};

function App() {
  const {imageURL, error, isLoading} = useImageURL();
  return (
    <>
      <EstadoConFetch imageURL={imageURL} isLoading={isLoading} error={error}></EstadoConFetch>
      
      <SWR></SWR>
      <ReactQuery></ReactQuery>
      <Axios></Axios>
      <UseFetch></UseFetch>
      
    </>
  )
}

export default App
*/}
