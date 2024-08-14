import React from "react";
import { Row, Col } from "antd";
import VideoCard from "../videoCard/VideoCard";
import { motion } from "framer-motion";
import type { Video } from "@definitions/global";

interface Props {
  data: Video[]
}

const VideosList: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Row
        gutter={[15, 30]}
        justify="start"
        align="middle"
      >
        {data?.map((video: Video, index: number) => {
          return (
            <Col key={`video-${video?.id}`} span={8}>
              <motion.div
                key={`video-wrapper-${video.id}`}
                initial={{
                  x: -20,
                  y: 0,
                  opacity: 0 
                }}
                animate={{
                  x: 0,
                  y: 0,
                  opacity: 1
                }}
                transition={{
                  delay: (index * 0.05),
                  duration: 0.15,
                  ease: "easeIn"
                }}
              >
                <VideoCard data={video} />
              </motion.div>
            </Col>
          )
        })}
      </Row>
    </>
  );
};

export default VideosList;
