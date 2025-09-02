import { randNumber, randParagraph, randWord } from '@ngneat/falso'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Tabs, { Tab } from './Tabs'

const tabs: Tab[] = Array(randNumber({ min: 2, max: 6 }))
  .fill(null)
  .map(() => ({
    label: randWord(),
    content: (
      <>
        {Array(randNumber({ min: 1, max: 5 }))
          .fill(null)
          .map((_, i) => (
            <p key={i}>{randParagraph()}</p>
          ))}
      </>
    ),
  }))

const Wrapper = () => {
  const [active, setActive] = useState(~~(Math.random() * tabs.length))

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-color)',
        backgroundImage: `url('/svg/cloud.svg')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '100px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        color: 'white',
      }}>
      <div
        style={{
          padding: '2rem',
          backgroundColor: 'rgba(71, 38, 6, 0.482)',
          borderRadius: '8px',
          backdropFilter: 'blur(6px)',
        }}>
        <Tabs tabs={tabs} active={active} onTabChange={setActive}></Tabs>
      </div>
    </div>
  )
}

const meta = {
  component: Wrapper,
  title: 'Tabs',
  args: {},
  // decorators: [
  //   Story => (
  //     <div
  //       style={{
  //         backgroundColor: 'var(--bg-color)',
  //         backgroundImage: `url('/svg/cloud.svg')`,
  //         backgroundRepeat: 'repeat',
  //         backgroundSize: '100px',
  //         padding: '2rem',
  //         display: 'flex',
  //         flexDirection: 'column',
  //         minHeight: '100vh',
  //         color: 'white',
  //       }}>
  //       <div
  //         style={{
  //           padding: '2rem',
  //           backgroundColor: 'rgba(71, 38, 6, 0.482)',
  //           borderRadius: '8px',
  //           backdropFilter: 'blur(6px)',
  //         }}>
  //         <Story />
  //       </div>
  //     </div>
  //   ),
  // ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Wrapper>
export default meta

type Story = StoryObj<typeof Wrapper>

export const Default = {
  args: {},
} satisfies Story
