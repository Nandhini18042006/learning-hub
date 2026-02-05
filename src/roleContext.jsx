import React, { createContext, useContext, useState } from "react";

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRole] = useState("learner"); // "super-admin" | "admin" | "trainer" | "learner"

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return ctx;
}

