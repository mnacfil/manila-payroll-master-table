import Link from "next/link";
import { Button } from "primereact/button";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Link href={"/employees"}>
        <Button>My employees</Button>
      </Link>
    </div>
  );
};

export default HomePage;
