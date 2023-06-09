import {
  IColumn,
} from '@fluentui/react';

export const tableColumns: IColumn[] = [
  {
    key: 'id',
    name: 'ID',
    fieldName: 'id',
    minWidth: 50,
    maxWidth: 50,
    data: 'number',
  },
  {
    key: 'status',
    name: 'Status',
    fieldName: 'status',
    minWidth: 50,
    maxWidth: 70,
    data: 'string',
  },
  {
    key: 'amount',
    name: 'Amount',
    fieldName: 'amount',
    minWidth: 50,
    maxWidth: 50,
    data: 'string',
    isSorted: true,
    isSortedDescending: false
  },
  {
    key: 'holder',
    name: 'Holder',
    fieldName: 'holder',
    minWidth: 50,
    maxWidth: 100,
    data: 'string',
  },
  {
    key: 'policyNumber',
    name: 'Policy Number',
    fieldName: 'policyNumber',
    minWidth: 50,
    maxWidth: 70,
    data: 'string',
  },
  {
    key: 'insuredItem',
    name: 'Insured Item',
    fieldName: 'insuredItem',
    minWidth: 50,
    maxWidth: 70,
    data: 'string',
  },
  {
    key: 'description',
    name: 'Description',
    fieldName: 'description',
    minWidth: 50,
    maxWidth: 200,
    data: 'string',
  },
   {
    key: 'incidentDate',
    name: 'Incident Date',
    fieldName: 'incidentDate',
    minWidth: 50,
    maxWidth: 70,
    data: 'string',
  },
  {
    key: 'processingFee',
    name: 'Processing fee',
    fieldName: 'processingFee',
    minWidth: 50,
    maxWidth: 70,
    data: 'string',
    isSorted: true,
    isSortedDescending: false
  },
  {
    key: 'totalAmount',
    name: 'Total amount',
    fieldName: 'totalAmount',
    minWidth: 50,
    maxWidth: 100,
    data: 'string',
    isSorted: true,
    isSortedDescending: false
  },
  {
    key: 'createdAt',
    name: 'Created At',
    fieldName: 'createdAt',
    minWidth: 50,
    maxWidth: 100,
    data: 'string',
    isSorted: true,
    isSortedDescending: false
  }
]
