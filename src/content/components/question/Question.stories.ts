import type { Meta, StoryObj } from '@storybook/react'
import { Question } from './Question'
import { questionExample1, questionExample2 } from '../../../models/question'

const meta = {
    title: 'Content/Question',
    component: Question,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Question>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Boolean: Story = {
    args: {
        question: questionExample1,
    },
}

export const Text: Story = {
    args: {
        question: questionExample2,
    },
}

export const Empty: Story = {
    args: {
        question: { ...questionExample1, status: 'empty' },
    },
}

export const Progress: Story = {
    args: {
        question: { ...questionExample1, status: 'progress' },
    },
}
