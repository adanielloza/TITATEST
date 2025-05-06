import React from "react";
import "../styles/Container.css";

export default function Container({ children }) {
  return <div className="container">{children}</div>;
}
