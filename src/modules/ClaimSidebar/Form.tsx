import * as Yup from 'yup';
import { useCallback } from 'react';
import { useFormik } from 'formik';
import styled from '@/components/Theme/styled';
import { useAsyncAction } from '@/common/hooks';
import { RECOIL_ASYNC_STATE } from '@/common/constants';
import { PolicyService } from '@/services/policy';
import { PolicySelect } from './Select';
import { useAsync } from '@/common/hooks';
import { ClaimDatePicker } from './DatePicker';
import { ClaimService } from '@/services/claim';

export interface FormValues {
  policyNumber: undefined | { value: string; label: number },
  holder: string,
  insuredItem: string,
  amount: string,
  processingFee: string,
  description: string,
  incidentDate: string
}

export function CreateClaimForm ({ openPanel }: { openPanel: (val: boolean) => void }) {
  const policiesState = useAsync(async () => {
    return PolicyService.getPolicies()
  }, [])
  const [state, submitIntent] = useAsyncAction(async (values) => {
    const formattedValues = {
      ...values,
      policyNumber: values.policyNumber.label
    }
    await ClaimService.createClaim(formattedValues)
    openPanel(false)
  })
  const formik = useFormik<FormValues>({
    initialValues: {
      policyNumber: undefined,
      holder: '',
      insuredItem: '',
      amount: '',
      processingFee: '',
      description: '',
      incidentDate: ''
    },
    onSubmit: submitIntent,
    validationSchema: Yup.object().shape({
      policyNumber: Yup.object().required('Policy number is required'),
      insuredItem: Yup.string().required('Insured item is required'),
      holder: Yup.string().required('Insured item is required'),
      amount: Yup.string().required('Claim amount is required'),
      processingFee: Yup.string().required('Processing amount is required'),
      description: Yup.string().required('Description is required'),
      incidentDate: Yup.string().required('Incident date is required'),
    })
  })

  const numberHandler = useCallback((event: any, name: string) => {
    const validated = event.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/)
    if (validated) {
      formik.setFieldValue(name, event.target.value)
    }
  }, [])

  const { hasError, loading, contents } = state
  const isLoading = loading === RECOIL_ASYNC_STATE.LOADING

  if (!policiesState.contents) return <></>

  return (
    <Container>
      <InputContainer>
        <LabelContainer>
          <Label>
            Policy number:
          </Label>
        </LabelContainer>
        <PolicySelect
          formik={formik as any}
          policies={policiesState.contents}
        />
      </InputContainer>
      <InputContainer>
        <LabelContainer>
          <Label>
            Holder name:
          </Label>
        </LabelContainer>
        <InputField
          id="holder"
          type="text"
          name="holder"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.holder}
        />
        {formik.errors.holder && formik.touched.holder ? (
          <ErrorBlock>{formik.errors.holder}</ErrorBlock>
        ) : null}
      </InputContainer>
      <InputContainer>
        <LabelContainer>
          <Label>
            Insured item:
          </Label>
        </LabelContainer>
        <InputField
          id="insuredItem"
          type="text"
          name="insuredItem"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.insuredItem}
        />
        {formik.errors.insuredItem && formik.touched.insuredItem ? (
          <ErrorBlock>{formik.errors.insuredItem}</ErrorBlock>
        ) : null}
      </InputContainer>
      <InputContainer>
        <LabelContainer>
          <Label>
            Claim amount:
          </Label>
        </LabelContainer>
        <InputField
          id="amount"
          type="text"
          name="amount"
          onBlur={formik.handleBlur}
          onChange={(ev) => numberHandler(ev, 'amount')}
          value={formik.values.amount}
        />
        {formik.errors.amount && formik.touched.amount ? (
          <ErrorBlock>{formik.errors.amount}</ErrorBlock>
        ) : null}
      </InputContainer>
      <InputContainer>
        <LabelContainer>
          <Label>
            Procession fee:
          </Label>
        </LabelContainer>
        <InputField
          id="processingFee"
          type="number"
          name="processingFee"
          onChange={(ev) => numberHandler(ev, 'processingFee')}
          onBlur={formik.handleBlur}
          value={formik.values.processingFee}
          
        />
        {formik.errors.processingFee && formik.touched.processingFee ? (
          <ErrorBlock>{formik.errors.processingFee}</ErrorBlock>
        ) : null}
      </InputContainer>
      <InputContainer>
        <LabelContainer>
          <Label>
            Description:
          </Label>
        </LabelContainer>
        <InputField
          id="description"
          type="text"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.errors.description && formik.touched.description ? (
          <ErrorBlock>{formik.errors.description}</ErrorBlock>
        ) : null}
      </InputContainer>
      <InputContainer>
        <LabelContainer>
          <Label>
            Incident date:
          </Label>
        </LabelContainer>
        <ClaimDatePicker formik={formik as any}/>
        {formik.errors.incidentDate && formik.touched.incidentDate ? (
          <ErrorBlock>{formik.errors.incidentDate}</ErrorBlock>
        ) : null}
      </InputContainer>
      <ButtonContainer>
        <Button
          disabled={isLoading}
          style={{ width: '100%' }}
          onClick={formik.submitForm}
        >
          Create claim
        </Button>
        {hasError === 'hasError' ? (
          <ErrorBlock>Failed. {(contents as any)?.response?.data?.error}</ErrorBlock>
        ) : null}
      </ButtonContainer>
    </Container>
  )
}

const ButtonContainer = styled.div`
  padding: 20px 0;
`;

const Container = styled.div`
  padding: 10px 0;
`;

const InputField = styled.input`
  width: 280px;
  height: 30px;
  padding: 0 5px;
  outline: none;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 1px #24a0ed;
  }
`;

export const ErrorBlock = styled.div`
  color: red;
`;

const Button = styled.button`
  width: 365px;
  height: 35px;
  background: ${({ disabled }) => disabled ? 'lightgray' : '#24a0ed'};
  color: #fff;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: ${({ disabled }) => disabled ? 'auto' : 'pointer'};
`;

const InputContainer = styled.div`
  margin: 5px 0;
`;

const LabelContainer = styled.div`
  padding: 5px 0;
`;

const Label = styled.label`
  padding: 0;
  line-height: 1;
  font-weight: 450;
  color: #556274;
  float: none;
  text-align: left;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
