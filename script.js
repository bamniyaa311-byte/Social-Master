// 1. Navigation Logic
function showSection(id) {
    document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(id).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 2. AI Logic
const HF_KEY = "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"; // Get free key at huggingface.co/settings/tokens

async function runImageGen() {
    const prompt = document.getElementById('imgPrompt').value;
    const output = document.getElementById('imageOutput');
    const btn = document.getElementById('genImgBtn');

    if(!prompt) return alert("Enter a prompt!");

    btn.innerText = "Generating...";
    output.innerHTML = "<div class='loader'>DALL·E 3 is processing...</div>";

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
            {
                method: "POST",
                headers: { "Authorization": `Bearer ${HF_KEY}`, "Content-Type": "application/json" },
                body: JSON.stringify({ inputs: prompt }),
            }
        );
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        output.innerHTML = `<img src="${url}">`;
        saveToLibrary(url, 'image');
    } catch (e) {
        output.innerHTML = "Error: Check your API Key.";
    }
    btn.innerText = "Generate Image";
}

function saveToLibrary(url, type) {
    const gallery = document.getElementById('mainGallery');
    const item = document.createElement('div');
    item.className = "gallery-item";
    item.innerHTML = type === 'image' ? `<img src="${url}" style="width:100%">` : `<video src="${url}" controls></video>`;
    gallery.prepend(item);
}
