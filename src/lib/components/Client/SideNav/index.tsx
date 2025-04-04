import { FiHome, FiUser, FiMail } from "react-icons/fi";

type SideNavProps = {
  isOpen: boolean;
};

export default function SideNav({ isOpen }: SideNavProps) {
  return (
    <aside
      className={`fixed top-14 left-0 w-48 h-full bg-gray-100 border-r border-gray-300 p-4 transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <ul className="space-y-4">
        <li className="flex items-center gap-2 text-gray-800 hover:text-black cursor-pointer">
          <FiHome /> Home
        </li>
        <li className="flex items-center gap-2 text-gray-800 hover:text-black cursor-pointer">
          <FiUser /> About
        </li>
        <li className="flex items-center gap-2 text-gray-800 hover:text-black cursor-pointer">
          <FiMail /> Contact
        </li>
      </ul>
    </aside>
  );
}
