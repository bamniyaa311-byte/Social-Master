// CONFIGURATION - Replace with your actual keys
const OPENAI_KEY = "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";
const GEMINI_KEY = "AIzaSyDOGXd8OpV1vtY8QIdzzB4sn5oHtUXTXSE";

async function generateImage() {
    const prompt = document.getElementById('imagePrompt').value;
    const resultBox = document.getElementById('imageResult');
    resultBox.innerHTML = `<div class="loader">DALL·E 3 is painting...</div>`;

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_KEY}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
                quality: "hd" // Premium quality
            })
        });

        const data = await response.json();
        const imageUrl = data.data[0].url;
        
        resultBox.innerHTML = `<img src="${imageUrl}" class="fade-in" alt="AI Generated">`;
        addToLibrary(imageUrl, 'image');
    } catch (error) {
        resultBox.innerHTML = "<p>Error: Check OpenAI API Key or Quota.</p>";
    }
}

async function generateVideo() {
    const prompt = document.getElementById('videoPrompt').value;
    const resultBox = document.getElementById('videoResult');
    resultBox.innerHTML = `<div class="loader">Veo 3 is animating...</div>`;

    try {
        // Veo 3 uses the Gemini API video generation endpoint
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-generate-preview:generateVideos?key=${GEMINI_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: prompt,
                video_config: { aspect_ratio: "16:9", resolution: "1080p" }
            })
        });

        const data = await response.json();
        // Video generation is usually an 'operation' that takes time.
        // For simple UI, we show the status or the resulting URI if immediate.
        const videoUri = data.videoUri || data.uri; 
        
        resultBox.innerHTML = `<video controls autoplay class="fade-in"><source src="${videoUri}" type="video/mp4"></video>`;
        addToLibrary(videoUri, 'video');
    } catch (error) {
        resultBox.innerHTML = "<p>Error: Veo 3 API failed. Ensure Gemini API is active.</p>";
    }
}

function addToLibrary(url, type) {
    const gallery = document.getElementById('gallery');
    const div = document.createElement('div');
    div.className = "gallery-item glass-card";
    div.innerHTML = type === 'image' ? `<img src="${url}">` : `<video src="${url}" muted loop onmouseover="this.play()" onmouseout="this.pause()"></video>`;
    gallery.prepend(div);
}
