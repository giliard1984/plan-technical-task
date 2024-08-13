import React, { useState } from "react";
import { Card, Typography, Row, Col, Avatar } from "antd";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import type { Video } from "@definitions/global";
import VideoPlayer from "@components/videoPlayer/videoPlayer";
import { useDebounce } from "@hooks/useDebounce";

const { Meta } = Card;
const { Paragraph } = Typography;

import styles from "./VideoCard.module.scss";

interface Props {
  data: Video
}

const VideoCard: React.FC<Props> = ({ data }) => {
  const [ellipsis/* , setEllipsis */] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // TODO: Define the action when the more link is clicked
  // Perhaps open a modal and present more details
  const handleDescriptionClick = () => {
    console.log("on click");
  };

  // debouce hook based on the searchValue state (search input)
  const debouncedIsPlaying = useDebounce(isPlaying, 500);

  const trackedInformation = (data: any): void => {
    isPlaying && console.log(data);
  };

  return (
    <Card
      hoverable
      className={styles.card}
      cover={
        <VideoPlayer
          isPlaying={debouncedIsPlaying}
          title={data.title}
          poster={data.thumbnailUrl}
          url={data.videoUrl}
          trackedInformation={trackedInformation}
        />
      }
      onMouseOver={() => setIsPlaying(true)}
      onMouseOut={() => setIsPlaying(false)}
    >
      <Meta
        title={data.title}
        className={styles.cardMeta}
        description={
          <>
            <div style={{ minHeight: "35px" }}>
              <Row justify="start" align="middle" style={{ marginTop: 10 }} gutter={[30, 16]}>
                <Col span={3}>
                  <Avatar shape="square" size={35} icon={<UserOutlined />} />
                </Col>
                <Col span={21}>
                  <Row>
                    <Col span={24} className={styles.cardAuthor}>{data.author}</Col>
                    <Col span={8}>{data.uploadTime}</Col>
                    <Col span={16} style={{ textAlign: "right" }}><EyeOutlined style={{ marginRight: 5 }} />{data.views}</Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <Paragraph
              ellipsis={ellipsis ? { rows: 5, expandable: true, symbol: 'more' } : false}
              className={clsx(styles.description, { [styles.scroll]: !ellipsis })}
              onClick={() => handleDescriptionClick()}
            >
              {data.description}
            </Paragraph>
          </>
        }
      />
    </Card>
  );
};

export default VideoCard;
