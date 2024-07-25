import type { Meta, StoryObj } from '@storybook/react'
import { QuestionList } from './QuestionList'
import { questionList } from '../../../models/question'

const meta = {
    title: 'Content/Question List',
    component: QuestionList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof QuestionList>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        questions: questionList,
    },
}
