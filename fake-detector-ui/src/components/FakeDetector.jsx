import { useState } from "react";

function FakeDetector() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [history, setHistory] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    const handleUpload = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const analyzeImage = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/predict?imagePath=testbild.jpg`);
        const prediction = await response.text();
        setResult(prediction);
        setHistory([{ image, result: prediction }, ...history]);
        setLoading(false);
    };

    return (
        <div style={darkMode ? styles.darkContainer : styles.container}>
            {/* Dark Mode Button */}
            <button onClick={() => setDarkMode(!darkMode)} style={styles.darkModeBtn}>
                {darkMode ? "🌞 Licht Modus" : "🌙 Dunkler Modus"}
            </button>

            <h1>🔎 KI-Bildanalyse: Echtheit überprüfen</h1>

            <input type="file" onChange={handleUpload} style={styles.input} />

            {image && <img src={image} alt="Hochgeladenes Bild" style={styles.image} />}

            <button onClick={analyzeImage} style={styles.button} disabled={loading}>
                {loading ? "🔄 Verarbeitung läuft..." : "📊 Bild analysieren"}
            </button>

            {result && <p style={styles.result}><strong>Ergebnis:</strong> {result}</p>}

            <h2>🗂️ Analyse-Verlauf:</h2>
            <ul style={styles.historyList}>
                {history.map((entry, index) => (
                    <li key={index} style={styles.historyItem}>
                        <img src={entry.image} alt="Vergangenes Bild" style={styles.historyImg} />
                        <p>{entry.result}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        padding: "40px", // More padding for spacing
        width: "80vw", // Wider layout
        margin: "auto",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#ffffff",
        color: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
    },
    darkContainer: {
        textAlign: "center",
        padding: "40px",
        width: "80vw",
        margin: "auto",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#222",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
    },
    input: {
        margin: "10px 0",
    },
    image: {
        width: "250px",
        height: "auto",
        borderRadius: "8px",
        maxHeight: "300px",
    },
    historyImg: {
        width: "100px",
        height: "auto",
        borderRadius: "5px",
    },
    button: {
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        cursor: "pointer",
        borderRadius: "5px",
        fontSize: "16px",
    },
    result: {
        marginTop: "15px",
        fontSize: "18px",
        fontWeight: "bold",
    },
    historyList: {
        listStyleType: "none",
        padding: 0,
    },
    historyItem: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "5px 0",
    },
    darkModeBtn: {
        position: "absolute",
        top: "50px", // Move it lower for better placement
        right: "30px", // More central alignment on the right
        padding: "12px 18px", // Larger button for better usability
        fontSize: "18px", // Bigger text for readability
        cursor: "pointer",
        borderRadius: "10px",
        backgroundColor: "#444",
        color: "#fff",
        border: "none",
        transition: "background 0.3s",
    }    
};

export default FakeDetector;
