import Banner from "./banner";
import Trending from "./trending";
import Recommend from "./recommend";


export default function Main() {
  return (
    <main id="home-page">
      <Banner />
      <Trending />
      <Recommend />
    </main>
  );
}
