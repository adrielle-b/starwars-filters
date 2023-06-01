import React, { useContext } from 'react';
import PlanetsContext from '../context/planetsContext';

function Table() {
  const { planets,
    headers,
    filterName,
    listFilterNum,
    setListFilterNum } = useContext(PlanetsContext);

  const filterComparison = (planet) => listFilterNum
    .every(({ column, comparison, number }) => {
      const planetColumn = Number(planet[column]);

      switch (comparison) {
      case 'maior que':
        return planetColumn > Number(number);
      case 'menor que':
        return planetColumn < Number(number);
      case 'igual a':
        return planetColumn === Number(number);
      default:
        return false;
      }
    });

  return (
    <main>
      <div>
        {listFilterNum && listFilterNum.map(({ column, comparison, number }, index) => (
          <div key={ column } data-testid="filter">
            <button
              type="button"
              onClick={ () => {
                const cloneList = [...listFilterNum];
                cloneList.splice(index, 1);
                setListFilterNum(cloneList);
              } }
            >
              X
            </button>
            {column}
            {' '}
            {comparison}
            {' '}
            {number}
          </div>
        ))}
        <button
          type="button"
          disabled={ listFilterNum.length === 0 }
          onClick={ () => setListFilterNum([]) }
          data-testid="button-remove-filters"
        >
          Limpar Filtros
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {headers && headers.map((header) => (
              <th key={ header }>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planets && planets
            .filter(({ name }) => name.toLowerCase().includes(filterName.toLowerCase()))
            .filter(filterComparison)
            .map((planet) => (
              <tr key={ planet.name }>
                {(Object.values(planet)).map((info, index) => (
                  <td key={ index }>{info}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </main>

  );
}

export default Table;
