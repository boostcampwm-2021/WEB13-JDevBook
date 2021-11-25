export interface ProfilePhotoProps {
  userName: string;
  size?: string;
}

export interface SideBarProps {
  isLeft: boolean;
  children: React.ReactNode;
}

export interface Alert {
  isAlert?: boolean;
  comment: string;
  modalState: boolean;
}

export interface UserSocket {
  [key: string]: string;
}
