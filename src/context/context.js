import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });
  const [rateLimit, setRateLimit] = useState({ remaining: 60, limit: 60 });

  const fetchUser = async (githubUser) => {
    toggleError();
    setIsLoading(true);
    const result = await axios
      .get(`${rootUrl}/users/${githubUser}`)
      .catch((err) => console.log(err));

    if (result) {
      const userData = result.data;

      setGithubUser(userData);

      // Fetch repo

      const url = `${rootUrl}/users/${userData.login}/repos?per_page=100`;
      // const repoResponse = await axios
      //   .get(url)
      //   .catch((err) => console.log(err));
      // setRepos(repoResponse.data);

      // // Fetch followers

      // const followerResponse = await axios
      //   .get(userData.followers_url)
      //   .catch((err) => console.log(err));
      //  setFollowers(followerResponse.data);

      await Promise.allSettled([
        axios.get(url),
        axios.get(userData.followers_url),
      ]).then((result) => {
        const status = "fulfilled";
        const [repos, followers] = result;
        if (repos.status === status) setRepos(repos.value.data);
        if (followers.status === status) setFollowers(followers.value.data);
      });
    } // const userData = await result.data;
    else {
      toggleError(true, `User does not found for search test ${githubUser}`);
    }
    setIsLoading(false);
  };

  const fetchRequestRate = async () => {
    const url = `${rootUrl}/rate_limit`;
    const result = await axios.get(url).catch((err) => console.log(err));
    if (result.status === 200) {
      const rate_limit = result.data;

      if (rate_limit.rate.remaining > 0) {
        setRateLimit({
          remaining: rate_limit.rate.remaining,
          limit: rate_limit.rate.limit,
        });
      } else {
        setRateLimit({
          remaining: 0,
          limit: rate_limit.rate.limit,
        });
        toggleError(true, "sorry, you have exeeded your hourly limit!");
      }
    } // const userData = await result.data;
    else {
      console.error("No rate limit found");
    }
  };

  //fetchUser("nileshsbankar");
  // fetchRequestRate();

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(() => {
    fetchRequestRate();
  }, [githubUser]);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        rateLimit,
        fetchUser,
        error,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
