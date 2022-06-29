import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { VscMute, VscUnmute } from "react-icons/vsc";
import axios from "axios";

export default function Featured() {
  const [isMuted, setIsMuted] = useState(false);

  const [movie, setMovie] = useState({});

  useEffect(() => {
    var n = Math.floor(Math.random() * 62);
    const getRandom = async () => {
      try {
        const res = await axios.get(`/movies`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ4Mzk1MCwiZXhwIjoxNjU2OTE1OTUwfQ.SxBB9PgKJG9DlhGcF_FF-TLgkVKdRaRS09a8e4qJRYk",
          },
        });

        setMovie(res.data[n]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandom();
  }, []);
  return (
    <div className="featured">
      <div className="slider">
        <ReactPlayer
          width="100%"
          height="1080px"
          playing={true}
          loop={true}
          url="video/trailer/trailer.mp4"
          muted={isMuted}
          className="movieIntro"
        ></ReactPlayer>
        {isMuted ? (
          <VscMute className="btnVolume" onClick={() => setIsMuted(false)} />
        ) : (
          <VscUnmute className="btnVolume" onClick={() => setIsMuted(true)} />
        )}
      </div>
    </div>
  );
}
