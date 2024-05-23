import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <title>Pokémon App</title>

        <meta
          name="description"
          content="An awesome Pokémon card collection app"
        />
        <meta
          name="keywords"
          content="Pokémon, Cards, Collection, Trading Cards"
        />

        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/logo.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
