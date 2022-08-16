import React from "react";

const Scrolltop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className="scroll-top"
      title="Go to top"
      onClick={scrollToTop}
    >
      &uarr;
    </button>
  );
};

export default Scrolltop;
