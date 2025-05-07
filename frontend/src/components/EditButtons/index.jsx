export default function EditButtons({ onEdit, onDelete, onNavigate }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1,
        display: "flex",
        gap: "0px",
      }}
    >
      <button
        style={{
          borderRadius: "0%",
          border: "none",
        }}
        type="button"
        className="btn"
        onClick={onEdit}
      >
        <i className="bi bi-pencil-fill"></i>
      </button>
      <button
        style={{
          borderRadius: "0%",
          border: "none",
        }}
        type="button"
        className="btn"
        onClick={onDelete}
      >
        <i className="bi bi-trash-fill"></i>
      </button>
      <button
        style={{
          borderRadius: "0%",
          border: "none",
        }}
        type="button"
        className="btn"
        onClick={onNavigate}
      >
        <i className="bi bi-arrows-fullscreen"></i>
      </button>
    </div>
  );
}