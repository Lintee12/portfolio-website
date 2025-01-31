import React from "react";

interface Props {}

function Footer(props: Props) {
  const {} = props;

  return (
    <footer className="bg-white py-6 my-8 text-center">
      <p className="text-zinc-700">
        &copy; {new Date().getFullYear()} Evan Linton. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
