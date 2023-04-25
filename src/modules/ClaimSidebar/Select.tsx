import React, {
  useCallback,
} from 'react'
import Select, {
  MenuListProps,
  createFilter,
  SingleValue,
  MultiValue
} from 'react-select'
import { useFormik } from 'formik'
import { FixedSizeList as List } from "react-window"
import { Policy } from '@/services/policy';
import { ErrorBlock } from './Form';

type SelectPolicy = {
  label: string;
  value: number;
}

function MenuList({ children }: MenuListProps<SelectPolicy>) {
  return (
    <List
      height={200}
      width={'100%'}
      itemCount={(children as any).length}
      itemSize={50}
    >
      {({ index, style }) => <div style={style}>{(children as any)[index]}</div>}
    </List>
  );
}

export function PolicySelect({
  policies,
  formik
}: { policies: Policy[]; formik: ReturnType<typeof useFormik> }) {
  const policyOptions = policies.map(policy => ({
    label: policy.number,
    value: policy.id
  }))
  const onSelectChange = useCallback(
    (selectedPolicies: SingleValue<SelectPolicy> | MultiValue<SelectPolicy>) => {
      formik.setFieldValue('policyNumber', selectedPolicies)
      const policy = policies.find(val => val.number === (selectedPolicies as any)?.label)
      formik.setFieldValue('holder', policy?.holder ?? '')
    }, [formik.values]
  )

  return (
    <>
      <Select
        name='policyNumber'
        isDisabled={false}
        key={Math.random()}
        components={{ MenuList }}
        options={policyOptions}
        value={formik.values.policyNumber}
        onChange={onSelectChange}
        filterOption={createFilter({ ignoreAccents: false })}
      />
      {formik.errors.policyNumber && <ErrorBlock>{formik.errors.policyNumber as any}</ErrorBlock>}
    </>
  )
}
