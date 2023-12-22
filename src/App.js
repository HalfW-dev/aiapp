import {useState} from 'react';
import ImageForm from './components/ImageForm';
import ImageResult from './components/ImageResult';

function App() {
    const [status, setStatus] = useState('standby'); //standby, pending, done

    const [image, setImage] = useState(null);
    const [response, setResponse] = useState('');
    
    return(
      <>
        <h1>Image Upload and HTTP Request</h1>
        <ImageForm image={image} setImage={setImage} response={response} setResponse={setResponse} setStatus={setStatus}/>
        <ImageResult response={response} status={status}/>
      </>
    )
}

export default App;