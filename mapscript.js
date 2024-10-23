const descriptions = {
    delhi: {
        text: "Articles 239 : This article outlines the administration of Union Territories which includes Delhi before it wasa granted a legislature assembly under 239AA ",
        audio: "delhi.mp3"  // Path to the audio file for Delhi
    },
    mumbai: {
        text: "Article 214 : This article establishes the High Courts for each other state, including the High Court of Bombay, which has jurisdicction over Maharastra and Goa, as well as the Union Territories of Dadra and Nagar Haveli , and Daman adn Diu.",
        audio: "mumbai.mp3"  // Path to the audio file for Mumbai
    },
    kolkata: {
        text: "Article 255 : This article grants the High Court authority to issue certain orders and manage its judisdiaicor including those powers that were held before the constitution came into effect",
        audio: "kolkata.mp3"  // Path to the audio file for Kolkata
    }
};

function showDescription(location) {
    const descriptionBox = document.getElementById('description-box');
    const descriptionText = document.getElementById('description-text');
    const voiceOver = document.getElementById('voice-over');

    descriptionText.textContent = descriptions[location].text;
    voiceOver.src = descriptions[location].audio;

    descriptionBox.style.display = 'block';
    voiceOver.play();
}

function closeDescription() {
    const descriptionBox = document.getElementById('description-box');
    const voiceOver = document.getElementById('voice-over');

    descriptionBox.style.display = 'none';
    voiceOver.pause();
    voiceOver.currentTime = 0;
}
