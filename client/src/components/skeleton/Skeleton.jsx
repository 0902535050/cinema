import React from "react";
export default function Skeleton({ type }) {
  const Circle = () => (
    <div className="circleSkeleton">
      <img src="img/loading.gif" alt="" />
    </div>
  );
  if (type === "circle") return <Circle />;
  if (type === "load") return <Circle />;
}
