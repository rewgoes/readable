import { fetchCategoriesApi } from '../utils/api'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  }
}

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export function fetchCategories() {
  return function (dispatch) {
    dispatch(requestCategories())

    fetchCategoriesApi().then(
      result => {
        dispatch(receiveCategories(result))
      }
    );
  }
}