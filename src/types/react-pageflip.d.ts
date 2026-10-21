declare module "react-pageflip" {
  import React from "react";

  export interface IFlipSetting {
    startPage?: number;
    size?: "fixed" | "stretch";
    width: number;
    height: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  }

  export interface IEventProps {
    onFlip?: (flipEvent: { data: number }) => void;
    onChangeOrientation?: (flipEvent: { data: string }) => void;
    onChangeState?: (flipEvent: { data: string }) => void;
    onInit?: (flipEvent: { data: unknown }) => void;
    onUpdate?: (flipEvent: { data: unknown }) => void;
  }

  export interface HTMLFlipBookProps extends IFlipSetting, IEventProps {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    renderOnlyPageLengthChange?: boolean;
  }

  export interface PageFlipApi {
    flipNext: () => void;
    flipPrev: () => void;
    turnToPage: (pageIndex: number) => void;
    flip: (pageIndex: number) => void;
    getCurrentPageIndex: () => number;
    getPageCount: () => number;
  }

  export interface PageFlipInstance {
    pageFlip: () => PageFlipApi | undefined;
  }

  const HTMLFlipBook: React.ForwardRefExoticComponent<
    HTMLFlipBookProps & React.RefAttributes<PageFlipInstance>
  >;

  export default HTMLFlipBook;
}
