// PhotoViewer.tsx
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const queryClient = new QueryClient();

function PhotoViewer(): JSX.Element {
  const { data, isLoading, isError } = useQuery<Photo[]>('photos', () =>
    fetch('https://jsonplaceholder.typicode.com/photos', { mode: 'cors' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
  );

  return (
    <div className="PhotoViewer">
      <h1>An image using React Query</h1>
      {isError && <div>Error fetching data</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        // Asegúrate de que data es un arreglo y tiene al menos un elemento
        data && data.length > 0 ? (
          <img src={data[0].url} alt={data[0].title} />
        ) : (
          <div>No data available</div>
        )
      )}
    </div>
  );
}

function ReactQuery(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <PhotoViewer />
    </QueryClientProvider>
  );
}

export default ReactQuery;