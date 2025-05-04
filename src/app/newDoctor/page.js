import React from "react";
import Form from "@/components/AddDoctorForm";

const page = () => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md w-full h-full">
      <Form />
    </div>
  );
};

export default page;
