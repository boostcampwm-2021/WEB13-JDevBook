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

export enum Page {
  LOGIN,
  HOME,
  GROUP_SELECT,
  GROUP,
  PROFILE
}

export enum ModalHandler {
  OPEN_POST_WRITER,
  OPEN_IMAGE_UPLOADER,
  OPEN_USER_SEARCH,
  TOGGLE_EDIT_PROFILE,
  TOGGLE_IMAGE_UPLOADER,
  CLOSE_ALL
}

export interface ModalHandlerOptions {
  post?: {
    isEnroll?: boolean;
  };
}
