function Dialog({ message, onDialog, nameProduct }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={() => onDialog(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3 stlye={{ color: "#111", fontSize: "16px" }}>{message}</h3>
        <h1 style={{ color: "blue", fontSize: "24px" }}>{nameProduct}</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => onDialog(true)}
            style={{
              background: "red",
              color: "#000",
              padding: "10px 35px",
              marginRight: "4px",
              border: "none",
              cursor: "pointer",
              borderRadius: "7px",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => onDialog(false)}
            style={{
              background: "lightgray",
              color: "#000",
              padding: "10px 35px",
              marginLeft: "4px",
              border: "none",
              cursor: "pointer",
              borderRadius: "7px",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dialog;
