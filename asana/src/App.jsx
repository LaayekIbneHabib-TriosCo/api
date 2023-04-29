import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

const token = "";
const options = {
  method: "GET",
  headers: { accept: "application/json", Authorization: `Bearer ${token}` },
};

export default function GetWorkspaces() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://app.asana.com/api/1.0/workspaces`, options)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
      })
      .catch((err) => console.error(err));
  });

  return (
    <>
      {data.map((data, index) => (
        <div key={index}>
          <h1>Workspace : {data.name}</h1>
          <GetTeams key={index} workspace_gid={data.gid} />
        </div>
      ))}
    </>
  );
}

export function GetTeams(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://app.asana.com/api/1.0/workspaces/${props.workspace_gid}/teams`,
      options
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  });

  return (
    <>
      {isLoading ? (
        <div>
          <h2>
            <span>Data is Loading...</span>
          </h2>
        </div>
      ) : (
        <>
          {data.map((data, index) => (
            <div key={index}>
              <h2>Teams : {data.name}</h2>
              <GetProjects team_gid={data.gid} />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export function GetProjects(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://app.asana.com/api/1.0/teams/${props.team_gid}/projects`,
      options
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  });

  return (
    <>
      {isLoading ? (
        <div>
          <h3>
            <span>Data is Loading...</span>
          </h3>
        </div>
      ) : (
        <>
          {data.map((data, index) => (
            <div key={index}>
              <h3>Projects : {data.name}</h3>
              <GetSections project_gid={data.gid} />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export function GetSections(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://app.asana.com/api/1.0/projects/${props.project_gid}/sections`,
      options
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  });

  return (
    <>
      {isLoading ? (
        <div>
          <h4>
            <span>Data is Loading...</span>
          </h4>
        </div>
      ) : (
        <>
          {data.map((data, index) => (
            <div key={index}>
              <h4>Sections : {data.name}</h4>
              <GetTasks section_gid={data.gid} />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export function GetTasks(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://app.asana.com/api/1.0/sections/${props.section_gid}/tasks`,
      options
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  });

  return (
    <>
      {isLoading ? (
        <div>
          <h5>
            <span>Data is Loading...</span>
          </h5>
        </div>
      ) : (
        <>
          {data?.map((data, index) => (
            <div key={index}>
              <h5>Tasks : {data.name}</h5>
            </div>
          ))}
        </>
      )}
    </>
  );
}
