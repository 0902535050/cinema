import React from "react";
export default function Skeleton({ type }) {
  const Circle = () => (
    <div className="circleSkeleton">
      <img src="img/loading.gif" alt="" />
      <input type="radio" name="radio-btn" id="radio1" style={{ opacity: 0 }} />
      <input type="radio" name="radio-btn" id="radio2" style={{ opacity: 0 }} />
      <input type="radio" name="radio-btn" id="radio3" style={{ opacity: 0 }} />
      <input type="radio" name="radio-btn" id="radio4" style={{ opacity: 0 }} />
    </div>
  );
  if (type === "circle") return <Circle />;
}
