import {
  MdNavigateNext,
  MdNavigateBefore,
  MdOutlinePause,
  MdOutlinePlayArrow,
} from "react-icons/md";

interface Props {
  handleLeft: () => void;
  handleRight: () => void;
  handlePlayPause: () => void;
  isPlaying: boolean;
}

export const CarouselControls = ({handleLeft, handleRight, handlePlayPause, isPlaying}: Props) => {
  return (
    <div className="cover-carousel-controls">
      <button className="cover-carousel-control" onClick={handleLeft}>
        <MdNavigateBefore />
      </button>
      <button className="cover-carousel-control" onClick={handleRight}>
        <MdNavigateNext />
      </button>
      <button className="cover-carousel-control" onClick={handlePlayPause}>
        {isPlaying ? <MdOutlinePause /> : <MdOutlinePlayArrow />}
      </button>
    </div>
  );
};
