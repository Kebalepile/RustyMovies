export default function Footer() {
  return (
    <footer>
      <div>
        <section id="copyright">
          <h6>
            <b>© 2023 K.T MOTSHOANA</b>
          </h6>
        </section>
        <section id="about">
          <strong>about</strong>
          <br />
          <p>
            🎬 Get ready to immerse yourself in a world of entertainment with
            our <br />
            streaming service! With an extensive library of movies 🍿 and TV
            series 📺,
            <br />
            you’ll never run out of things to watch.
          </p>
          {/* <p>
              From the latest blockbusters 🎥 to timeless classics 🎞️, we’ve got
              something for everyone. So sit back, relax, and let us bring the magic
              of the big screen to your living room. Start streaming now and
              discover your next favorite show! 🤩
            </p>  */}
        </section>
        <section id="contacts">
          <strong>contacts</strong>
          <br />
          <a
            href="https://t.me/Kebalepile_1"
            target="_blank"
            rel="noopener noreferrer"
            title="https://t.me/Kebalepile_1"
          >
            <i className="fa fa-telegram" style={{ fontSize: "36px" }}></i>
          </a>
          <a href="mailto:rustybiskop@gmail.com" title="rustybiskop@gmail.com">
            <i className="fa fa-envelope" style={{ fontSize: "36px" }}></i>
          </a>
        </section>
      </div>
    </footer>
  );
}
