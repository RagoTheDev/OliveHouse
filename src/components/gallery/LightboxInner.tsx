import YARL, { type Slide } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

interface Props {
  slides: Slide[];
  index: number;
  open: boolean;
  onClose: () => void;
}

export default function LightboxInner({ slides, index, open, onClose }: Props) {
  return (
    <YARL
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Captions, Counter, Zoom]}
      animation={{ fade: 320, swipe: 420 }}
      controller={{ closeOnBackdropClick: true }}
      carousel={{ finite: false, preload: 2, padding: 24 }}
      counter={{ container: { style: { top: "unset", bottom: 0, left: 0, fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "0.16em" } } }}
      captions={{ descriptionTextAlign: "center", showToggle: false }}
      zoom={{ maxZoomPixelRatio: 2, scrollToZoom: false }}
      styles={{
        container: { backgroundColor: "rgba(31, 36, 25, 0.96)" },
        captionsTitleContainer: { background: "transparent" },
        captionsTitle: { fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 400, textAlign: "center" },
      }}
      render={{
        buttonZoom: () => null,
      }}
    />
  );
}
