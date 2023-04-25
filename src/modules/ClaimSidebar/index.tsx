import { Panel } from '@fluentui/react';
import { CreateClaimForm } from './Form';

export function ClaimSidebar({
  isOpen,
  openPanel
}: { isOpen: boolean, openPanel: (val: boolean) => void }) {
  return (
    <Panel
      isOpen={isOpen}
      closeButtonAriaLabel='Close'
      isLightDismiss={true}
      headerText='Create claim'
      onDismiss={() => openPanel(false)}
    >
      <CreateClaimForm openPanel={openPanel}/>
    </Panel>
  )
}
