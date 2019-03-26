export const PAGE = 'page';
export const PAGINATION_BUTTON = 'button';
export const PAGINATION_DOTS_LEFT = 'dots-left';
export const PAGINATION_DOTS_RIGHT = 'dots-right';
export const PAGINATION_DALSI = 'Další »';
export const PAGINATION_PREDCHOZI = '« Předchozí';

export const createPagination = (page, totalPages) => {
  const pages = createPages(totalPages);

  return pages.reduce((prev, curr) => {
    if (curr === 1) {
      return [
        {
          label: PAGINATION_PREDCHOZI,
          typeAttr: PAGINATION_BUTTON,
          toPage: prev[0].active ? page : page - 1,
          active: false,
          disabled: prev[0].active
        },
        ...prev
      ];
    }

    if (curr === totalPages) {
      if (curr === page) {
        return [
          ...prev,
          {
            label: curr,
            typeAttr: PAGE,
            toPage: curr,
            active: true,
            disabled: false
          },
          {
            label: PAGINATION_DALSI,
            typeAttr: PAGINATION_BUTTON,
            toPage: page,
            active: false,
            disabled: true
          }
        ]
      }

      return [
        ...prev,
        {
          label: curr,
          typeAttr: PAGE,
          toPage: curr,
          active: false,
          disabled: false
        },
        {
          label: PAGINATION_DALSI,
          typeAttr: PAGINATION_BUTTON,
          toPage: page + 1,
          active: false,
          disabled: false
        }
      ]
    }

    if (
      curr < page - 2 &&
      !prev.find(i => i.typeAttr === PAGINATION_DOTS_LEFT)
    ) {
      return [
        ...prev,
        {
          label: '...',
          typeAttr: PAGINATION_DOTS_LEFT,
          toPage: page,
          active: false,
          disabled: true
        }
      ]
    }

    if (
      curr > page - 3 &&
      curr < page + 3
    ) {
      return [
        ...prev,
        {
          label: curr,
          typeAttr: PAGE,
          toPage: curr,
          active: page === curr,
          disabled: false
        }
      ]
    }

    if (
      curr > page + 2 &&
      curr !== totalPages &&
      !prev.find(i => i.typeAttr === PAGINATION_DOTS_RIGHT)
    ) {
      return [
        ...prev,
        {
          label: '...',
          typeAttr: PAGINATION_DOTS_RIGHT,
          toPage: page,
          active: null,
          disabled: true
        }
      ]
    }

    return prev;
  }, [{ label: 1, typeAttr: PAGE, toPage: 1, active: page === 1 }]);
}

function createPages(total) {
  const pages = [];

  for(let i = 1; i <= total; i++) {
    pages.push(i);
  }

  return pages;
}

