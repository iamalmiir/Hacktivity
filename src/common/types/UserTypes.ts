export interface UserInfo {
  id: string
  username: string
  email: string
  password: string
  name: string
}

export interface UserProfile {
  id: string
  bio: string
  user: UserInfo
  userId: string
}

export interface PostTypes {
  title: string
  content: string
  authorId: string
}
