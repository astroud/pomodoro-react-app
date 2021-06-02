import React from "react";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return <h1>{props.title}</h1>;
};

export default Header;
