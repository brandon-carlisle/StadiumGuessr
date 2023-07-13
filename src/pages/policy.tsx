import Head from "next/head";

import formatDate from "@/utils/format-date";

const LAST_UPDATED = new Date(2023, 6, 13);

export default function CookiePolicyPage() {
  return (
    <>
      <Head>
        <title>Policy / StadiumGuessr</title>
        <meta
          name="description"
          content="A football stadium guessing game - challenge your football knowledge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className="prose mx-auto py-10 px-4">
        <div className="font-semibold">
          Last updated: <span>{formatDate(LAST_UPDATED)}</span>
        </div>

        <h2>Cookie Policy</h2>

        <p>
          This Cookie Policy explains how StadiumGuessr (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) uses cookies and similar tracking
          technologies when you visit our website.
        </p>

        <h3>1. What are Cookies?</h3>

        <p>
          Cookies are small text files that are placed on your device (computer,
          smartphone, or tablet) when you visit a website. They are widely used
          to make websites work more efficiently and provide a better browsing
          experience. Cookies enable websites to remember your actions and
          preferences (such as login information, language selection, font size,
          and other display preferences) over a period of time, so you
          don&apos;t have to keep re-entering them whenever you come back to the
          site or browse from one page to another.
        </p>

        <h3>2. How We Use Cookies</h3>

        <p>We use cookies for the following purposes:</p>

        <ul>
          <li>
            <strong>Authentication:</strong> We use cookies to facilitate the
            login and authentication process when you access our website using
            the NextAuth.js framework and the Discord OAuth and Google OAuth
            providers. These cookies are necessary for the performance of our
            services and allow you to access and navigate our website securely.
          </li>
          <li>
            <strong>Site Preferences:</strong> We may use cookies to remember
            your preferences and settings on our website, such as language
            preference and display settings.
          </li>
        </ul>

        <h3>3. Cookie Management</h3>

        <p>
          Most web browsers allow you to control and manage cookies through the
          browser settings. Please note that blocking or deleting cookies may
          affect the functionality and user experience of our website.
        </p>

        <p>
          For more information on how to manage cookies, you can refer to the
          help section or documentation of your specific browser.
        </p>

        <h3>4. Changes to this Cookie Policy</h3>

        <p>
          We may update this Cookie Policy from time to time to reflect any
          changes in our use of cookies or applicable laws and regulations. Any
          updates or revisions will be posted on this page with a revised
          &quot;Last Updated&quot; date.
        </p>

        <h3>5. Contact Us</h3>

        <p>
          If you have any questions or concerns about our use of cookies or this
          Cookie Policy, please contact us{" "}
          <a href="mailto:brandon@carlisle.dev">here</a>.
        </p>
      </article>
    </>
  );
}
