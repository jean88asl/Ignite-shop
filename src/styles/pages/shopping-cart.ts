import { styled } from "..";

export const ButtonCart = styled('button', {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    color: '$white',

    div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '40%',
        width: '16px',
        height: '20px',
        background: '$green300',
        color: '$white',
        position: 'absolute',
        top: '-2px', right: '-5px'
    }
})