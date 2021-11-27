import { TopicDto } from "./topic.dto";

export interface VideoDto {
  id: string;
  source: string;
  video_id: string;
  title: string;
  available: boolean;
  video_url: string;
  topic: TopicDto;
  start_timestamp: number;
  end_timestamp: number;
  thumbnail_url: string;
  channel_name: string;
  channel_avatar_url: string;
}
