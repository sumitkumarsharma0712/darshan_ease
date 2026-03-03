export default function LoadingSpinner({ size = 40, text = "" }) {
    return (
        <div className="loading-spinner">
            <div style={{ textAlign: "center" }}>
                <div className="spinner" style={{ width: size, height: size, margin: "0 auto" }} />
                {text && <p style={{ marginTop: "1rem", color: "var(--text-tertiary)", fontSize: "0.9rem" }}>{text}</p>}
            </div>
        </div>
    );
}
