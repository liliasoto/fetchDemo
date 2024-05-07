interface EstadoConFetchProps {
  imageURL: string | null;
  isLoading: boolean;
  error: Error | null;
}

function EstadoConFetch({ imageURL, isLoading, error }: EstadoConFetchProps) {

  if(isLoading) return <p>Page loading, please wait !!!</p>

  if(error) return <p>A network error was encountered!!!</p>

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