import { SignIn } from "@clerk/clerk-react";
import React from "react";

function Auth() {
  return (
    <main className="container flex h-svh justify-center items-center">
      <SignIn />
    </main>
  );
}

export default Auth;
