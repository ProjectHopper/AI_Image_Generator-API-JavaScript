####
const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("input");
const imageSection = document.querySelector('.images-section')

const getImages = async () => {
    // Check for empty input first
    if (!inputElement.value.trim()) {
        alert("Please enter a prompt.");
        return;
    }

    const options = {
        method: "POST",
        headers: {
          #####
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: inputElement.value,
            n: 4,
            size: "1024x1024"
        })
    };

    try {
        const response = await fetch("https://api.com/v1/images/generations", options);
        
        // Check if response is ok
        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error.code === "rate_limit_exceeded") {
                alert("Rate limit exceeded. Please try again in a minute.");
            } else {
            console.error("Error from API:", errorData);
            alert("Error: " + errorData.message);
            }
            return;
        }

        const data = await response.json();
        data?.data.forEach(ImageObject => {
          const imageContainer =  document.createElement("div")
          imageContainer.classList.add("image-container")
          const imageElement = document.createElement("img")
          imageElement.setAttribute ("src", ImageObject.url)
          imageContainer.append(imageElement)
          imageSection.append(imageContainer)
        })

    } catch (error) {
        console.error("Network error:", error);
        alert("Failed to connect to the API.");
    }
};

submitIcon.addEventListener('click', getImages);
