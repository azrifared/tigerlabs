import { useCallback } from "react";
import { ActionButton, IButtonStyles } from "@fluentui/react";
import { FontSizes } from '@fluentui/style-utilities'

const rowButtonStyles: IButtonStyles = {
  root: {
    minWidth: 75,
    height: '100%',
    background: 'transparent',
  },
  flexContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gridRowGap: '5px'
  },
  label: {
    fontSize: FontSizes.small,
    color: 'rgb(0, 120, 212)',
  },
  icon: {
    color: 'rgb(0, 120, 212)'
  },
  iconHovered: {
    color: 'rgb(0, 120, 212)'
  }
}

export function PanelButton({
  openPanel
}: { openPanel: (val: boolean) => void }) {
  const panelHanlder = useCallback(() => {
    openPanel(true)
  }, [])

  return (
    <ActionButton
      iconProps={{ iconName: 'Edit' }}
      styles={rowButtonStyles}
      onClick={panelHanlder}
    >
      Create claim
    </ActionButton>
  )
}