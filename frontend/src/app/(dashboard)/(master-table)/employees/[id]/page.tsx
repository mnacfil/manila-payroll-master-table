import { getEmployee } from "@/api/employees/queries";
import Link from "next/link";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

type Props = {
  params: Promise<{ id: string }>;
};

const EmployeePage = async ({ params }: Props) => {
  const empId = (await params).id;

  const employeeData = await getEmployee(empId);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employee Details</h1>

        <Link href={"/"}>
          <Button label="Edit" icon="pi pi-pen-to-square" />
        </Link>
      </div>
      <div className="flex gap-6 w-full">
        <Card
          title="Personal Information"
          subTitle="Basic details about employee"
          className="flex-1"
        >
          <div className="flex gap-5 items-center mb-5">
            <Avatar
              label="MN"
              size="xlarge"
              shape="circle"
              className="w-16 h-16"
            />
            <div>
              <h2 className="text-2xl font-medium">
                {employeeData?.first_name} {employeeData?.last_name}
              </h2>
              <p className="text-gray-500">Software engineer</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="flex items-center gap-1 w-28 font-medium">
                <i className="pi pi-envelope"></i>
                Email:
              </div>
              <span>{employeeData?.email}</span>
            </div>
            <div className="flex items-center ">
              <div className="flex items-center gap-1 w-28 font-medium">
                <i className="pi pi-credit-card"></i>
                Salary:
              </div>
              <span>{employeeData?.salary}</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-1 w-28 font-medium">
                <i className="pi pi-calendar"></i>
                Hire Date:
              </div>
              <span>{employeeData?.date_hired}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmployeePage;
