import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Menu, MenuItem, Typography } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByJwt, logout } from '../redux-toolkit/user-redux/userSlice'
import { getCart } from '../redux-toolkit/cart-redux/cartSlice'
// import { getUserByJwt, logout } from '../redux/userRedux/Action'



const Navbar = () => {

    const [open, setOpen] = useState(false)

    const navigation = {
        categories: [
          {
            id: 'women',
            name: 'Women',
            featured: [
              {
                name: 'New Arrivals',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
              },
              {
                name: 'Basic Tees',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
              },
            ],
            sections: [
              {
                id: 'clothing',
                name: 'Clothing',
                items: [
                  { name: 'Tops', href: '#' },
                  { name: 'Dresses', href: '#' },
                  { name: 'Pants', href: '#' },
                  { name: 'Denim', href: '#' },
                  { name: 'Sweaters', href: '#' },
                  { name: 'T-Shirts', href: '#' },
                  { name: 'Jackets', href: '#' },
                  { name: 'Activewear', href: '#' },
                  { name: 'Browse All', href: '#' },
                  { name: 'Shoes', href: '/womenShoes' },
                ],
              },
              {
                id: 'accessories',
                name: 'Accessories',
                items: [
                  { name: 'Watches', href: '#' },
                  { name: 'Wallets', href: '#' },
                  { name: 'Bags', href: '#' },
                  { name: 'Sunglasses', href: '#' },
                  { name: 'Hats', href: '#' },
                  { name: 'Belts', href: '#' },
                ],
              },
              {
                id: 'brands',
                name: 'Brands',
                items: [
                  { name: 'Full Nelson', href: '#' },
                  { name: 'My Way', href: '#' },
                  { name: 'Re-Arranged', href: '#' },
                  { name: 'Counterfeit', href: '#' },
                  { name: 'Significant Other', href: '#' },
                ],
              },
            ],
          },
          {
            id: 'men',
            name: 'Men',
            featured: [
              {
                name: 'New Arrivals',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
              },
              {
                name: 'Artwork Tees',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                imageAlt:
                  'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
              },
            ],
            sections: [
              {
                id: 'clothing',
                name: 'Clothing',
                items: [
                  { name: 'Tops', href: '#' },
                  { name: 'Pants', href: '#' },
                  { name: 'Sweaters', href: '#' },
                  { name: 'T-Shirts', href: '#' },
                  { name: 'Jackets', href: '#' },
                  { name: 'Activewear', href: '#' },
                  { name: 'Browse All', href: '#' },
                  { name: 'Shoes', href: '/menShoes' },
                ],
              },
              {
                id: 'accessories',
                name: 'Accessories',
                items: [
                  { name: 'Watches', href: '#' },
                  { name: 'Wallets', href: '#' },
                  { name: 'Bags', href: '#' },
                  { name: 'Sunglasses', href: '#' },
                  { name: 'Hats', href: '#' },
                  { name: 'Belts', href: '#' },
                ],
              },
              {
                id: 'brands',
                name: 'Brands',
                items: [
                  { name: 'Re-Arranged', href: '#' },
                  { name: 'Counterfeit', href: '#' },
                  { name: 'Full Nelson', href: '#' },
                  { name: 'My Way', href: '#' },
                ],
              },
            ],
          },
        ],
        pages: [
          { name: 'Company', href: '#' },
          { name: 'Stores', href: '#' },
        ],
      }
      
      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

      const user = useSelector(store=>store.userRedux)
      const listOfCartItmes = useSelector(store=>store.cartRedux.listOfCartItmes);
      console.log("redux user data in navbar:", user);

      const jwt = localStorage.getItem("jwt");
      console.log("jwt from navbar:",jwt);
      const dispatch = useDispatch();
      const navigate = useNavigate();
           

      const handleLogout = () => {
        // localStorage.clear();
        dispatch(logout()).then(()=>{navigate("/login")});
      }

      const handleCartClick = () => {
        navigate("/cart");
      }

      const handleImgClick = () => {
        navigate("/");
      }


      useEffect(() => {
        if(jwt){
          dispatch(getUserByJwt());
        }
      }, [jwt]);




      const [anchorEl, setAnchorEl] = React.useState(null);
      const open2 = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

      

  return (
    <>
        <div className="bg-white z-10 sticky">
            <header className="relative bg-white">
                 <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                    <div className="flex h-16 items-center">
                    <button
                        type="button"
                        className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                        onClick={() => setOpen(true)}
                    >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Logo */}
                    <div className="ml-4 flex lg:ml-0">
                        <a href="#">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="reload"
                            onClick={handleImgClick}
                        />
                        </a>
                    </div>

                    {/* Flyout menus */}
                    <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                        <div className="flex h-full space-x-8">
                        {navigation.categories.map((category) => (
                            <Popover key={category.name} className="flex">
                            {({ open }) => (
                                <>
                                <div className="relative flex">
                                    <PopoverButton
                                    className={classNames(
                                        open
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                        'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                    )}
                                    >
                                    {category.name}
                                    </PopoverButton>
                                </div>

                                <Transition
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <PopoverPanel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                    <div className="relative bg-white">
                                        <div className="mx-auto max-w-7xl px-8">
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                            <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                            {category.featured.map((item) => (
                                                <div key={item.name} className="group relative text-base sm:text-sm">
                                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                    <img
                                                    src={item.imageSrc}
                                                    alt={item.imageAlt}
                                                    className="object-cover object-center"
                                                    />
                                                </div>
                                                <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                    {item.name}
                                                </a>
                                                <p aria-hidden="true" className="mt-1">
                                                    Shop now
                                                </p>
                                                </div>
                                            ))}
                                            </div>
                                            <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                            {category.sections.map((section) => (
                                                <div key={section.name}>
                                                <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                    {section.name}
                                                </p>
                                                <ul
                                                    role="list"
                                                    aria-labelledby={`${section.name}-heading`}
                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                >
                                                    {section.items.map((item) => (
                                                    <li key={item.name} className="flex">
                                                        <a href={item.href} className="hover:text-gray-800">
                                                        {item.name}
                                                        </a>
                                                    </li>
                                                    ))}
                                                </ul>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </PopoverPanel>
                                </Transition>
                                </>
                            )}
                            </Popover>
                        ))}

                        {navigation.pages.map((page) => (
                            <a
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                            >
                            {page.name}
                            </a>
                        ))}
                        </div>
                    </PopoverGroup>

                    <div className="ml-auto flex items-center">
                      {jwt ?   
                        <div>
                          <Avatar
                          className="text-white"
                          onClick={handleClick}
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          sx={{
                            bgcolor: deepPurple[500],
                            color: "white",
                            cursor: "pointer",
                          }}
                          >
                            Hi
                          </Avatar>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open2}
                            onClose={handleClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                          >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                          </Menu>
                        </div>
                        : 
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                          <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                              Sign in
                          </Link>
                        </div>
                      }
                        

                        {/* Search */}
                        <div className="flex lg:ml-6 items-center mt-7">
                        {/* <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                        </a> */}
                          <div className="mb-3 xl:w-96">
                              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                  <input
                                      type="search"
                                      className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                      placeholder="Search"
                                      aria-label="Search"
                                      aria-describedby="button-addon2" />

                                  {/* <!--Search icon--> */}
                                  <span
                                      className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                                      id="basic-addon2">
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                          className="h-5 w-5">
                                          <path
                                              fillRule="evenodd"
                                              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                              clipRule="evenodd" />
                                      </svg>
                                  </span>
                              </div>
                          </div>
                        </div>

                        {/* Cart */}
                        <div className="ml-4 flow-root lg:ml-6">
                        <a href="#" className="group -m-2 flex items-center p-2">
                            <ShoppingBagIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                            onClick={handleCartClick}
                            />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">!!!</span>
                            <span className="sr-only">items in cart, view bag</span>
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
                </nav>
            </header>
        </div>
    </>
  )
}

export default React.memo(Navbar)



