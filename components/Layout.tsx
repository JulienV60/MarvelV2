import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavCharacters from "./NavCharacters";
import NavComics from "./NavComics";
import NavCreators from "./NavCreators";
import NavEvents from "./NavEvents";
import NavSeries from "./NavSeries";
import NavStories from "./NavStories";

export default function Layout({ children }: any) {
  const [dataCharacters, setdataCharacters] = useState<any[]>([]);
  const [dataComics, setdataComics] = useState<any[]>([]);
  const [dataEvents, setdataEvents] = useState<any[]>([]);
  const [dataCreators, setdataCreators] = useState<any[]>([]);
  const [dataStories, setdataStories] = useState<any[]>([]);
  const [dataSeries, setdataSeries] = useState<any[]>([]);

  useEffect(() => {
    getComics();
    getCharaters();
    getEvents();
    getCreators();
    getStories();
    getSeries();
  }, []);

  async function getCharaters() {
    const result = await fetch(`/api/call/characters`).then((response) =>
      response.json()
    );

    setdataCharacters(result.data);
  }

  async function getComics() {
    const result = await fetch(`/api/call/comics`).then((response) =>
      response.json()
    );

    setdataComics(result.data);
  }
  async function getEvents() {
    const result = await fetch(`/api/call/events`).then((response) =>
      response.json()
    );
    setdataEvents(result.data);
  }
  async function getCreators() {
    const result = await fetch(`/api/call/creators`).then((response) =>
      response.json()
    );
    setdataCreators(result.data);
  }
  async function getSeries() {
    const result = await fetch(`/api/call/series`).then((response) =>
      response.json()
    );
    setdataSeries(result.data);
  }
  async function getStories() {
    const result = await fetch(`/api/call/stories`).then((response) =>
      response.json()
    );
    setdataStories(result.data);
  }

  return (
    <div>
      <div className="fakenav">
        <Link href="/home">
          <a>
            <img src="/585f9333cb11b227491c3581.png"></img>
          </a>
        </Link>
      </div>
      <div className="navbar">
        <div className="dropdown">
          <button className="dropbtn">Characters</button>
          <div className="dropdown-content">
            <div className="erow" style={{ backgroundColor: "#f89225" }}>
              <NavCharacters data={dataCharacters} />
            </div>
            <Link href="/characters?page=1">
              <a>All Characters</a>
            </Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Comics</button>
          <div className="dropdown-content">
            <div
              className="erow"
              style={{ backgroundColor: "rgb(188 61 133)" }}
            >
              <NavComics data={dataComics} />
            </div>
            <Link href="/comics?page=1">
              <a>All Comics</a>
            </Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Creators</button>
          <div className="dropdown-content">
            <div className="erow" style={{ backgroundColor: "#2983c7" }}>
              <NavCreators data={dataCreators} />
            </div>
            <Link href="/creators?page=1">
              <a>All Creators</a>
            </Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Events</button>
          <div className="dropdown-content">
            <div className="erow" style={{ backgroundColor: "#fce800" }}>
              <NavEvents data={dataEvents} />
            </div>
            <Link href="/events?page=1">
              <a>All Events</a>
            </Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Series</button>
          <div className="dropdown-content">
            <div className="erow" style={{ backgroundColor: "#6b9c47" }}>
              <NavSeries data={dataSeries} />
            </div>
            <Link href="/series?page=1">
              <a>All Series</a>
            </Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Stories</button>
          <div className="dropdown-content">
            <div className="erow" style={{ backgroundColor: "#c1231f" }}>
              <NavStories data={dataStories} />
            </div>
            <Link href="/stories?page=1">
              <a>All Stories</a>
            </Link>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
