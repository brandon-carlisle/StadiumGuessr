import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <>
      <Hero />
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">StadiumGuessr</h1>
          <p className="py-6">
            <p className="text-xl">
              Use a map to look around and figure out what football
              <div
                className="tooltip inline mx-1"
                data-tip="Guess the name of the stadium and not the club"
              >
                <span className="font-semibold inline-block">stadium</span>
              </div>
              you are at. You only have 60 seconds.
            </p>
          </p>
          <div className="join">
            <select className="select select-bordered w-full max-w-xs join-item">
              <option disabled selected>
                Which league?
              </option>
              <option>Premier League</option>
              <option>Championship</option>
            </select>
            <button className="btn btn-primary join-item">Let's play</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Check out the source code{" "}
          <a
            href="https://github.com/brandon-carlisle/stadiumGuessr/"
            target="_blank"
            className="link"
          >
            here
          </a>
          , no cheating!
        </p>
      </aside>
    </footer>
  );
}
