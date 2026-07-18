import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'aperture',
    route: '/dashboards/dashboard1',
  },

  {
    navCap: 'List',
  },
  {
    displayName: 'Order',
    iconName: 'truck-delivery',
    route: '/master/ordermaster',
  },
  {
    displayName: 'Add Invoice',
    iconName: 'file-invoice',
    route: '/master/addinvoice',
  },
  {
    displayName: 'Invoice List',
    iconName: 'checkup-list',
    route: '/master/invoicelist',
  },
  {
    displayName: 'Brokerage List',
    iconName: 'list-details',
    route: '/master/broketlist',
  },
  {
    displayName: 'Expenses',
    iconName: 'receipt-tax',
    route: '/master/expenses',
  },
  {
    displayName: 'Raw Material',
    iconName: 'list',
    route: '/master/rawmaster',
  },
  {
    displayName: 'Credit Note',
    iconName: 'file-plus',
    route: '/master/creditNote',
  },
  // {
  //   displayName: 'Debit Note',
  //   iconName: 'file-minus',
  //   route: '/master/debitNote',
  // },
  {
    navCap: 'Master',
  },
  {
    displayName: 'Product Master',
    iconName: 'brand-asana',
    route: '/master/productmaster',
  },
  {
    displayName: 'Party Master',
    iconName: 'building-store',
    route: '/master/partymaster',
  },
  {
    displayName: 'Firm Master',
    iconName: 'building-store',
    route: '/master/firmmaster',
  },
  {
    displayName: 'Broker Master',
    iconName: 'building-store',
    route: '/master/brokermaster',
  },
  {
    displayName: 'TransPort',
    iconName: 'truck-delivery',
    route: '/master/transPort',
  },

  {
    navCap: 'Employee',
  },
  {
    displayName: 'Employee',
    iconName: 'users',
    route: '/master/employee',
  },
  {
    displayName: 'Attendance',
    iconName: 'notes',
    route: '/master/attendance',
  },
  {
    displayName: 'Withdrawal',
    iconName: 'receipt-2',
    route: '/master/withdrawal',
  },
  {
    displayName: 'Bonus List',
    iconName: 'clipboard-list',
    route: '/master/bonus',
  },
  // {
  //   displayName: 'Ex.Machine Salary List',
  //   iconName: 'coin-rupee',
  //   route: '/master/machineSalary',
  // },
  {
    displayName: 'Report',
    iconName: 'report',
    route: '/master/report',
  },
]