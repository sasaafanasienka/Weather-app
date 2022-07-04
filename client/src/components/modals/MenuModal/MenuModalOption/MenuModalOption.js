import React from 'react';

const MenuModalOption = props => {

  const { data } = { ...props }

  return (
    <div className='MenuModal__option'>
      <p>{`${data.name}:`}</p>
      <div className='MenuModal__dropdown'
        onClick={data.toggler}
      >
        {data.value}
        {data.isShow === true && <div className='MenuModal__dropdown-wrp'>
          {data.options.map(el => {
            return (
              <button
                key={el[0]}
                className='MenuModal__dropdown-option'
                onClick={el[1]}
              >
                {el[0]}
              </button>
            )
          })}
        </div>}
      </div>
    </div>
  );
}

export default MenuModalOption;
