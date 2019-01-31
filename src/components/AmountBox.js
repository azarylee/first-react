import React from 'react'

const AmountBox = ({text, type, amount, css}) => {
    return (
        <div className='col'>
            <div className='card'>
                <div className={`card-header bg-${type} text-white`} style={css}>
                    {text}
                </div>
                <div className='card-body'>
                    { amount }
                </div>
            </div>
        </div>
    )
}

export default AmountBox