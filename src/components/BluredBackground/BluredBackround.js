import styled from 'styled-components'

const BluredBackground = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(5px) brightness(90%);
    z-index: ${props => props.zIndex || "19"};;
    top: 0;
    left: 0;
`

export default BluredBackground