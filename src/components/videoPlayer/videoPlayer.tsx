import React, { useRef, useEffect, useState } from "react";
import { ConfigProvider, Row, Col, Slider } from "antd";
import { SoundOutlined, MutedOutlined } from "@ant-design/icons";
import { slugify } from "@helpers/slugify";

interface Props {
  isPlaying?: boolean
  title: string
  poster?: string
  url: string
  trackedInformation?: (data: any) => void
}

// Note: I copied this function from the internet as it made sense to reuse here
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

  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState([0, 0]); // current time of the video in array. The first value represents the minute and the second represents seconds.
  const [duration, setDuration] = useState([0, 0]); // // total duration of the video in the array. The first value represents the minute and the second represents seconds.

  const playOrPause = () => {
    if (refVideoPlayer?.current.paused) {
      refVideoPlayer?.current && refVideoPlayer.current.play();
    } else {
      refVideoPlayer?.current && refVideoPlayer.current.pause();
    }
  };

  const muteOrUnmute = () => {
    if (refVideoPlayer?.current.muted) {
      refVideoPlayer?.current && setIsMuted(!refVideoPlayer.current.muted);
    } else {
      refVideoPlayer?.current && setIsMuted(!refVideoPlayer.current.muted);
    }
  };

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

  // function responsible for handling the user's track bar click
  const handleOnTrack = (value: number) => {
    refVideoPlayer.current.currentTime = value;
  };

  return (
    <>
      <ConfigProvider
        theme={{ components: { Slider: {
          controlSize: 7,
          dotSize: 2,
          dotBorderColor: "#fff",
          railBg: "rgba(0, 0, 0, 0.1)",
          trackBg: "rgba(255, 255, 255, 0.7)",
          trackHoverBg: "rgba(255, 255, 255, 0.9)"
        } } }}
      >
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
          muted={isMuted}
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
              top: "269px",
              backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.5))",
              borderRadius: 0,
              color: "#fff",
              fontWeight: "500",
              width: "calc(100% + 1px)",
              padding: "5px 10px",
              height: "60px"
            }}
          >
            <Row>
              <Col
                span={22}
                style={{ textAlign: "left", fontSize: 12 }}
              >
                {`${String(currentTime[0]).padStart(2, "0")}:${String(currentTime[1]).padStart(2, "0")} / ${duration[0]}:${duration[1]}`}
              </Col>
              <Col span={2}>
                {isMuted ?
                  <MutedOutlined onClick={() => muteOrUnmute()} /> :
                  <SoundOutlined onClick={() => muteOrUnmute()} />
                }
              </Col>
              <Col span={24}>
                <Slider
                  min={0}
                  max={duration[0] * 60 + duration[1]}
                  value={currentTime[0] * 60 + currentTime[1]}
                  onChange={(value) => handleOnTrack(value)}
                  step={0.01}
                  tooltip={{
                    formatter: () => `${String(currentTime[0]).padStart(2, "0")}:${String(currentTime[1]).padStart(2, "0")}`
                  }}
                />
              </Col>
            </Row>
          </div>
        }
      </ConfigProvider>
    </>
  );
};

export default VideoPlayer;
