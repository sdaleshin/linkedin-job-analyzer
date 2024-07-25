import {
    ButtonColorEnum,
    ButtonSizeEnum,
    ButtonVariantEnum,
    Input,
    Button,
} from 'chooui'
import styled from 'styled-components'
import { StoredQuestion } from '../../models/question'

const ContentDiv = styled.div`
    display: flex;
    width: 90vw;
`
const TextInput = styled(Input)`
    flex-grow: 1;
    margin-right: 24px;
    margin-left: 24px;
`

const TypeSelect = styled.select`
    padding: 0px 12px;
    height: 51px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    outline: 1px solid rgb(226, 226, 228);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 2px;
    border-radius: 8px;
    border-width: 0;
    box-sizing: border-box;
    color: rgb(58, 57, 64);
    border-right: 12px solid transparent;
    margin-right: 24px;
    cursor: pointer;
`

export const Question = ({
    id,
    text,
    type,
    short,
    onChange,
    onDelete,
    className,
}: StoredQuestion & {
    onChange: (question: StoredQuestion) => void
    onDelete: (id: string) => void
    className?: string
}) => {
    return (
        <ContentDiv className={className}>
            <Input
                placeholder={'Short label'}
                value={short}
                onChange={(short) => onChange({ id, text, type, short })}
            ></Input>
            <TextInput
                placeholder={'Type your question here'}
                value={text}
                onChange={(text) => onChange({ id, text, type, short })}
            ></TextInput>
            <TypeSelect
                value={type}
                onChange={(e) => {
                    const { value } = e.target
                    if (value === 'boolean' || value === 'text') {
                        onChange({ id, text, type: value, short })
                    }
                }}
            >
                <option value="text">text</option>
                <option value="boolean">yes/no/no data</option>
            </TypeSelect>
            <Button
                text="Delete"
                onClick={() => onDelete(id)}
                size={ButtonSizeEnum.Regular}
                color={ButtonColorEnum.Red}
                variant={ButtonVariantEnum.Outlined}
            ></Button>
        </ContentDiv>
    )
}
