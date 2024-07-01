import React from "react";
import { IconProps } from "../icon.interface";

const InterfazIcon = ({
    className = "",
    fillColor = "black",
    onClick,
    title,
      }: IconProps) => {
      return (
          <div title={title ?? ""} onClick={onClick}>
          <svg width="125" height="125" viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="125" height="125" fill="url(#pattern0_1389_92)"/>
            <defs>
            <pattern id="pattern0_1389_92" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_1389_92" transform="scale(0.00195312)"/>
            </pattern>
            <image id="image0_1389_92" width="512" height="512" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAcUklEQVR4Ae3aXa5t6fy/4SfxWj1whJSXeDnREiEIQSOqA3VACEKIs2qCBiAliAodcOrcu6IHbJki2TWz9l5rz7XWHvcc43tVUgd/f+XZ4xr3HPMz6jfX8hcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEHiOwBtrLX8z0IAGNKABDcxqYD1Zy98MNKABDWhAA8MacMOH3XCDz+DVgAY0oIFTAwYAAw1oQAMa0MDABtz0gTfd+jd8NaABDWjAADAANKABDWhAAwMbcNMH3nTL3/LXgAY0oAEDwADQgAY0oAENDGzATR940y1/y18DGtCABgwAA0ADGtCABjQwsAE3feBNt/wtfw1oQAMaMAAMAA1oQAMa0MDABtz0gTfd8rf8NaABDWjAADAANKABDWhAAwMbcNMH3nTL3/LXgAY0oAEDwADQgAY0oAENDGzATR940y1/y18DGtCABgwAA0ADGtCABjQwsAE3feBNt/wtfw1oQAMaMAAMAA1oQAMa0MDABtz0gTfd8rf8NaABDWjAADAANKABDWhAAwMbcNMH3nTL3/LXgAY0oAEDwADQgAY0oAENDGzATR940y1/y18DGtCABgwAA0ADGtCABjQwsAE3feBNt/wtfw1oQAMaMAAMAA1oQAMa0MDABtz0gTfd8rf8NaABDWjAADAANKABDWhAAwMbcNMH3nTL3/LXgAY0oAEDwADQgAY0oAENDGzATR940y1/y18DGtCABgwAA0ADGtCABjQwsAE3feBNt/wtfw1oQAMaMAAMAA1oQAMa0MDABtz0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"/>
            </defs>
            </svg>
          </div>
      );
  };
  
  export default InterfazIcon;
  