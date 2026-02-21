import React, { useState } from 'react';
import axios from 'axios';

const TextToImage = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        { inputs: prompt },
        { headers: { Authorization: `Bearer ${process.env.REACT_APP_HF_API_KEY}` }, responseType: 'blob' }
      );
      setImage(URL.createObjectURL(response.data));
    } catch (error) {
      console.error("Generation failed", error);
    }
    setLoading(false);
  };

  return (
    <div className="tool-card">
      <h2>Text to Image</h2>
      <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="A futuristic city..." />
      <button onClick={generateImage}>{loading ? 'Generating...' : 'Create Image'}</button>
      {image && <img src={image} alt="Generated AI" />}
    </div>
  );
};
export default TextToImage;
