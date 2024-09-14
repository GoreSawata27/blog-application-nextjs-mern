import React from "react";
import { GoHome } from "react-icons/go";
import { RiBloggerLine } from "react-icons/ri";
import { MdOutlineFormatLineSpacing, MdAutoGraph } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      icon: <GoHome className="sidebar-icons" />,
      label: "Dashboard",
    },
    {
      href: "/dashboard/blogs",
      icon: <RiBloggerLine className="sidebar-icons" />,
      label: "Blogs",
    },
    {
      href: "/dashboard/finances",
      icon: <MdOutlineFormatLineSpacing className="sidebar-icons" />,
      label: "Finances",
    },
    {
      href: "/dashboard/pitches",
      icon: <MdAutoGraph className="sidebar-icons" />,
      label: "Pitches",
    },
  ];
  const BottomLinks = [
    {
      href: "/dashboard/settings",
      icon: <IoSettingsOutline className="sidebar-icons" />,
      label: "Settings",
    },
    {
      href: "/",
      icon: <CiLogout className="sidebar-icons" />,
      label: "Log out",
    },
  ];

  return (
    <div className="sidebar">
      <div>
        <div className="logo">Jadwa</div>
        <div className="links">
          <ul>
            {links.map(({ href, icon, label }) => (
              <li key={href}>
                <Link href={href}>
                  <span className="flex gap-3 sidebar-item">
                    {icon}
                    <span
                      className={`link-item ${
                        pathname === href ? "active" : ""
                      }`}
                    >
                      {label}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="links bottom">
        <ul>
          {BottomLinks.map(({ href, icon, label }) => (
            <li key={href}>
              <Link href={href}>
                <span className="flex gap-3 sidebar-item">
                  {icon}
                  <span
                    className={`link-item ${pathname === href ? "active" : ""}`}
                  >
                    {label}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
