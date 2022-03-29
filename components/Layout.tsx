import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import md5 from "md5";

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
    const result = await fetch(`/api/call/characters?random=true || null`).then(
      (response) => response.json()
    );
    const data = [];
    for (let index = 0; index < 4; index++) {
      const random = Math.floor(Math.random() * 100);
      data.push(result.data[random]);
    }
    setdataCharacters(data);
  }

  async function getComics() {
    const result = await fetch(`/api/call/comics?random=true || null`).then(
      (response) => response.json()
    );
    const data = [];
    for (let index = 0; index < 4; index++) {
      const random = Math.floor(Math.random() * 100);
      data.push(result.data[random]);
    }
    setdataComics(data);
  }
  async function getEvents() {
    const result = await fetch(`/api/call/events?random=true || null`).then(
      (response) => response.json()
    );
    const data = [];
    for (let index = 0; index < 4; index++) {
      const random = Math.floor(Math.random() * 100);
      data.push(result.data[random]);
    }
    setdataEvents(data);
  }
  async function getCreators() {
    const result = await fetch(`/api/call/creators?random=true || null`).then(
      (response) => response.json()
    );
    const data = [];
    for (let index = 0; index < 4; index++) {
      const random = Math.floor(Math.random() * 100);
      data.push(result.data[random]);
    }
    setdataCreators(data);
  }
  async function getSeries() {
    const result = await fetch(`/api/call/series?random=true || null`).then(
      (response) => response.json()
    );
    const data = [];
    for (let index = 0; index < 4; index++) {
      const random = Math.floor(Math.random() * 100);
      data.push(result.data[random]);
    }
    setdataSeries(data);
  }
  async function getStories() {
    const result = await fetch(`/api/call/stories?random=true || null`).then(
      (response) => response.json()
    );
    const data = [];
    for (let index = 0; index < 4; index++) {
      const random = Math.floor(Math.random() * 100);
      data.push(result.data[random]);
    }
    setdataStories(data);
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
            <Link href="/characters">
              <a>All Characters</a>
            </Link>
            <div className="row">
              {dataCharacters.map((element) => {
                return (
                  <div key={element.name} className="col-3">
                    <div className="card">
                      {element.thumbnail.path
                        .split("/")
                        .includes("image_not_available") === true ? (
                        <img src="/7z6qt753qe031.webp"></img>
                      ) : (
                        <img
                          className="card-img-top"
                          style={{ height: "12rem" }}
                          src={`${element.thumbnail.path}.jpg`}
                          alt="Card image cap"
                        ></img>
                      )}

                      <div className="card-body">
                        <h5 className="card-title">{element.name}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Comics</button>
          <div className="dropdown-content">
            <Link href="/comics">
              <a>All Comics</a>
            </Link>
            <div className="row">
              {dataComics.map((element) => {
                return (
                  <div key={element.title} className="col-3">
                    <div className="card">
                      {element.thumbnail.path
                        .split("/")
                        .includes("image_not_available") === true ? (
                        <img src="/7z6qt753qe031.webp"></img>
                      ) : (
                        <img
                          className="card-img-top"
                          style={{ height: "12rem" }}
                          src={`${element.thumbnail.path}.jpg`}
                          alt="Card image cap"
                        ></img>
                      )}
                      <div className="card-body">
                        <h5 className="card-title">{element.title}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Creators</button>
          <div className="dropdown-content">
            <Link href="/creators">
              <a>All Creators</a>
            </Link>
            <div className="row">
              {dataCreators.map((element) => {
                return (
                  <div key={element.firstName} className="col-3">
                    <div className="card">
                      {element.thumbnail.path
                        .split("/")
                        .includes("image_not_available") === true ? (
                        <img src="/7z6qt753qe031.webp"></img>
                      ) : (
                        <img
                          className="card-img-top"
                          style={{ height: "12rem" }}
                          src={`${element.thumbnail.path}.jpg`}
                          alt="Card image cap"
                        ></img>
                      )}
                      <div className="card-body">
                        <h5 className="card-title">{element.firstName}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Events</button>
          <div className="dropdown-content">
            <Link href="/events">
              <a>All Events</a>
            </Link>
            <div className="row"></div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Series</button>
          <div className="dropdown-content">
            <Link href="/series">
              <a>All Series</a>
            </Link>
            <div className="row">
              {dataSeries.map((element) => {
                return (
                  <div key={element.title} className="col-3">
                    <div className="card">
                      {element.thumbnail.path
                        .split("/")
                        .includes("image_not_available") === true ? (
                        <img src="/7z6qt753qe031.webp"></img>
                      ) : (
                        <img
                          className="card-img-top"
                          style={{ height: "12rem" }}
                          src={`${element.thumbnail.path}.jpg`}
                          alt="Card image cap"
                        ></img>
                      )}
                      <div className="card-body">
                        <h5 className="card-title">{element.title}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Stories</button>
          <div className="dropdown-content">
            <Link href="/stories">
              <a>All Stories</a>
            </Link>
            <div className="row"></div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
