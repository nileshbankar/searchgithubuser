import React, { useContext } from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = useContext(GithubContext);

  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }

    return total;
  }, {});

  const mostUsedLang = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .splice(0, 5);

  // most stars per langauage

  const mostPopularLang = Object.values(languages)
    .sort((a, b) => {
      return b.star - a.star;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .splice(0, 5);

  /// Repos and Stars

  let { forks, stars } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };

      return total;
    },
    { stars: {}, forks: {} }
  );

  stars = Object.values(stars).splice(-5).reverse();
  forks = Object.values(forks).splice(-5).reverse();

  const chartData1 = [
    {
      label: "HTML",
      value: "122",
    },
    {
      label: "Javascript",
      value: "260",
    },
    {
      label: "CSS",
      value: "180",
    },
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData}></ExampleChart> */}
        <Pie3D data={mostUsedLang}></Pie3D>
        <Column3D data={stars}></Column3D>
        <Doughnut2D data={mostPopularLang}></Doughnut2D>
        <Bar3D data={forks}></Bar3D>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
