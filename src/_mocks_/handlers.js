import { rest } from "msw";

const botswanaMock = {
  name: {
    common: "Botswana",
    official: "Republic of Botswana",
    nativeName: {
      eng: {
        official: "Republic of Botswana",
        common: "Botswana",
      },
      tsn: {
        official: "Lefatshe la Botswana",
        common: "Botswana",
      },
    },
  },
  cca3: "BWA",
  capital: ["Gaborone"],
  region: "Africa",
  population: 2351625,
  flags: {
    png: "https://flagcdn.com/w320/bw.png",
    svg: "https://flagcdn.com/bw.svg",
    alt: "The flag of Botswana...",
  },
  // include other fields your component uses
};

export const handlers = [
  rest.get("https://restcountries.com/v3.1/all", (req, res, ctx) => {
    console.log("🧪 MSW Intercepted API");
    return res(ctx.status(200), ctx.json([botswanaMock]));
  }),
];
