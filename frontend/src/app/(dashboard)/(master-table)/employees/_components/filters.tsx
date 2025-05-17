"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const Filters = () => {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-center justify-between gap-6">
      <InputText
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="w-full lg:w-[500px]"
      />
      <Button label="Filter" icon="pi pi-filter" outlined />
    </div>
  );
};

export default Filters;
