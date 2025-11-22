import React from "react";
import { UserProfile } from "@clerk/nextjs";

function Settings() {
  return (
    <div className="flex justify-center items-center">
      <UserProfile routing="hash" />
    </div>
  );
}

export default Settings;
