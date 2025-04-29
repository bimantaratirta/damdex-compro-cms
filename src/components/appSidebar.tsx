"use client";
import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home, GalleryThumbnails, Newspaper, Folder } from "lucide-react";
import Image from "next/image";
import logo from "@/../public/damdexlogo.png";

const menuItems = [
  {
    name: "Home Page",
    icon: Home,
    url: "/dashboard",
  },
  {
    name: "Event Gallery",
    icon: GalleryThumbnails,
    url: "/dashboard",
  },
  {
    name: "News",
    icon: Newspaper,
    url: "/dashboard",
  },
  {
    name: "Product",
    icon: Folder,
    url: "/dashboard",
  },
  {
    name: "Project",
    icon: Folder,
    url: "/dashboard",
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Image alt="logo my istiqlal" src={logo} style={{ margin: "0 auto 0 auto" }} width={100} height={80} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};
