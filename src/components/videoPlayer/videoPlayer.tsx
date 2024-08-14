import React, { useRef, useEffect, useState, useContext } from "react";
import { ConfigProvider, Row, Col, Slider } from "antd";
import { SoundOutlined, MutedOutlined } from "@ant-design/icons";
import { slugify } from "@helpers/slugify";
import { secondsToMinutes } from "@helpers/secondsToMinutes";
import { AppContext } from "@contexts/AppContext";

import styles from "./videoPlayer.module.scss";

interface Props {
  isPlaying?: boolean
  title: string
  poster?: string
  url: string
  onVideoStart?: (data: Event, interactive?: boolean) => void
  onVideoEnd?: (data: Event, interactive?: boolean) => void
  onVideoResume?: (data: Event, interactive?: boolean) => void
  onVideoSeek?: (data: Event, interactive?: boolean) => void
}

const VideoPlayer: React.FC<Props> = ({
  isPlaying = false,
  title,
  poster,
  url,
  onVideoStart,
  onVideoEnd,
  onVideoResume,
  onVideoSeek
}) => {
  const refVideoPlayer = useRef(null);
  const videoId = `video-${slugify(title)}`;

  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState([0, 0]); // current time of the video in array. The first value represents the minute and the second represents seconds.
  const [duration, setDuration] = useState([0, 0]); // // total duration of the video in the array. The first value represents the minute and the second represents seconds.

  // retrieved states and methods associated with the app context
  const {
    isInteractive
  } = useContext(AppContext);

  // adds the event listeners, so a callback is triggered when an action is in place
  useEffect(() => {
    const onPlayOrResume = (event: Event) => {
      if (!refVideoPlayer.current.currentTime && onVideoStart) {
        onVideoStart(event, isInteractive);
       } else if (onVideoResume) {
        onVideoResume(event, isInteractive);
       }
    };

    if (refVideoPlayer?.current) {
      refVideoPlayer?.current?.addEventListener("play", onPlayOrResume);
      refVideoPlayer?.current?.addEventListener("ended", (e: Event) => onVideoEnd(e, isInteractive));
      refVideoPlayer?.current?.addEventListener("seeked", (e: Event) => onVideoSeek(e, isInteractive));
    }

    return () => {
      refVideoPlayer?.current?.removeEventListener("play", onPlayOrResume);
      refVideoPlayer?.current?.removeEventListener("ended", (e: Event) => onVideoEnd(e, isInteractive));
      refVideoPlayer?.current?.removeEventListener("seeked", (e: Event) => onVideoSeek(e, isInteractive));
    }
  }, [isInteractive]);

  const playOrPause = () => {
    if (isPlaying && refVideoPlayer?.current.paused) {
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

    // function that converts the duration into minutes and seconds, to be used by the related state
    const { min, sec } = secondsToMinutes(refVideoPlayer.current.duration);
    setDuration([min, sec]);

    // track the current time changes, so the information gets synchronised
    const interval = setInterval(() => {
      const { min, sec } = secondsToMinutes(refVideoPlayer.current.currentTime);
      isPlaying && setCurrentTime([min, sec]);
    }, 1000);

    // cleanup
    return () => clearInterval(interval);
  }, [isPlaying]);

  // function responsible for handling the user's track-bar click
  const handleOnTrack = (value: number) => {
    refVideoPlayer.current.currentTime = value;
  };

  return (
    <>
      {/* Themes related to this component */}
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
        { !isPlaying && <img src={poster} className={styles.poster} /> }
        <video
          id={videoId}
          ref={refVideoPlayer}
          controls={false}
          loop={false}
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
            className={styles.playbackControl}
          >
            <Row>
              <Col
                span={22}
                className={styles.duration}
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
