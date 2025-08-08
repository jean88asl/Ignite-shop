import { styled } from "..";

export const ProductContainer = styled('main', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    // fazendo que as colunas tenha a mesma altura
    alignItems: 'stretch',
    gap: '4rem',
    maxWidth: 1180,
    margin: '0 auto',

})

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 576,
    // ajustando a altura da imagem
    height: 656,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover',
    }
})

export const ProductDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    h1: {
        fontSize: '$2xl',
        color: '$gray300',
      },
    
      span: {
        marginTop: '1rem',
        display: 'block',
        fontSize: '$2xl',
        color: '$green300',
      },
    
      p: {
        marginTop: '2.5rem',
        fontSize: '$md',
        lineHeight: 1.6,
        color: '$gray300',
      },      
})

export const ButtonGroup = styled('div', {
  marginTop: 'auto',
  display: 'flex',
 
  gap: 16,

  div: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,

    span: {
      margin: 0,
    },   
  },

  '.add': {
    backgroundColor: '$green500',
    width: '100%',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '.cart': {
      background: 'blue',
      padding: 16,
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'    
    },

  },
})

export const ButtonQuantity = styled('button', {
  display: 'flex',
  alignItems: 'center',
  color: '$white',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer'
})