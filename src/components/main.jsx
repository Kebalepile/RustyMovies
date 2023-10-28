import Banner from "./banner";
import Trending from "./trending";
import Recommend from "./recommend";
import Watch from "./watch";

export default function Main() {
  return (
    <main id="home-page">
      <Banner />
      <Watch />
      <Trending />
      <Recommend />
    </main>
  );
}
