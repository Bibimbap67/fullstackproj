function Hero({ gameStarted, clicks }) {
    return (
        <div
            className="hero"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h1>How fast can you click?</h1>

            <div
                style={{
                    width: "400px",
                    height: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {!gameStarted ? (
                    <img
                        src="src/assets/asking.png"
                        alt="Asking"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                ) : (
                    <h1
                        style={{
                            fontSize: "150px",
                            margin: 0,
                            lineHeight: 1,
                        }}
                    >
                        {clicks}
                    </h1>
                )}
            </div>
        </div>
    );
}

export default Hero;