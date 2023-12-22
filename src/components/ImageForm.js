import axios from 'axios';

function ImageForm({image, setImage, response, setResponse, setStatus}) {

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const sendImage = async () => {
        try {
            setStatus('pending');

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
                setStatus('done');
            }
        } catch(error) {
            console.error('Error sending image:', error.message);
            console.log('Error response:', error.response.data);
        }
    };

    return(
        <>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={sendImage}>Send Image</button>
                {response && (
                    <div>
                    <h2>Server Response:</h2>
                    <pre>{response}</pre>
                    </div>
                )}
        </>
    )
}

export default ImageForm;