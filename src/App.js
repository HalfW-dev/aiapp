import {useState} from 'react';
import axios from 'axios';

function App() {
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState('');

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const sendImage = async () => {
        try {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);

            fileReader.onload = async () => {
                const formData = new FormData();
                formData.append("file", image);

                const result = await axios.post(
                    "https://detect.roboflow.com/riichi-mahjong/6",
                    formData,
                    {
                        params: {
                            api_key: "9zBI3bx7d4qVBh2pX1N1",
                        },
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                setResponse(JSON.stringify(result.data, null, 2));
            }
        } catch(error) {
            console.error('Error sending image:', error.message);
            console.log('Error response:', error.response.data);
        }
    };

    return(
        <div>
            <h1>Image Upload and HTTP Request</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={sendImage}>Send Image</button>
                {response && (
                <div>
                <h2>Server Response:</h2>
                <pre>{response}</pre>
                </div>
                )}
        </div>
    )
}

export default App;