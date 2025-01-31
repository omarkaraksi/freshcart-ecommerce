
import style from './Loading.module.css'
import HashLoader from "react-spinners/HashLoader";

export default function Loading() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return <>
      <HashLoader
        color={'#16AE98'}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />  
  </>
}
