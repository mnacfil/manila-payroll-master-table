import CreateEmployeeForm from "./_components/create-form";
import Link from "next/link";
import { Button } from "primereact/button";

const CreateEmployeePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={"/employees"}>
          <Button label="Back" icon="pi pi-arrow-left" />
        </Link>
      </div>
      <div className="max-w-4xl mx-auto">
        <CreateEmployeeForm />
      </div>
    </div>
  );
};
export default CreateEmployeePage;
