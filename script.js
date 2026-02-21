async function generateImage() {
    const prompt = document.getElementById('imagePrompt').value;
    const resultBox = document.getElementById('imageResult');
    
    resultBox.innerHTML = "<p>Processing AI Image...</p>";

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
            {
                method: "POST",
                headers: { 
                    "Authorization": "Bearer YOUR_HF_API_KEY", // Get key from huggingface.co
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ inputs: prompt }),
            }
        );
        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        resultBox.innerHTML = `<img src="${imgUrl}" alt="AI Generated">`;
    } catch (e) {
        resultBox.innerHTML = "<p>Error generating image. Check API key.</p>";
    }
}

function generateVideo() {
    const resultBox = document.getElementById('videoResult');
    resultBox.innerHTML = "<p>Video generation requires a Luma or Runway API key. Integration pending...</p>";
}
