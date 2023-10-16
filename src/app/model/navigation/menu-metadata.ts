import { MenuData } from "./menu";

export const MenuDataList : MenuData[] = [
    {
      pageName: "Manage",
      expanded: false,
      menus: [
        { name: "Projects", url: "project-list", selected: false, data: '' },
        { name: "Properties", url: "property-list", selected: false, data: '' },
      ],
    },
    {
      pageName: "Sales",
      expanded: false,
      menus: [
        { name: "My Applications", url: "my-applications", selected: false, data: '' },
        { name: "Contracts", url: "contracts", selected: false, data: '' },
      ],
    },
    {
      pageName: "Billing",
      expanded: false,
      menus: [
        { name: "Billing Details", url: "billing", selected: false, data: '' },
      ],
    },
    {
      pageName: "Team Management",
      expanded: false,
      menus: [
        { name: "Members", url: "member-list", selected: false, data: '' },
        { name: "Roles", url: "member-role-list", selected: false, data: '' },
      ],
    },
    {
      pageName: "Configuration",
      expanded: false,
      menus: [
        { name: "Profile", url: "profile", selected: false, data: '' },
        { name: "Inbox", url: "inbox", selected: false, data: '' },
      ],
    },
  ];
  
  
  
  