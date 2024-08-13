export type useFetchState<T> = {
  data: T | undefined
  error: Error | null
  loading: boolean
};

export type Video = {
  id: number
  title: string
  thumbnailUrl: string
  duration: string
  uploadTime: string
  views: string
  author: string
  videoUrl: string
  description: string
  subscriber: string
  isLive: boolean
}
