import useSWR from 'swr';

// Definimos el tipo de dato para la respuesta de la API
interface Photo {
  url: string;
  // Otros campos de la foto si los hubiera
}

// Definimos el tipo de la función fetcher
const fetcher = async (url: string): Promise<Photo[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('No se pudieron cargar los datos');
  }
  return response.json();
};

function SWR() {
  const { data: photos, error } = useSWR<Photo[]>('https://jsonplaceholder.typicode.com/photos', fetcher);

  if (error) return <div>Error al cargar los datos</div>;
  if (!photos) return <div>Cargando...</div>;

  return (
    photos && (
      <>
        <h1>An image using SWR</h1>
        <img src={photos[0].url} alt={"placeholder text"}></img>
      </>
    )
  );
}

export default SWR;
