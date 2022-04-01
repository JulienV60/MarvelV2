import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { getDatabase } from "../src/database";

export default function Home() {
  const [img, setImage] = React.useState(<></>);
  React.useEffect(() => {
    document
      .getElementById("toto")
      ?.addEventListener("ended", myHandler, false);
    function myHandler(e: any) {
      setImage(
        <img
          id="totoimage"
          src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DA2E198288BFCA56AB53340211B38DE7134E40E4521EDCAFE6FFB8CD69250DE9/scale?width=2880&amp;aspectRatio=1.78&amp;format=jpeg"
          style={{
            opacity: "100",
            transition: "opacity 1500ms ease 0s",
            width: "100vw",
          }}
        />
      );
    }
  }, []);

  return (
    <div>
      <Link href="/home">
        <a>
          <main className="BlockLink">
            <video
              autoPlay
              muted
              playsInline
              className="blockvideo"
              id="toto"
              poster="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DA2E198288BFCA56AB53340211B38DE7134E40E4521EDCAFE6FFB8CD69250DE9/scale?width=2880&aspectRatio=1.78&format=jpeg"
            >
              <source
                src="/output(compress-video-online.com).mp4"
                type="video/mp4"
                id="toto"
              ></source>
            </video>

            <div
              id="brand-background"
              className="imageaftervideo"
              style={{ opacity: "1" }}
            >
              {img}
              <div className="fondvideo"></div>
            </div>

            <div
              id="unauth-navbar-target"
              className="sc-jdfcpN dHfCWG"
              style={{ opacity: "1" }}
            >
              <img
                alt=""
                src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/2939F39F251515613B87DB083CC248B93D3FA40EA13B8399FC1F6F9B0A07CA31/scale?width=1200&amp;aspectRatio=2.00&amp;format=png"
              />
            </div>
          </main>{" "}
        </a>
      </Link>
    </div>
  );
}
