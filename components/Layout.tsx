import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import md5 from "md5";
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
            <Link href="/characters?page=1">
              <a>All Characters</a>
            </Link>

            <div className="row">
              <NavCharacters data={dataCharacters} />
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Comics</button>
          <div className="dropdown-content">
            <Link href="/comics?page=1">
              <a>All Comics</a>
            </Link>
            <div className="row">
              <NavComics data={dataComics} />
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Creators</button>
          <div className="dropdown-content">
            <Link href="/creators?page=1">
              <a>All Creators</a>
            </Link>
            <div className="row">
              <NavCreators data={dataCreators} />
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Events</button>
          <div className="dropdown-content">
            <Link href="/events?page=1">
              <a>All Events</a>
            </Link>
            <div className="row">
              <NavEvents data={dataEvents} />
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Series</button>
          <div className="dropdown-content">
            <Link href="/series?page=1">
              <a>All Series</a>
            </Link>
            <div className="row">
              <NavSeries data={dataSeries} />
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Stories</button>
          <div className="dropdown-content">
            <Link href="/stories?page=1">
              <a>All Stories</a>
            </Link>
            <div className="row">
              <NavStories data={dataStories} />
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
