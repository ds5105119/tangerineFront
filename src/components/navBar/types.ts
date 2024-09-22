import { ReactNode } from 'react';

interface navProps {}

export interface topMainNavProps extends navProps {
  children: ReactNode;
  onSearchButtonClick?: () => void;
}

export interface topBasicNavProps extends navProps {
  onBackButtonClick?: () => void;
  onMoreButtonClick?: () => void;
}

export interface topSearchNavProps extends navProps {
  onBackButtonClick?: () => void;
  onSubmit?: (inputValue: string) => void;
}

export interface topUploadNavProps extends navProps {
  onBackButtonClick?: () => void;
  onSaveButtonClick?: () => void;
}

export interface topChatNavProps extends navProps {
  onBackButtonClick?: () => void;
  onMoreButtonClick?: () => void;
  children?: ReactNode;
}
