"use client";
import React, { useState } from "react";
import SearchSection from "./_component/SearchSection";
import TemplateListsSection from "./_component/TemplateListsSection";

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>("");
  return (
    <div>
      {/* SearchContent*/}
      <SearchSection
        onSearchInput={(value: string) => setUserSearchInput(value)}
      />
      {/*Template data*/}
      <TemplateListsSection userSearchInput={userSearchInput} />
    </div>
  );
}

export default Dashboard;
