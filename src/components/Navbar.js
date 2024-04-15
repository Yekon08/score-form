import Logo from "@/app/images/logowhitejulien.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center">
      <Image src={Logo} alt="Logo de la marque" className="mt-16" />
    </nav>
  );
};

export default Navbar;
