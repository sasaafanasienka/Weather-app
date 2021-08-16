import styled from 'styled-components'

const Input = styled.input`
    background-color: white;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    width: 100%;
    height: 36px;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    color: black;
    outline: none;
    padding-left: 15px;
    box-sizing: border-box;
    margin: 0 0 15px 0;
    :focus {
        border: 1px solid #2185d0;
    }
`

export default Input