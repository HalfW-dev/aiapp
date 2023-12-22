import { useState } from "react";

function ImagePreview({image}) {
    const [imageUrl, setImageUrl] = useState('');

    const reader = new FileReader();

    reader.onloadend = () => {
        setImageUrl(reader.result);
    };

    if (image) {
        reader.readAsDataURL(image);
    }
    return(
        <>
            {imageUrl &&
                <div>
                    <h2>Image Preview</h2> 
                    <img src={imageUrl} 
                        alt="Selected" 
                        style={{ maxWidth: '100%', maxHeight: '300px' }} 
                    />
                </div>
            }
        </>
    )
}

export default ImagePreview;