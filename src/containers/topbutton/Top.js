import React, {useState, useEffect, useContext} from "react";
import "./Top.scss";
import StyleContext from "../../contexts/StyleContext";

export default function Top() {
  const {isDark} = useContext(StyleContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled =
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100;
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll, {passive: true});
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } catch (err) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };

  return (
    <button
      onClick={scrollToTop}
      id="topButton"
      className={`${isDark ? "dark-theme" : "light-theme"} ${
        isVisible ? "show" : ""
      }`}
      title="Scroll to top"
      aria-label="Scroll to top"
    >
      <i className="fas fa-rocket" aria-hidden="true" />
    </button>
  );
}
