import React, { useRef, useEffect, useState } from "react";
import { Row, Col, Slider } from "antd";
import { slugify } from "@helpers/slugify";

interface Props {
  isPlaying?: boolean
  title: string
  poster?: string
  url: string
  trackedInformation?: (data: any) => void
}

const sec2Min = (sec: any) => {
  const min = Math.floor(sec / 60);
  const secRemain = Math.floor(sec % 60);
  return {
    min: min,
    sec: secRemain,
  };
};

const VideoPlayer: React.FC<Props> = ({ isPlaying = false, title, poster, url, trackedInformation }) => {
  const refVideoPlayer = useRef(null);
  const videoId = `video-${slugify(title)}`;

  const [currentTime, setCurrentTime] = useState([0, 0]); // current time of the video in array. The first value represents the minute and the second represents seconds.
  // const [currentTimeSec, setCurrentTimeSec] = useState(); //current time of the video in seconds
  const [duration, setDuration] = useState([0, 0]); // // total duration of the video in the array. The first value represents the minute and the second represents seconds.
  // const [durationSec, setDurationSec] = useState(); // // current duration of the video in seconds

  // console.log(refVideoPlayer?.current?.duration);
  // console.log(refVideoPlayer?.current?.currentTime);

  const playOrPause = () => {
    if (refVideoPlayer?.current.paused) {
      refVideoPlayer?.current && refVideoPlayer.current.play();
    } else {
      refVideoPlayer?.current && refVideoPlayer.current.pause();
    }
  };

  isPlaying && console.log("currentTime: ", currentTime);

  // TODO: Understand how to solve the requestFullScreen permission without using an iFrame
  // const fullScreen = () => {
  //   if (!refVideoPlayer?.current.fullscreenElement) {
  //     if (refVideoPlayer?.current.requestFullscreen) {
  //       refVideoPlayer?.current.requestFullscreen();
  //     } else if (refVideoPlayer?.current.webkitRequestFullscreen) { /* Safari */
  //       refVideoPlayer?.current.webkitRequestFullscreen();
  //     } else if (refVideoPlayer?.current.msRequestFullscreen) { /* IE11 */
  //       refVideoPlayer?.current.msRequestFullscreen();
  //     }
  //   } else if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   }
  // };

  useEffect(() => {
    playOrPause();

    //
    const { min, sec } = sec2Min(refVideoPlayer.current.duration);
    // setDurationSec(videoRef.current.duration);
    setDuration([min, sec]);

    const interval = setInterval(() => {
      const { min, sec } = sec2Min(refVideoPlayer.current.currentTime);
      isPlaying && setCurrentTime([min, sec]);
      isPlaying && trackedInformation && trackedInformation([min, sec]);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <>
      { !isPlaying &&
        <img src={poster} style={{
          zIndex: 3,
          position: "absolute",
          minHeight: "330px",
          minWidth: "calc(100% + 2px)"
        }} />
      }
      <video
        id={videoId}
        ref={refVideoPlayer}
        controls={false}
        muted
        autoPlay={isPlaying}
        poster={poster}
        // autoPictureInPicture={true}
        preload="metadata"
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      { isPlaying &&
        <div
          id="video-playback-control"
          style={{
            zIndex: 2,
            position: "absolute",
            top: "268px",
            background: "rgba(0, 0, 0, 0.03)",
            borderRadius: 0,
            color: "#fff",
            fontWeight: "bold",
            width: "calc(100% + 1px)",
            padding: "2px 0px"
            // minHeight: "25px"
          }}
        >
          <Row>
            <Col span={2}></Col>
            <Col span={2}></Col>
            <Col
              span={20}
              style={{ textAlign: "right", paddingRight: 5, fontSize: 11 }}
            >
              {`${String(currentTime[0]).padStart(2, "0")}:${String(currentTime[1]).padStart(2, "0")} / ${duration[0]}:${duration[1]}`}
            </Col>
            <Col span={24} style={{ padding: "0px 10px" }}>
              <Slider
                min={0}
                max={duration[0] * 60 + duration[1]}
                // onChange={onChange}
                value={currentTime[0] * 60 + currentTime[1]}
                step={0.01}
                tooltip={{
                  formatter: () => `${String(currentTime[0]).padStart(2, "0")}:${String(currentTime[1]).padStart(2, "0")}`
                }}
              />
            </Col>
          </Row>
        </div>
      }
    </>
  );
};

export default VideoPlayer;
