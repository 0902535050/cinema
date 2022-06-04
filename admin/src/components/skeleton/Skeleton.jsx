import React from "react";
import "./skeleton.scss";
export default function Skeleton({ type }) {
  const Circle = () => (
    <div className="circleSkeleton">
      <img
        src="https://media4.giphy.com/media/sSgvbe1m3n93G/giphy.gif?cid=ecf05e47puse6atdvqzkxdyezpotzks8wr8vti1ef94nzfbp&rid=giphy.gif&ct=g"
        alt=""
      />
      <input type="radio" name="radio-btn" id="radio1" style={{ opacity: 0 }} />
      <input type="radio" name="radio-btn" id="radio2" style={{ opacity: 0 }} />
      <input type="radio" name="radio-btn" id="radio3" style={{ opacity: 0 }} />
      <input type="radio" name="radio-btn" id="radio4" style={{ opacity: 0 }} />
    </div>
  );
  if (type === "circle") return <Circle />;
}
