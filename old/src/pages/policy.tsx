import Head from "next/head";

import formatDate from "@/utils/format-date";

const LAST_UPDATED = new Date(2024, 1 - 1, 29);

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy / StadiumGuessr</title>
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
        <h2>StadiumGuessr Privacy Policy</h2>
        <p>
          This Privacy Policy outlines how we collect, use, and protect your
          personal information when you use our services.
        </p>
        <h3>1. Information We Collect</h3>
        <ul>
          <li>
            <strong>Email Address</strong>: We access and store your primary
            Google Account email address.
          </li>
          <li>
            <strong>User Profile</strong>: We access your personal information,
            including any personal details you&apos;ve made publicly available
            through your Google Account.
          </li>
          <li>
            <strong>Cookies</strong>: We use cookies, specifically session
            cookies, to enhance your user experience. These cookies help to keep
            you logged in during your session.
          </li>
        </ul>
        <p>
          These accesses are achieved through the following Google OAuth scopes:
        </p>
        <ul>
          <li>
            .../auth/userinfo.email: Allows us to see your primary Google
            Account email address.
          </li>
          <li>
            .../auth/userinfo.profile: Lets us access your personal information,
            including any public details.
          </li>
        </ul>

        <h3>2. Purpose of Data Collection</h3>
        <ul>
          <li>
            <strong>Authentication</strong>: To sign you into StadiumGuessr and
            ensure that you&apos;re a genuine user.
          </li>
          <li>
            <strong>Personalized User Experience</strong>: Display your username
            when logged in, save your game scores, and provide a seamless user
            experience by keeping you logged in.
          </li>
        </ul>
        <h3>3. Use of Data</h3>
        <p>
          We use the data solely for the purposes mentioned above. We do{" "}
          <strong>not</strong> use your data for analytics, advertising, or any
          other hidden activities.
        </p>
        <h3>4. Google&apos;s User Data Policy</h3>
        <p>
          We comply with Google&apos;s user data policy as outlined at{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s User Data Policy
          </a>
          . This means we handle your data with care, ensuring that we use it
          transparently, responsibly, and securely in line with Google&apos;s
          requirements.
        </p>
        <h3>5. Data Storage</h3>
        <p>
          Your data is stored securely on cloud services. We employ security
          measures to ensure that your personal information remains safe and
          protected against unauthorized or unlawful access and accidental loss,
          destruction, or damage.
        </p>
        <h3>6. Cookies and Session Management</h3>
        <ul>
          <li>
            <strong>Usage</strong>: We use session cookies to keep you logged in
            and ensure a consistent user experience. Session cookies are
            temporary and are automatically removed once you close your browser.
          </li>
          <li>
            <strong>Control</strong>: You can choose to disable cookies through
            your browser settings. However, doing so may affect your ability to
            use certain features of StadiumGuessr, such as staying logged in.
          </li>
        </ul>
        <h3>7. User Rights</h3>
        <ul>
          <li>
            <strong>Deletion</strong>: If you wish to have your data removed
            from our platform, please contact the site owner, and we will assist
            you in deleting your information from our systems.
          </li>
          <li>
            <strong>Access & Correction</strong>: If you need to access or
            correct your personal information stored with us, feel free to reach
            out.
          </li>
        </ul>
        <h3>8. Changes to the Privacy Policy</h3>
        <p>
          We may occasionally update this Privacy Policy to reflect changes in
          our practices and services. When we post changes to this Privacy
          Policy, we will revise the &quot;last updated&quote; date at the top
          of this policy. If there are significant changes in the way we handle
          personal information, we will notify you by prominently posting a
          notice of such changes before they take effect or directly send you a
          notification.
        </p>
        <h3>9. Contact Us</h3>
        <p>
          If you have any questions about our practices or this Privacy Policy,
          please contact us{" "}
          <a href="mailto:contact@brandoncarlisle.co.uk">here</a>.
        </p>
      </article>
    </>
  );
}
