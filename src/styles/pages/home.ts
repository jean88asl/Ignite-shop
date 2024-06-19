import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    width: '100%',
    // efetuando um calculo para que sempre fique uma margem na esquerda e fazendo com que mesmo assim o container ocupe uma largura de 1180px
    maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
    marginLeft: 'auto',
    minHeight: 656,
})

export const Product = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    // padding: '0.25rem',
    cursor: 'pointer',
    position: 'relative',
    // necessário para estilização do footer
    overflow: 'hidden',
    minWidth: 540,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover'
    },

    footer: {
        position: 'absolute',
        bottom: '0.25rem',
        left: '0.25rem',
        right: '0.25rem',
        padding: '2rem',

        borderRadius: 6,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        // fazendo o footer sumir da tela e atribuindo uma opacidade de 0
        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',

        strong: {
            fontSize: '$lg',
            color: '$gray100'
        },

        span: {
            fontSize: '$xl',
            fontWeight: 'bold',
            color: '$green300'
        },
    },
    // fazendo que o footer volte para tela 
    '&:hover': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1
        }
    }
})