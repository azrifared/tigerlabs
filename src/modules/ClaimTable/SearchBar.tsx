import { Field, useFormik, FormikProvider } from "formik";
import styled from "styled-components";

export function SearchBar() {
  const formik = useFormik({
    initialValues: { data: undefined },
    onSubmit: (values) => {
      console.log(values)
    },
  });
  
  return (
    <FormikProvider value={formik}>
      <InputField
        id="searchBar"
        type="searchBar"
        name="searchBar"
        placeholder="Search by id, holder name or policy number"
      />
    </FormikProvider>
  )
}

export const InputField = styled(Field)`
  margin: 10px;
  width: 350px;
  height: 30px;
  padding: 0 5px;
  border: 1px solid lightgray;
  outline: none;
  &:focus {
    outline: none;
    border: 1px solid #24a0ed;
    box-shadow: 0px 0px 1px #24a0ed;
  }
`;
