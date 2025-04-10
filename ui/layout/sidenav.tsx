"use client"

import { 
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  Squares2X2Icon,
  ArrowLeftEndOnRectangleIcon
 } from "@heroicons/react/24/outline";

import React, { useEffect, useRef, useState,useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidenav } from "@/context/sidenavContext";
import { SignOut } from "@/lib/actions";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <Squares2X2Icon width={20} height={20}/>,
    name: "Dashboard",
    path: "/dashboard",
  },
];

const othersItems: NavItem[] = [
];

const Sidenav: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidenav();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname,isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others",
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
      {menuType === "others" ?       
      <li key={"Sign Out"} className="menu-item group menu-item-inactive cursor-pointer" onClick={() => SignOut()}>
          <span className="menu-item-icon-inactive"><ArrowLeftEndOnRectangleIcon width={24} height={24}/></span>
          {(isExpanded || isHovered || isMobileOpen) && (
            <span className={`menu-item-text text-nowrap`}>Sign Out</span>
          )}
      </li> : null}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <svg width="132" height="32" viewBox="0 0 132 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:hidden">
                <rect x="0" y="0" width="32" height="32" rx="5" fill="#465FFF"/>
                <rect x="6" y="6" width="20" height="20" rx="3" fill="white"/>
                <path d="M10 10h12M10 14h8" stroke="#465FFF" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="22" cy="22" r="4" fill="white" stroke="#465FFF" strokeWidth="2"/>
                <path d="M20 22l1 1 2-2" stroke="#465FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <text x="40" y="25" fontSize="24" fontWeight="bold" fill="#465FFF" fontFamily="Arial, sans-serif">Trackr</text>
              </svg>
              <svg width="132" height="32" viewBox="0 0 132 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden dark:block">
              <rect x="0" y="0" width="32" height="32" rx="5" fill="#465FFF"/>
                <rect x="6" y="6" width="20" height="20" rx="3" fill="white"/>
                <path d="M10 10h12M10 14h8" stroke="#465FFF" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="22" cy="22" r="4" fill="white" stroke="#465FFF" strokeWidth="2"/>
                <path d="M20 22l1 1 2-2" stroke="#465FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <text x="40" y="25" fontSize="24" fontWeight="bold" fill="#465FFF" fontFamily="Arial, sans-serif">Trackr</text>
              </svg>
            </>
          ) : (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="32" height="32" rx="5" fill="#465FFF"/>
              <rect x="6" y="6" width="20" height="20" rx="3" fill="white"/>
              <path d="M10 10h12M10 14h8" stroke="#465FFF" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="22" cy="22" r="4" fill="white" stroke="#465FFF" strokeWidth="2"/>
              <path d="M20 22l1 1 2-2" stroke="#465FFF" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <EllipsisHorizontalIcon width={20} height={20}/>
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <EllipsisHorizontalIcon width={20} height={20}/>
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
};


export default Sidenav;
