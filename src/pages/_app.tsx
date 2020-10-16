import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { createClient, Provider } from "urql";
import theme from "../theme";

const client = createClient({
  url: "http://localhost:4000",
  fetchOptions: {
    credentials: "include",
  },
});

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
