import styled from 'styled-components'
import Button from '../Button/Button'

const DarkButton = styled(Button)`
    background-color: #00ccff;
    border: 1px solid #00ccff;
    :hover {
        background-color: #00b5e5;
        color: white;
    }
`

export default DarkButton