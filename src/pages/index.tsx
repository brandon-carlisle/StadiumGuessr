import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>StadiumGuessr</title>
        <meta
          name="description"
          content="A football stadium guessing game - challenge your football knowledge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">StadiumGuessr</h1>
            <p className="py-6">
              StadiumGuessr is a fun game to test your football stadium
              knowledge. You will get placed at a random stadium around Europe
              and you will have to guess various facts about it.
            </p>
            <button className="btn-primary btn">Login with discord</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
