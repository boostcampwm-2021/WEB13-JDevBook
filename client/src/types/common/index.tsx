export interface ProfilePhotoProps {
  src?: string;
  size?: string;
}

export interface SideBarProps {
  isLeft: boolean;
  children: React.ReactNode;
}

export interface Alert {
  bgColor?: string;
  comment: string;
  modalState: boolean;
}

export interface UserSocket {
  [key: string]: string;
}