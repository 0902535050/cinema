import React from "react";
import "./skeleton.scss";
export default function Skeleton({ type }) {
  const Circle = () => (
    <div className="circleSkeleton">
      <img
        src="https://media4.giphy.com/media/sSgvbe1m3n93G/giphy.gif?cid=ecf05e47puse6atdvqzkxdyezpotzks8wr8vti1ef94nzfbp&rid=giphy.gif&ct=g"
        alt=""
      />
    </div>
  );

  const Load = () => (
    <div className="loadSkeleton">
      <img
        src="https://media4.giphy.com/media/sSgvbe1m3n93G/giphy.gif?cid=ecf05e47puse6atdvqzkxdyezpotzks8wr8vti1ef94nzfbp&rid=giphy.gif&ct=g"
        alt=""
      />
    </div>
  );

  const Product = () => (
    <div className="productSkeleton">
      <img
        src="https://media4.giphy.com/media/sSgvbe1m3n93G/giphy.gif?cid=ecf05e47puse6atdvqzkxdyezpotzks8wr8vti1ef94nzfbp&rid=giphy.gif&ct=g"
        alt=""
      />
    </div>
  );

  const Actor = () => (
    <div className="actorSkeleton">
      <img
        src="https://media4.giphy.com/media/sSgvbe1m3n93G/giphy.gif?cid=ecf05e47puse6atdvqzkxdyezpotzks8wr8vti1ef94nzfbp&rid=giphy.gif&ct=g"
        alt=""
      />
    </div>
  );
  if (type === "circle") return <Circle />;
  if (type === "load") return <Load />;
  if (type === "product") return <Product />;
  if (type === "actor") return <Actor />;
}
