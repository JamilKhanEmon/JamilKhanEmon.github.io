import React, {useEffect, useState} from "react";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import StackProgress from "./skillProgress/skillProgress";
import WorkExperience from "./workExperience/WorkExperience";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import Blogs from "./blogs/Blogs";
import Footer from "../components/footer/Footer";
import Talks from "./talks/Talks";
import Podcast from "./podcast/Podcast";
import Education from "./education/Education";
import ScrollToTopButton from "./topbutton/Top";
import ChatBot from "../components/chatBot/ChatBot";
import SpiderWebBackground from "../components/spiderWebBackground/SpiderWebBackground";
import Twitter from "./twitter-embed/twitter";
import Profile from "./profile/Profile";
import SplashScreen from "./splashScreen/SplashScreen";
import {splashScreen} from "../portfolio";
import {StyleProvider} from "../contexts/StyleContext";
import {PortfolioProvider} from "../contexts/PortfolioContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import AdminPanel from "./admin/AdminPanel";
import "./Main.scss";

const Main = () => {
  const darkPref =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;
  const [isDark, setIsDark] = useLocalStorage(
    "isDark",
    darkPref ? darkPref.matches : true
  );
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);
  const [isAdminRoute, setIsAdminRoute] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.location.hash === "#/admin" || window.location.hash === "#admin")
  );

  useEffect(() => {
    const onHashChange = () => {
      setIsAdminRoute(
        window.location.hash === "#/admin" || window.location.hash === "#admin"
      );
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? "dark-mode app-shell" : "light-mode app-shell"}>
      <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
        <PortfolioProvider>
          <SpiderWebBackground />
          <div className="portfolio-content">
            {isAdminRoute ? (
              <AdminPanel
                onExit={() => {
                  window.location.hash = "";
                  setIsAdminRoute(false);
                }}
              />
            ) : isShowingSplashAnimation && splashScreen.enabled ? (
              <SplashScreen />
            ) : (
              <>
                <Header />
                <Greeting />
                <Skills />
                <StackProgress />
                <Education />
                <WorkExperience />
                <Projects />
                <StartupProject />
                <Achievement />
                <Blogs />
                <Talks />
                <Twitter />
                <Podcast />
                <Profile />
                <Footer />
                <ScrollToTopButton />
                <ChatBot />
              </>
            )}
          </div>
        </PortfolioProvider>
      </StyleProvider>
    </div>
  );
};

export default Main;
