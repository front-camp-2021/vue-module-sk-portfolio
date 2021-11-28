import { onBeforeMount, readonly, reactive, computed } from "vue";
import axios from "axios";

const state = reactive({
  activeCategories: [],
  activeBrands: [],
  productsUrlDefault: "http://localhost:3001/products",
  priceRange: [],
  ratingRange: [],
  fullProductList: [],
  productsFromRange: [],
  productsForFilter: [],
  currentPage: 1,
  numberOfPages: [],
  productsOnPage: 9,
  onCurrentPage: [],
  wishlistId: [],
  cartList: [],
  wishlistProducts: [],
  searchValue: "",
});

export function useCardlistContainerComposable() {
  onBeforeMount(() => {
    getProducts();
    getFullProductList();
    resetAllInputs();
  });
  const resetAllInputs = function () {
    state.currentPage = 1;
    state.activeBrands = [];
    state.activeCategories = [];
    state.priceRange = [];
    state.ratingRange = [];
    getProducts();
  };
  const getProducts = function () {
    const activeCategoriesLength = Object.keys(state.activeCategories).length;
    const activeBrandsLength = Object.keys(state.activeBrands).length;
    const activeFieldsValid = activeCategoriesLength !== 0 || activeBrandsLength !== 0;
    if (state.searchValue.length !== 0 && activeFieldsValid) {
      getAllProducts(
        `${state.productsUrlDefault}?${productsSearchUrlPart.value}${productsFiltersUrlPart.value}`
      );
    } else if (state.searchValue.length !== 0 && !activeFieldsValid) {
      getAllProducts(productsSearchUrl.value);
    } else if (state.searchValue.length === 0 && activeFieldsValid) {
      getAllProducts(productsFiltersUrl.value);
    } else {
      getAllProducts(state.productsUrlDefault);
    }
  };
  const getFullProductList = function () {
    axios.get(state.productsUrlDefault).then((res) => (state.fullProductList = res.data));
  };
  const getAllProducts = function (url) {
    axios
      .get(url)
      .then((res) => res.data)
      .then((res) => (state.productsFromRange = res))
      .then((res) => (state.productsForFilter = res));
  };
  const productsFromRatingRange = function (arrLength, products) {
    const minRating = arrLength.length === 0 ? null : state.ratingRange[0];
    const maxRating = arrLength.length === 0 ? null : state.ratingRange[1];
    return products.filter((product) => minRating <= product.rating && maxRating >= product.rating);
  };
  const productsFromPriceRange = function (arrLength, products) {
    const minPrice = arrLength.length === 0 ? null : state.priceRange[0];
    const maxPrice = arrLength.length === 0 ? null : state.priceRange[1];
    return products.filter((product) => minPrice <= product.price && maxPrice >= product.price);
  };
  const productsFromSlidersRange = function () {
    const priceRangeArrLength = state.priceRange.length;
    const ratingRangeArrLength = state.ratingRange.length;
    if (priceRangeArrLength !== 0 && ratingRangeArrLength !== 0) {
      const priceRangeProducts = productsFromPriceRange(priceRangeArrLength, [
        ...state.productsForFilter,
      ]);
      state.productsFromRange = productsFromRatingRange(ratingRangeArrLength, priceRangeProducts);
    } else if (priceRangeArrLength === 0 && ratingRangeArrLength !== 0) {
      state.productsFromRange = productsFromRatingRange(ratingRangeArrLength, [
        ...state.productsForFilter,
      ]);
    } else if (ratingRangeArrLength === 0 && priceRangeArrLength !== 0) {
      state.productsFromRange = productsFromPriceRange(priceRangeArrLength, [
        ...state.productsForFilter,
      ]);
    } else {
      state.productsFromRange = [...state.productsForFilter];
    }
    state.currentPage = 1;
  };
  const updatePriceRange = function ($event) {
    state.priceRange = $event;
    state.currentPage = 1;
    productsFromSlidersRange();
  };
  const updateRatingRange = function ($event) {
    state.ratingRange = $event;
    state.currentPage = 1;
    productsFromSlidersRange();
  };

  const addToWishlist = function ($event) {
    const wishlistFromLocalStorage = JSON.parse(localStorage.getItem("wishlist"));
    state.wishlistId = wishlistFromLocalStorage !== null ? wishlistFromLocalStorage : [];

    localStorage.setItem("wishlist", JSON.stringify([...state.wishlistId, $event]));
    const cartFromLocalStorage = localStorage.getItem("cart");
    let cartList = cartFromLocalStorage !== null ? JSON.parse(cartFromLocalStorage) : [];
    cartList = cartList.map((product) => {
      return product.id === $event ? { ...product, isWished: true, isCart: true } : product;
    });
    localStorage.setItem("cart", JSON.stringify(cartList));
    setWishlist(state.onCurrentPage);
  };
  const removeFromWishList = function ($event) {
    const wishlistFromLocalStorage = JSON.parse(localStorage.getItem("wishlist"));
    state.wishlistId = wishlistFromLocalStorage !== null ? wishlistFromLocalStorage : [];
    const newWishlist = state.wishlistId.filter((id) => id !== $event);
    localStorage.setItem("wishlist", JSON.stringify([...newWishlist]));
    const cartFromLocalStorage = localStorage.getItem("cart");
    let cartList = cartFromLocalStorage !== null ? JSON.parse(cartFromLocalStorage) : [];
    cartList = cartList.map((product) => {
      return product.id === $event ? { ...product, isWished: false, isCart: true } : product;
    });
    localStorage.setItem("cart", JSON.stringify(cartList));
    setWishlist(state.onCurrentPage);
  };
  const setWishlist = function (products) {
    const wishlistFromLocalStorage = JSON.parse(localStorage.getItem("wishlist"));
    state.wishlistId = wishlistFromLocalStorage !== null ? wishlistFromLocalStorage : [];
    state.wishlistProducts = products.map((product) => {
      const valid = state.wishlistId.some((id) => product.id === id);
      return valid
        ? { ...product, isWished: true, isCart: false }
        : { ...product, isWished: false, isCart: false };
    });
    return state.wishlistProducts;
  };
  const getWislListProduct = function (products) {
    const wishlistFromLocalStorage = JSON.parse(localStorage.getItem("wishlist"));
    state.wishlistId = wishlistFromLocalStorage !== null ? wishlistFromLocalStorage : [];
    state.wishlistProducts = products.filter((product) =>
      state.wishlistId.some((id) => product.id === id)
    );
    return state.wishlistProducts;
  };
  const addToCart = function (product) {
    const cartFromLocalStorage = localStorage.getItem("cart");
    state.cartList = cartFromLocalStorage !== null ? JSON.parse(cartFromLocalStorage) : [];
    localStorage.setItem("cart", JSON.stringify([...state.cartList, { ...product, isCart: true }]));
  };
  const removeFromCart = function (product) {
    const cartFromLocalStorage = localStorage.getItem("cart");
    const cart = cartFromLocalStorage !== null ? JSON.parse(cartFromLocalStorage) : [];

    const newCart = cart.filter((cartProduct) => cartProduct.uuId !== product.uuId);

    localStorage.setItem("cart", JSON.stringify([...newCart]));
    getCart();
  };
  const getCart = function () {
    const cartFromLocalStorage = localStorage.getItem("cart");
    state.cartList = cartFromLocalStorage !== null ? JSON.parse(cartFromLocalStorage) : [];
    const wishlistFromLocalStorage = JSON.parse(localStorage.getItem("wishlist"));
    state.wishlistId = wishlistFromLocalStorage !== null ? wishlistFromLocalStorage : [];
    state.cartList = state.cartList.filter((product) => {
      const valid = state.wishlistId.some((id) => product.id === id);
      return valid ? { ...product, isWished: true } : { ...product, isWished: false };
    });
    return state.cartList;
  };
  const onToggleActive = function ($event) {
    switch ($event.type) {
      case "brand":
        state.activeBrands = onToggleActiveFields($event, state.activeBrands);
        break;
      case "category":
        state.activeCategories = onToggleActiveFields($event, state.activeCategories);
        break;
    }
    getProducts();
    state.currentPage = 1;
  };

  const onToggleActiveFields = function (e, activeFields) {
    let newActiveFields;
    const valid = activeFields.some((field) => field.field === e.field);
    if (valid) {
      newActiveFields = activeFields.filter((field) => field.field !== e.field);
      return newActiveFields;
    } else {
      activeFields.push(e);
      return activeFields;
    }
  };
  const onSubmitSearch = function ($event) {
    state.searchValue = $event;
    state.currentPage = 1;
    getProducts();
  };
  const setCurrentPageProducts = function (products) {
    state.onCurrentPage = products.slice(
      state.productsOnPage * (state.currentPage - 1),
      state.productsOnPage * state.currentPage
    );
    return state.onCurrentPage;
  };
  const getNumberOfPages = function (numberOfproducts) {
    state.numberOfPages = Math.ceil(numberOfproducts / state.productsOnPage);
    return state.numberOfPages;
  };

  const onChangeCurrentPage = function ($event) {
    state.currentPage = $event;
  };
  const productsFiltersUrl = computed(() => {
    return `${state.productsUrlDefault}?${productsFiltersUrlPart.value}`;
  });
  const productsSearchUrl = computed(() => {
    return `${state.productsUrlDefault}?${productsSearchUrlPart.value}`;
  });
  const productsSearchUrlPart = computed(() => {
    return `q=${state.searchValue}`;
  });
  const productsFiltersUrlPart = computed(() => {
    return `${brandsPartUrl.value}${categoriesPartUrl.value}`;
  });
  const brandsPartUrl = computed(() => {
    return state.activeBrands
      .map((brand) => `&${brand.type}=${brand.field.toLowerCase().replace(" ", "_")}`)
      .join("");
  });
  const categoriesPartUrl = computed(() => {
    return state.activeCategories
      .map((category) => `&${category.type}=${category.field.toLowerCase().replace(" ", "_")}`)
      .join("");
  });
  return {
    state: readonly(state),
    onToggleActive,
    setCurrentPageProducts,
    productsFromSlidersRange,
    onToggleActiveFields,
    getNumberOfPages,
    onSubmitSearch,
    addToCart,
    getCart,
    removeFromCart,
    removeFromWishList,
    addToWishlist,
    removeFromWishList,
    setWishlist,
    updateRatingRange,
    updatePriceRange,
    onChangeCurrentPage,
    resetAllInputs,
    getWislListProduct,
  };
}
