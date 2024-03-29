import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="dark" className="h-full">
      <Head />
      <body className="min-h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
