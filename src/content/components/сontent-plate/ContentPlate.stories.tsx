import type { Meta, StoryObj } from '@storybook/react'
import { ContentPlate } from './ContentPlate'
import { QuestionList } from '../question-list/QuestionList'
import { questionList } from '../../../models/question'

const meta = {
    title: 'Content/Content Plate',
    component: ContentPlate,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ContentPlate>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        children: <QuestionList questions={questionList} />,
    },
}
