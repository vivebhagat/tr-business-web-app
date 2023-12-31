import { MenuData } from "./menu";

export const MenuDataList : MenuData[] = [
    {
      pageName: "Manage",
      expanded: false,
      menus: [
        { name: "Communitites", url: "community-list", selected: false, data: '' },
        { name: "Properties", url: "property-list", selected: false, data: '' },
      ],
    },
    {
      pageName: "Sales",
      expanded: false,
      menus: [
        { name: "Applications", url: "applications", selected: false, data: '' },
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
        { name: "Organization", url: "organization", selected: false, data: '' },
      ],
    },
    {
      pageName: "Master",
      expanded: false,
      menus: [
        { name: "Community Type", url: "community-type-list", selected: false, data: '' },
        { name: "Construction Status", url: "construction-status-list", selected: false, data: '' },
      ],
    },
  ];
  
  
  
  