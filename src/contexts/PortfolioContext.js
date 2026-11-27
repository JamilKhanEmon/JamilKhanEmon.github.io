import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import {
  achievementSection as defaultAchievements,
  bigProjects as defaultProjects,
  contactInfo as defaultContact,
  educationInfo as defaultEducation,
  greeting as defaultGreeting,
  skillsSection as defaultSkills,
  socialMediaLinks as defaultSocial,
  workExperiences as defaultExperiences
} from "../portfolio";
import {fetchPortfolioData} from "../services/supabaseClient";

const DEFAULT_PORTFOLIO = {
  greeting: defaultGreeting,
  socialMediaLinks: defaultSocial,
  skillsSection: defaultSkills,
  educationInfo: defaultEducation,
  workExperiences: defaultExperiences,
  bigProjects: defaultProjects,
  achievementSection: defaultAchievements,
  contactInfo: defaultContact
};

const PortfolioContext = createContext({
  portfolio: DEFAULT_PORTFOLIO,
  refreshPortfolio: async () => {},
  isLiveLoaded: false
});

function mergeSection(defaultSec, remoteSec) {
  if (!remoteSec || typeof remoteSec !== "object") return defaultSec;
  return {...defaultSec, ...remoteSec};
}

export function PortfolioProvider({children}) {
  const [portfolio, setPortfolio] = useState(DEFAULT_PORTFOLIO);
  const [isLiveLoaded, setIsLiveLoaded] = useState(false);

  const refreshPortfolio = useCallback(async () => {
    try {
      const remote = await fetchPortfolioData();
      if (remote) {
        setPortfolio({
          greeting: mergeSection(defaultGreeting, remote.greeting),
          socialMediaLinks: mergeSection(
            defaultSocial,
            remote.socialMediaLinks
          ),
          skillsSection: mergeSection(defaultSkills, remote.skillsSection),
          educationInfo: mergeSection(defaultEducation, remote.educationInfo),
          workExperiences: mergeSection(
            defaultExperiences,
            remote.workExperiences
          ),
          bigProjects: mergeSection(defaultProjects, remote.bigProjects),
          achievementSection: mergeSection(
            defaultAchievements,
            remote.achievementSection
          ),
          contactInfo: mergeSection(defaultContact, remote.contactInfo)
        });
        setIsLiveLoaded(true);
      }
    } catch (err) {
      console.warn("Using default portfolio data:", err);
    }
  }, []);

  useEffect(() => {
    refreshPortfolio();
  }, [refreshPortfolio]);

  return (
    <PortfolioContext.Provider
      value={{portfolio, refreshPortfolio, isLiveLoaded}}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}

export default PortfolioContext;
