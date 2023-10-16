export class MenuData {
  pageName: string = '';
  expanded: boolean = false;
  menus: Array<MenuItem> = new Array<MenuItem>;
}

export class MenuItem {
  name: string = '';
  url: string = '';
  selected: boolean = false;
  data: string = '';
}