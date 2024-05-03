import { useState, useEffect } from 'react';

function useFetch(url: string) {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(url, { mode: "cors" });
        if (!response.ok) {
          throw new Error('No se pudieron cargar los datos');
        }
        const result = await response.json();
        setData(result[0].url);
    };

    fetchData();

  }, [url]);

  return { data };
}

function EstadoConFetch() {
  const { data: imageURL } = useFetch("https://jsonplaceholder.typicode.com/photos");

  if (!imageURL) return <div>Cargando...</div>;

  return (
    <>
      <h1>An image using useFetch</h1>
      <img src={imageURL} alt={"placeholder text"} />
    </>
  );
}

export default EstadoConFetch;
