import {
  DetailsRow,
  IDetailsRowProps,
  IRenderFunction,
  IDetailsRowStyles,
} from '@fluentui/react';
import styled from '@/components/Theme/styled';

const detailsRowStyles: Partial<IDetailsRowStyles> = {
  cell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}

const RowButtonsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: none;
  align-items: center;
  background: rgb(243, 242, 241);
  box-shadow: ${({ theme }) => theme.effects.elevation16};
  color: white;
  min-width: 75px;
  text-align: center;
`;

export const RowContainer = styled.div`
  position: relative;
  :hover {
    ${RowButtonsContainer} {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export const Row: IRenderFunction<Partial<IDetailsRowProps>> = (props) => {
  const { item, itemIndex } = props ?? {}

  return (
    <RowContainer>
      <DetailsRow
        item={item}
        itemIndex={itemIndex as number}
        {...props}
        styles={detailsRowStyles}
      />
    </RowContainer>
  )
}
